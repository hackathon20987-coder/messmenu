"use client"

import type { Menu } from "@/lib/types"

interface DaySelectorProps {
  menu: Menu[]
  selectedDayIndex: number
  onDaySelect: (index: number) => void
}

export function DaySelector({ menu, selectedDayIndex, onDaySelect }: DaySelectorProps) {
  return (
    <div className="flex gap-1.5 mb-3 flex-wrap">
      {menu.map((day, index) => (
        <button
          key={index}
          onClick={() => onDaySelect(index)}
          className={`px-3 py-2 rounded-lg border-none cursor-pointer text-sm font-medium transition-all ${
            index === selectedDayIndex
              ? "bg-gradient-to-r from-cyan-500 to-blue-400 text-slate-900"
              : "bg-yellow-500 text-slate-900 hover:bg-yellow-400"
          }`}
        >
          {day.day}
        </button>
      ))}
    </div>
  )
}
