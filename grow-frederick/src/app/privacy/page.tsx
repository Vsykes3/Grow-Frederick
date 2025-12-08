import { Shield, Lock, Eye, FileText } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | GrowCommon',
  description: 'GrowCommon Privacy Policy - Learn how we protect your personal information and gardening data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            1. Introduction
          </h2>
          <p className="text-muted-foreground mb-4">
            Welcome to GrowCommon ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our gardening application and services.
          </p>
          <p className="text-muted-foreground">
            By using GrowCommon, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-6 w-6" />
            2. Information We Collect
          </h2>
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1 Personal Information</h3>
          <p className="text-muted-foreground mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Name and email address when you create an account</li>
            <li>ZIP code and location data for personalized gardening recommendations</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Garden data, including plants you add to your garden and calendar events</li>
            <li>Communication preferences and settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.2 Automatically Collected Information</h3>
          <p className="text-muted-foreground mb-4">
            We automatically collect certain information when you use our services:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Device information (browser type, operating system)</li>
            <li>Usage data (pages visited, features used, time spent)</li>
            <li>IP address and approximate location</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="h-6 w-6" />
            3. How We Use Your Information
          </h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Personalize your gardening experience with location-based recommendations</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send you weather alerts, planting reminders, and gardening tips</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
          <p className="text-muted-foreground mb-4">
            We do not sell your personal information. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Service Providers:</strong> With trusted third-party services (e.g., Stripe for payments, Resend for emails)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
          <p className="text-muted-foreground mb-4">
            We implement appropriate technical and organizational measures to protect your personal information, 
            including encryption, secure servers, and regular security assessments. However, no method of transmission 
            over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights and Choices</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Access and review your personal information</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your garden data</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
          <p className="text-muted-foreground">
            To exercise these rights, please contact us at <a href="/contact" className="text-primary hover:underline">our contact page</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Children's Privacy</h2>
          <p className="text-muted-foreground mb-4">
            GrowCommon is not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children under 13. If you believe we have collected information from a child under 13, 
            please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Changes to This Policy</h2>
          <p className="text-muted-foreground mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by 
            posting the new policy on this page and updating the "Last updated" date. Your continued use of 
            GrowCommon after such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about this Privacy Policy or our data practices, please contact us:
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






