import { useState } from "react"

const initialForm = {
  supplier: "",
  product: "",
  distance_km: "",
  order_quantity: "",
  supplier_reliability: "",
  historical_delay_rate: "",
  lead_time_days: "",
  inventory_level: "",
  supplier_capacity: "",
  shipping_cost: "",
  weather_risk: "",
  demand_forecast: "",
}

function Prediction() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const payload = {
        supplier: form.supplier,
        product: form.product,
        distance_km: Number(form.distance_km),
        order_quantity: Number(form.order_quantity),
        supplier_reliability: Number(form.supplier_reliability),
        historical_delay_rate: Number(form.historical_delay_rate),
        lead_time_days: Number(form.lead_time_days),
        inventory_level: Number(form.inventory_level),
        supplier_capacity: Number(form.supplier_capacity),
        shipping_cost: Number(form.shipping_cost),
        weather_risk: Number(form.weather_risk),
        demand_forecast: Number(form.demand_forecast),
      }

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed")
      }

      setResult(data)
    } catch (err) {
      setError(err.message || "Unable to connect to backend")
    } finally {
      setLoading(false)
    }
  }

  const getRiskStyle = (risk) => {
    if (risk === "HIGH") {
      return "bg-red-50 text-red-600 border-red-100"
    }

    if (risk === "MEDIUM") {
      return "bg-amber-50 text-amber-600 border-amber-100"
    }

    return "bg-emerald-50 text-emerald-600 border-emerald-100"
  }

  const fields = [
    {
      name: "supplier",
      label: "Supplier",
      type: "text",
      placeholder: "e.g. Supplier A",
    },
    {
      name: "product",
      label: "Product",
      type: "text",
      placeholder: "e.g. Microchips",
    },
    {
      name: "distance_km",
      label: "Distance",
      type: "number",
      placeholder: "e.g. 850",
      suffix: "km",
    },
    {
      name: "order_quantity",
      label: "Order Quantity",
      type: "number",
      placeholder: "e.g. 1200",
      suffix: "units",
    },
    {
      name: "supplier_reliability",
      label: "Supplier Reliability",
      type: "number",
      placeholder: "0 - 1",
      step: "0.01",
    },
    {
      name: "historical_delay_rate",
      label: "Historical Delay Rate",
      type: "number",
      placeholder: "0 - 1",
      step: "0.01",
    },
    {
      name: "lead_time_days",
      label: "Lead Time",
      type: "number",
      placeholder: "e.g. 7",
      suffix: "days",
    },
    {
      name: "inventory_level",
      label: "Inventory Level",
      type: "number",
      placeholder: "e.g. 500",
      suffix: "units",
    },
    {
      name: "supplier_capacity",
      label: "Supplier Capacity",
      type: "number",
      placeholder: "e.g. 2500",
      suffix: "units",
    },
    {
      name: "shipping_cost",
      label: "Shipping Cost",
      type: "number",
      placeholder: "e.g. 10000",
      suffix: "₹",
    },
    {
      name: "weather_risk",
      label: "Weather Risk",
      type: "number",
      placeholder: "0 - 1",
      step: "0.01",
    },
    {
      name: "demand_forecast",
      label: "Demand Forecast",
      type: "number",
      placeholder: "e.g. 1500",
      suffix: "units",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-gray-600">Predictions</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-950">
          Shipment Prediction
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Enter shipment details to predict the probability of delivery delay.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-bold text-gray-950">
              Shipment Details
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Provide the shipment and supplier information.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={
                  field.name === "supplier" || field.name === "product"
                    ? "sm:col-span-1"
                    : ""
                }
              >
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  {field.label}
                </label>

                <div className="relative">
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    step={field.step}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                  />

                  {field.suffix && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                      {field.suffix}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="mx-6 mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="border-t border-gray-100 bg-gray-50/60 px-6 py-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analyzing Shipment..." : "Predict Delay Risk"}
            </button>
          </div>
        </form>

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Prediction Result
          </p>

          {!result ? (
            <div className="mt-8 rounded-xl bg-gray-50 px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                ◔
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-700">
                No prediction yet
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Complete the shipment form to generate an AI risk assessment.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-gray-950 p-5 text-white">
                <p className="text-xs text-gray-400">Delay Probability</p>

                <p className="mt-2 text-4xl font-bold">
                  {Number(result.delay_percentage).toFixed(1)}%
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Estimated shipment delay risk
                </p>
              </div>

              <div
                className={`rounded-xl border px-4 py-4 ${getRiskStyle(
                  result.risk_level
                )}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Risk Level
                  </span>

                  <span className="text-sm font-bold">
                    {result.risk_level}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Probability
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {(Number(result.delay_probability) * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    Ready
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Prediction