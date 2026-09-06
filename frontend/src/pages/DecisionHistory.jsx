import { useEffect, useState } from "react"

function DecisionHistory() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadDecisions = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://127.0.0.1:8000/decisions")

      if (!response.ok) {
        throw new Error("Failed to load decision history")
      }

      const data = await response.json()
      setDecisions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDecisions()
  }, [])

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-gray-600">Decision History</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Decision History
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review saved supply chain decisions and their predicted outcomes.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDecisions}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-950">
                Saved Decisions
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {decisions.length} total decisions
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
              Live data
            </span>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-sm text-gray-400">
            Loading decision history...
          </div>
        ) : error ? (
          <div className="m-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : decisions.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-xl">
              ◷
            </div>

            <p className="mt-4 text-sm font-semibold text-gray-700">
              No decisions saved
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Saved optimization decisions will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    "ID",
                    "Supplier",
                    "Product",
                    "Risk",
                    "Action",
                    "Action Cost",
                    "Expected Delay",
                    "Outcome",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {decisions.map((decision) => {
                  const risk = getRisk(decision.delay_probability)

                  return (
                    <tr
                      key={decision.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                    >
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-gray-900">
                          #{String(decision.id).padStart(4, "0")}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        {decision.supplier}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {decision.product}
                      </td>

                      <td className="px-5 py-4">
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${risk.className}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${risk.dot}`}
                          />

                          {risk.label}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                        {decision.selected_action}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                        ₹{Number(decision.action_cost).toFixed(0)}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {decision.expected_delay_days} days
                      </td>

                      <td className="px-5 py-4">
                        {Number(decision.outcome_recorded) === 1 ? (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                            Recorded
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default DecisionHistory