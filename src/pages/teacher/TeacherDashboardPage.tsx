import React from 'react';
import { PlaceholderView } from '@/components/common/PlaceholderView';
import { Users } from 'lucide-react';

export const TeacherDashboardPage: React.FC = () => {
  return (
    <PlaceholderView
      titlePa="ਅਧਿਆਪਕ ਵਿਸ਼ਲੇਸ਼ਣ ਡੈਸ਼ਬੋਰਡ"
      titleEn="Teacher Analytics & Class Monitoring"
      descriptionPa="ਜਮਾਤ ਦੀ ਸਮੁੱਚੀ ਕਾਰਗੁਜ਼ਾਰੀ, ਕੁਇਜ਼ ਸਕੋਰਾਂ ਦੀ ਵੰਡ, ਅਤੇ ਲੋੜਵੰਦ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਪਛਾਣ ਲਈ ਗ੍ਰਾਫ ਅਤੇ ਅੰਕੜੇ।"
      descriptionEn="Class-level completion metrics, score distributions with Recharts, and sync timestamps for assigned students."
      icon={Users}
      badgeText="ਫੇਜ਼ 16-17 • Coming in Teacher Analytics Phase"
    />
  );
};
