import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const IS_PROD = process.env.NODE_ENV === 'production';

let initialized = false;

export function initMixpanel() {
  if (initialized || !MIXPANEL_TOKEN) return;

  mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: false,
    persistence: 'localStorage',
    ignore_dnt: false,
    debug: !IS_PROD,
    api_host: '/api/mp', // proxy through our own API to bypass ad blockers
    api_transport: 'XHR', // required for custom api_host
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

export function setSuperProperties(props: Record<string, unknown>) {
  if (!initialized) return;
  mixpanel.register(props);
}

// Lean event model — few events, rich properties
export const analytics = {
  // Fires once when a practice session ends (completed or abandoned)
  session(props: {
    status: 'completed' | 'abandoned';
    mode: string;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracy: number;
    xpEarned: number;
    durationSeconds: number;
    topicId?: string;
    grade?: string;
  }) {
    trackEvent('session', props);
  },

  // Fires on meaningful milestones
  milestone(props: {
    type: 'achievement' | 'level_up' | 'streak' | 'onboarding_completed';
    name?: string;
    value?: number;
  }) {
    trackEvent('milestone', props);
  },

  // Fires on subscription changes (client-side: checkout initiated, page viewed)
  subscription(props: {
    action: 'checkout_initiated' | 'checkout_success' | 'manage_clicked';
    plan: string;
    interval?: string;
    source?: string;
  }) {
    trackEvent('subscription', props);
  },

  // Fires on auth events
  auth(props: {
    action: 'signup' | 'login' | 'logout';
    method: 'credentials' | 'google';
  }) {
    trackEvent('auth', props);
  },

  // Fires when user engages with a specific feature
  feature(name: string, details?: Record<string, unknown>) {
    trackEvent('feature', { name, ...details });
  },

  // Fires on errors that impact user experience
  error(props: {
    action: string;
    message: string;
    source?: string;
  }) {
    trackEvent('error', props);
  },
};
