import { useEffect, useState } from 'react';
import { Trophy, Medal, Search, RefreshCw, Sparkles, User, Play } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { fetchLeaderboard } from '../services/api';

interface LeaderboardPageProps {
  onStartPlay: () => void;
  currentPlayerName: string;
}

export function LeaderboardPage({ onStartPlay, currentPlayerName }: LeaderboardPageProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    const data = await fetchLeaderboard();
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredEntries = entries.filter(e =>
    e.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = entries.slice(0, 3);
  const remaining = filteredEntries.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#ECE7FA] pb-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Middlesex Dubai Student Rankings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#2D264B]">
            Public Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6594]">
            Live scores from MIH Innovation Imposter solo rounds.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-[#E2DCF8] text-[#6E6594] hover:text-[#2D264B] hover:bg-white transition-colors"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#7C3AED]' : ''}`} />
          </button>

          <button
            onClick={onStartPlay}
            className="px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-xs transition-all flex items-center gap-1.5"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Now</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {topThree.length >= 3 && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Rank 2 (Silver) */}
          <div className="order-2 md:order-1 p-6 rounded-3xl bg-white border border-[#E2DCF8] shadow-xs relative overflow-hidden flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EDE9FE]/50 rounded-bl-full -z-0" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#F1EFF9] text-[#5B5282] font-extrabold flex items-center justify-center text-sm border border-[#E2DCF8]">
                  #2
                </span>
                <Medal className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-[#2D264B] truncate">
                  {topThree[1].displayName}
                </h3>
                <p className="text-xs text-[#6E6594]">{topThree[1].gamesCompleted} games played</p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#F1EFF9] flex items-baseline justify-between">
              <span className="text-xs text-[#6E6594] font-medium">Total Score</span>
              <span className="text-2xl font-extrabold font-display text-[#2D264B]">
                {topThree[1].totalPoints} <span className="text-xs font-normal text-[#7C3AED]">pts</span>
              </span>
            </div>
          </div>

          {/* Rank 1 (Gold) - Elevated */}
          <div className="order-1 md:order-2 p-7 rounded-3xl bg-gradient-to-b from-white to-[#FAF8FF] border-2 border-[#DDD6FE] shadow-md relative overflow-hidden flex flex-col justify-between space-y-5 md:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDE68A]/20 rounded-bl-full -z-0" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] font-extrabold flex items-center justify-center text-base border border-[#FDE68A]">
                  #1
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-[#FDE68A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Leader</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold font-display text-[#2D264B] truncate">
                  {topThree[0].displayName}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#6E6594] mt-1">
                  <span>{topThree[0].gamesCompleted} rounds</span>
                  <span>•</span>
                  <span>{topThree[0].correctGuesses} catches</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#ECE7FA] flex items-baseline justify-between">
              <span className="text-xs font-semibold text-[#5B5282]">Champion Score</span>
              <span className="text-3xl font-extrabold font-display text-[#7C3AED]">
                {topThree[0].totalPoints} <span className="text-sm font-semibold">pts</span>
              </span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="order-3 p-6 rounded-3xl bg-white border border-[#E2DCF8] shadow-xs relative overflow-hidden flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFEDD5]/40 rounded-bl-full -z-0" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#FFF7ED] text-[#C2410C] font-extrabold flex items-center justify-center text-sm border border-[#FED7AA]">
                  #3
                </span>
                <Medal className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-[#2D264B] truncate">
                  {topThree[2].displayName}
                </h3>
                <p className="text-xs text-[#6E6594]">{topThree[2].gamesCompleted} games played</p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#F1EFF9] flex items-baseline justify-between">
              <span className="text-xs text-[#6E6594] font-medium">Total Score</span>
              <span className="text-2xl font-extrabold font-display text-[#2D264B]">
                {topThree[2].totalPoints} <span className="text-xs font-normal text-[#7C3AED]">pts</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search and Table Area */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7FA] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player nickname..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-[#F8F7FC] border border-[#E2DCF8] focus:outline-hidden focus:border-[#7C3AED] focus:bg-white text-[#2D264B]"
            />
          </div>

          <div className="text-xs text-[#6E6594] flex items-center gap-1.5 self-end sm:self-center">
            <User className="w-3.5 h-3.5" />
            <span>Showing {filteredEntries.length} player{filteredEntries.length === 1 ? '' : 's'}</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#F1EFF9] text-xs font-semibold text-[#6E6594] uppercase tracking-wider">
                <th className="py-3.5 px-3">Rank</th>
                <th className="py-3.5 px-3">Player</th>
                <th className="py-3.5 px-3 text-center">Rounds</th>
                <th className="py-3.5 px-3 text-center">Catches</th>
                <th className="py-3.5 px-3 text-center">Imposter Wins</th>
                <th className="py-3.5 px-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F7FC]">
              {filteredEntries.map((entry, index) => {
                const isCurrent = currentPlayerName && entry.displayName.toLowerCase() === currentPlayerName.toLowerCase();
                return (
                  <tr
                    key={entry.id}
                    className={`hover:bg-[#FAF9FE] transition-colors ${
                      isCurrent ? 'bg-[#F3E8FF]/60 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3 text-xs font-bold text-[#5B5282]">
                      #{index + 1}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#2D264B]">{entry.displayName}</span>
                        {isCurrent && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#7C3AED] text-white font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center text-xs text-[#5B5282]">
                      {entry.gamesCompleted}
                    </td>
                    <td className="py-3.5 px-3 text-center text-xs text-[#5B5282]">
                      {entry.correctGuesses}
                    </td>
                    <td className="py-3.5 px-3 text-center text-xs text-[#5B5282]">
                      {entry.imposterWins}
                    </td>
                    <td className="py-3.5 px-3 text-right font-extrabold text-sm text-[#7C3AED]">
                      {entry.totalPoints}
                    </td>
                  </tr>
                );
              })}

              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#6E6594] text-xs">
                    No matching player records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
