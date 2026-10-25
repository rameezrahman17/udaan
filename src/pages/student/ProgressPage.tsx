import React from 'react';
import { PlaceholderView } from '@/components/common/PlaceholderView';
import { Award } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  return (
    <PlaceholderView
      titlePa="ਮੇਰੀ ਸਿੱਖਿਆ ਤਰੱਕੀ"
      titleEn="Student Learning Progress & Badges"
      descriptionPa="ਮੁਕੰਮਲ ਕੀਤੇ ਪਾਠ, ਕੁਇਜ਼ਾਂ ਦੇ ਅੰਕ, ਅਤੇ ਆਫ਼ਲਾਈਨ ਸਿੰਕ ਸਥਿਤੀ ਇੱਥੇ ਪਾਰਦਰਸ਼ੀ ਤੌਰ 'ਤੇ ਦਿਖਾਈ ਦੇਵੇਗੀ।"
      descriptionEn="Local and cloud-synced completion records, scores, and offline sync queue status."
      icon={Award}
      badgeText="ਫੇਜ਼ 14-15 • Coming in Progress & Sync Phase"
    />
  );
};
