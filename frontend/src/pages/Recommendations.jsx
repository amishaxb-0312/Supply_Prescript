import { useState } from "react"

function Recommendations() {
  const [form, setForm] = useState({
    supplier: "",
    product: "",
    delay_probability: "",
    order_quantity: "",
    shipping_cost: "",
    budget: "",
    max_acceptable_delay: "7",
  })

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
        throw new Error(data.detail || "Unable to generate recommendations")
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
      setSavedAction("Saving...")

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
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-gray-600">Recommendations</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-950">
          Decision Recommendations
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Find the best mitigation strategy based on risk, cost and constraints.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-bold text-gray-950">
              Optimization Inputs
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Define your shipment and operational constraints.
            </p>
          </div>

          <div className="space-y-5 p-6">
            {[
              ["supplier", "Supplier", "Supplier A", "text"],
              ["product", "Product", "Microchips", "text"],
              ["delay_probability", "Delay Probability", "0.65", "number"],
              ["order_quantity", "Order Quantity", "1200", "number"],
              ["shipping_cost", "Shipping Cost", "10000", "number"],
              ["budget", "Available Budget", "15000", "number"],
              [
                "max_acceptable_delay",
                "Max Acceptable Delay",
                "7",
                "number",
              ],
            ].map(([name, label, placeholder, type]) => (
              <div key={name}>
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  {label}
                </label>

                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  step={name === "delay_probability" ? "0.01" : "1"}
                  min={name === "delay_probability" ? "0" : undefined}
                  max={name === "delay_probability" ? "1" : undefined}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                />
              </div>
            ))}

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? "Optimizing..." : "Generate Recommendations"}
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-950">
                  Recommended Actions
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Ranked from best to least suitable option.
                </p>
              </div>

              {recommendations.length > 0 && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
                  {recommendations.length} options
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 p-6">
            {recommendations.length === 0 ? (
              <div className="rounded-xl bg-gray-50 px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  ✦
                </div>

                <p className="mt-4 text-sm font-semibold text-gray-700">
                  No recommendations yet
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Submit the optimization inputs to see recommended actions.
                </p>
              </div>
            ) : (
              recommendations.map((recommendation, index) => {
                const isBest = index === 0

                return (
                  <div
                    key={`${recommendation.action}-${index}`}
                    className={`rounded-2xl border p-5 transition ${
                      isBest
                        ? "border-gray-900 bg-gray-950 text-white"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                            isBest
                              ? "bg-white/10 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`text-sm font-bold ${
                                isBest ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {recommendation.action}
                            </h3>

                            {isBest && (
                              <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                                Best Option
                              </span>
                            )}
                          </div>

                          <p
                            className={`mt-1 text-xs ${
                              isBest ? "text-gray-400" : "text-gray-400"
                            }`}
                          >
                            Score:{" "}
                            {Number(recommendation.score).toFixed(3)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => saveDecision(recommendation)}
                        className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                          isBest
                            ? "bg-white text-gray-950 hover:bg-gray-100"
                            : "bg-gray-950 text-white hover:bg-gray-800"
                        }`}
                      >
                        Save Decision
                      </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        ["Cost", `₹${Number(recommendation.cost).toFixed(0)}`],
                        ["Delay", `${recommendation.delay_days} days`],
                        [
                          "Capacity",
                          `${Number(recommendation.capacity).toFixed(0)}`,
                        ],
                        [
                          "Remaining Risk",
                          `${Number(
                            recommendation.remaining_delay_risk
                          ).toFixed(1)}%`,
                        ],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className={`rounded-xl p-3 ${
                            isBest ? "bg-white/5" : "bg-gray-50"
                          }`}
                        >
                          <p
                            className={`text-[9px] font-semibold uppercase tracking-wider ${
                              isBest ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {label}
                          </p>

                          <p
                            className={`mt-1 text-sm font-bold ${
                              isBest ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            )}

            {savedAction && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-600">
                {savedAction}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendations