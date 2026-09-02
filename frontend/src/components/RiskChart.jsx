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
        console.log("Risk chart data:", data)
        setDecisions(data)
      })
      .catch((error) => {
        console.error("Risk chart error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Convert delay probability into percentage
  const points = decisions
    .slice(0, 12)
    .reverse()
    .map((decision) =>
      Number(decision.delay_probability) * 100
    )

  // Average delay risk
  const averageRisk =
    decisions.length > 0
      ? (
          decisions.reduce(
            (total, decision) =>
              total + Number(decision.delay_probability),
            0
          ) / decisions.length
        ) * 100
      : 0

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            Delay Risk Overview
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-gray-900">
            {loading
              ? "..."
              : `${averageRisk.toFixed(1)}%`}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Average predicted delay risk
          </p>

        </div>


        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          Last {Math.min(decisions.length, 12)} decisions
        </span>

      </div>


      {/* Chart */}

      <div className="mt-8 flex h-48 items-end gap-3">

        {loading ? (

          <div className="flex w-full items-center justify-center text-sm text-gray-400">
            Loading chart...
          </div>

        ) : points.length === 0 ? (

          <div className="flex w-full items-center justify-center text-sm text-gray-400">
            No decision data available
          </div>

        ) : (

          points.map((point, index) => (

            <div
              key={index}
              className="flex flex-1 flex-col justify-end"
            >

              <div
                className="w-full rounded-t-lg bg-gray-900 transition-all hover:bg-gray-700"
                style={{
                  height: `${Math.max(point, 3)}%`,
                }}
                title={`${point.toFixed(2)}% delay risk`}
              />

            </div>

          ))

        )}

      </div>


      {/* Labels */}

      {points.length > 0 && (

        <div className="mt-3 flex justify-between text-xs text-gray-400">

          {points.map((_, index) => (
            <span key={index}>
              {index + 1}
            </span>
          ))}

        </div>

      )}

    </div>
  )
}

export default RiskChart