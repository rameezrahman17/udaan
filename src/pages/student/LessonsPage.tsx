import React from 'react';
import { PlaceholderView } from '@/components/common/PlaceholderView';
import { BookOpen } from 'lucide-react';

export const LessonsPage: React.FC = () => {
  return (
    <PlaceholderView
      titlePa="ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ"
      titleEn="Lesson Library & Subjects"
      descriptionPa="ਇੱਥੇ ਕੰਪਿਊਟਰ ਬੁਨਿਆਦ, ਕੀਬੋਰਡ ਅਤੇ ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਦੇ ਵਿਸ਼ੇ ਵਾਰ ਪਾਠ ਉਪਲਬਧ ਹੋਣਗੇ। ਤੁਸੀਂ ਪਾਠਾਂ ਨੂੰ ਆਫ਼ਲਾਈਨ ਪੜ੍ਹਨ ਲਈ ਡਾਊਨਲੋਡ ਕਰ ਸਕੋਗੇ।"
      descriptionEn="Curriculum modules organized by subject, difficulty, and language. Content is cacheable for offline reading."
      icon={BookOpen}
      badgeText="ਫੇਜ਼ 10-12 • Coming in Library & Offline Phase"
    />
  );
};
