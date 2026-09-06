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
      dot: "bg-emerald-500",
      bar: "bg-emerald-500",
      background: "bg-emerald-50",
    },
    {
      label: "Medium Risk",
      count: mediumRisk,
      percentage: getPercentage(mediumRisk),
      dot: "bg-amber-500",
      bar: "bg-amber-500",
      background: "bg-amber-50",
    },
    {
      label: "High Risk",
      count: highRisk,
      percentage: getPercentage(highRisk),
      dot: "bg-red-500",
      bar: "bg-red-500",
      background: "bg-red-50",
    },
  ]

  return (
    <div className="h-full bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Risk Distribution
          </p>

          <div className="mt-1 flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">
              {loading ? "..." : total}
            </h2>

            <span className="text-xs text-gray-400">
              total decisions
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 px-3 py-2">
          <span className="text-xs font-semibold text-gray-500">
            Risk profile
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {riskItems.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />

                <span className="text-xs font-semibold text-gray-700">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">
                  {item.percentage}%
                </span>

                <span className="text-[10px] text-gray-400">
                  {item.count} {item.count === 1 ? "decision" : "decisions"}
                </span>
              </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.bar}`}
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {!loading && total === 0 && (
        <div className="mt-6 rounded-xl bg-gray-50 px-4 py-3 text-center text-xs text-gray-400">
          No saved decisions available.
        </div>
      )}

      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Risk threshold
          </span>

          <div className="flex items-center gap-3 text-[10px] text-gray-500">
            <span>&lt; 30% Low</span>
            <span>30–50% Medium</span>
            <span>&gt; 50% High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskDistribution