import type { Ratings, Rating, Stats } from "./types"

export function mealKey(day: string, time: string, name: string): string {
  return `${day}|${time}|${name}`
}

export function getMealRating(ratings: Ratings, key: string): Rating {
  return ratings[key] || { scoreSum: 0, count: 0, thumbsUp: 0, thumbsDown: 0 }
}

export function computeStats(ratings: Ratings): Stats {
  const keys = Object.keys(ratings)
  const ratedMeals = keys
    .map((key) => {
      const rating = ratings[key]
      if (rating.count > 0) {
        return {
          key,
          avg: rating.scoreSum / rating.count,
          count: rating.count,
          thumbsUp: rating.thumbsUp || 0,
          thumbsDown: rating.thumbsDown || 0,
        }
      }
      return null
    })
    .filter(Boolean) as NonNullable<ReturnType<typeof keys.map>>[0][]

  ratedMeals.sort((a, b) => b.avg - a.avg)

  return {
    totalRatings: ratedMeals.reduce((sum, meal) => sum + meal.count, 0),
    mealsRated: ratedMeals.length,
    top: ratedMeals.slice(0, 5),
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
