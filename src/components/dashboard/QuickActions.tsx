import Link from 'next/link';
import { Zap, Timer, Calendar, Wrench, AlertTriangle, BookOpen } from 'lucide-react';

const actions = [
  {
    href: '/practice/adaptive',
    label: 'Adaptive Practice',
    description: 'AI-selected questions based on your weak spots',
    icon: Zap,
    color: 'from-primary-500 to-primary-600',
    featured: true,
  },
  {
    href: '/practice/interview',
    label: 'Interview Simulation',
    description: '30 min timed, mixed topics',
    icon: Timer,
    color: 'from-purple-500 to-purple-600',
  },
  {
    href: '/practice/daily',
    label: 'Daily Challenge',
    description: 'Fresh questions every day',
    icon: Calendar,
    color: 'from-amber-500 to-amber-600',
  },
  {
    href: '/practice/real-world',
    label: 'Real-World Systems',
    description: 'Everyday mechanisms explained',
    icon: Wrench,
    color: 'from-surface-600 to-surface-700',
  },
  {
    href: '/practice/weak-areas',
    label: 'Weak Areas',
    description: 'Strengthen your weakest topics',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
  },
  {
    href: '/practice/topics',
    label: 'Topic Deep Dive',
    description: 'Pick a topic and go deep',
    icon: BookOpen,
    color: 'from-emerald-500 to-emerald-600',
  },
];

export default function QuickActions() {
  return (
    <div>
      <h2 className="font-bold text-surface-900 mb-4">Start Practicing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`group relative overflow-hidden rounded-xl p-5 text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-br ${action.color} ${action.featured ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <action.icon className="w-8 h-8 mb-3 opacity-90" />
            <h3 className="font-bold text-lg mb-1">{action.label}</h3>
            <p className="text-sm opacity-80">{action.description}</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          </Link>
        ))}
      </div>
    </div>
  );
}
