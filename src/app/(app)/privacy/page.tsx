import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      {
        subtitle: 'Account Information',
        text: 'When you create an account, we collect your name, email address, and password. Passwords are securely hashed using bcrypt and are never stored in plain text. If you sign in with Google OAuth, we receive your name, email address, and profile picture from Google — we do not receive or store your Google password.',
      },
      {
        subtitle: 'Learning Data',
        text: 'As you use MechReady, we collect data about your learning progress, including questions answered, scores, streaks, achievements unlocked, skill levels, and session activity. This data is essential to providing personalized practice and tracking your interview readiness.',
      },
      {
        subtitle: 'Payment Information',
        text: 'Payment processing is handled entirely by Paddle, our Merchant of Record. We do not collect, store, or have access to your credit card numbers or bank account details. Paddle may collect billing information such as your name, email, country, and payment method details in accordance with their own privacy policy.',
      },
      {
        subtitle: 'Technical Data',
        text: 'Our hosting provider (Vercel) automatically collects standard server logs, which may include your IP address, browser type, operating system, and referring URLs. We do not use any third-party analytics services, tracking pixels, or advertising cookies.',
      },
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      {
        text: 'We use the information we collect for the following purposes:',
      },
      {
        text: '• To create and manage your account and authenticate your sessions using secure JWT tokens via NextAuth.',
      },
      {
        text: '• To provide personalized learning experiences, including adaptive question selection, progress tracking, streak calculation, and achievement awards.',
      },
      {
        text: '• To process subscription payments through Paddle and manage your billing status.',
      },
      {
        text: '• To send transactional emails related to your account (e.g., password resets, subscription confirmations). We do not send marketing emails unless you explicitly opt in.',
      },
      {
        text: '• To improve the platform by analyzing aggregate, anonymized usage patterns.',
      },
    ],
  },
  {
    title: '3. Data Storage and Security',
    content: [
      {
        text: 'Your data is stored in a PostgreSQL database hosted by Supabase, which provides enterprise-grade security including encryption at rest and in transit, regular backups, and role-based access controls.',
      },
      {
        text: 'The application is deployed on Vercel\'s edge network with HTTPS enforced on all connections. Authentication sessions are managed through secure, httpOnly JWT tokens that are not accessible to client-side scripts.',
      },
      {
        text: 'We implement industry-standard security measures to protect your data, but no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.',
      },
    ],
  },
  {
    title: '4. Third-Party Services',
    content: [
      {
        text: 'We share data with the following third-party services, only to the extent necessary to operate MechReady:',
      },
      {
        subtitle: 'Paddle (paddle.com)',
        text: 'Paddle acts as our Merchant of Record and handles all payment processing, invoicing, sales tax, and subscription management. Paddle processes your payment details under their own privacy policy. We receive only your subscription status, plan type, and transaction identifiers from Paddle.',
      },
      {
        subtitle: 'Google (accounts.google.com)',
        text: 'If you choose to sign in with Google, we use Google OAuth 2.0 to authenticate your identity. We receive your name, email, and profile picture. We do not access any other Google account data.',
      },
      {
        subtitle: 'Supabase (supabase.com)',
        text: 'Supabase provides our database infrastructure. All user data is stored in Supabase-hosted PostgreSQL databases with encryption at rest enabled.',
      },
      {
        subtitle: 'Vercel (vercel.com)',
        text: 'Vercel hosts the MechReady application and may process standard HTTP request logs, including IP addresses, as part of normal infrastructure operations.',
      },
    ],
  },
  {
    title: '5. Cookies and Tracking',
    content: [
      {
        text: 'MechReady uses only essential cookies required for authentication and session management. We do not use advertising cookies, tracking pixels, or any third-party analytics tools such as Google Analytics.',
      },
      {
        text: 'The session cookie is a secure, httpOnly cookie that stores your encrypted authentication token. It is strictly necessary for the application to function and does not track you across other websites.',
      },
    ],
  },
  {
    title: '6. Data Retention',
    content: [
      {
        text: 'We retain your account data and learning progress for as long as your account is active. This allows you to return to MechReady at any time and continue where you left off.',
      },
      {
        text: 'If you delete your account, we will permanently delete all of your personal data, including your profile information, learning progress, streaks, and achievements, within 30 days. Some anonymized, aggregate data (such as overall question difficulty statistics) may be retained indefinitely as it cannot be linked back to you.',
      },
      {
        text: 'Payment records handled by Paddle may be retained by Paddle in accordance with their own data retention policy and applicable tax and accounting regulations.',
      },
    ],
  },
  {
    title: '7. Your Rights',
    content: [
      {
        text: 'You have the following rights regarding your personal data:',
      },
      {
        subtitle: 'Right to Access',
        text: 'You can view all personal data we hold about you directly in your profile and progress pages. You may also request a complete export of your data by contacting us.',
      },
      {
        subtitle: 'Right to Correction',
        text: 'You can update your name and profile information at any time from your profile page.',
      },
      {
        subtitle: 'Right to Deletion',
        text: 'You can delete your account and all associated data from your profile settings. Upon deletion, all personal data is permanently removed within 30 days.',
      },
      {
        subtitle: 'Right to Data Portability',
        text: 'You may request an export of your data in a machine-readable format (JSON) by contacting us at the email below.',
      },
      {
        subtitle: 'Right to Object',
        text: 'You may object to any processing of your data that is not strictly necessary for providing the service. Contact us to exercise this right.',
      },
    ],
  },
  {
    title: '8. GDPR Compliance',
    content: [
      {
        text: 'If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, you are entitled to additional rights under the General Data Protection Regulation (GDPR) and equivalent legislation.',
      },
      {
        text: 'Our lawful bases for processing your data are: (a) contractual necessity — to provide the MechReady service you signed up for; (b) legitimate interest — to maintain platform security and improve the service; and (c) consent — for optional features such as marketing communications, which you may withdraw at any time.',
      },
      {
        text: 'Data may be transferred outside the EEA to the United States, where our infrastructure providers (Vercel, Supabase) operate. These transfers are protected by Standard Contractual Clauses and the providers\' compliance with applicable data protection frameworks.',
      },
      {
        text: 'If you believe we have not adequately addressed your data protection concerns, you have the right to lodge a complaint with your local data protection supervisory authority.',
      },
    ],
  },
  {
    title: '9. Children\'s Privacy',
    content: [
      {
        text: 'MechReady is not intended for use by individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that a child under 16 has provided us with personal data, we will take steps to delete that information promptly.',
      },
    ],
  },
  {
    title: '10. Changes to This Policy',
    content: [
      {
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. If we make material changes, we will notify you by email or by posting a prominent notice within the application at least 14 days before the changes take effect.',
      },
      {
        text: 'Your continued use of MechReady after the effective date of any changes constitutes your acceptance of the updated policy.',
      },
    ],
  },
  {
    title: '11. Contact Us',
    content: [
      {
        text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:',
      },
      {
        text: 'Email: support@mechready.com',
      },
      {
        text: 'We aim to respond to all data-related inquiries within 30 days.',
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center h-14 px-4 max-w-4xl mx-auto">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-extrabold text-gray-900 ml-2">Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Intro card */}
        <div className="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-surface-900">MechReady Privacy Policy</h2>
              <p className="text-sm text-surface-500">Last updated: March 2025</p>
            </div>
          </div>
          <p className="text-surface-600 leading-relaxed">
            At MechReady, we take your privacy seriously. This Privacy Policy explains what
            personal data we collect, how we use it, who we share it with, and what rights you
            have. By using MechReady, you agree to the collection and use of your information as
            described in this policy.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-surface-900 mb-4">{section.title}</h3>
            <div className="space-y-3">
              {section.content.map((item, idx) => (
                <div key={idx}>
                  {item.subtitle && (
                    <h4 className="font-semibold text-surface-800 mb-1">{item.subtitle}</h4>
                  )}
                  <p className="text-surface-600 leading-relaxed text-[15px]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-sm text-surface-400">
            If you have questions about this policy, contact us at{' '}
            <a
              href="mailto:support@mechready.com"
              className="text-blue-600 hover:underline"
            >
              support@mechready.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
