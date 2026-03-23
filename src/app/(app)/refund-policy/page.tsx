import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'MechReady 14-day money-back guarantee. Learn about our refund process for Pro subscriptions.',
  alternates: { canonical: '/refund-policy' },
};

const LAST_UPDATED = 'March 2025';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'overview',
    title: '1. Overview',
    content: (
      <>
        <p>
          MechReady is operated by Yanay Nadel (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). We offer paid subscription plans through our Merchant of Record,
          Paddle. This Refund Policy explains when and how you may request a refund for your
          MechReady Pro subscription.
        </p>
      </>
    ),
  },
  {
    id: 'refund-guarantee',
    title: '2. 14-Day Money-Back Guarantee',
    content: (
      <>
        <p>
          We offer a <strong>14-day money-back guarantee</strong> on all Pro subscriptions. If
          you are not satisfied with MechReady Pro for any reason, you may request a full
          refund within 14 days of your purchase date. No questions asked.
        </p>
      </>
    ),
  },
  {
    id: 'renewals',
    title: '3. Subscription Renewals',
    content: (
      <>
        <p>
          Subscriptions renew automatically at the end of each billing period (monthly or
          annually). You may cancel your subscription at any time before the next renewal date
          to avoid being charged.
        </p>
        <p>
          If you are charged for a renewal, you may request a full refund within 14 days of
          the renewal charge.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-request',
    title: '4. How to Request a Refund',
    content: (
      <>
        <p>
          To request a refund, contact us at:
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
        <p>Please include the following in your request:</p>
        <ul>
          <li>Your account email address.</li>
          <li>The date of purchase.</li>
        </ul>
        <p>
          We aim to process all refund requests within 2 business days.
        </p>
      </>
    ),
  },
  {
    id: 'processing',
    title: '5. Refund Processing',
    content: (
      <>
        <p>
          Refunds are processed through Paddle, our Merchant of Record. The refund will be
          credited to the original payment method used for the purchase.
        </p>
        <p>
          Please allow up to <strong>5-10 business days</strong> for the refund to appear on
          your statement, depending on your bank or payment provider.
        </p>
        <p>
          Upon receiving a refund, your Pro subscription will be downgraded to the Free plan.
        </p>
      </>
    ),
  },
  {
    id: 'cancellation',
    title: '6. Cancellation vs. Refund',
    content: (
      <>
        <p>
          Cancelling your subscription and requesting a refund are different actions:
        </p>
        <ul>
          <li>
            <strong>Cancellation:</strong> Stops future billing. You keep Pro access until the
            end of your current billing period.
          </li>
          <li>
            <strong>Refund:</strong> Returns the payment and downgrades your account to the
            Free plan.
          </li>
        </ul>
        <p>
          You can cancel your subscription at any time from{' '}
          <Link
            href="/settings/billing"
            className="text-primary-600 hover:text-primary-700 underline underline-offset-2"
          >
            Settings &gt; Billing
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '7. Changes to This Policy',
    content: (
      <>
        <p>
          We may update this Refund Policy from time to time. When we make changes, we will
          update the &quot;Last updated&quot; date at the top of this page.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '8. Contact Us',
    content: (
      <>
        <p>
          If you have any questions about this Refund Policy, please contact us:
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

export default function RefundPolicyPage() {
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
          <h1 className="text-lg font-bold text-gray-900 ml-2">Refund Policy</h1>
        </div>
      </div>

      <div className="px-4 pt-8 max-w-2xl mx-auto">
        {/* Title Block */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Refund Policy
          </h2>
          <p className="text-gray-500 text-sm">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            We want you to be completely satisfied with MechReady. If you are not happy with
            your purchase, you can request a full refund within 14 days. No questions asked.
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
