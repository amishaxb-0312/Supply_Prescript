import { useEffect, useMemo, useState } from "react"

function RiskChart() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/decisions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load risk data")
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

  const chartData = useMemo(() => {
    if (!decisions.length) {
      return []
    }

    return decisions.slice(-7).map((decision, index) => ({
      label: `D${index + 1}`,
      value: Math.round(Number(decision.delay_probability) * 100),
    }))
  }, [decisions])

  const averageRisk = useMemo(() => {
    if (!decisions.length) {
      return 0
    }

    const total = decisions.reduce(
      (sum, decision) => sum + Number(decision.delay_probability),
      0
    )

    return (total / decisions.length) * 100
  }, [decisions])

  const maxValue = Math.max(
    100,
    ...chartData.map((item) => item.value)
  )

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Delay Risk Trend
            </h2>

            <span className="rounded-md bg-blue-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-blue-600">
              AI
            </span>
          </div>

          <p className="mt-1 text-[10px] text-slate-400">
            Delay probability across recent decisions
          </p>
        </div>

        <div className="text-right">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Avg. Risk
          </p>

          <p className="mt-0.5 text-lg font-bold text-slate-900">
            {loading ? "..." : `${averageRisk.toFixed(1)}%`}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex h-[250px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-slate-100" />

              <p className="mt-3 text-[10px] text-slate-400">
                Loading risk data...
              </p>
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg text-blue-500 shadow-sm">
                ◔
              </div>

              <p className="mt-3 text-xs font-bold text-slate-700">
                No risk data yet
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Save a decision to populate the risk trend.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative h-[250px]">
              {/* Horizontal grid */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[100, 75, 50, 25, 0].map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3"
                  >
                    <span className="w-7 text-right text-[8px] font-medium text-slate-400">
                      {value}%
                    </span>

                    <div className="h-px flex-1 bg-slate-100" />
                  </div>
                ))}
              </div>

              {/* Bars */}
              <div className="absolute bottom-0 left-10 right-0 top-0 flex items-end justify-around gap-2 px-2 pb-5 pt-2">
                {chartData.map((item) => {
                  const height = Math.max(
                    8,
                    (item.value / maxValue) * 100
                  )

                  const isHigh = item.value > 50
                  const isMedium =
                    item.value >= 30 && item.value <= 50

                  return (
                    <div
                      key={item.label}
                      className="group flex h-full flex-1 flex-col items-center justify-end"
                    >
                      <div className="relative flex w-full max-w-12 flex-1 items-end justify-center">
                        <div
                          className={`relative w-full rounded-t-lg transition-all duration-300 ${
                            isHigh
                              ? "bg-red-400"
                              : isMedium
                                ? "bg-amber-400"
                                : "bg-blue-500"
                          } group-hover:opacity-80`}
                          style={{
                            height: `${height}%`,
                          }}
                        >
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[8px] font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                            {item.value}%
                          </div>
                        </div>
                      </div>

                      <span className="mt-2 text-[8px] font-semibold text-slate-400">
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-5 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-[9px] font-medium text-slate-400">
                  Low
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-[9px] font-medium text-slate-400">
                  Medium
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="text-[9px] font-medium text-slate-400">
                  High
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RiskChart