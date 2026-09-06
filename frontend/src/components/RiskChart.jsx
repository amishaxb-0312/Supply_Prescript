import { useEffect, useState } from "react"

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

  const recentDecisions = decisions.slice(-12)

  const averageRisk =
    decisions.length > 0
      ? decisions.reduce(
          (sum, decision) => sum + Number(decision.delay_probability),
          0
        ) / decisions.length
      : 0

  const averagePercentage = averageRisk * 100

  return (
    <div className="h-full bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Average Delay Risk
          </p>

          <div className="mt-1 flex items-end gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">
              {loading ? "..." : `${averagePercentage.toFixed(1)}%`}
            </h2>

            <span className="mb-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
              {decisions.length} decisions
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Recent shipment risk trend
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 px-3 py-2 text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            Current
          </p>

          <p className="mt-0.5 text-sm font-bold text-gray-900">
            {recentDecisions.length > 0
              ? `${(
                  Number(
                    recentDecisions[recentDecisions.length - 1]
                      .delay_probability
                  ) * 100
                ).toFixed(0)}%`
              : "—"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex h-36 items-center justify-center rounded-xl bg-gray-50">
            <p className="text-sm text-gray-400">Loading risk data...</p>
          </div>
        ) : recentDecisions.length === 0 ? (
          <div className="flex h-36 items-center justify-center rounded-xl bg-gray-50">
            <p className="text-sm text-gray-400">
              No saved decisions yet.
            </p>
          </div>
        ) : (
          <div className="flex h-36 items-end gap-2 rounded-xl bg-gray-50 px-4 pb-4 pt-5">
            {recentDecisions.map((decision, index) => {
              const probability = Number(decision.delay_probability)
              const percentage = probability * 100

              const height = Math.max(
                10,
                Math.min(100, percentage)
              )

              return (
                <div
                  key={decision.id ?? index}
                  className="group flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div className="relative mb-2 w-full max-w-[34px]">
                    <div
                      className="w-full rounded-t-lg bg-gray-900 transition-all duration-300 group-hover:bg-gray-700"
                      style={{
                        height: `${height}px`,
                      }}
                    />

                    <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-gray-950 px-1.5 py-1 text-[9px] font-semibold text-white opacity-0 shadow-sm transition group-hover:opacity-100">
                      {percentage.toFixed(0)}%
                    </div>
                  </div>

                  <span className="text-[9px] font-medium text-gray-400">
                    #{index + 1}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs text-gray-400">
          Lower risk is better
        </span>

        <span className="text-xs font-semibold text-gray-600">
          Last {recentDecisions.length} decisions
        </span>
      </div>
    </div>
  )
}

export default RiskChart