import { FeedbackSection } from "./feedback-section"
import { StatsSection } from "./stats-section"
import { AdminSection } from "./admin-section"
import type { Menu, Ratings, Feedback } from "@/lib/types"

interface SidebarProps {
  ratings: Ratings
  feedbacks: Feedback[]
  menu: Menu[]
  onAddFeedback: (text: string) => void
  onUpdateMenu: (menu: Menu[]) => void
  onResetData: () => void
}

export function Sidebar({ ratings, feedbacks, menu, onAddFeedback, onUpdateMenu, onResetData }: SidebarProps) {
  return (
    <aside className="space-y-3">
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-800/50">
        <FeedbackSection onAddFeedback={onAddFeedback} />
        <StatsSection ratings={ratings} />
        <AdminSection menu={menu} feedbacks={feedbacks} onUpdateMenu={onUpdateMenu} onResetData={onResetData} />
      </div>
    </aside>
  )
}
