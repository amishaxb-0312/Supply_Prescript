function StatCard({ title, value, subtitle }) {
  const getCardStyle = () => {
    if (title === "High Risk") {
      return {
        icon: "!",
        iconClass: "bg-red-50 text-red-500",
        valueClass: "text-slate-900",
        trend: "Risk alert",
        trendClass: "text-red-500",
      }
    }

    if (title === "Outcomes Recorded") {
      return {
        icon: "✓",
        iconClass: "bg-emerald-50 text-emerald-600",
        valueClass: "text-slate-900",
        trend: "Completed",
        trendClass: "text-emerald-500",
      }
    }

    if (title === "Average Risk") {
      return {
        icon: "◔",
        iconClass: "bg-violet-50 text-violet-600",
        valueClass: "text-slate-900",
        trend: "Overall",
        trendClass: "text-violet-500",
      }
    }

    return {
      icon: "□",
      iconClass: "bg-blue-50 text-blue-600",
      valueClass: "text-slate-900",
      trend: "Tracked",
      trendClass: "text-blue-500",
    }
  }

  const card = getCardStyle()

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold ${card.iconClass}`}
        >
          {card.icon}
        </div>

        <span
          className={`rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold ${card.trendClass}`}
        >
          {card.trend}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold text-slate-500">
          {title}
        </p>

        <div className="mt-1 flex items-end justify-between gap-3">
          <p
            className={`text-2xl font-bold tracking-tight ${card.valueClass}`}
          >
            {value}
          </p>

          <span className="mb-1 text-xs text-slate-300 transition group-hover:text-slate-400">
            ↗
          </span>
        </div>

        <p className="mt-1 text-[11px] text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full w-1/3 rounded-full transition-all duration-500 group-hover:w-1/2 ${
            title === "High Risk"
              ? "bg-red-400"
              : title === "Outcomes Recorded"
                ? "bg-emerald-400"
                : title === "Average Risk"
                  ? "bg-violet-400"
                  : "bg-blue-500"
          }`}
        />
      </div>
    </div>
  )
}

export default StatCard