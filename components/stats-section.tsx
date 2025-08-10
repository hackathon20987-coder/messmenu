import type { Ratings } from "@/lib/types"
import { computeStats } from "@/lib/utils"

interface StatsSectionProps {
  ratings: Ratings
}

export function StatsSection({ ratings }: StatsSectionProps) {
  const stats = computeStats(ratings)

  return (
    <div className="mb-3">
      <h3 className="text-base font-medium m-0 mb-1.5">Weekly stats</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/20">
          <div className="text-slate-400 text-sm">Ratings this week</div>
          <div className="font-semibold">{stats.totalRatings}</div>
        </div>
        <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/20">
          <div className="text-slate-400 text-sm">Meals rated</div>
          <div className="font-semibold">{stats.mealsRated}</div>
        </div>
      </div>
    </div>
  )
}
