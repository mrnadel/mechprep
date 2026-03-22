import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const IS_PROD = process.env.NODE_ENV === 'production';

let initialized = false;

export function initMixpanel() {
  if (initialized || !MIXPANEL_TOKEN) return;

  mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: false, // we track manually on route change
    persistence: 'localStorage',
    ignore_dnt: false,
    debug: !IS_PROD,
    api_host: '/api/mp', // proxy through our own API to bypass ad blockers
  });

  initialized = true;
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  mixpanel.track(event, properties);
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (!initialized) return;
  mixpanel.identify(userId);
  if (traits) {
    mixpanel.people.set(traits);
  }
}

export function resetUser() {
  if (!initialized) return;
  mixpanel.reset();
}

export function trackPageView(url: string) {
  trackEvent('page_view', { url });
}

// Convenience functions for key events
export const analytics = {
  sessionStarted(mode: string, topicId?: string) {
    trackEvent('session_started', { mode, topic_id: topicId });
  },

  sessionCompleted(props: {
    mode: string;
    questionsAttempted: number;
    questionsCorrect: number;
    xpEarned: number;
    durationSeconds: number;
    topicId?: string;
  }) {
    trackEvent('session_completed', props);
  },

  questionAnswered(props: {
    questionId: string;
    topicId: string;
    subtopic?: string;
    difficulty: string;
    correct: boolean;
    timeSpentMs: number;
    mode: string;
  }) {
    trackEvent('question_answered', props);
  },

  achievementUnlocked(achievementId: string, name: string) {
    trackEvent('achievement_unlocked', { achievement_id: achievementId, name });
  },

  onboardingCompleted() {
    trackEvent('onboarding_completed');
  },

  subscriptionStarted(plan: string, interval: string) {
    trackEvent('subscription_started', { plan, interval });
  },

  featureUsed(feature: string, details?: Record<string, unknown>) {
    trackEvent('feature_used', { feature, ...details });
  },
};
