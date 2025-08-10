"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, RotateCcw, Edit, Trash2 } from "lucide-react"
import { EditMealsModal } from "./edit-meals-modal"
import type { Menu, Feedback } from "@/lib/types"

interface AdminSectionProps {
  menu: Menu[]
  feedbacks: Feedback[]
  onUpdateMenu: (menu: Menu[]) => void
  onResetData: () => void
}

export function AdminSection({ menu, feedbacks, onUpdateMenu, onResetData }: AdminSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null)

  const addDay = () => {
    const name = prompt("Day name (e.g. Holiday)") || "NewDay"
    onUpdateMenu([...menu, { day: name, meals: [] }])
  }

  const deleteDay = (index: number) => {
    if (confirm("Delete this day?")) {
      const newMenu = menu.filter((_, i) => i !== index)
      onUpdateMenu(newMenu)
    }
  }

  const updateDayName = (index: number, newName: string) => {
    const newMenu = [...menu]
    newMenu[index].day = newName
    onUpdateMenu(newMenu)
  }

  const handleResetData = () => {
    if (confirm("Reset demo data?")) {
      onResetData()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium m-0">Admin</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 text-sm underline cursor-pointer hover:text-slate-300 flex items-center gap-1"
        >
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {isOpen ? "Close" : "Open"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2.5">
          <p className="text-xs text-slate-400 mb-3">
            Add / edit the weekly menu. Changes are saved locally (for demo). Use this area to simulate admin updates.
          </p>

          <div className="space-y-2 mb-3">
            {menu.map((day, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={day.day}
                  onChange={(e) => updateDayName(index, e.target.value)}
                  placeholder="Day name"
                  className="flex-1 p-2 rounded-lg border border-slate-700/50 bg-slate-800/30 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={() => setEditingDayIndex(index)}
                  className="bg-slate-800/30 border border-slate-700/50 px-2 py-2 rounded-lg text-xs hover:bg-slate-700/30 transition-colors"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteDay(index)}
                  className="bg-slate-800/30 border border-slate-700/50 px-2 py-2 rounded-lg text-xs hover:bg-slate-700/30 transition-colors text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={addDay}
              className="flex items-center gap-1 bg-slate-800/30 border border-slate-700/50 px-2 py-1.5 rounded-lg text-xs hover:bg-slate-700/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add day
            </button>
            <button
              onClick={handleResetData}
              className="flex items-center gap-1 bg-slate-800/30 border border-slate-700/50 px-2 py-1.5 rounded-lg text-xs hover:bg-slate-700/30 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset data
            </button>
          </div>

          {feedbacks.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-700/50">
              <h4 className="text-sm font-medium mb-2">Anonymous Feedback ({feedbacks.length})</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {feedbacks.map((feedback, index) => (
                  <div key={index} className="p-2 bg-slate-800/20 rounded text-xs">
                    <div className="text-slate-300">{feedback.text}</div>
                    <div className="text-slate-500 text-xs mt-1">{new Date(feedback.created).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {editingDayIndex !== null && (
        <EditMealsModal
          day={menu[editingDayIndex]}
          onSave={(updatedDay) => {
            const newMenu = [...menu]
            newMenu[editingDayIndex] = updatedDay
            onUpdateMenu(newMenu)
            setEditingDayIndex(null)
          }}
          onClose={() => setEditingDayIndex(null)}
        />
      )}
    </div>
  )
}
