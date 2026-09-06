import { useEffect, useMemo, useState } from "react"

function RiskChart() {
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
        console.error("Risk chart error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const recentDecisions = useMemo(() => {
    return decisions.slice(-8)
  }, [decisions])

  const averageRisk =
    decisions.length > 0
      ? decisions.reduce(
          (sum, decision) =>
            sum + Number(decision.delay_probability),
          0
        ) / decisions.length
      : 0

  const averagePercentage = averageRisk * 100

  const chartValues = recentDecisions.map((decision) =>
    Number(decision.delay_probability) * 100
  )

  const getYPosition = (value) => {
    const max = 100
    const min = 0

    const clamped = Math.max(min, Math.min(max, value))

    return 100 - clamped
  }

  return (
    <div className="bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Risk Trend
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Average shipment delay risk across recent decisions
          </p>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5">
          <span className="text-[10px] font-semibold text-blue-600">
            Recent decisions
          </span>
        </div>
      </div>

      {/* Main Metric */}
      <div className="mt-5 flex items-end gap-2">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {loading ? "..." : `${averagePercentage.toFixed(1)}%`}
        </p>

        <span className="mb-1 rounded-full bg-slate-50 px-2 py-1 text-[9px] font-semibold text-slate-500">
          Average Risk
        </span>
      </div>

      {/* Chart */}
      <div className="mt-6">
        {loading ? (
          <div className="flex h-56 items-center justify-center rounded-lg bg-slate-50">
            <p className="text-xs text-slate-400">
              Loading risk data...
            </p>
          </div>
        ) : recentDecisions.length === 0 ? (
          <div className="flex h-56 items-center justify-center rounded-lg bg-slate-50">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                ◔
              </div>

              <p className="mt-3 text-xs font-semibold text-slate-600">
                No risk data available
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Save a decision to populate the chart.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative h-56 overflow-hidden rounded-lg border border-slate-100 bg-slate-50/60">
            {/* Horizontal grid */}
            <div className="absolute inset-0 flex flex-col justify-between px-4 py-4">
              {[100, 75, 50, 25, 0].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3"
                >
                  <span className="w-7 text-[9px] font-medium text-slate-400">
                    {value}%
                  </span>

                  <div className="h-px flex-1 bg-slate-200/80" />
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end gap-3 px-12 pb-7 pt-4">
              {recentDecisions.map((decision, index) => {
                const percentage =
                  Number(decision.delay_probability) * 100

                const height = Math.max(
                  8,
                  Math.min(100, percentage)
                )

                return (
                  <div
                    key={decision.id ?? index}
                    className="group relative flex h-full flex-1 items-end justify-center"
                  >
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-[calc(100%-2px)] left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[9px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                      {percentage.toFixed(1)}%
                    </div>

                    {/* Bar */}
                    <div
                      className="w-full max-w-[28px] rounded-t-md bg-blue-500 transition-all duration-300 group-hover:bg-blue-600"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Bottom labels */}
            <div className="absolute bottom-2 left-12 right-4 flex justify-between">
              {recentDecisions.map((decision, index) => (
                <span
                  key={decision.id ?? index}
                  className="flex-1 text-center text-[8px] font-medium text-slate-400"
                >
                  #{index + 1}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />

          <span className="text-[10px] font-medium text-slate-500">
            Delay probability
          </span>
        </div>

        <span className="text-[10px] font-medium text-slate-400">
          Last {recentDecisions.length} decisions
        </span>
      </div>
    </div>
  )
}

export default RiskChart