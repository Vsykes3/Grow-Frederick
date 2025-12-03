# Stripe Payment Setup Instructions

## ⚠️ IMPORTANT: Complete These Steps Before Testing Payments

### Step 1: Get Stripe Test Keys

1. Go to https://stripe.com
2. Click "Sign up" and create a FREE account
3. After signup, go to: https://dashboard.stripe.com/test/apikeys
4. Copy BOTH keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### Step 2: Create Stripe Products

1. Go to: https://dashboard.stripe.com/test/products
2. Click "+ Add product"

**Create Product 1 - Pro Plan:**
- Name: GrowCommon Pro
- Description: Everything you need for serious gardening
- Price: $9.99
- Billing period: Monthly
- After saving, **copy the Price ID** (starts with `price_`)

**Create Product 2 - Premium Plan:**
- Name: GrowCommon Premium
- Description: Ultimate gardening experience with AI
- Price: $19.99
- Billing period: Monthly
- After saving, **copy the Price ID** (starts with `price_`)

### Step 3: Create/Update `.env.local` File

Create a file named `.env.local` in the project root (`grow-frederick/.env.local`) with:

```env
# Stripe Test Keys (from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**CRITICAL:** Replace `YOUR_ACTUAL_KEY_HERE` with your real Stripe test keys!

### Step 4: Update Price IDs in Pricing Page

Open `src/app/pricing/page.tsx` and replace:

- `'price_PASTE_YOUR_PRO_PRICE_ID_HERE'` with your actual Pro plan Price ID
- `'price_PASTE_YOUR_PREMIUM_PRICE_ID_HERE'` with your actual Premium plan Price ID

### Step 5: Install Stripe Package (if not already installed)

```bash
npm install @stripe/stripe-js stripe
```

### Step 6: Restart Development Server

**MUST restart after adding `.env.local`:**

```bash
# Stop server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 7: Test Payment Flow

1. Navigate to `/pricing`
2. Click "Start 7-Day Free Trial" on Pro or Premium plan
3. Should redirect to Stripe checkout page
4. Use test card: `4242 4242 4242 4242`
5. Any future expiry date (e.g., 12/34)
6. Any 3-digit CVC (e.g., 123)
7. Any ZIP code (e.g., 12345)

### Troubleshooting

**If payment form doesn't appear:**
- Check that `.env.local` exists and has correct keys
- Verify you restarted the server after adding keys
- Check browser console for errors
- Verify Price IDs are correct in `pricing/page.tsx`

**If you see "Stripe is not configured" error:**
- Make sure `.env.local` file exists in project root
- Verify keys start with `pk_test_` and `sk_test_`
- Restart the development server

**If checkout session fails:**
- Check that products are created in Stripe dashboard
- Verify Price IDs match the ones in your code
- Check server console for error messages





