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

  const lowPercentage = total > 0 ? (lowRisk / total) * 100 : 0
  const mediumPercentage = total > 0 ? (mediumRisk / total) * 100 : 0
  const highPercentage = total > 0 ? (highRisk / total) * 100 : 0

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-gray-500">
          Risk Distribution
        </p>

        <h2 className="mt-1 text-2xl font-semibold text-gray-900">
          {loading ? "..." : total}
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Total saved decisions
        </p>
      </div>

      {/* No data */}
      {!loading && total === 0 && (
        <div className="mt-8 rounded-xl bg-gray-50 p-5 text-center">
          <p className="text-sm font-medium text-gray-600">
            No decisions recorded yet
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Save a recommendation to see risk distribution.
          </p>
        </div>
      )}

      {/* Distribution */}
      {total > 0 && (
        <div className="mt-8 space-y-5">

          {/* Low Risk */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600">
                Low Risk
              </span>

              <span className="font-medium text-gray-900">
                {lowPercentage.toFixed(0)}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-gray-900 transition-all duration-500"
                style={{
                  width: `${lowPercentage}%`,
                }}
              />
            </div>
          </div>

          {/* Medium Risk */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600">
                Medium Risk
              </span>

              <span className="font-medium text-gray-900">
                {mediumPercentage.toFixed(0)}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-gray-500 transition-all duration-500"
                style={{
                  width: `${mediumPercentage}%`,
                }}
              />
            </div>
          </div>

          {/* High Risk */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600">
                High Risk
              </span>

              <span className="font-medium text-gray-900">
                {highPercentage.toFixed(0)}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-gray-300 transition-all duration-500"
                style={{
                  width: `${highPercentage}%`,
                }}
              />
            </div>
          </div>

        </div>
      )}

    </div>
  )
}

export default RiskDistribution