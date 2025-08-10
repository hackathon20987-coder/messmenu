"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DaySelector } from "@/components/day-selector"
import { MealsGrid } from "@/components/meals-grid"
import { TopMeals } from "@/components/top-meals"
import { Sidebar } from "@/components/sidebar"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { DEFAULT_MENU } from "@/lib/constants"
import type { Menu, Ratings, Feedback } from "@/lib/types"

export default function MessMatePage() {
  const [menu, setMenu] = useLocalStorage<Menu[]>("mess_menu_v1", DEFAULT_MENU)
  const [ratings, setRatings] = useLocalStorage<Ratings>("mess_ratings_v1", {})
  const [feedbacks, setFeedbacks] = useLocalStorage<Feedback[]>("mess_feedback_v1", [])

  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [filterType, setFilterType] = useState<"all" | "veg" | "nonveg" | "special">("all")

  const updateRating = (key: string, score?: number, thumbType?: "up" | "down") => {
    setRatings((prev) => {
      const current = prev[key] || { scoreSum: 0, count: 0, thumbsUp: 0, thumbsDown: 0 }

      if (score) {
        current.scoreSum += score
        current.count += 1
      }

      if (thumbType === "up") {
        current.thumbsUp = (current.thumbsUp || 0) + 1
      } else if (thumbType === "down") {
        current.thumbsDown = (current.thumbsDown || 0) + 1
      }

      return { ...prev, [key]: current }
    })
  }

  const addFeedback = (text: string) => {
    setFeedbacks((prev) => [...prev, { text, created: Date.now() }])
  }

  const resetData = () => {
    setMenu(DEFAULT_MENU)
    setRatings({})
    setFeedbacks([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-7">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
          <div className="space-y-3">
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-800/50">
              <div className="flex justify-between items-center mb-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All</option>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                  <option value="special">Special</option>
                </select>
                <div className="text-xs text-slate-400">
                  Week: {menu[0]?.day} — {menu[menu.length - 1]?.day}
                </div>
              </div>

              <DaySelector menu={menu} selectedDayIndex={selectedDayIndex} onDaySelect={setSelectedDayIndex} />

              <MealsGrid day={menu[selectedDayIndex]} filterType={filterType} ratings={ratings} onRate={updateRating} />
            </div>

            <TopMeals ratings={ratings} />
          </div>

          <Sidebar
            ratings={ratings}
            feedbacks={feedbacks}
            menu={menu}
            onAddFeedback={addFeedback}
            onUpdateMenu={setMenu}
            onResetData={resetData}
          />
        </div>

        <footer className="text-slate-400 text-xs mt-5">
          Mess Mate - Check the weekly mess menu, rate meals & send anonymous feedback. Data is stored in your browser's
          localStorage.
        </footer>
      </div>
    </div>
  )
}
