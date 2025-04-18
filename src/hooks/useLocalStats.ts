
import { useState, useEffect } from 'react';
import { type UserStats } from '@/utils/xpSystem';

const STATS_STORAGE_KEY = 'focus_arena_stats';

const defaultStats: UserStats = {
  level: 1,
  xp: 0,
  focusMinutes: 0,
  streak: 0,
};

export const useLocalStats = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const stored = localStorage.getItem(STATS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  return [stats, setStats] as const;
};
