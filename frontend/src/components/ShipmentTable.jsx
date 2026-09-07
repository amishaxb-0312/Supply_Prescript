import { useEffect, useState } from "react"

function ShipmentTable() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/decisions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load shipments")
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
    <div className="bg-white">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Recent Decisions
            </h2>

            <span className="rounded-md bg-slate-100 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-slate-500">
              Live
            </span>
          </div>

          <p className="mt-1 text-[10px] text-slate-400">
            Latest shipment optimization decisions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-[9px] font-semibold text-slate-500">
            {loading ? "Syncing..." : `${decisions.length} decisions`}
          </span>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-slate-100" />

          <p className="mt-3 text-[10px] text-slate-400">
            Loading recent decisions...
          </p>
        </div>
      ) : decisions.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-xl text-slate-400">
            ◷
          </div>

          <p className="mt-4 text-xs font-bold text-slate-700">
            No decisions yet
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Saved shipment decisions will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-5 py-3 text-left text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Decision
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Supplier
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Product
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Risk
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Cost
                </th>

                <th className="px-4 py-3 text-left text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Outcome
                </th>
              </tr>
            </thead>

            <tbody>
              {decisions
                .slice()
                .reverse()
                .slice(0, 8)
                .map((decision) => {
                  const risk = getRisk(decision.delay_probability)

                  return (
                    <tr
                      key={decision.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-bold text-blue-600">
                            {String(decision.id).padStart(2, "0")}
                          </div>

                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              #{String(decision.id).padStart(4, "0")}
                            </p>

                            <p className="mt-0.5 text-[8px] text-slate-400">
                              Shipment
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-semibold text-slate-700">
                          {decision.supplier}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs text-slate-600">
                          {decision.product}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold ${risk.className}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${risk.dot}`}
                            />

                            {risk.label}
                          </span>

                          <p className="mt-1 text-[8px] font-medium text-slate-400">
                            {(
                              Number(decision.delay_probability) * 100
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      </td>

                      <td className="max-w-[180px] px-4 py-4">
                        <span className="block truncate text-xs font-semibold text-slate-700">
                          {decision.selected_action}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-slate-800">
                          ₹{Number(decision.action_cost).toFixed(0)}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {Number(decision.outcome_recorded) === 1 ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Recorded
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
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      {!loading && decisions.length > 0 && (
        <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/40 px-5 py-3 sm:flex-row sm:items-center">
          <span className="text-[9px] text-slate-400">
            Showing the latest {Math.min(decisions.length, 8)} decisions
          </span>

          <span className="text-[9px] font-medium text-slate-400">
            SupplyPrescript AI
          </span>
        </div>
      )}
    </div>
  )
}

export default ShipmentTable