import { useEffect, useState } from "react"

function Performance() {
  const [decisions, setDecisions] = useState([])
  const [selectedId, setSelectedId] = useState("")
  const [actualDelay, setActualDelay] = useState("")
  const [actualCost, setActualCost] = useState("")
  const [performance, setPerformance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/decisions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load decisions")
        }

        return response.json()
      })
      .then((data) => {
        setDecisions(data)

        if (data.length > 0) {
          setSelectedId(String(data[0].id))
        }
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const selectedDecision = decisions.find(
    (decision) => String(decision.id) === String(selectedId)
  )

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedId) {
      setError("Please select a decision.")
      return
    }

    setSubmitting(true)
    setError("")
    setPerformance(null)

    try {
      const outcomeResponse = await fetch(
        `http://127.0.0.1:8000/decision/${selectedId}/outcome`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actual_delay_days: Number(actualDelay),
            actual_cost: Number(actualCost),
          }),
        }
      )

      const outcomeData = await outcomeResponse.json()

      if (!outcomeResponse.ok) {
        throw new Error(
          outcomeData.detail || "Failed to record actual outcome"
        )
      }

      const performanceResponse = await fetch(
        `http://127.0.0.1:8000/decision/${selectedId}/performance`
      )

      const performanceData = await performanceResponse.json()

      if (!performanceResponse.ok) {
        throw new Error(
          performanceData.detail || "Failed to calculate performance"
        )
      }

      setPerformance(performanceData)

      setDecisions((previous) =>
        previous.map((decision) =>
          String(decision.id) === String(selectedId)
            ? {
                ...decision,
                actual_delay_days: Number(actualDelay),
                actual_cost: Number(actualCost),
                outcome_recorded: 1,
              }
            : decision
        )
      )
    } catch (err) {
      setError(err.message || "Unable to evaluate decision")
    } finally {
      setSubmitting(false)
    }
  }

  const getDifferenceClass = (value) => {
    const number = Number(value)

    if (number > 0) {
      return "text-red-600"
    }

    if (number < 0) {
      return "text-emerald-600"
    }

    return "text-gray-700"
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-gray-600">Performance</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-950">
          Decision Performance
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Compare predicted expectations with actual shipment outcomes.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-400 shadow-sm">
          Loading saved decisions...
        </div>
      ) : decisions.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-xl">
            ↗
          </div>

          <p className="mt-4 text-sm font-semibold text-gray-700">
            No decisions available
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Save a recommendation first to evaluate its performance.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-base font-bold text-gray-950">
                Record Outcome
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Enter the actual result after implementation.
              </p>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Select Decision
                </label>

                <select
                  value={selectedId}
                  onChange={(event) => {
                    setSelectedId(event.target.value)
                    setPerformance(null)
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 focus:bg-white"
                >
                  {decisions.map((decision) => (
                    <option key={decision.id} value={decision.id}>
                      #{String(decision.id).padStart(4, "0")} —{" "}
                      {decision.selected_action}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDecision && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Selected Decision
                  </p>

                  <p className="mt-2 text-sm font-bold text-gray-900">
                    {selectedDecision.selected_action}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-400">
                        Expected Delay
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-700">
                        {selectedDecision.expected_delay_days} days
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-400">
                        Expected Cost
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-700">
                        ₹
                        {Number(
                          selectedDecision.action_cost
                        ).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Actual Delay
                </label>

                <input
                  type="number"
                  min="0"
                  value={actualDelay}
                  onChange={(event) => setActualDelay(event.target.value)}
                  placeholder="e.g. 4"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm outline-none focus:border-gray-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Actual Cost
                </label>

                <input
                  type="number"
                  min="0"
                  value={actualCost}
                  onChange={(event) => setActualCost(event.target.value)}
                  placeholder="e.g. 14500"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm outline-none focus:border-gray-900 focus:bg-white"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
              >
                {submitting ? "Evaluating..." : "Evaluate Performance"}
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-base font-bold text-gray-950">
                Performance Analysis
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Prediction versus actual outcome.
              </p>
            </div>

            {!performance ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-xl">
                  ◔
                </div>

                <p className="mt-4 text-sm font-semibold text-gray-700">
                  Awaiting evaluation
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Record an actual outcome to generate the performance report.
                </p>
              </div>
            ) : (
              <div className="space-y-5 p-6">
                <div className="rounded-2xl bg-gray-950 p-5 text-white">
                  <p className="text-xs text-gray-400">
                    Evaluation Status
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {performance.outcome_status}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Decision #{String(performance.decision_id).padStart(4, "0")}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Predicted Risk
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-950">
                      {(
                        Number(performance.predicted_delay_risk) * 100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Expected Delay
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-950">
                      {performance.expected_delay_days} days
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Actual Delay
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-950">
                      {performance.actual_delay_days} days
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Actual Cost
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-950">
                      ₹{Number(performance.actual_cost).toFixed(0)}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-5">
                  <p className="text-xs font-bold text-gray-900">
                    Variance Analysis
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Expected Action Cost
                      </span>

                      <span className="text-sm font-bold text-gray-900">
                        ₹
                        {Number(
                          performance.expected_action_cost
                        ).toFixed(0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Cost Difference
                      </span>

                      <span
                        className={`text-sm font-bold ${getDifferenceClass(
                          performance.cost_difference
                        )}`}
                      >
                        ₹{Number(performance.cost_difference).toFixed(0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Delay Difference
                      </span>

                      <span
                        className={`text-sm font-bold ${getDifferenceClass(
                          performance.delay_difference_days
                        )}`}
                      >
                        {Number(
                          performance.delay_difference_days
                        ).toFixed(0)}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Performance