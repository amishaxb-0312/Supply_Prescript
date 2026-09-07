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
        setError(err.message || "Unable to load decisions")
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

  const getDifferenceStyle = (value) => {
    const number = Number(value)

    if (number > 0) {
      return {
        text: "text-red-600",
        bg: "bg-red-50",
        label: "Above expected",
      }
    }

    if (number < 0) {
      return {
        text: "text-emerald-600",
        bg: "bg-emerald-50",
        label: "Below expected",
      }
    }

    return {
      text: "text-slate-600",
      bg: "bg-slate-50",
      label: "On target",
    }
  }

  const costDifferenceStyle = performance
    ? getDifferenceStyle(performance.cost_difference)
    : null

  const delayDifferenceStyle = performance
    ? getDifferenceStyle(performance.delay_difference_days)
    : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-slate-600">Performance</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Decision Performance
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Compare predicted expectations with actual shipment outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-[10px] font-bold text-emerald-600">
            Outcome Evaluation
          </span>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-pulse rounded-lg bg-slate-100" />

          <p className="mt-3 text-xs text-slate-400">
            Loading saved decisions...
          </p>
        </div>
      ) : decisions.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-xl text-slate-400">
            ↗
          </div>

          <p className="mt-4 text-xs font-bold text-slate-700">
            No decisions available
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Save a recommendation first to evaluate its performance.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
          {/* Outcome Form */}
          <form
            onSubmit={handleSubmit}
            className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600">
                  01
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Record Outcome
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Enter the actual shipment result.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* Decision Select */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold text-slate-700">
                  Select Decision
                </label>

                <div className="relative">
                  <select
                    value={selectedId}
                    onChange={(event) => {
                      setSelectedId(event.target.value)
                      setPerformance(null)
                      setError("")
                    }}
                    className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3.5 pr-10 text-sm font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    {decisions.map((decision) => (
                      <option key={decision.id} value={decision.id}>
                        #{String(decision.id).padStart(4, "0")} —{" "}
                        {decision.selected_action}
                      </option>
                    ))}
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    ▾
                  </span>
                </div>
              </div>

              {/* Selected Decision */}
              {selectedDecision && (
                <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-blue-500">
                        Selected Action
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {selectedDecision.selected_action}
                      </p>
                    </div>

                    <span className="rounded-md bg-white px-2 py-1 text-[9px] font-bold text-blue-600 shadow-sm">
                      #{String(selectedDecision.id).padStart(4, "0")}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Expected Delay
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {selectedDecision.expected_delay_days} days
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3">
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Expected Cost
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-700">
                        ₹{Number(selectedDecision.action_cost).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actual Delay */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold text-slate-700">
                  Actual Delay
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={actualDelay}
                    onChange={(event) => setActualDelay(event.target.value)}
                    placeholder="e.g. 4"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 pr-16 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-slate-400">
                    days
                  </span>
                </div>
              </div>

              {/* Actual Cost */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold text-slate-700">
                  Actual Cost
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={actualCost}
                    onChange={(event) => setActualCost(event.target.value)}
                    placeholder="e.g. 14500"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 pr-16 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-slate-400">
                    ₹
                  </span>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-500">!</span>

                    <p className="text-xs font-medium text-red-600">
                      {error}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Evaluating Outcome..."
                  : "Evaluate Performance →"}
              </button>
            </div>
          </form>

          {/* Analysis */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Performance Analysis
                  </h2>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Prediction versus actual shipment outcome
                  </p>
                </div>

                {performance && (
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1.5 text-[9px] font-bold text-emerald-600">
                    EVALUATED
                  </span>
                )}
              </div>
            </div>

            {!performance ? (
              <div className="p-5 sm:p-6">
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl text-blue-500 shadow-sm">
                    ◔
                  </div>

                  <p className="mt-4 text-xs font-bold text-slate-700">
                    Awaiting evaluation
                  </p>

                  <p className="mx-auto mt-1.5 max-w-[300px] text-[10px] leading-5 text-slate-400">
                    Record the actual shipment outcome to compare it against
                    the prediction.
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3 text-center">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Prediction
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-600">
                      Risk
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3 text-center">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Actual
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-600">
                      Outcome
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3 text-center">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Variance
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-slate-600">
                      Difference
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 sm:p-6">
                {/* Status */}
                <div className="rounded-xl bg-[#111c2e] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Evaluation Status
                      </p>

                      <p className="mt-1.5 text-2xl font-bold">
                        {performance.outcome_status}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Decision #
                        {String(performance.decision_id).padStart(4, "0")}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                      ✓
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Predicted Risk
                    </p>

                    <p className="mt-1.5 text-xl font-bold text-slate-900">
                      {(
                        Number(performance.predicted_delay_risk) * 100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Expected Delay
                    </p>

                    <p className="mt-1.5 text-xl font-bold text-slate-900">
                      {performance.expected_delay_days} days
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Actual Delay
                    </p>

                    <p className="mt-1.5 text-xl font-bold text-slate-900">
                      {performance.actual_delay_days} days
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                      Actual Cost
                    </p>

                    <p className="mt-1.5 text-xl font-bold text-slate-900">
                      ₹{Number(performance.actual_cost).toFixed(0)}
                    </p>
                  </div>
                </div>

                {/* Variance */}
                <div className="mt-4 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Variance Analysis
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-400">
                        Difference between expected and actual results
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
                      <span className="text-[10px] font-medium text-slate-500">
                        Expected Action Cost
                      </span>

                      <span className="text-xs font-bold text-slate-800">
                        ₹
                        {Number(
                          performance.expected_action_cost
                        ).toFixed(0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
                      <div>
                        <span className="text-[10px] font-medium text-slate-500">
                          Cost Difference
                        </span>

                        <span
                          className={`ml-2 rounded-md px-1.5 py-1 text-[8px] font-bold ${costDifferenceStyle.bg} ${costDifferenceStyle.text}`}
                        >
                          {costDifferenceStyle.label}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold ${costDifferenceStyle.text}`}
                      >
                        ₹
                        {Number(
                          performance.cost_difference
                        ).toFixed(0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
                      <div>
                        <span className="text-[10px] font-medium text-slate-500">
                          Delay Difference
                        </span>

                        <span
                          className={`ml-2 rounded-md px-1.5 py-1 text-[8px] font-bold ${delayDifferenceStyle.bg} ${delayDifferenceStyle.text}`}
                        >
                          {delayDifferenceStyle.label}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold ${delayDifferenceStyle.text}`}
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