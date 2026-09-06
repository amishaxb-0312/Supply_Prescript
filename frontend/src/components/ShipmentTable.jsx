import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ShipmentTable() {
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
        console.error("Shipment table error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const recentDecisions = [...decisions].reverse().slice(0, 6)

  const getRisk = (probability) => {
    const value = Number(probability)

    if (value > 0.5) {
      return {
        label: "High",
        className: "bg-red-50 text-red-600 ring-red-100",
        dot: "bg-red-500",
      }
    }

    if (value >= 0.3) {
      return {
        label: "Medium",
        className: "bg-amber-50 text-amber-600 ring-amber-100",
        dot: "bg-amber-500",
      }
    }

    return {
      label: "Low",
      className: "bg-emerald-50 text-emerald-600 ring-emerald-100",
      dot: "bg-emerald-500",
    }
  }

  const getRecommendation = (action) => {
    if (!action) return "—"

    if (action === "Air Freight") {
      return {
        label: action,
        icon: "✈",
        className: "text-violet-600",
      }
    }

    if (action === "Secondary Supplier") {
      return {
        label: action,
        icon: "◆",
        className: "text-blue-600",
      }
    }

    return {
      label: action,
      icon: "◷",
      className: "text-gray-600",
    }
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-base font-bold tracking-tight text-gray-950">
            Recent Shipments
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Latest shipment risk assessments and recommendations
          </p>
        </div>

        <Link
          to="/decision-history"
          className="text-xs font-semibold text-gray-900 transition hover:text-gray-500"
        >
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:px-6">
                Decision
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Supplier
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Product
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Risk
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Probability
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Recommendation
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-12 text-center text-sm text-gray-400"
                >
                  Loading recent shipments...
                </td>
              </tr>
            ) : recentDecisions.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-12 text-center text-sm text-gray-400"
                >
                  No shipment decisions found.
                </td>
              </tr>
            ) : (
              recentDecisions.map((decision) => {
                const risk = getRisk(decision.delay_probability)
                const recommendation = getRecommendation(
                  decision.selected_action
                )

                return (
                  <tr
                    key={decision.id}
                    className="border-b border-gray-100 last:border-b-0 transition hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          #{String(decision.id).padStart(4, "0")}
                        </p>

                        <p className="mt-0.5 text-[10px] text-gray-400">
                          Decision ID
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-700">
                        {decision.supplier}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">
                        {decision.product}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${risk.className}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${risk.dot}`}
                        />

                        {risk.label}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-gray-900">
                        {(Number(decision.delay_probability) * 100).toFixed(
                          0
                        )}
                        %
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {typeof recommendation === "string" ? (
                        <span className="text-sm text-gray-400">
                          {recommendation}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={recommendation.className}>
                            {recommendation.icon}
                          </span>

                          <span className="text-sm font-medium text-gray-700">
                            {recommendation.label}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4 text-right">
                      {Number(decision.outcome_recorded) === 1 ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShipmentTable