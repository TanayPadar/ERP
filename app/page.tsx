import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { StatsDisplay } from '@/components/dashboard/stats-display';
import { SimpleChart } from '@/components/dashboard/simple-chart';

export default function Home() {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <StatsDisplay />
      <SimpleChart />
    </div>
  );
}