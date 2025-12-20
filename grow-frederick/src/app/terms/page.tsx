import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Terms of Service | GrowCommon',
  description: 'GrowCommon Terms of Service - Read our terms and conditions for using our gardening platform.',
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            1. Agreement to Terms
          </h2>
          <p className="text-muted-foreground mb-4">
            By accessing or using GrowCommon ("the Service"), you agree to be bound by these Terms of Service 
            ("Terms"). If you disagree with any part of these terms, you may not access the Service.
          </p>
          <p className="text-muted-foreground">
            These Terms apply to all visitors, users, and others who access or use the Service. Your use of the 
            Service is also governed by our Privacy Policy, which is incorporated by reference.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            2. Use of Service
          </h2>
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1 Eligibility</h3>
          <p className="text-muted-foreground mb-4">
            You must be at least 13 years old to use GrowCommon. By using the Service, you represent and warrant 
            that you meet this age requirement and have the legal capacity to enter into these Terms.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.2 Account Registration</h3>
          <p className="text-muted-foreground mb-4">
            To access certain features, you must register for an account. You agree to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and update your account information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.3 Acceptable Use</h3>
          <p className="text-muted-foreground mb-4">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Transmit any harmful code, viruses, or malicious software</li>
            <li>Attempt to gain unauthorized access to the Service or related systems</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Copy, modify, or create derivative works of the Service</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-6 w-6" />
            3. Subscriptions and Payments
          </h2>
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1 Subscription Plans</h3>
          <p className="text-muted-foreground mb-4">
            GrowCommon offers Free, Pro, and Premium subscription plans. Subscription fees are billed in advance 
            on a recurring basis (monthly or annually) and are non-refundable except as required by law.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.2 Payment Processing</h3>
          <p className="text-muted-foreground mb-4">
            Payments are processed securely through PCI-DSS compliant payment processors. By providing payment 
            information, you authorize us to charge your payment method for subscription fees. You are responsible for 
            maintaining valid payment information.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Trial Period:</strong> All paid plans include a 7-day free trial. You will not be charged during 
            the trial period. At the end of the trial, your subscription will automatically begin and you will be charged 
            the monthly subscription fee.</li>
            <li><strong>Recurring Billing:</strong> Subscriptions automatically renew at the end of each billing period 
            (monthly or annually) unless canceled before the renewal date. You authorize us to charge your payment method 
            on a recurring basis.</li>
            <li><strong>Payment Methods:</strong> We accept major credit cards including Visa, Mastercard, American Express, 
            and Discover. All payment information is encrypted and stored securely. We do not store your full payment card details.</li>
            <li><strong>Failed Payments:</strong> If a payment fails, we will attempt to charge your payment method again. 
            If payment continues to fail, your subscription may be suspended or canceled. You will be notified of any payment 
            issues via email.</li>
            <li><strong>Refund Policy:</strong> We offer a 30-day money-back guarantee for all paid subscriptions. Refunds 
            are processed within 5-10 business days. After the 30-day period, refunds are provided only in accordance with 
            applicable law or at our discretion.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.3 Cancellation</h3>
          <p className="text-muted-foreground mb-4">
            You may cancel your subscription at any time through your account settings. Cancellation takes effect 
            at the end of your current billing period. You will continue to have access to paid features until 
            the end of the period you've already paid for.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.4 Refunds</h3>
          <p className="text-muted-foreground mb-4">
            Refunds are provided only in accordance with applicable law. If you believe you are entitled to a 
            refund, please contact us through our contact page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
          <p className="text-muted-foreground mb-4">
            The Service, including its original content, features, and functionality, is owned by GrowCommon and 
            protected by international copyright, trademark, and other intellectual property laws. You may not 
            reproduce, distribute, modify, or create derivative works without our express written permission.
          </p>
          <p className="text-muted-foreground">
            Your garden data and user-generated content remain your property. By using the Service, you grant us 
            a license to use, store, and display your content solely for the purpose of providing the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            5. Disclaimers and Limitations of Liability
          </h2>
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1 Service Availability</h3>
          <p className="text-muted-foreground mb-4">
            We strive to provide reliable service but do not guarantee that the Service will be available 
            uninterrupted, secure, or error-free. We may modify, suspend, or discontinue the Service at any time 
            with or without notice.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.2 Gardening Information</h3>
          <p className="text-muted-foreground mb-4">
            GrowCommon provides gardening information, recommendations, and alerts for informational purposes only. 
            We do not guarantee the accuracy, completeness, or suitability of this information for your specific 
            circumstances. Always consult with local gardening experts and follow best practices for your area.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.3 Limitation of Liability</h3>
          <p className="text-muted-foreground mb-4">
            To the maximum extent permitted by law, GrowCommon shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
            directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting 
            from your use of the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Indemnification</h2>
          <p className="text-muted-foreground mb-4">
            You agree to defend, indemnify, and hold harmless GrowCommon and its officers, directors, employees, 
            and agents from and against any claims, liabilities, damages, losses, and expenses, including legal 
            fees, arising out of or in any way connected with your use of the Service or violation of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Termination</h2>
          <p className="text-muted-foreground mb-4">
            We may terminate or suspend your account and access to the Service immediately, without prior notice, 
            for any reason, including breach of these Terms. Upon termination, your right to use the Service will 
            cease immediately.
          </p>
          <p className="text-muted-foreground">
            You may terminate your account at any time by contacting us or using the account deletion feature 
            in your settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
          <p className="text-muted-foreground mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the State of Maryland, 
            United States, without regard to its conflict of law provisions. Any disputes arising from these Terms 
            shall be subject to the exclusive jurisdiction of the courts located in Frederick County, Maryland.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
          <p className="text-muted-foreground mb-4">
            We reserve the right to modify these Terms at any time. We will notify users of material changes by 
            posting the updated Terms on this page and updating the "Last updated" date. Your continued use of 
            the Service after such changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about these Terms, please contact us:
          </p>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-foreground font-semibold mb-2">GrowCommon</p>
            <p className="text-muted-foreground">Email: <a href="/contact" className="text-primary hover:underline">Contact Form</a></p>
            <p className="text-muted-foreground">Address: Frederick County, Maryland, USA</p>
          </div>
        </section>
      </div>
    </div>
  )
}


