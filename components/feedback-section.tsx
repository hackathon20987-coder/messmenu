"use client"

import { useState } from "react"
import { Send, Sparkles } from "lucide-react"

interface FeedbackSectionProps {
  onAddFeedback: (text: string) => void
}

export function FeedbackSection({ onAddFeedback }: FeedbackSectionProps) {
  const [feedbackText, setFeedbackText] = useState("")

  const handleSendFeedback = () => {
    const text = feedbackText.trim()
    if (!text) {
      alert("Please write something")
      return
    }
    onAddFeedback(text)
    setFeedbackText("")
    alert("Feedback saved locally (admin can view it)")
  }

  const generatePolite = () => {
    const text = feedbackText.trim()
    if (!text) {
      alert("Write your raw feedback first, then click Generate")
      return
    }
    const polite = `Hello Team, I wanted to share a suggestion: ${text.replace(/\s+/g, " ").trim()}. Thank you for considering this.`
    setFeedbackText(polite)
    alert("Polite suggestion generated — you can edit before sending.")
  }

  return (
    <div className="mb-3">
      <h3 className="text-base font-medium m-0 mb-1.5">Send anonymous feedback</h3>
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Write your suggestion or complaint (anonymous)"
        className="w-full min-h-[86px] p-2.5 rounded-lg border border-slate-700/50 bg-slate-800/30 text-slate-100 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <div className="flex gap-2 mt-2 items-center">
        <button
          onClick={handleSendFeedback}
          className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 px-3 py-2 rounded-lg border-none cursor-pointer hover:from-cyan-400 hover:to-blue-400 transition-all text-sm font-medium"
        >
          <Send className="w-3 h-3" />
          Send
        </button>
        <button
          onClick={generatePolite}
          className="flex items-center gap-1.5 bg-slate-800/30 border border-slate-700/50 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-700/30 transition-colors text-sm"
        >
          <Sparkles className="w-3 h-3" />
          Generate polite
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2 m-0">
        Your feedback is stored locally in your browser and shown to admins when they open the admin area.
      </p>
    </div>
  )
}
