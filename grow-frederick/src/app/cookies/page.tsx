import { Cookie, Settings, Shield, Info } from 'lucide-react'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Cookie Policy | GrowCommon',
  description: 'GrowCommon Cookie Policy - Learn about how we use cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Cookie className="h-6 w-6" />
            1. What Are Cookies?
          </h2>
          <p className="text-muted-foreground mb-4">
            Cookies are small text files that are placed on your device when you visit a website. They are widely 
            used to make websites work more efficiently and provide information to website owners. Cookies allow a 
            website to recognize your device and store some information about your preferences or past actions.
          </p>
          <p className="text-muted-foreground">
            GrowCommon uses cookies and similar tracking technologies to enhance your experience, analyze usage, 
            and provide personalized content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6" />
            2. Types of Cookies We Use
          </h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1 Essential Cookies</h3>
          <p className="text-muted-foreground mb-4">
            These cookies are necessary for the Service to function properly. They enable core functionality such 
            as security, network management, and accessibility. You cannot opt-out of these cookies.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Authentication:</strong> Remember your login status and session information</li>
            <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
            <li><strong>Preferences:</strong> Store your theme, language, and other settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.2 Functional Cookies</h3>
          <p className="text-muted-foreground mb-4">
            These cookies enhance functionality and personalization. They remember your choices and preferences 
            to provide a more personalized experience.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>User Preferences:</strong> Theme settings, language selection, notification preferences</li>
            <li><strong>Garden Data:</strong> Your saved plants, calendar events, and garden information</li>
            <li><strong>Location:</strong> Your ZIP code and location preferences for personalized recommendations</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.3 Analytics Cookies</h3>
          <p className="text-muted-foreground mb-4">
            These cookies help us understand how visitors interact with our Service by collecting and reporting 
            information anonymously. This helps us improve our Service and user experience.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Usage Analytics:</strong> Page views, feature usage, and user flow</li>
            <li><strong>Performance:</strong> Load times, error rates, and technical performance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            3. Third-Party Cookies
          </h2>
          <p className="text-muted-foreground mb-4">
            We may use third-party services that set their own cookies. These include:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Stripe:</strong> Payment processing and subscription management</li>
            <li><strong>Google Analytics:</strong> Website analytics and usage statistics</li>
            <li><strong>NextAuth:</strong> Authentication and session management</li>
            <li><strong>OpenWeather API:</strong> Weather data and forecasts</li>
          </ul>
          <p className="text-muted-foreground">
            These third parties may use cookies to collect information about your online activities across different 
            websites. We do not control these third-party cookies, and you should review their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. How Long Do Cookies Last?</h2>
          <p className="text-muted-foreground mb-4">
            Cookies can be either "session" or "persistent" cookies:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
          </ul>
          <p className="text-muted-foreground">
            Most cookies we use are persistent and remain on your device for up to 12 months, unless you delete 
            them or they expire.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Info className="h-6 w-6" />
            5. Managing Cookies
          </h2>
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1 Browser Settings</h3>
          <p className="text-muted-foreground mb-4">
            Most web browsers allow you to control cookies through their settings. You can:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li>Block all cookies</li>
            <li>Block third-party cookies only</li>
            <li>Delete existing cookies</li>
            <li>Set your browser to notify you when cookies are set</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            Please note that blocking or deleting cookies may impact your ability to use certain features of 
            GrowCommon. Essential cookies are required for the Service to function properly.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.2 Cookie Consent</h3>
          <p className="text-muted-foreground mb-4">
            When you first visit GrowCommon, you may see a cookie consent banner. You can accept all cookies, 
            decline non-essential cookies, or customize your preferences. You can change your cookie preferences 
            at any time through your browser settings or by contacting us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Local Storage and Similar Technologies</h2>
          <p className="text-muted-foreground mb-4">
            In addition to cookies, we use other storage technologies such as:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
            <li><strong>Local Storage:</strong> Stores your preferences and garden data locally on your device</li>
            <li><strong>Session Storage:</strong> Temporary storage for your current session</li>
            <li><strong>IndexedDB:</strong> Client-side database for storing larger amounts of data</li>
          </ul>
          <p className="text-muted-foreground">
            These technologies work similarly to cookies and can be managed through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Updates to This Policy</h2>
          <p className="text-muted-foreground mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
            updated policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
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













