import { getSupabaseClient, getSupabaseConfigStatus } from '@/lib/supabase';
import { LessonItem, Subject } from '@/types/curriculum.types';
import { DEMO_LESSONS, DEMO_SUBJECTS } from '@/data/demoLessonsData';

export interface LessonLibraryResult {
  lessons: LessonItem[];
  subjects: Subject[];
  isDemo: boolean;
  error: Error | null;
}

/**
 * Loads published lessons and subjects from Supabase PostgreSQL database.
 * Falls back to documented local demo content with explicit labeling when backend is unconfigured or unavailable.
 */
export async function getLessonLibrary(): Promise<LessonLibraryResult> {
  const configStatus = getSupabaseConfigStatus();

  // If Supabase credentials are absent or placeholders, return clearly marked demo fallback
  if (!configStatus.isConfigured) {
    return {
      lessons: DEMO_LESSONS,
      subjects: DEMO_SUBJECTS,
      isDemo: true,
      error: null,
    };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      lessons: DEMO_LESSONS,
      subjects: DEMO_SUBJECTS,
      isDemo: true,
      error: new Error('Supabase client is not available.'),
    };
  }

  try {
    // 1. Fetch published subjects
    const { data: subjectsData, error: subjectsErr } = await supabase
      .from('subjects')
      .select('id, name_en, name_pa, description_en, description_pa, icon, order_index')
      .order('order_index', { ascending: true });

    if (subjectsErr) throw subjectsErr;

    // 2. Fetch published lessons
    const { data: lessonsData, error: lessonsErr } = await supabase
      .from('lessons')
      .select('id, subject_id, title_en, title_pa, difficulty, order_index, is_published, subjects(name_en, name_pa)')
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (lessonsErr) throw lessonsErr;

    const mappedLessons: LessonItem[] = (lessonsData || []).map((row) => {
      const subject = row.subjects as unknown as { name_en: string; name_pa: string } | null;
      return {
        id: row.id,
        subject_id: row.subject_id,
        subject_name_en: subject?.name_en || 'General',
        subject_name_pa: subject?.name_pa || 'ਆਮ',
        title_en: row.title_en,
        title_pa: row.title_pa,
        summary_en: `${row.title_en} course module`,
        summary_pa: `${row.title_pa} ਸਿੱਖਿਆ ਪਾਠ`,
        difficulty: row.difficulty,
        languages_available: ['pa', 'en'],
        duration_minutes: 15,
        total_slides: 8,
        is_published: row.is_published,
        is_cached_offline: false,
        order_index: row.order_index,
      };
    });

    return {
      lessons: mappedLessons,
      subjects: subjectsData || [],
      isDemo: false,
      error: null,
    };
  } catch (err) {
    console.error('Failed to load published lessons from Supabase:', err);
    return {
      lessons: DEMO_LESSONS,
      subjects: DEMO_SUBJECTS,
      isDemo: true,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }
}
