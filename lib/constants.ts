import type { Menu } from "./types"

export const DEFAULT_MENU: Menu[] = [
  {
    day: "Monday",
    meals: [
      { time: "Breakfast", name: "Poha", type: "veg" },
      { time: "Lunch", name: "Paneer Butter Masala", type: "veg" },
      { time: "Dinner", name: "Chicken Curry", type: "nonveg" },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { time: "Breakfast", name: "Idli Sambhar", type: "veg" },
      { time: "Lunch", name: "Mixed Veg", type: "veg" },
      { time: "Dinner", name: "Fish Fry", type: "nonveg" },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { time: "Breakfast", name: "Paratha", type: "veg" },
      { time: "Lunch", name: "Rajma", type: "veg" },
      { time: "Dinner", name: "Egg Curry", type: "nonveg" },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { time: "Breakfast", name: "Upma", type: "veg" },
      { time: "Lunch", name: "Chole", type: "veg" },
      { time: "Dinner", name: "Mutton Curry", type: "nonveg" },
    ],
  },
  {
    day: "Friday",
    meals: [
      { time: "Breakfast", name: "Dosa", type: "veg" },
      { time: "Lunch", name: "Vegetable Biryani", type: "veg" },
      { time: "Dinner", name: "Paneer Tikka", type: "veg" },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { time: "Breakfast", name: "Bread Omelette", type: "nonveg" },
      { time: "Lunch", name: "Chicken Biryani", type: "nonveg" },
      { time: "Dinner", name: "Mixed Grill", type: "nonveg" },
    ],
  },
  {
    day: "Sunday",
    meals: [
      { time: "Breakfast", name: "Aloo Puri", type: "veg" },
      { time: "Lunch", name: "Special Thali", type: "special" },
      { time: "Dinner", name: "Leftovers", type: "veg" },
    ],
  },
]
