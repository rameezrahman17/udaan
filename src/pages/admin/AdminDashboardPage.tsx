import React from 'react';
import { PlaceholderView } from '@/components/common/PlaceholderView';
import { ShieldCheck } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <PlaceholderView
      titlePa="ਸਿਸਟਮ ਪ੍ਰਬੰਧਕੀ ਪੋਰਟਲ"
      titleEn="School, User & Curriculum Administration"
      descriptionPa="ਸਕੂਲਾਂ ਦੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ, ਅਧਿਆਪਕ-ਜਮਾਤ ਨਿਯੁਕਤੀਆਂ, ਅਤੇ ਪਾਠ ਸਮੱਗਰੀ ਪ੍ਰਕਾਸ਼ਨ ਪ੍ਰਬੰਧਨ ਲਈ ਅਧਿਕਾਰਤ ਪੋਰਟਲ।"
      descriptionEn="Role-based administration for schools, rosters, subject creation, and curriculum publication controls."
      icon={ShieldCheck}
      badgeText="ਫੇਜ਼ 18 • Coming in Administration Phase"
    />
  );
};
