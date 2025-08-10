export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 mb-5">
      <div className="flex items-center gap-3">
        <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-slate-900">
          MM
        </div>
        <div>
          <h1 className="text-xl font-semibold m-0">Mess Mate</h1>
          <p className="text-slate-400 text-sm m-0">Check the weekly mess menu, rate meals & send anonymous feedback</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="bg-slate-800/30 px-3 py-1.5 rounded-full text-xs border border-slate-700/50">
          Anonymous feedback
        </span>
      </div>
    </header>
  )
}
