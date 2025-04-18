
import { useState } from 'react';
import { Timer } from './Timer';
import { AIBuddy } from './AIBuddy';
import { calculateXP, calculateLevel, type UserStats } from '@/utils/xpSystem';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Clock } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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

  // Calculate XP progress to next level (assume 1000 XP per level)
  const xpProgress = (stats.xp % 1000) / 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8 transition-all duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Focus Arena
          </h1>
          <p className="text-gray-400 text-lg">Level up your productivity</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <Trophy className="w-5 h-5" />
                      <span className="text-xl font-semibold">Level {stats.level}</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-black/90 border-purple-500/20">
                    <p>Keep focusing to level up and earn rewards!</p>
                  </HoverCardContent>
                </HoverCard>
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-xl font-semibold">{stats.xp} XP</span>
                </div>
              </div>
              
              <Progress value={xpProgress} className="h-2 bg-purple-950" />
              
              <Timer onComplete={handleFocusComplete} />
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/15 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <div className="text-2xl font-bold">{stats.focusMinutes}</div>
                  </div>
                  <div className="text-sm text-gray-400 text-center">Minutes Focused</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 hover:bg-blue-500/15 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Flame className="w-5 h-5 text-blue-400" />
                    <div className="text-2xl font-bold">{stats.streak}</div>
                  </div>
                  <div className="text-sm text-gray-400 text-center">Focus Streak</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-black/40 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
              Focus Buddy
              <span className="text-sm font-normal text-gray-400">(AI-Powered)</span>
            </h2>
            <AIBuddy />
          </Card>
        </div>
      </div>
    </div>
  );
};
