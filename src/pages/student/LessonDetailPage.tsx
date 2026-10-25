import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaceholderView } from '@/components/common/PlaceholderView';
import { BookOpen } from 'lucide-react';

export const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  return (
    <PlaceholderView
      titlePa={`ਪਾਠ ਵੇਰਵਾ ${lessonId ? `(#${lessonId})` : ''}`}
      titleEn="Interactive Lesson Viewer"
      descriptionPa="ਸਲਾਈਡ-ਦਰ-ਸਲਾਈਡ ਪਾਠ, ਤਸਵੀਰਾਂ, ਅਤੇ ਆਵਾਜ਼ ਸਹਾਇਤਾ ਨਾਲ ਇੰਟਰਐਕਟਿਵ ਸਿੱਖਣ ਅਨੁਭਵ ਜਲਦੀ ਹੀ ਇੱਥੇ ਸ਼ਾਮਲ ਕੀਤਾ ਜਾਵੇਗਾ।"
      descriptionEn="Step-by-step bilingual lesson slides with audio pronunciation support and offline caching."
      icon={BookOpen}
      badgeText="ਫੇਜ਼ 11 • Coming in Interactive Lesson Phase"
      backTo="/lessons"
      backLabel="ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ • Back to Lessons"
    />
  );
};
