import { useEffect, useMemo, useState } from "react"

function RiskDistribution() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/decisions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load risk distribution")
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

  const distribution = useMemo(() => {
    const high = decisions.filter(
      (decision) => Number(decision.delay_probability) > 0.5
    ).length

    const medium = decisions.filter((decision) => {
      const probability = Number(decision.delay_probability)

      return probability >= 0.3 && probability <= 0.5
    }).length

    const low = decisions.filter(
      (decision) => Number(decision.delay_probability) < 0.3
    ).length

    return {
      high,
      medium,
      low,
      total: decisions.length,
    }
  }, [decisions])

  const getPercentage = (value) => {
    if (!distribution.total) {
      return 0
    }

    return (value / distribution.total) * 100
  }

  const highestRisk = useMemo(() => {
    if (!decisions.length) {
      return 0
    }

    return Math.max(
      ...decisions.map(
        (decision) => Number(decision.delay_probability) * 100
      )
    )
  }, [decisions])

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Risk Distribution
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            Current decision portfolio by risk level
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 px-3 py-2 text-right">
          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Total
          </p>

          <p className="mt-0.5 text-sm font-bold text-slate-900">
            {loading ? "..." : distribution.total}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex h-[250px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-slate-100" />

              <p className="mt-3 text-[10px] text-slate-400">
                Loading distribution...
              </p>
            </div>
          </div>
        ) : distribution.total === 0 ? (
          <div className="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg text-slate-400 shadow-sm">
                ◌
              </div>

              <p className="mt-3 text-xs font-bold text-slate-700">
                No decisions available
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Risk distribution will appear after saving decisions.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Main visual */}
            <div className="flex items-center gap-7">
              <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                      #ef4444 0% ${getPercentage(distribution.high)}%,
                      #f59e0b ${getPercentage(distribution.high)}% ${
                        getPercentage(distribution.high) +
                        getPercentage(distribution.medium)
                      }%,
                      #3b82f6 ${
                        getPercentage(distribution.high) +
                        getPercentage(distribution.medium)
                      }% 100%
                    )`,
                  }}
                />

                <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-2xl font-bold tracking-tight text-slate-900">
                    {distribution.total}
                  </span>

                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    Decisions
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                      <span className="text-xs font-semibold text-slate-700">
                        High Risk
                      </span>
                    </div>

                    <span className="text-xs font-bold text-slate-900">
                      {distribution.high}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-red-500 transition-all duration-500"
                      style={{
                        width: `${getPercentage(distribution.high)}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-[8px] text-slate-400">
                    {getPercentage(distribution.high).toFixed(1)}% of decisions
                  </p>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />

                      <span className="text-xs font-semibold text-slate-700">
                        Medium Risk
                      </span>
                    </div>

                    <span className="text-xs font-bold text-slate-900">
                      {distribution.medium}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-500"
                      style={{
                        width: `${getPercentage(distribution.medium)}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-[8px] text-slate-400">
                    {getPercentage(distribution.medium).toFixed(1)}% of decisions
                  </p>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                      <span className="text-xs font-semibold text-slate-700">
                        Low Risk
                      </span>
                    </div>

                    <span className="text-xs font-bold text-slate-900">
                      {distribution.low}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-500"
                      style={{
                        width: `${getPercentage(distribution.low)}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-[8px] text-slate-400">
                    {getPercentage(distribution.low).toFixed(1)}% of decisions
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom insight */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Highest Risk
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {highestRisk.toFixed(1)}%
                </p>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Risk Status
                </p>

                <p
                  className={`mt-1 text-xs font-bold ${
                    highestRisk > 50
                      ? "text-red-600"
                      : highestRisk >= 30
                        ? "text-amber-600"
                        : "text-emerald-600"
                  }`}
                >
                  {highestRisk > 50
                    ? "Attention Required"
                    : highestRisk >= 30
                      ? "Monitor"
                      : "Healthy"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RiskDistribution