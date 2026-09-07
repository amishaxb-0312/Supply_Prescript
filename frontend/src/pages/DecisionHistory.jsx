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
      setError(err.message || "Unable to load decision history")
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

  const recordedCount = decisions.filter(
    (decision) => Number(decision.outcome_recorded) === 1
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-slate-600">Decision History</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Decision History
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Review saved supply chain decisions, risks and outcomes.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDecisions}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
        >
          <span className="text-sm">↻</span>
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Decisions
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {loading ? "..." : decisions.length}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Saved optimization decisions
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Evaluated
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {loading ? "..." : recordedCount}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Outcomes recorded
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {loading ? "..." : decisions.length - recordedCount}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Awaiting actual outcomes
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Saved Decisions
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Complete history of optimization decisions
            </p>
          </div>

          <span className="w-fit rounded-md bg-blue-50 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-blue-600">
            Live Data
          </span>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-slate-100" />

            <p className="mt-3 text-xs text-slate-400">
              Loading decision history...
            </p>
          </div>
        ) : error ? (
          <div className="m-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-xs font-medium text-red-600">
              {error}
            </p>
          </div>
        ) : decisions.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-xl text-slate-400">
              ◷
            </div>

            <p className="mt-4 text-xs font-bold text-slate-700">
              No decisions saved
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Saved optimization decisions will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {[
                    "Decision",
                    "Supplier",
                    "Product",
                    "Risk",
                    "Action",
                    "Cost",
                    "Expected Delay",
                    "Remaining Risk",
                    "Outcome",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400 first:pl-5"
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
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60"
                    >
                      <td className="px-4 py-4 pl-5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[9px] font-bold text-blue-600">
                            {String(decision.id).padStart(2, "0")}
                          </div>

                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              #{String(decision.id).padStart(4, "0")}
                            </p>

                            <p className="mt-0.5 text-[8px] text-slate-400">
                              Decision
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
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold ${risk.className}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${risk.dot}`}
                          />

                          {risk.label}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-semibold text-slate-700">
                          {decision.selected_action}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-slate-800">
                          ₹{Number(decision.action_cost).toFixed(0)}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs text-slate-600">
                          {decision.expected_delay_days} days
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-slate-700">
                          {(
                            Number(decision.remaining_delay_risk) * 100
                          ).toFixed(1)}
                          %
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

        {!loading && !error && decisions.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/40 px-5 py-3">
            <span className="text-[9px] text-slate-400">
              Showing {decisions.length} saved decisions
            </span>

            <span className="text-[9px] font-medium text-slate-400">
              SupplyPrescript Decision Engine
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DecisionHistory