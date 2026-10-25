import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLessonLibrary, LessonLibraryResult } from '@/services/lessonLibraryService';
import { LessonItem, DifficultyLevel, ContentLanguage } from '@/types/curriculum.types';
import { LessonCard } from '@/components/lessons/LessonCard';
import {
  Card,
  Input,
  Button,
  Badge,
  Alert,
  EmptyState,
  LessonCardSkeleton,
} from '@/components/ui';
import {
  Search,
  BookOpen,
  Filter,
  X,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

export const LessonsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [libraryState, setLibraryState] = useState<LessonLibraryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters state from URL query or defaults
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [selectedSubject, setSelectedSubject] = useState<string>(searchParams.get('subject') || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(
    (searchParams.get('difficulty') as DifficultyLevel) || 'all'
  );
  const [selectedLanguage, setSelectedLanguage] = useState<ContentLanguage>(
    (searchParams.get('lang') as ContentLanguage) || 'all'
  );

  const loadLessons = useCallback(async () => {
    setIsLoading(true);
    const result = await getLessonLibrary();
    setLibraryState(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  // Sync state changes with URL query parameters for shareability and deep-linking
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedSubject !== 'all') params.set('subject', selectedSubject);
    if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty);
    if (selectedLanguage !== 'all') params.set('lang', selectedLanguage);

    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedSubject, selectedDifficulty, selectedLanguage, setSearchParams]);

  // Read URL params if navigated externally
  useEffect(() => {
    const urlSubject = searchParams.get('subject');
    if (urlSubject && urlSubject !== selectedSubject) {
      setSelectedSubject(urlSubject);
    }
  }, [searchParams, selectedSubject]);

  // Filter lessons in-memory
  const filteredLessons = useMemo(() => {
    if (!libraryState?.lessons) return [];

    return libraryState.lessons.filter((lesson: LessonItem) => {
      // 1. Text Search query in Punjabi or English title/summary
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesPa =
          lesson.title_pa.toLowerCase().includes(q) ||
          lesson.summary_pa.toLowerCase().includes(q) ||
          lesson.subject_name_pa.toLowerCase().includes(q);
        const matchesEn =
          lesson.title_en.toLowerCase().includes(q) ||
          lesson.summary_en.toLowerCase().includes(q) ||
          lesson.subject_name_en.toLowerCase().includes(q);

        if (!matchesPa && !matchesEn) return false;
      }

      // 2. Subject Filter
      if (selectedSubject !== 'all' && lesson.subject_id !== selectedSubject) {
        return false;
      }

      // 3. Difficulty Filter
      if (selectedDifficulty !== 'all' && lesson.difficulty !== selectedDifficulty) {
        return false;
      }

      // 4. Language Filter
      if (selectedLanguage !== 'all' && !lesson.languages_available.includes(selectedLanguage)) {
        return false;
      }

      return true;
    });
  }, [libraryState?.lessons, searchQuery, selectedSubject, selectedDifficulty, selectedLanguage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setSelectedLanguage('all');
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedSubject !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedLanguage !== 'all';

  const isDemo = libraryState?.isDemo;
  const error = libraryState?.error;
  const subjects = libraryState?.subjects || [];

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full gap-6">
      {/* 1. Header with Page Title & Demo Warning */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">
            ਸਿਲੇਬਸ • Curriculum
          </Badge>
          {isDemo && (
            <Badge variant="warning" size="sm">
              ਡੈਮੋ ਸਮੱਗਰੀ • Demo Content
            </Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ • Digital Literacy Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          ਕੰਪਿਊਟਰ ਬੁਨਿਆਦ, ਕੀਬੋਰਡ, ਮਾਊਸ, ਅਤੇ ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਦੇ ਸਾਰੇ ਪਾਠ। ਆਪਣੀ ਪਸੰਦ ਦੇ ਵਿਸ਼ੇ ਅਨੁਸਾਰ ਖੋਜ ਕਰੋ।
        </p>
      </div>

      {isDemo && (
        <Alert variant="warning" title="ਨਮੂਨਾ ਸਮੱਗਰੀ (Development Fallback)">
          ਡਾਟਾਬੇਸ ਕੁਨੈਕਸ਼ਨ ਨਾ ਹੋਣ ਕਾਰਨ ਲੋਕਲ ਡੈਮੋ ਪਾਠ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ। ਇਹ ਪ੍ਰੋਡਕਸ਼ਨ ਡਾਟਾ ਨਹੀਂ ਹੈ।
        </Alert>
      )}

      {error && !isDemo && (
        <Alert variant="error" title="ਪਾਠ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ">
          {error.message}
          <Button variant="outline" size="sm" onClick={loadLessons} className="mt-2" icon={RefreshCw}>
            ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ • Retry
          </Button>
        </Alert>
      )}

      {/* 2. Search & Filter Bar */}
      <Card className="p-4 sm:p-5 bg-white border-slate-200 shadow-xs">
        <div className="flex flex-col gap-4">
          {/* Top row: search input and active filter badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="ਪਾਠ ਦਾ ਨਾਮ ਜਾਂ ਵਿਸ਼ਾ ਖੋਜੋ... (Search lessons or subjects)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                aria-label="ਪਾਠ ਖੋਜੋ"
              />
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                icon={X}
                className="text-slate-500 hover:text-slate-800 self-end sm:self-auto"
              >
                ਫਿਲਟਰ ਹਟਾਓ • Clear
              </Button>
            )}
          </div>

          {/* Filter options row */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
            {/* Subject Selector */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-600">ਵਿਸ਼ਾ:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                aria-label="ਵਿਸ਼ਾ ਚੁਣੋ"
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">ਸਾਰੇ ਵਿਸ਼ੇ (All Subjects)</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name_pa} ({sub.name_en})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-600">ਪੱਧਰ:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel)}
                aria-label="ਮੁਸ਼ਕਿਲ ਪੱਧਰ ਚੁਣੋ"
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">ਸਾਰੇ ਪੱਧਰ (All Levels)</option>
                <option value="beginner">ਮੁਢਲਾ (Beginner)</option>
                <option value="intermediate">ਦਰਮਿਆਨਾ (Intermediate)</option>
                <option value="advanced">ਉੱਚ ਪੱਧਰੀ (Advanced)</option>
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-600">ਭਾਸ਼ਾ:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as ContentLanguage)}
                aria-label="ਭਾਸ਼ਾ ਚੁਣੋ"
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">ਸਾਰੀਆਂ ਭਾਸ਼ਾਵਾਂ (All Languages)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="ml-auto text-xs text-slate-400">
              {filteredLessons.length} {filteredLessons.length === 1 ? 'ਪਾਠ' : 'ਪਾਠ'} ਮਿਲੇ
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Subject Quick Filter Pills */}
      {subjects.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              selectedSubject === 'all'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            ਸਾਰੇ ਵਿਸ਼ੇ ({libraryState?.lessons.length || 0})
          </button>
          {subjects.map((sub) => {
            const count = libraryState?.lessons.filter((l) => l.subject_id === sub.id).length || 0;
            const isSelected = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>{sub.name_pa}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Lesson Grid or Skeletons or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <LessonCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <Card className="p-8 bg-white border-slate-200">
          <EmptyState
            titlePa="ਕੋਈ ਪਾਠ ਨਹੀਂ ਮਿਲਿਆ"
            titleEn="No Lessons Match Your Filters"
            descriptionPa="ਤੁਹਾਡੀ ਖੋਜ ਦੇ ਮੁਤਾਬਕ ਕੋਈ ਪਾਠ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਖੋਜ ਸ਼ਬਦ ਜਾਂ ਫਿਲਟਰ ਬਦਲੋ।"
            descriptionEn="Try adjusting your search query, difficulty level, or subject filter."
            icon={BookOpen}
            actionLabel="ਸਾਰੇ ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ • Clear Filters"
            onAction={clearFilters}
          />
        </Card>
      )}
    </div>
  );
};
