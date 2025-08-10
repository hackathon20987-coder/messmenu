import type { Ratings } from "@/lib/types"
import { computeStats } from "@/lib/utils"

interface TopMealsProps {
  ratings: Ratings
}

export function TopMeals({ ratings }: TopMealsProps) {
  const stats = computeStats(ratings)

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-800/50">
      <h3 className="text-base font-medium m-0 mb-2">Top meals this week</h3>
      <div className="space-y-2">
        {stats.top.length === 0 ? (
          <div className="text-slate-400 text-sm">No ratings yet</div>
        ) : (
          stats.top.map((meal, index) => {
            const [day, time] = meal.key.split("|")
            return (
              <div key={index} className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/20">
                <div className="text-sm">
                  {time} — {day}
                </div>
                <div className="font-semibold">
                  {meal.avg.toFixed(1)} ({meal.count})
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
