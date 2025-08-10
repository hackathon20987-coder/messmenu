export interface Meal {
  time: string
  name: string
  type: "veg" | "nonveg" | "special"
}

export interface Menu {
  day: string
  meals: Meal[]
}

export interface Rating {
  scoreSum: number
  count: number
  thumbsUp: number
  thumbsDown: number
}

export interface Ratings {
  [key: string]: Rating
}

export interface Feedback {
  text: string
  created: number
}

export interface Stats {
  totalRatings: number
  mealsRated: number
  top: Array<{
    key: string
    avg: number
    count: number
    thumbsUp: number
    thumbsDown: number
  }>
}
