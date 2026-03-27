import { PageHeader } from '@/components/ui/PageHeader';
import { QuestBoard } from '@/components/engagement/QuestBoard';

export default function QuestsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#FAFAFA' }}>
      <PageHeader title="Quests" subtitle="Complete quests for XP & gems" />

      {/* Quest Board */}
      <div className="px-4 sm:px-5 pt-4 pb-8">
        <QuestBoard />
      </div>
    </div>
  );
}
