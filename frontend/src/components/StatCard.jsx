function StatCard({ title, value, subtitle }) {
  const getAccent = () => {
    if (title === "High Risk") {
      return {
        icon: "!",
        iconClass: "bg-red-50 text-red-500",
        valueClass: "text-red-600",
      }
    }

    if (title === "Outcomes Recorded") {
      return {
        icon: "✓",
        iconClass: "bg-emerald-50 text-emerald-600",
        valueClass: "text-emerald-600",
      }
    }

    if (title === "Average Risk") {
      return {
        icon: "◔",
        iconClass: "bg-violet-50 text-violet-600",
        valueClass: "text-gray-950",
      }
    }

    return {
      icon: "↗",
      iconClass: "bg-gray-100 text-gray-700",
      valueClass: "text-gray-950",
    }
  }

  const accent = getAccent()

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${accent.iconClass}`}
        >
          {accent.icon}
        </div>

        <span className="text-gray-300 transition group-hover:text-gray-500">
          ↗
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </p>

        <p
          className={`mt-1 text-3xl font-bold tracking-tight ${accent.valueClass}`}
        >
          {value}
        </p>

        <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}

export default StatCard