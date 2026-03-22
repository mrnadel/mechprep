'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const LAST_UPDATED = 'March 2025';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <>
        <p>
          By accessing or using MechReady (&quot;the Service&quot;), operated by MechReady
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of
          Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access
          or use the Service.
        </p>
        <p>
          These Terms apply to all visitors, registered users, and subscribers of the
          Service. By creating an account, you confirm that you are at least 18 years old
          or have obtained parental or guardian consent to use the Service.
        </p>
      </>
    ),
  },
  {
    id: 'account',
    title: '2. Account Registration and Responsibilities',
    content: (
      <>
        <p>
          To access certain features, you must create an account by providing accurate,
          current, and complete information. You are responsible for maintaining the
          confidentiality of your login credentials and for all activity that occurs under
          your account.
        </p>
        <p>You agree to:</p>
        <ul>
          <li>Provide truthful and accurate registration information.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
          <li>Not share your account credentials with others or allow others to access your account.</li>
          <li>Not create multiple accounts to circumvent usage limits or restrictions.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms
          or that we reasonably believe are being used fraudulently.
        </p>
      </>
    ),
  },
  {
    id: 'subscriptions',
    title: '3. Subscriptions and Billing',
    content: (
      <>
        <p>
          MechReady offers the following subscription tiers:
        </p>
        <ul>
          <li>
            <strong>Free:</strong> Access to Unit 1 with up to 5 practice questions per
            day. No payment required.
          </li>
          <li>
            <strong>Pro ($9/month or $79/year):</strong> Unlimited access to all units,
            unlimited daily practice, detailed explanations, full analytics, streak
            freezes, interview readiness scoring, and all practice modes.
          </li>
        </ul>
        <p>
          All payments are processed securely through Paddle, our Merchant of Record.
          By subscribing, you agree to Paddle&apos;s terms and conditions in addition to
          these Terms. Paddle handles all payment processing, invoicing, sales tax, and
          VAT on our behalf.
        </p>
        <p>
          <strong>Auto-Renewal:</strong> Paid subscriptions automatically renew at the
          end of each billing cycle (monthly or annually) at the then-current price unless
          you cancel before the renewal date. You will be charged through your selected
          payment method on file.
        </p>
        <p>
          <strong>Cancellation:</strong> You may cancel your subscription at any time
          through your account settings or by contacting support. Upon cancellation, you
          will retain access to paid features until the end of your current billing
          period. No partial refunds are provided for unused time within a billing cycle.
        </p>
        <p>
          <strong>Price Changes:</strong> We reserve the right to change subscription
          prices. Existing subscribers will be notified at least 30 days before any price
          increase takes effect. Continued use after the effective date constitutes
          acceptance of the new pricing.
        </p>
      </>
    ),
  },
  {
    id: 'free-vs-paid',
    title: '4. Free vs. Paid Features',
    content: (
      <>
        <p>
          The Free tier provides limited access to the Service and is intended to allow
          users to evaluate MechReady before subscribing. Free-tier users have access to
          Unit 1 content and are limited to 5 practice questions per day.
        </p>
        <p>
          Additional features, content, and units require a paid subscription. We reserve
          the right to modify the scope of features included in any tier, including the
          Free tier, at any time. We will provide reasonable notice of material changes to
          paid-tier features.
        </p>
      </>
    ),
  },
  {
    id: 'ip',
    title: '5. Intellectual Property',
    content: (
      <>
        <p>
          All content on MechReady, including but not limited to questions, explanations,
          illustrations, course materials, software, design, logos, and trademarks, is the
          exclusive property of MechReady or its licensors and is protected by copyright,
          trademark, and other intellectual property laws.
        </p>
        <p>You may not:</p>
        <ul>
          <li>Copy, reproduce, distribute, or publicly display any MechReady content without our prior written consent.</li>
          <li>Use our content to train machine learning models or AI systems.</li>
          <li>Scrape, crawl, or use automated tools to extract content from the Service.</li>
          <li>Create derivative works based on our content.</li>
          <li>Remove or alter any copyright, trademark, or proprietary notices.</li>
        </ul>
        <p>
          Your subscription grants you a limited, non-exclusive, non-transferable,
          revocable license to access and use the content for personal, non-commercial
          educational purposes only.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: '6. Acceptable Use Policy',
    content: (
      <>
        <p>You agree to use MechReady only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful or fraudulent purpose.</li>
          <li>Attempt to gain unauthorized access to any part of the Service, other users&apos; accounts, or our systems.</li>
          <li>Interfere with or disrupt the integrity, security, or performance of the Service.</li>
          <li>Upload or transmit malicious code, viruses, or other harmful material.</li>
          <li>Harass, abuse, or harm other users.</li>
          <li>Use the Service to compete with MechReady or to develop a competing product.</li>
          <li>Share, resell, or redistribute your account access or subscription benefits.</li>
          <li>Use automated bots, scripts, or tools to interact with the Service unless expressly authorized.</li>
        </ul>
        <p>
          User-generated content on MechReady is limited to profile information and
          content feedback (such as reporting issues). You are responsible for ensuring
          that any information you provide does not violate these Terms or applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'gems',
    title: '7. Virtual Currency (Gems)',
    content: (
      <>
        <p>
          MechReady may award virtual currency (&quot;Gems&quot;) to users for completing
          activities, achieving milestones, or other engagement within the Service. Gems
          are a feature of the platform and are subject to the following terms:
        </p>
        <ul>
          <li>Gems have no real-world monetary value and cannot be exchanged for cash, credit, or any form of real currency.</li>
          <li>Gems are non-transferable between accounts.</li>
          <li>Gems may only be used within the Service for designated in-app features, such as purchasing streak freezes or other virtual items.</li>
          <li>We reserve the right to modify, reset, expire, or discontinue the Gems system at any time without prior notice or compensation.</li>
          <li>Accumulation of Gems does not constitute property or a stored-value account.</li>
        </ul>
        <p>
          Any attempt to sell, trade, or transfer Gems outside the Service is a violation
          of these Terms and may result in account termination.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: '8. Disclaimer',
    content: (
      <>
        <p>
          <strong>
            MechReady is an educational platform designed to help users prepare for
            mechanical engineering interviews. The content provided is for educational and
            informational purposes only.
          </strong>
        </p>
        <p>
          MechReady does not provide professional engineering advice, certification, or
          licensure preparation. The content should not be relied upon as a substitute
          for professional engineering judgment, consultation, or services.
        </p>
        <p>
          We make no representations or warranties that use of the Service will result in
          employment, successful interview outcomes, or professional advancement. Results
          depend on individual effort, preparation, and factors outside our control.
        </p>
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without
          warranties of any kind, either express or implied, including but not limited to
          implied warranties of merchantability, fitness for a particular purpose,
          accuracy, and non-infringement.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, MechReady and its officers,
          directors, employees, agents, and affiliates shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, including but
          not limited to loss of profits, data, use, or goodwill, arising out of or
          related to your access to or use of (or inability to use) the Service.
        </p>
        <p>
          In no event shall our total aggregate liability to you for all claims arising
          out of or related to the Service exceed the greater of (a) the amount you paid
          to MechReady in the twelve (12) months preceding the event giving rise to
          liability, or (b) one hundred US dollars ($100).
        </p>
        <p>
          Some jurisdictions do not allow the exclusion or limitation of certain
          warranties or liabilities, so some of the above limitations may not apply to
          you. In such cases, our liability will be limited to the fullest extent
          permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: '10. Termination',
    content: (
      <>
        <p>
          We may suspend or terminate your account and access to the Service at our sole
          discretion, with or without notice, for conduct that we believe violates these
          Terms, is harmful to other users or the Service, or for any other reason.
        </p>
        <p>
          Upon termination:
        </p>
        <ul>
          <li>Your right to access and use the Service will immediately cease.</li>
          <li>Any outstanding subscription will not be refunded unless required by law.</li>
          <li>Your accumulated Gems and progress data may be permanently deleted.</li>
          <li>Provisions of these Terms that by their nature should survive termination will remain in effect, including intellectual property rights, disclaimers, and limitations of liability.</li>
        </ul>
        <p>
          You may terminate your account at any time by contacting support or using the
          account deletion feature in your settings. Deletion of your account is
          permanent and cannot be reversed.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '11. Changes to Terms',
    content: (
      <>
        <p>
          We reserve the right to update or modify these Terms at any time. When we make
          material changes, we will update the &quot;Last updated&quot; date at the top of
          this page and, where appropriate, notify you via email or through a notice
          within the Service.
        </p>
        <p>
          Your continued use of the Service after the effective date of any changes
          constitutes your acceptance of the revised Terms. If you do not agree to the
          updated Terms, you must stop using the Service and may cancel your subscription.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '12. Governing Law',
    content: (
      <>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of
          the State of Delaware, United States, without regard to its conflict of law
          provisions.
        </p>
        <p>
          Any disputes arising out of or related to these Terms or the Service shall be
          resolved exclusively in the state or federal courts located in the State of
          Delaware. You consent to the personal jurisdiction and venue of such courts.
        </p>
        <p>
          Notwithstanding the foregoing, nothing in these Terms shall prevent either party
          from seeking injunctive or equitable relief in any court of competent
          jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '13. Contact',
    content: (
      <>
        <p>
          If you have any questions, concerns, or feedback regarding these Terms of
          Service, please contact us:
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:support@mechready.com"
            className="text-primary-600 hover:text-primary-700 underline underline-offset-2"
          >
            support@mechready.com
          </a>
        </p>
        <p>
          We aim to respond to all inquiries within 2 business days.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="pb-12">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Terms of Service</h1>
        </div>
      </div>

      <div className="px-4 pt-8 max-w-2xl mx-auto">
        {/* Title Block */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h2>
          <p className="text-gray-500 text-sm">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            Welcome to MechReady. These Terms of Service govern your access to and use
            of the MechReady platform, including our website, applications, and all
            related services. Please read these Terms carefully before using the Service.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Table of Contents</h3>
          <nav>
            <ol className="space-y-1.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-primary-600 hover:text-primary-700 hover:underline underline-offset-2 transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 scroll-mt-20"
            >
              <h3 className="text-base font-bold text-gray-900 mb-3">
                {section.title}
              </h3>
              <div className="text-sm text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-gray-800">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} MechReady. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
