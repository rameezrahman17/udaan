import React from 'react';
import { Link } from 'react-router-dom';
import { LessonItem } from '@/types/curriculum.types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Badge, Button } from '@/components/ui';
import { BookOpen, Clock, Layers, ArrowRight, GraduationCap } from 'lucide-react';

interface LessonCardProps {
  lesson: LessonItem;
}

const difficultyBadgeConfig: Record<string, { labelPa: string; labelEn: string; variant: 'brand' | 'warning' | 'danger' }> = {
  beginner: { labelPa: 'ਮੁਢਲਾ', labelEn: 'Beginner', variant: 'brand' },
  intermediate: { labelPa: 'ਦਰਮਿਆਨਾ', labelEn: 'Intermediate', variant: 'warning' },
  advanced: { labelPa: 'ਉੱਚ ਪੱਧਰੀ', labelEn: 'Advanced', variant: 'danger' },
};

export const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const diff = difficultyBadgeConfig[lesson.difficulty] || difficultyBadgeConfig.beginner;

  return (
    <Card interactive className="h-full flex flex-col justify-between group">
      <div>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="neutral" size="sm">
              {lesson.subject_name_pa}
            </Badge>
            <Badge variant={diff.variant} size="sm">
              {diff.labelPa} • {diff.labelEn}
            </Badge>
          </div>
          {lesson.is_cached_offline && (
            <Badge variant="success" size="sm" title="ਆਫ਼ਲਾਈਨ ਲਈ ਸੁਰੱਖਿਅਤ">
              <GraduationCap className="w-3 h-3 mr-0.5 inline" />
              ਕੈਸ਼
            </Badge>
          )}
        </CardHeader>

        <CardTitle className="text-base group-hover:text-brand-700 transition-colors">
          {lesson.title_pa}
        </CardTitle>
        <p className="text-xs font-medium text-slate-500 mt-0.5 mb-2">
          {lesson.title_en}
        </p>

        <CardDescription>
          {lesson.summary_pa}
        </CardDescription>
      </div>

      <div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {lesson.duration_minutes} ਮਿੰਟ
            </span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              {lesson.total_slides} ਸਲਾਈਡਾਂ
            </span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-brand-700 text-[11px]">
            {lesson.languages_available.map((lang) => (
              <span key={lang} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <CardFooter className="mt-3 pt-3">
          <Link to={`/lessons/${lesson.id}`} className="w-full">
            <Button variant="outline" size="sm" fullWidth icon={BookOpen} iconPosition="left">
              <span>ਪਾਠ ਪੜ੍ਹੋ • Start Lesson</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};
