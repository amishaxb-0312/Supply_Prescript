import { useState } from "react"

const initialForm = {
  supplier: "",
  product: "",
  delay_probability: "",
  order_quantity: "",
  shipping_cost: "",
  budget: "",
  max_acceptable_delay: "7",
}

const inputFields = [
  {
    name: "supplier",
    label: "Supplier",
    placeholder: "e.g. Supplier A",
    type: "text",
  },
  {
    name: "product",
    label: "Product",
    placeholder: "e.g. Microchips",
    type: "text",
  },
  {
    name: "delay_probability",
    label: "Delay Probability",
    placeholder: "0.65",
    type: "number",
    step: "0.01",
    hint: "0 – 1",
  },
  {
    name: "order_quantity",
    label: "Order Quantity",
    placeholder: "1200",
    type: "number",
    suffix: "units",
  },
  {
    name: "shipping_cost",
    label: "Shipping Cost",
    placeholder: "10000",
    type: "number",
    suffix: "₹",
  },
  {
    name: "budget",
    label: "Available Budget",
    placeholder: "15000",
    type: "number",
    suffix: "₹",
  },
  {
    name: "max_acceptable_delay",
    label: "Max Acceptable Delay",
    placeholder: "7",
    type: "number",
    suffix: "days",
  },
]

function InputField({ field, value, onChange }) {
  return (
    <div>
      <label className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-700">
          {field.label}
        </span>

        {field.hint && (
          <span className="text-[9px] font-medium text-slate-400">
            {field.hint}
          </span>
        )}
      </label>

      <div className="relative">
        <input
          name={field.name}
          type={field.type}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          step={field.step || "1"}
          min="0"
          max={field.name === "delay_probability" ? "1" : undefined}
          required
          className={`h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            field.suffix ? "pr-16" : ""
          }`}
        />

        {field.suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-slate-400">
            {field.suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function Recommendations() {
  const [form, setForm] = useState(initialForm)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [savedAction, setSavedAction] = useState("")

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError("")
    setSavedAction("")
    setRecommendations([])

    try {
      const payload = {
        supplier: form.supplier,
        product: form.product,
        delay_probability: Number(form.delay_probability),
        order_quantity: Number(form.order_quantity),
        shipping_cost: Number(form.shipping_cost),
        budget: Number(form.budget),
        max_acceptable_delay: Number(form.max_acceptable_delay),
      }

      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to generate recommendations"
        )
      }

      setRecommendations(data.recommendations || [])
    } catch (err) {
      setError(err.message || "Unable to connect to backend")
    } finally {
      setLoading(false)
    }
  }

  const saveDecision = async (recommendation) => {
    try {
      setSavedAction("Saving decision...")

      const payload = {
        supplier: form.supplier,
        product: form.product,
        delay_probability: Number(form.delay_probability),
        selected_action: recommendation.action,
        action_cost: Number(recommendation.cost),
        expected_delay_days: Number(recommendation.delay_days),
        remaining_delay_risk:
          Number(recommendation.remaining_delay_risk) / 100,
      }

      const response = await fetch("http://127.0.0.1:8000/decision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Failed to save decision")
      }

      setSavedAction(`Saved: ${recommendation.action}`)
    } catch (err) {
      setSavedAction(err.message || "Failed to save decision")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-slate-600">Recommendations</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Decision Recommendations
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Find the optimal mitigation strategy based on risk, cost and constraints.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="text-sm text-violet-500">✦</span>

          <span className="text-[10px] font-bold text-violet-600">
            Optimization Engine
          </span>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-sm font-bold text-violet-600">
                01
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Optimization Inputs
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Define shipment and operational constraints.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            {inputFields.map((field) => (
              <InputField
                key={field.name}
                field={field}
                value={form[field.name]}
                onChange={handleChange}
              />
            ))}

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
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Optimizing Options..."
                : "Generate Recommendations →"}
            </button>
          </div>
        </form>

        {/* Recommendations */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Recommended Actions
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Strategies ranked by cost, risk and operational feasibility.
                </p>
              </div>

              {recommendations.length > 0 && (
                <span className="rounded-md bg-blue-50 px-2.5 py-1.5 text-[9px] font-bold text-blue-600">
                  {recommendations.length} OPTIONS
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 p-5 sm:p-6">
            {recommendations.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl text-violet-500 shadow-sm">
                  ✦
                </div>

                <p className="mt-4 text-xs font-bold text-slate-700">
                  No recommendations yet
                </p>

                <p className="mx-auto mt-1.5 max-w-[280px] text-[10px] leading-5 text-slate-400">
                  Submit the optimization inputs to calculate the most suitable
                  mitigation strategies.
                </p>
              </div>
            ) : (
              recommendations.map((recommendation, index) => {
                const isBest = index === 0

                return (
                  <div
                    key={`${recommendation.action}-${index}`}
                    className={`rounded-xl border p-4 transition sm:p-5 ${
                      isBest
                        ? "border-blue-200 bg-blue-50/60"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            isBest
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              {recommendation.action}
                            </h3>

                            {isBest && (
                              <span className="rounded-md bg-blue-600 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white">
                                Best Option
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-[10px] text-slate-400">
                            Optimization score{" "}
                            <span className="font-bold text-slate-600">
                              {Number(recommendation.score).toFixed(3)}
                            </span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => saveDecision(recommendation)}
                        className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-slate-800"
                      >
                        Save Decision
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <div className="rounded-lg bg-white p-3">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                          Cost
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-800">
                          ₹{Number(recommendation.cost).toFixed(0)}
                        </p>
                      </div>

                      <div className="rounded-lg bg-white p-3">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                          Delay
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-800">
                          {recommendation.delay_days} days
                        </p>
                      </div>

                      <div className="rounded-lg bg-white p-3">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                          Capacity
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-800">
                          {Number(recommendation.capacity).toFixed(0)}
                        </p>
                      </div>

                      <div className="rounded-lg bg-white p-3">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                          Remaining Risk
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-800">
                          {Number(
                            recommendation.remaining_delay_risk
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}

            {savedAction && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                  ✓
                </span>

                <span className="text-[10px] font-bold text-emerald-600">
                  {savedAction}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendations