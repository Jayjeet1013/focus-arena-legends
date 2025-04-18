
export interface UserStats {
  level: number;
  xp: number;
  focusMinutes: number;
  streak: number;
}

export function calculateXP(focusMinutes: number): number {
  return Math.floor(focusMinutes * 10); // 10 XP per minute
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1; // Level up every 1000 XP
}
