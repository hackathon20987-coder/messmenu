"use client"

import { useState } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import type { Menu, Meal } from "@/lib/types"

interface EditMealsModalProps {
  day: Menu
  onSave: (day: Menu) => void
  onClose: () => void
}

export function EditMealsModal({ day, onSave, onClose }: EditMealsModalProps) {
  const [editedDay, setEditedDay] = useState<Menu>({ ...day, meals: [...day.meals] })

  const addMeal = () => {
    setEditedDay((prev) => ({
      ...prev,
      meals: [...prev.meals, { time: "Breakfast", name: "New Meal", type: "veg" }],
    }))
  }

  const removeMeal = (index: number) => {
    setEditedDay((prev) => ({
      ...prev,
      meals: prev.meals.filter((_, i) => i !== index),
    }))
  }

  const updateMeal = (index: number, field: keyof Meal, value: string) => {
    setEditedDay((prev) => ({
      ...prev,
      meals: prev.meals.map((meal, i) => (i === index ? { ...meal, [field]: value } : meal)),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit meals for {editedDay.day}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto mb-4 space-y-3">
          {editedDay.meals.map((meal, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                value={meal.time}
                onChange={(e) => updateMeal(index, "time", e.target.value)}
                placeholder="Time"
                className="flex-1 p-2 rounded-lg border border-slate-700/50 bg-slate-800/30 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                value={meal.name}
                onChange={(e) => updateMeal(index, "name", e.target.value)}
                placeholder="Meal name"
                className="flex-1 p-2 rounded-lg border border-slate-700/50 bg-slate-800/30 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <select
                value={meal.type}
                onChange={(e) => updateMeal(index, "type", e.target.value as "veg" | "nonveg" | "special")}
                className="p-2 rounded-lg border border-slate-700/50 bg-slate-800/30 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
                <option value="special">Special</option>
              </select>
              <button
                onClick={() => removeMeal(index)}
                className="p-2 bg-slate-800/30 border border-slate-700/50 rounded-lg text-red-400 hover:bg-slate-700/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={addMeal}
            className="flex items-center gap-1 bg-slate-800/30 border border-slate-700/50 px-3 py-2 rounded-lg text-sm hover:bg-slate-700/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add meal
          </button>
          <button
            onClick={() => onSave(editedDay)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 px-4 py-2 rounded-lg border-none cursor-pointer hover:from-cyan-400 hover:to-blue-400 transition-all text-sm font-medium"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-slate-800/30 border border-slate-700/50 px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-700/30 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
