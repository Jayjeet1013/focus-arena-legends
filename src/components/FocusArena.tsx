
import { useState } from 'react';
import { Timer } from './Timer';
import { AIBuddy } from './AIBuddy';
import { calculateXP, calculateLevel, type UserStats } from '@/utils/xpSystem';
import { Card } from '@/components/ui/card';

export const FocusArena = () => {
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    focusMinutes: 0,
    streak: 0,
  });

  const handleFocusComplete = () => {
    const earnedXP = calculateXP(25); // 25 minutes session
    const newXP = stats.xp + earnedXP;
    const newLevel = calculateLevel(newXP);
    
    setStats(prev => ({
      ...prev,
      xp: newXP,
      level: newLevel,
      focusMinutes: prev.focusMinutes + 25,
      streak: prev.streak + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Focus Arena
          </h1>
          <p className="text-gray-400">Level up your productivity</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-black/40 border-purple-500/20">
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <span className="text-purple-400">Level {stats.level}</span>
                <span className="text-blue-400">{stats.xp} XP</span>
              </div>
              <Timer onComplete={handleFocusComplete} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">{stats.focusMinutes}</div>
                <div className="text-sm text-gray-400">Minutes Focused</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">{stats.streak}</div>
                <div className="text-sm text-gray-400">Focus Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-black/40 border-blue-500/20">
            <h2 className="text-xl font-bold mb-4 text-blue-400">Focus Buddy</h2>
            <AIBuddy />
          </Card>
        </div>
      </div>
    </div>
  );
};
