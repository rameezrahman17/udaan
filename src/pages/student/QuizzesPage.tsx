import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaceholderView } from '@/components/common/PlaceholderView';
import { FileQuestion } from 'lucide-react';

export const QuizzesPage: React.FC = () => {
  const { quizId } = useParams<{ quizId?: string }>();

  return (
    <PlaceholderView
      titlePa={quizId ? `ਕੁਇਜ਼ ਅਭਿਆਸ (#${quizId})` : 'ਕੁਇਜ਼ ਅਭਿਆਸ'}
      titleEn="Interactive Quiz Runner"
      descriptionPa="ਬਹੁ-ਵਿਕਲਪੀ ਸਵਾਲ, ਤੁਰੰਤ ਫੀਡਬੈਕ, ਅਤੇ ਆਫ਼ਲਾਈਨ ਸਕੋਰ ਸੰਭਾਲਣ ਦੀ ਪ੍ਰਣਾਲੀ ਇੱਥੇ ਉਪਲਬਧ ਹੋਵੇਗੀ।"
      descriptionEn="Interactive quizzes with immediate bilingual feedback and offline attempt logging."
      icon={FileQuestion}
      badgeText="ਫੇਜ਼ 13-14 • Coming in Quiz Engine Phase"
      backTo="/lessons"
      backLabel="ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ • Lessons"
    />
  );
};
