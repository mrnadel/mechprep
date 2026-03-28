'use client';

import { useState, useMemo } from 'react';
import { ArrowLeft, Mail, MessageCircle, HelpCircle, ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const FAQ_ITEMS = [
  // Account & Auth
  {
    question: 'How do I create an account?',
    answer:
      'Tap "Get Started" on the home page. You can sign up with your Google account or create one with your email and password.',
    tags: 'register signup sign up join',
  },
  {
    question: 'I forgot my password',
    answer:
      'Use the "Forgot password" link on the login page to reset it. If you\'re still having trouble, reach out to support@octokeen.com for help.',
    tags: 'reset password login cant log in',
  },
  {
    question: 'How do I change my password?',
    answer:
      'Go to your Profile page and use the change password option. You\'ll need to enter your current password and then your new one.',
    tags: 'update password security',
  },
  {
    question: 'How do I delete my account?',
    answer:
      'Please contact us at support@octokeen.com and we\'ll process your account deletion request within 48 hours.',
    tags: 'remove account close account gdpr',
  },
  {
    question: 'Can I sign in with Google?',
    answer:
      'Yes! On the login or register page, tap "Continue with Google" to sign in with your Google account.',
    tags: 'google login oauth social',
  },

  // Subscription & Billing
  {
    question: 'How do I cancel my subscription?',
    answer:
      'Go to Settings > Billing to manage or cancel your subscription. You can also contact us at support@octokeen.com and we\'ll take care of it for you.',
    tags: 'unsubscribe stop payment end plan',
  },
  {
    question: 'How do I upgrade to Pro?',
    answer:
      'Visit the Pricing page from the sidebar menu and choose a plan. You can pay monthly or yearly with a discount.',
    tags: 'premium paid plan subscribe buy',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards through our payment processor Paddle. This includes Visa, Mastercard, American Express, and more.',
    tags: 'credit card pay billing method',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'If you\'re not satisfied within the first 7 days of your subscription, contact us at support@octokeen.com and we\'ll issue a full refund.',
    tags: 'money back refund policy return',
  },
  {
    question: 'What\'s included in the free plan?',
    answer:
      'The free plan gives you access to daily practice questions with a daily limit. Upgrade to Pro for unlimited practice, all topics, adaptive learning, and interview prep mode.',
    tags: 'free tier features limits what do i get',
  },

  // Content & Practice
  {
    question: 'What topics are covered?',
    answer:
      'Octokeen covers core mechanical engineering topics including thermodynamics, fluid mechanics, materials science, statics & dynamics, machine design, manufacturing, heat transfer, and more.',
    tags: 'subjects curriculum areas syllabus',
  },
  {
    question: 'I found incorrect content',
    answer:
      'Use the flag button on any question to report it directly. You can also email support@octokeen.com with details about the issue.',
    tags: 'wrong answer error mistake report bug',
  },
  {
    question: 'How does adaptive practice work?',
    answer:
      'Our adaptive system tracks your performance across topics and focuses on your weak areas. The more you practice, the better it understands where you need the most help.',
    tags: 'smart practice personalized algorithm ai',
  },
  {
    question: 'How is this different from just reading a textbook?',
    answer:
      'Octokeen uses active recall and spaced repetition — proven study techniques. Instead of passively reading, you\'re actively solving problems, which leads to much better retention.',
    tags: 'why octokeen better studying learn',
  },
  {
    question: 'Can I practice specific topics?',
    answer:
      'Yes! Go to Practice > Topics to choose a specific area you want to focus on, like thermodynamics or machine design.',
    tags: 'choose topic select category filter',
  },

  // Progress & Streaks
  {
    question: 'How do streaks work?',
    answer:
      'Complete at least one practice session each day to maintain your streak. Streaks reset at midnight in your local timezone. Pro users get streak freezes to protect against missed days.',
    tags: 'streak daily consecutive days missed',
  },
  {
    question: 'Can I reset my progress?',
    answer:
      'Yes, go to your Profile page where you\'ll find the option to reset your progress. This action is permanent and cannot be undone.',
    tags: 'start over clear data fresh restart',
  },
  {
    question: 'What are achievements?',
    answer:
      'Achievements are milestones you earn as you practice — like completing your first session, reaching a streak, or mastering a topic. Check the Achievements page to see all available badges.',
    tags: 'badges awards milestones trophies',
  },

  // Technical
  {
    question: 'I\'m not receiving emails',
    answer:
      'Check your spam or junk folder first. If emails still aren\'t arriving, contact support@octokeen.com and we\'ll look into it.',
    tags: 'no email spam missing inbox',
  },
  {
    question: 'Does Octokeen work on mobile?',
    answer:
      'Yes! Octokeen is fully mobile-optimized. Just open octokeen.com in your phone\'s browser. You can also add it to your home screen for an app-like experience.',
    tags: 'phone app ios android tablet mobile pwa',
  },
  {
    question: 'How do I add Octokeen to my home screen?',
    answer:
      'On iPhone: open octokeen.com in Safari, tap the share icon, then "Add to Home Screen." On Android: open in Chrome, tap the three-dot menu, then "Add to Home Screen."',
    tags: 'install pwa home screen shortcut icon',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Yes. We use encrypted connections (HTTPS), secure authentication, and never share your personal data with third parties. See our Privacy Policy for full details.',
    tags: 'privacy security data protection safe',
  },
];

function fuzzyMatch(text: string, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const target = text.toLowerCase();
  return words.every((word) => target.includes(word));
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left"
    >
      <div className="flex items-center justify-between py-3 min-h-[44px]">
        <span className="text-sm font-medium text-surface-800 pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-surface-400 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </div>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          open ? 'max-h-40 pb-3' : 'max-h-0'
        )}
      >
        <p className="text-sm text-surface-500 leading-relaxed">{answer}</p>
      </div>
    </button>
  );
}

export default function ContactPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) =>
      fuzzyMatch(`${item.question} ${item.answer} ${item.tags}`, search)
    );
  }, [search]);

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Contact & Support</h1>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6 max-w-2xl mx-auto">
        {/* Support Email Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-surface-900">Email Support</h2>
              <p className="text-xs text-surface-500">Our primary support channel</p>
            </div>
          </div>
          <a
            href="mailto:support@octokeen.com"
            className="block w-full py-2.5 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold text-sm transition-colors text-center"
          >
            support@octokeen.com
          </a>
          <div className="flex items-center gap-2 mt-3">
            <MessageCircle className="w-3.5 h-3.5 text-surface-400" />
            <p className="text-xs text-surface-500">
              We typically respond within 24 hours
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-surface-900">Common Questions</h2>
              <p className="text-xs text-surface-500">Quick answers to frequent topics</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-base text-surface-800 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="divide-y divide-gray-100">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-surface-500">No matching questions found.</p>
                <a
                  href="mailto:support@octokeen.com"
                  className="text-sm text-primary-600 font-medium hover:underline mt-1 inline-block"
                >
                  Email us your question instead
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
