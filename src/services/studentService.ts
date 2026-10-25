import { getSupabaseClient, getSupabaseConfigStatus } from '@/lib/supabase';
import { StudentDashboardData, LessonSummary, QuizAttemptResult } from '@/types/curriculum.types';
import { DEMO_STUDENT_DASHBOARD } from '@/data/demoStudentData';

export interface DashboardFetchResult {
  data: StudentDashboardData | null;
  error: Error | null;
  isDemo: boolean;
}

/**
 * Retrieves the student dashboard data from the database.
 * If backend configuration is absent, returns clearly marked demo data.
 * Never misrepresents demo data as a successful database response.
 */
export async function getStudentDashboard(userId?: string | null): Promise<DashboardFetchResult> {
  const configStatus = getSupabaseConfigStatus();

  // If Supabase credentials are absent or contain placeholders, return explicitly marked demo data
  if (!configStatus.isConfigured) {
    return {
      data: DEMO_STUDENT_DASHBOARD,
      error: null,
      isDemo: true,
    };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      data: DEMO_STUDENT_DASHBOARD,
      error: new Error('Supabase client failed to initialize.'),
      isDemo: true,
    };
  }

  try {
    // 1. Fetch available subjects
    const { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select('id, name_en, name_pa, description_en, description_pa, icon, order_index')
      .order('order_index', { ascending: true });

    if (subjectsError) {
      throw subjectsError;
    }

    // 2. If student is logged in, fetch their progress & recent attempts
    let continueLearning: LessonSummary | null = null;
    const completionSummary = {
      total_lessons: 0,
      completed_lessons: 0,
      quizzes_taken: 0,
      average_score: 0,
    };
    let recentQuizzes: QuizAttemptResult[] = [];

    if (userId) {
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('lesson_id, status, time_spent_seconds, last_accessed_at, lessons(title_en, title_pa, difficulty, subject_id)')
        .eq('student_id', userId)
        .order('last_accessed_at', { ascending: false })
        .limit(1);

      if (progressData && progressData.length > 0) {
        const item = progressData[0];
        // Cast or format item
        const lesson = item.lessons as unknown as { title_en: string; title_pa: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; subject_id: string } | null;
        if (lesson) {
          continueLearning = {
            id: item.lesson_id,
            subject_id: lesson.subject_id,
            title_en: lesson.title_en,
            title_pa: lesson.title_pa,
            difficulty: lesson.difficulty,
            duration_minutes: 15,
            total_slides: 8,
            progress_percent: item.status === 'completed' ? 100 : 50,
            is_cached_offline: false,
          };
        }
      }

      // Quiz attempts
      const { data: attemptsData } = await supabase
        .from('quiz_attempts')
        .select('id, quiz_id, score, total_questions, submitted_at, quizzes(title_en, title_pa)')
        .eq('student_id', userId)
        .order('submitted_at', { ascending: false })
        .limit(5);

      if (attemptsData) {
        recentQuizzes = attemptsData.map((att) => {
          const quiz = att.quizzes as unknown as { title_en: string; title_pa: string } | null;
          const pct = Math.round((att.score / (att.total_questions || 1)) * 100);
          return {
            id: att.id,
            quiz_id: att.quiz_id,
            lesson_title_en: quiz?.title_en || 'Quiz',
            lesson_title_pa: quiz?.title_pa || 'ਕੁਇਜ਼',
            score: att.score,
            total_questions: att.total_questions,
            percentage: pct,
            passed: pct >= 70,
            attempted_at: att.submitted_at,
            sync_status: 'synced' as const,
          };
        });
      }
    }

    return {
      data: {
        subjects: subjectsData || [],
        continueLearning,
        completionSummary,
        recentQuizzes,
        isDemoData: false,
      },
      error: null,
      isDemo: false,
    };
  } catch (err) {
    console.error('Error fetching student dashboard from Supabase:', err);
    return {
      data: DEMO_STUDENT_DASHBOARD,
      error: err instanceof Error ? err : new Error(String(err)),
      isDemo: true,
    };
  }
}
