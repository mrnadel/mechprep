'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Sparkles,
  ChevronDown,
  Loader2,
  Infinity as InfinityIcon,
  BookOpen,
  BarChart3,
  Shield,
  BrainCircuit,
  GraduationCap,
  Lock,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PADDLE_PRICES, formatPrice, getYearlySavingsPercent, TIERS } from '@/lib/pricing';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';
import { getPaddle } from '@/lib/paddle-client';
import Link from 'next/link';

const PRO_FEATURES = [
  {
    icon: InfinityIcon,
    label: 'Unlimited daily practice',
    sublabel: 'No more 5-question cap',
  },
  {
    icon: BookOpen,
    label: 'All 10 course units',
    sublabel: 'Thermo, fluids, materials & more',
  },
  {
    icon: BrainCircuit,
    label: 'Adaptive learning',
    sublabel: 'Focuses on your weak areas',
  },
  {
    icon: GraduationCap,
    label: 'Interview readiness score',
    sublabel: 'Know when you\'re prepared',
  },
  {
    icon: BarChart3,
    label: 'Full analytics dashboard',
    sublabel: 'Track your progress in detail',
  },
  {
    icon: Shield,
    label: 'Weekly streak freeze',
    sublabel: 'Protect your streak on busy days',
  },
];

const FREE_LIMITS = [
  '5 questions per day',
  'Unit 1 only',
  'Basic practice modes only',
  'No streak protection',
  'Limited analytics',
];

const FAQ_ITEMS = [
  {
    q: 'What do I get for free?',
    a: 'Full access to Unit 1 with up to 5 practice questions per day using Topic Deep Dive, Daily Challenge, and Real-World Systems modes. Basic progress stats included. Upgrade to Pro for adaptive learning, interview simulation, full analytics, and more.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes! Cancel your Pro subscription at any time from Settings > Billing. You keep access until the end of your current billing period.',
  },
  {
    q: 'What happens to my progress if I upgrade?',
    a: 'Your progress is always saved. When you upgrade to Pro, you keep everything you\'ve earned and unlock all additional units and features instantly.',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('year');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { isProUser } = useSubscription();
  const { data: session } = useSession();

  const yearlySavings = getYearlySavingsPercent('pro');
  const monthlyPrice = TIERS.pro.priceMonthly;
  const yearlyPrice = TIERS.pro.priceYearly;
  const effectiveMonthly = billingInterval === 'year'
    ? Math.round(yearlyPrice / 12)
    : monthlyPrice;

  const handleCheckout = async () => {
    if (!session?.user?.id) {
      router.push('/login?callbackUrl=/pricing');
      return;
    }
    const priceId = billingInterval === 'year'
      ? PADDLE_PRICES.PRO_YEARLY
      : PADDLE_PRICES.PRO_MONTHLY;

    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/paddle/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error('Checkout API error:', err);
        return;
      }
      const { transactionId } = await res.json();

      const paddle = await getPaddle();
      if (!paddle) return;
      paddle.Checkout.open({
        transactionId,
        settings: {
          successUrl: `${window.location.origin}/checkout/success`,
        },
      });
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Upgrade to Pro</h1>
        </div>
      </div>

      <div className="px-4 pt-6 max-w-lg mx-auto">

        {/* Hero glow card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-400" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-700/40 to-transparent" />

          <div className="relative px-6 pt-8 pb-6 text-center">
            {/* Floating sparkle icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 border border-white/30"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
              Unlock your full potential
            </h2>
            <p className="text-primary-100 text-sm leading-relaxed max-w-xs mx-auto">
              Unlimited practice, all topics, and smart tools to ace your mechanical engineering interviews.
            </p>

            {/* Price display */}
            <div className="mt-6 mb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {formatPrice(effectiveMonthly)}
                </span>
                <span className="text-primary-200 text-base font-medium">/mo</span>
              </div>
              {billingInterval === 'year' && (
                <motion.p
                  className="text-primary-200 text-xs mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formatPrice(yearlyPrice)}/year &middot; billed annually
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            onClick={() => setBillingInterval('month')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              billingInterval === 'month'
                ? 'bg-surface-900 text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all relative',
              billingInterval === 'year'
                ? 'bg-surface-900 text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            Yearly
            {yearlySavings > 0 && (
              <span className="absolute -top-2.5 -right-2 bg-accent-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                -{yearlySavings}%
              </span>
            )}
          </button>
        </motion.div>

        {/* What you get */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-4 px-1">
            Everything in Pro
          </h3>
          <div className="space-y-3">
            {PRO_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-3.5 bg-white rounded-2xl border border-gray-100 p-3.5 shadow-sm"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-surface-900">{feature.label}</p>
                  <p className="text-xs text-surface-400">{feature.sublabel}</p>
                </div>
                <Check className="w-5 h-5 text-accent-500 shrink-0 ml-auto" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Free limits reminder */}
        <motion.div
          className="mb-8 bg-surface-50 rounded-2xl border border-dashed border-surface-200 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <p className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-3">
            Free plan limits
          </p>
          <div className="space-y-2">
            {FREE_LIMITS.map((limit) => (
              <div key={limit} className="flex items-center gap-2.5">
                <Lock className="w-3.5 h-3.5 text-surface-300" />
                <span className="text-sm text-surface-500">{limit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {isProUser ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-accent-500/10 text-accent-600 font-bold text-sm">
                <Check className="w-5 h-5" />
                You&apos;re already on Pro
              </div>
              <Link
                href="/settings/billing"
                className="block text-sm text-surface-400 hover:text-primary-600 mt-3 transition-colors"
              >
                Manage billing →
              </Link>
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-bold text-base transition-all shadow-lg shadow-primary-200 disabled:opacity-50 flex items-center justify-center gap-2.5"
            >
              {checkoutLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {session ? 'Upgrade to Pro' : 'Sign in to upgrade'}
            </button>
          )}
          <p className="text-center text-xs text-surface-400 mt-3">
            Cancel anytime &middot; Secure payment via Paddle
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-4 px-1">
            Questions
          </h3>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                >
                  <span className="text-sm font-medium text-surface-800 pr-3">{item.q}</span>
                  <ChevronDown className={cn(
                    'w-4 h-4 text-surface-300 shrink-0 transition-transform duration-200',
                    openFaq === i && 'rotate-180'
                  )} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-surface-500 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
