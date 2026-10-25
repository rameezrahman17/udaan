export interface Subject {
  id: string;
  name_en: string;
  name_pa: string;
  description_en: string;
  description_pa: string;
  icon: string;
  order_index: number;
}

export interface LessonSummary {
  id: string;
  subject_id: string;
  title_en: string;
  title_pa: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration_minutes: number;
  total_slides: number;
  completed_slides?: number;
  progress_percent?: number;
  is_cached_offline?: boolean;
}

export interface QuizAttemptResult {
  id: string;
  quiz_id: string;
  lesson_title_en: string;
  lesson_title_pa: string;
  score: number;
  total_questions: number;
  percentage: number;
  passed: boolean;
  attempted_at: string;
  sync_status: 'synced' | 'pending' | 'local_only';
}

export interface StudentDashboardData {
  subjects: Subject[];
  continueLearning: LessonSummary | null;
  completionSummary: {
    total_lessons: number;
    completed_lessons: number;
    quizzes_taken: number;
    average_score: number;
  };
  recentQuizzes: QuizAttemptResult[];
  isDemoData: boolean;
}
