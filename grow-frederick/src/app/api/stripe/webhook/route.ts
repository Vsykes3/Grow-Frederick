import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!customerId || !subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const plan = getPlanFromPriceId(subscription.items.data[0].price.id);

  // Find user by email or create new user
  const user = await prisma.user.findFirst({
    where: { email: session.customer_email! }
  });

  if (user) {
    // Update existing user
    await prisma.user.update({
      where: { id: user.id },
      data: { plan }
    });

    // Create or update subscription
    await prisma.subscription.upsert({
      where: { stripeSubscriptionId: subscriptionId },
      update: {
        plan,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
      },
      create: {
        userId: user.id,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        plan,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }
    });
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const plan = getPlanFromPriceId(subscription.items.data[0].price.id);

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      plan,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    }
  });

  // Update user plan
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id }
  });

  if (dbSubscription) {
    await prisma.user.update({
      where: { id: dbSubscription.userId },
      data: { plan }
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'canceled'
    }
  });

  // Downgrade user to free plan
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id }
  });

  if (dbSubscription) {
    await prisma.user.update({
      where: { id: dbSubscription.userId },
      data: { plan: 'free' }
    });
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: invoice.subscription as string },
      data: { status: 'active' }
    });
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: invoice.subscription as string },
      data: { status: 'past_due' }
    });
  }
}

function getPlanFromPriceId(priceId: string): 'free' | 'pro' | 'premium' | 'admin' {
  // Map your Stripe price IDs to plans
  const priceMap: Record<string, 'free' | 'pro' | 'premium' | 'admin'> = {
    'price_pro_monthly': 'pro',
    'price_pro_yearly': 'pro',
    'price_premium_monthly': 'premium',
    'price_premium_yearly': 'premium',
  };

  return priceMap[priceId] || 'free';
}















