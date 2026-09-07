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
        className: "bg-red-50 text-red-600",
        dot: "bg-red-500",
      }
    }

    if (value >= 0.3) {
      return {
        label: "Medium",
        className: "bg-amber-50 text-amber-600",
        dot: "bg-amber-500",
      }
    }

    return {
      label: "Low",
      className: "bg-emerald-50 text-emerald-600",
      dot: "bg-emerald-500",
    }
  }

  const getRecommendation = (action) => {
    if (!action) {
      return {
        label: "No action",
        icon: "—",
        className: "text-slate-400",
      }
    }

    if (action === "Air Freight") {
      return {
        label: action,
        icon: "✈",
        className: "text-blue-600",
      }
    }

    if (action === "Secondary Supplier") {
      return {
        label: action,
        icon: "◆",
        className: "text-violet-600",
      }
    }

    return {
      label: action,
      icon: "◷",
      className: "text-slate-500",
    }
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Recent Shipments
          </h2>

          <p className="mt-1 text-[11px] text-slate-400">
            Latest shipment risk assessments and recommendations
          </p>
        </div>

        <Link
          to="/decision-history"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          View All
          <span>→</span>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:px-6">
                Decision
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Supplier
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Product
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Risk
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Probability
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Recommendation
              </th>

              <th className="px-4 py-3 text-right text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-14 text-center text-xs text-slate-400"
                >
                  Loading recent shipments...
                </td>
              </tr>
            ) : recentDecisions.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-14 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-lg text-slate-400">
                    □
                  </div>

                  <p className="mt-3 text-xs font-semibold text-slate-600">
                    No shipment decisions found
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Saved decisions will appear here.
                  </p>
                </td>
              </tr>
            ) : (
              recentDecisions.map((decision) => {
                const risk = getRisk(decision.delay_probability)
                const recommendation = getRecommendation(
                  decision.selected_action
                )

                const probability =
                  Number(decision.delay_probability) * 100

                return (
                  <tr
                    key={decision.id}
                    className="border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50/60"
                  >
                    {/* Decision */}
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold text-blue-600">
                          {String(decision.id).padStart(2, "0")}
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            Decision #{decision.id}
                          </p>

                          <p className="mt-0.5 text-[9px] text-slate-400">
                            Risk assessment
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Supplier */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-slate-700">
                        {decision.supplier}
                      </span>
                    </td>

                    {/* Product */}
                    <td className="px-4 py-4">
                      <span className="text-xs text-slate-600">
                        {decision.product}
                      </span>
                    </td>

                    {/* Risk */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold ${risk.className}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${risk.dot}`}
                        />

                        {risk.label}
                      </span>
                    </td>

                    {/* Probability */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 text-xs font-bold text-slate-800">
                          {probability.toFixed(0)}%
                        </span>

                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              probability > 50
                                ? "bg-red-500"
                                : probability >= 30
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${Math.min(probability, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Recommendation */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm ${recommendation.className}`}
                        >
                          {recommendation.icon}
                        </span>

                        <span className="text-xs font-medium text-slate-700">
                          {recommendation.label}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-right">
                      {Number(decision.outcome_recorded) === 1 ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
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

      {/* Footer */}
      {recentDecisions.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/40 px-5 py-3 sm:px-6">
          <span className="text-[9px] text-slate-400">
            Showing {recentDecisions.length} recent decisions
          </span>

          <Link
            to="/decision-history"
            className="text-[9px] font-semibold text-blue-600 hover:text-blue-700"
          >
            Open decision history →
          </Link>
        </div>
      )}
    </div>
  )
}

export default ShipmentTable