import { useEffect, useState } from "react"

function RiskDistribution() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/decisions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch decisions")
        }

        return response.json()
      })
      .then((data) => {
        setDecisions(data)
      })
      .catch((error) => {
        console.error("Risk distribution error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const total = decisions.length

  const lowRisk = decisions.filter(
    (decision) => Number(decision.delay_probability) < 0.3
  ).length

  const mediumRisk = decisions.filter(
    (decision) =>
      Number(decision.delay_probability) >= 0.3 &&
      Number(decision.delay_probability) <= 0.5
  ).length

  const highRisk = decisions.filter(
    (decision) => Number(decision.delay_probability) > 0.5
  ).length

  const getPercentage = (count) => {
    if (total === 0) return 0

    return Math.round((count / total) * 100)
  }

  const riskItems = [
    {
      label: "Low Risk",
      count: lowRisk,
      percentage: getPercentage(lowRisk),
      color: "bg-emerald-500",
      light: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Medium Risk",
      count: mediumRisk,
      percentage: getPercentage(mediumRisk),
      color: "bg-amber-500",
      light: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      label: "High Risk",
      count: highRisk,
      percentage: getPercentage(highRisk),
      color: "bg-red-500",
      light: "bg-red-50",
      text: "text-red-600",
    },
  ]

  return (
    <div className="bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Risk Distribution
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Current distribution of shipment delay risk
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
          <span className="text-[10px] font-semibold text-slate-500">
            Risk profile
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-5 flex items-end gap-2">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {loading ? "..." : total}
        </p>

        <span className="mb-1 text-[11px] text-slate-400">
          total decisions
        </span>
      </div>

      {/* Risk Items */}
      <div className="mt-6 space-y-5">
        {riskItems.map((item) => (
          <div key={item.label}>
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.light}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${item.color}`}
                  />
                </span>

                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    {item.label}
                  </p>

                  <p className="mt-0.5 text-[9px] text-slate-400">
                    {item.count}{" "}
                    {item.count === 1 ? "decision" : "decisions"}
                  </p>
                </div>
              </div>

              <span
                className={`text-sm font-bold ${item.text}`}
              >
                {item.percentage}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && total === 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">
          <p className="text-xs font-medium text-slate-500">
            No risk data available
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Save shipment decisions to populate this section.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-slate-400">
            Risk thresholds
          </span>

          <div className="flex items-center gap-3 text-[9px] font-medium text-slate-500">
            <span>&lt;30% Low</span>
            <span>30–50% Medium</span>
            <span>&gt;50% High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskDistribution