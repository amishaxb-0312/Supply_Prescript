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

  const probabilities = decisions.map((decision) =>
    Number(decision.delay_probability) * 100
  )

  const averageRisk =
    probabilities.length > 0
      ? probabilities.reduce((sum, value) => sum + value, 0) /
        probabilities.length
      : 0

  const points =
    probabilities.length > 0
      ? probabilities.slice(-12)
      : []

  const maxValue = Math.max(...points, 100)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Average Delay Risk
          </p>

          <h2 className="mt-1 text-3xl font-semibold text-gray-900">
            {loading ? "..." : `${averageRisk.toFixed(1)}%`}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Based on saved decisions
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">
          Last {Math.min(points.length, 12)} decisions
        </div>
      </div>

      {points.length > 0 ? (
        <div className="mt-8">
          <div className="flex h-44 items-end gap-2">
            {points.map((value, index) => (
              <div
                key={index}
                className="flex flex-1 items-end"
                title={`${value.toFixed(1)}%`}
              >
                <div
                  className="w-full rounded-t-lg bg-gray-900 transition-all duration-500"
                  style={{
                    height: `${Math.max((value / maxValue) * 100, 5)}%`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-400">
            <span>Older</span>
            <span>Recent</span>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-xl bg-gray-50 p-8 text-center">
          <p className="text-sm text-gray-500">
            No saved decisions available yet.
          </p>
        </div>
      )}
    </div>
  )
}

export default RiskChart