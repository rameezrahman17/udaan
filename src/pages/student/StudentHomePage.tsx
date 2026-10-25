import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context';
import { getStudentDashboard, DashboardFetchResult } from '@/services/studentService';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Badge,
  ProgressBar,
  Alert,
  Skeleton,
} from '@/components/ui';
import {
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  FileQuestion,
  GraduationCap,
  Wifi,
  WifiOff,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';

export const StudentHomePage: React.FC = () => {
  const { user, profile } = useAuth();
  const [dashboardState, setDashboardState] = useState<DashboardFetchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadDashboard = React.useCallback(async () => {
    setIsLoading(true);
    const result = await getStudentDashboard(user?.id);
    setDashboardState(result);
    setIsLoading(false);
  }, [user?.id]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'ਵਿਦਿਆਰਥੀ (Student)';
  const data = dashboardState?.data;
  const isDemo = dashboardState?.isDemo;
  const fetchError = dashboardState?.error;

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full gap-6">
      {/* 1. Clear Demo Data Warning Banner (Only when backend is unconfigured or in demo fallback) */}
      {isDemo && (
        <Alert
          variant="warning"
          title="ਡੈਮੋ ਸਮੱਗਰੀ ਮੋਡ • Demonstration Mode"
          className="border-amber-300 bg-amber-50"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              ਇਹ ਸਕ੍ਰੀਨ <strong>ਨਮੂਨਾ (Demo) ਡਾਟਾ</strong> ਦਿਖਾ ਰਹੀ ਹੈ ਕਿਉਂਕਿ Supabase ਬੈਕਐਂਡ ਕਨੈਕਸ਼ਨ ਅਜੇ ਸੈੱਟ ਨਹੀਂ ਕੀਤਾ ਗਿਆ ਹੈ।
              ਇਹ ਅਸਲ ਡਾਟਾਬੇਸ ਜਵਾਬ ਨਹੀਂ ਹੈ।
            </span>
            <Link to="/login" className="shrink-0 font-bold text-amber-900 underline text-xs">
              ਕਨਫ਼ੀਗਰੇਸ਼ਨ ਵੇਖੋ &rarr;
            </Link>
          </div>
        </Alert>
      )}

      {/* 2. Error Banner if fetch failed */}
      {fetchError && !isDemo && (
        <Alert variant="error" title="ਸਮੱਸਿਆ ਆਈ ਹੈ • Error Fetching Dashboard">
          {fetchError.message}
          <Button variant="outline" size="sm" onClick={loadDashboard} className="mt-2" icon={RefreshCw}>
            ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ • Retry
          </Button>
        </Alert>
      )}

      {/* 3. Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-800 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="brand" className="bg-white/20 text-white border-white/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 mr-1 inline" />
              <span>ਪ੍ਰੋਜੈਕਟ ਉਡਾਨ • Project Udaan</span>
            </Badge>

            {/* Network / Sync Status Pill */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
                isOnline
                  ? 'bg-emerald-900/40 text-emerald-100 border-emerald-400/40'
                  : 'bg-amber-900/40 text-amber-100 border-amber-400/40'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-300" />
                  <span>ਕਲਾਊਡ ਸਿੰਕ ਤਿਆਰ • Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-300" />
                  <span>ਆਫ਼ਲਾਈਨ ਮੋਡ • Local Storage</span>
                </>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            ਜੀ ਆਇਆਂ ਨੂੰ, {displayName}!
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
            ਪੇਂਡੂ ਨਾਭਾ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਕੰਪਿਊਟਰ ਅਤੇ ਇੰਟਰਨੈੱਟ ਸਿੱਖਣ ਦਾ ਸੌਖਾ ਰਾਹ।
            ਆਪਣੀ ਰਫ਼ਤਾਰ ਨਾਲ ਪੜ੍ਹੋ, ਔਨਲਾਈਨ ਜਾਂ ਆਫ਼ਲਾਈਨ!
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/lessons">
              <Button
                variant="primary"
                size="md"
                className="bg-white text-brand-800 hover:bg-emerald-50 active:bg-emerald-100 font-bold border-transparent"
                icon={BookOpen}
                iconPosition="left"
              >
                ਸਾਰੇ ਪਾਠ ਵੇਖੋ • Browse Lessons
              </Button>
            </Link>
            <Link to="/quizzes">
              <Button
                variant="outline"
                size="md"
                className="bg-brand-800/40 hover:bg-brand-800/70 text-white border-white/30"
                icon={FileQuestion}
                iconPosition="left"
              >
                ਕੁਇਜ਼ ਅਭਿਆਸ • Quizzes
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background visual */}
        <div className="absolute -right-8 -bottom-10 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </section>

      {/* 4. Completion Summary Metrics Grid */}
      <section aria-labelledby="completion-summary-heading">
        <h2 id="completion-summary-heading" className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-600" />
          <span>ਮੇਰਾ ਅਧਿਐਨ ਸਾਰਾਂਸ਼ • Completion Summary</span>
          {isDemo && <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold">DEMO</span>}
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-7 w-12" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="p-4 bg-white border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">ਕੁੱਲ ਪਾਠ (Lessons)</span>
              <p className="text-2xl font-black text-slate-900">
                {data?.completionSummary.total_lessons || 0}
              </p>
            </Card>

            <Card className="p-4 bg-white border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">ਮੁਕੰਮਲ ਕੀਤੇ (Done)</span>
              <p className="text-2xl font-black text-brand-600">
                {data?.completionSummary.completed_lessons || 0}
              </p>
            </Card>

            <Card className="p-4 bg-white border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">ਕੁਇਜ਼ ਹੱਲ ਕੀਤੇ</span>
              <p className="text-2xl font-black text-sky-600">
                {data?.completionSummary.quizzes_taken || 0}
              </p>
            </Card>

            <Card className="p-4 bg-white border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">ਔਸਤ ਸਕੋਰ (Avg)</span>
              <p className="text-2xl font-black text-amber-600">
                {data?.completionSummary.average_score || 0}%
              </p>
            </Card>
          </div>
        )}
      </section>

      {/* 5. Continue Learning Section */}
      <section aria-labelledby="continue-learning-heading">
        <h2 id="continue-learning-heading" className="text-base font-bold text-slate-800 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <span>ਜਾਰੀ ਰੱਖੋ • Continue Learning</span>
          </div>
        </h2>

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <Skeleton className="h-5 w-1/3 mb-3" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-3 w-full rounded-full" />
          </div>
        ) : data?.continueLearning ? (
          <Card className="p-5 sm:p-6 bg-white border-brand-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="brand" size="sm">
                    {data.continueLearning.difficulty === 'beginner' ? 'ਮੁਢਲਾ • Beginner' : 'ਦਰਮਿਆਨਾ'}
                  </Badge>
                  {data.continueLearning.is_cached_offline && (
                    <Badge variant="success" size="sm">
                      <GraduationCap className="w-3 h-3 inline mr-1" />
                      ਆਫ਼ਲਾਈਨ ਉਪਲਬਧ
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {data.continueLearning.title_pa}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {data.continueLearning.title_en} • ਲਗਭਗ {data.continueLearning.duration_minutes} ਮਿੰਟ
                </p>

                <ProgressBar
                  value={data.continueLearning.progress_percent || 0}
                  label="ਪਾਠ ਦੀ ਤਰੱਕੀ"
                  color="brand"
                  className="max-w-md"
                />
              </div>

              <div className="shrink-0 flex items-center">
                <Link to={`/lessons/${data.continueLearning.id}`}>
                  <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                    ਪੜ੍ਹਨਾ ਜਾਰੀ ਰੱਖੋ • Resume
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center bg-white border-slate-200">
            <p className="text-sm font-semibold text-slate-700 mb-1">
              ਕੋਈ ਪਾਠ ਅਧੂਰਾ ਨਹੀਂ ਹੈ
            </p>
            <p className="text-xs text-slate-500 mb-4">
              ਤੁਸੀਂ ਨਵਾਂ ਪਾਠ ਸ਼ੁਰੂ ਕਰ ਸਕਦੇ ਹੋ।
            </p>
            <Link to="/lessons">
              <Button variant="outline" size="sm">
                ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ ਖੋਲ੍ਹੋ &rarr;
              </Button>
            </Link>
          </Card>
        )}
      </section>

      {/* 6. Available Subjects Grid */}
      <section aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="text-base font-bold text-slate-800 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-brand-600" />
            <span>ਉਪਲਬਧ ਵਿਸ਼ੇ • Learning Subjects</span>
          </div>
          <Link to="/lessons" className="text-xs text-brand-600 hover:text-brand-700 font-semibold">
            ਸਾਰੇ ਵੇਖੋ &rarr;
          </Link>
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200">
                <Skeleton className="h-10 w-10 rounded-xl mb-3" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : data?.subjects && data.subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.subjects.map((subject) => (
              <Link
                key={subject.id}
                to={`/lessons?subject=${subject.id}`}
                className="block focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-2xl"
              >
                <Card interactive className="h-full flex flex-col justify-between group">
                  <div>
                    <CardHeader>
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <Badge variant="neutral" size="sm">ਸਿਲੇਬਸ</Badge>
                    </CardHeader>
                    <CardTitle className="text-base group-hover:text-brand-700 transition-colors">
                      {subject.name_pa}
                    </CardTitle>
                    <p className="text-xs font-medium text-slate-400 mt-0.5 mb-2">
                      {subject.name_en}
                    </p>
                    <CardDescription>
                      {subject.description_pa}
                    </CardDescription>
                  </div>
                  <CardFooter className="text-xs font-semibold text-brand-600">
                    <span>ਪਾਠ ਵੇਖੋ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center bg-white border-slate-200">
            <p className="text-sm text-slate-500">ਕੋਈ ਵਿਸ਼ਾ ਨਹੀਂ ਮਿਲਿਆ (No subjects available).</p>
          </Card>
        )}
      </section>

      {/* 7. Recent Quiz Results Section */}
      <section aria-labelledby="quizzes-heading">
        <h2 id="quizzes-heading" className="text-base font-bold text-slate-800 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileQuestion className="w-4 h-4 text-brand-600" />
            <span>ਹਾਲੀਆ ਕੁਇਜ਼ ਨਤੀਜੇ • Recent Quiz Results</span>
          </div>
          <Link to="/quizzes" className="text-xs text-brand-600 hover:text-brand-700 font-semibold">
            ਹੋਰ ਕੁਇਜ਼ ਲਓ &rarr;
          </Link>
        </h2>

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : data?.recentQuizzes && data.recentQuizzes.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {data.recentQuizzes.map((quiz) => (
              <Card key={quiz.id} className="p-4 bg-white border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      quiz.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {quiz.passed ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{quiz.lesson_title_pa}</h4>
                    <p className="text-xs text-slate-500">{quiz.lesson_title_en}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900">{quiz.score}/{quiz.total_questions}</span>
                    <span className="text-[11px] text-slate-500 block">({quiz.percentage}%)</span>
                  </div>
                  <Badge variant={quiz.passed ? 'success' : 'danger'} size="sm">
                    {quiz.passed ? 'ਪਾਸ • Passed' : 'ਮੁੜ ਕੋਸ਼ਿਸ਼'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center bg-white border-slate-200">
            <p className="text-sm text-slate-600 mb-1">ਅਜੇ ਤੱਕ ਕੋਈ ਕੁਇਜ਼ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ</p>
            <p className="text-xs text-slate-400 mb-4">You have not taken any quizzes yet.</p>
            <Link to="/quizzes">
              <Button variant="outline" size="sm">
                ਕੁਇਜ਼ ਸ਼ੁਰੂ ਕਰੋ • Start Quiz
              </Button>
            </Link>
          </Card>
        )}
      </section>

      {/* 8. Nabha Offline-First Guarantee Footer Card */}
      <section className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800 block text-xs mb-0.5">
            ਨਾਭਾ ਪੇਂਡੂ ਸਕੂਲ ਸਹਾਇਤਾ (Nabha Rural Schools Guarantee):
          </strong>
          ਸਾਰੇ ਪਾਠ ਅਤੇ ਕੁਇਜ਼ ਇੱਕ ਵਾਰ ਖੋਲ੍ਹਣ ਉਪਰੰਤ ਤੁਹਾਡੇ ਯੰਤਰ ’ਤੇ ਸੁਰੱਖਿਅਤ ਹੋ ਜਾਂਦੇ ਹਨ। ਜਦੋਂ ਵੀ ਇੰਟਰਨੈੱਟ ਵਾਪਸ ਆਵੇਗਾ,
          ਤੁਹਾਡੀ ਤਰੱਕੀ ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ ਨਾਲ ਆਪਣੇ ਆਪ ਸਿੰਕ ਹੋ ਜਾਵੇਗੀ।
        </div>
      </section>
    </div>
  );
};
