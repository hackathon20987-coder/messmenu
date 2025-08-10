"use client"

import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import type { Menu, Ratings } from "@/lib/types"
import { mealKey, getMealRating } from "@/lib/utils"

interface MealsGridProps {
  day: Menu
  filterType: "all" | "veg" | "nonveg" | "special"
  ratings: Ratings
  onRate: (key: string, score?: number, thumbType?: "up" | "down") => void
}

export function MealsGrid({ day, filterType, ratings, onRate }: MealsGridProps) {
  if (!day) return null

  const filteredMeals = day.meals.filter((meal) => filterType === "all" || meal.type === filterType)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {filteredMeals.map((meal, index) => {
        const key = mealKey(day.day, meal.time, meal.name)
        const rating = getMealRating(ratings, key)
        const avgRating = rating.count ? (rating.scoreSum / rating.count).toFixed(1) : "—"

        return (
          <div
            key={index}
            className="bg-gradient-to-b from-slate-800/20 to-slate-800/10 p-3 rounded-lg border border-slate-700/30"
          >
            <div className="flex-1">
              <h3 className="text-base font-medium m-0 mb-1">
                {meal.time} — {meal.name}
              </h3>
              <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">{meal.type}</div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => onRate(key, score)}
                      className="p-1.5 rounded-md bg-slate-800/20 hover:bg-slate-700/30 transition-colors cursor-pointer border-none"
                    >
                      <Star className="w-3 h-3 text-slate-300" />
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-400">
                  Avg: <strong>{avgRating}</strong> ({rating.count})
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onRate(key, undefined, "up")}
                  className="flex items-center gap-1 bg-slate-800/30 border border-slate-700/50 px-2 py-1 rounded-md cursor-pointer hover:bg-slate-700/30 transition-colors text-xs"
                >
                  <ThumbsUp className="w-3 h-3" />
                  {rating.thumbsUp || 0}
                </button>
                <button
                  onClick={() => onRate(key, undefined, "down")}
                  className="flex items-center gap-1 bg-slate-800/30 border border-slate-700/50 px-2 py-1 rounded-md cursor-pointer hover:bg-slate-700/30 transition-colors text-xs"
                >
                  <ThumbsDown className="w-3 h-3" />
                  {rating.thumbsDown || 0}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
