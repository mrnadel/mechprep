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
import { analytics } from '@/lib/mixpanel';
import Link from 'next/link';

const PRO_FEATURES = [
  {
    icon: InfinityIcon,
    label: 'Unlimited hearts',
    sublabel: 'Never wait to keep practicing',
  },
  {
    icon: Shield,
    label: 'Weekly streak freeze',
    sublabel: 'Protect your streak on busy days',
  },
  {
    icon: BarChart3,
    label: 'Full analytics dashboard',
    sublabel: 'Track your progress in detail',
  },
  {
    icon: Zap,
    label: '2x XP on weekends',
    sublabel: 'Level up faster on Sat & Sun',
  },
  {
    icon: BookOpen,
    label: 'Detailed explanations',
    sublabel: 'Deep-dive breakdowns for every question',
  },
  {
    icon: GraduationCap,
    label: 'Premium league rewards',
    sublabel: 'Earn bonus gems from league promotions',
  },
];

const FREE_INCLUDES = [
  'All 10 course units',
  'All practice modes',
  'XP, streaks & leagues',
  'Friends & leaderboards',
  'Shop & achievements',
];

const FREE_LIMITS = [
  '5 hearts (recharge over time)',
  'No streak protection',
  'Basic analytics only',
];

const FAQ_ITEMS = [
  {
    q: 'What do I get for free?',
    a: 'Everything! All 10 units, all practice modes, all engagement features. Free users get 5 hearts — each wrong answer costs one, and they recharge over time. Pro gives you unlimited hearts plus premium perks.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes! Cancel your Pro subscription at any time from Settings > Billing. You keep access until the end of your current billing period.',
  },
  {
    q: 'What happens to my progress if I upgrade?',
    a: 'Your progress is always saved. When you upgrade to Pro, you keep everything you\'ve earned and get unlimited hearts instantly.',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('year');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
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
    setCheckoutError('');
    analytics.subscription({
      action: 'checkout_initiated',
      plan: 'pro',
      interval: billingInterval,
      source: 'pricing_page',
    });
    try {
      const res = await fetch('/api/paddle/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Checkout API error:', err);
        setCheckoutError('Something went wrong. Please try again.');
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
      setCheckoutError('Something went wrong. Please try again.');
      analytics.error({ action: 'checkout', message: 'Checkout failed', source: 'pricing_page' });
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6B3FA0] to-[#4A2D7A] overflow-hidden relative">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              left: `${5 + i * 10}%`,
              top: `${10 + (i % 5) * 18}%`,
              background: ['rgba(255,200,0,.3)', 'rgba(255,255,255,.2)', 'rgba(132,216,255,.25)', 'rgba(255,170,222,.25)'][i % 4],
              animation: `pricing-sparkle ${2 + (i % 4) * 0.5}s ${i * 0.3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <div className="sticky top-0 z-30 px-4 pt-3 pb-2">
        <button
          onClick={() => router.back()}
          className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
      </div>

      <div className="relative z-10 px-5 max-w-lg mx-auto pb-12">

        {/* Mascot + hero */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mascot with glow */}
          <div className="relative inline-block mb-2">
            <div
              className="absolute -inset-5 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,200,0,.2) 0%, transparent 70%)',
                animation: 'pricing-glow 2.5s ease-in-out infinite',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mascot/upgrade-pro.png"
              alt=""
              width={140}
              height={140}
              className="relative z-[1] drop-shadow-[0_8px_24px_rgba(0,0,0,.3)]"
            />
          </div>

          {/* Pro badge */}
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-[11px] font-extrabold text-yellow-200 uppercase tracking-widest">
              ★ Pro
            </div>
          </div>

          <h1 className="text-[28px] font-black text-white tracking-tight mb-1">MechReady Pro</h1>
          <p className="text-sm text-white/50">Unlock your full potential</p>
        </motion.div>

        {/* Price + billing toggle */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-5xl font-black text-white tracking-tight">
              {formatPrice(effectiveMonthly)}
            </span>
            <span className="text-white/50 text-base font-medium">/mo</span>
          </div>
          {billingInterval === 'year' && (
            <motion.p
              className="text-white/40 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formatPrice(yearlyPrice)}/year, billed annually
            </motion.p>
          )}

          {/* Toggle */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setBillingInterval('month')}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-bold transition-all',
                billingInterval === 'month'
                  ? 'bg-white/20 text-white shadow-md'
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-bold transition-all relative',
                billingInterval === 'year'
                  ? 'bg-white/20 text-white shadow-md'
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              )}
            >
              Yearly
              {yearlySavings > 0 && (
                <span className="absolute -top-2.5 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  -{yearlySavings}%
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-2.5">
            {PRO_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3.5"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
              >
                <div className="w-9 h-9 rounded-[10px] bg-white/12 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-white/80" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-white">{feature.label}</p>
                  <p className="text-[11px] text-white/40">{feature.sublabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Free plan */}
        <motion.div
          className="mb-6 bg-white/8 backdrop-blur-sm rounded-2xl border border-white/10 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <p className="text-[11px] font-extrabold text-yellow-300/80 uppercase tracking-widest mb-3">
            Free plan includes
          </p>
          <div className="space-y-2 mb-4">
            {FREE_INCLUDES.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-extrabold text-white/30 uppercase tracking-widest mb-3">
            Limitations
          </p>
          <div className="space-y-2">
            {FREE_LIMITS.map((limit) => (
              <div key={limit} className="flex items-center gap-2.5">
                <Lock className="w-3.5 h-3.5 text-white/20" />
                <span className="text-sm text-white/40">{limit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {isProUser ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-400/15 text-green-300 font-bold text-sm">
                <Check className="w-5 h-5" />
                You&apos;re already on Pro
              </div>
              <Link
                href="/settings/billing"
                className="block text-sm text-white/40 hover:text-white/70 mt-3 transition-colors"
              >
                Manage billing →
              </Link>
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full py-4 rounded-2xl bg-[#FFB800] hover:bg-[#FFC520] active:translate-y-[2px] text-[#5D4200] font-extrabold text-base transition-all shadow-[0_4px_0_#CC9400] active:shadow-none disabled:opacity-50 flex items-center justify-center gap-2.5"
            >
              {checkoutLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {session ? 'Upgrade to Pro' : 'Sign in to upgrade'}
            </button>
          )}
          {checkoutError && (
            <p className="text-center text-sm text-red-300 mt-2 font-medium">{checkoutError}</p>
          )}
          <p className="text-center text-xs text-white/30 mt-3">
            Cancel anytime &middot; Secure payment via Paddle
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-[11px] font-extrabold text-white/30 uppercase tracking-widest mb-4 px-1">
            Questions
          </h3>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white/8 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 min-h-[44px] text-left"
                >
                  <span className="text-sm font-medium text-white/80 pr-3">{item.q}</span>
                  <ChevronDown className={cn(
                    'w-4 h-4 text-white/30 shrink-0 transition-transform duration-200',
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
                      <p className="px-4 pb-4 text-sm text-white/40 leading-relaxed">
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

      <style>{`
        @keyframes pricing-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes pricing-sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1); }
          70% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
