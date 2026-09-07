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

const fields = [
  {
    name: "supplier",
    label: "Supplier",
    placeholder: "e.g. Supplier A",
    type: "text",
    section: "Shipment Information",
  },
  {
    name: "product",
    label: "Product",
    placeholder: "e.g. Microchips",
    type: "text",
    section: "Shipment Information",
  },
  {
    name: "distance_km",
    label: "Distance",
    placeholder: "850",
    type: "number",
    suffix: "km",
    section: "Shipment Information",
  },
  {
    name: "order_quantity",
    label: "Order Quantity",
    placeholder: "1200",
    type: "number",
    suffix: "units",
    section: "Shipment Information",
  },
  {
    name: "lead_time_days",
    label: "Lead Time",
    placeholder: "7",
    type: "number",
    suffix: "days",
    section: "Shipment Information",
  },
  {
    name: "shipping_cost",
    label: "Shipping Cost",
    placeholder: "10000",
    type: "number",
    suffix: "₹",
    section: "Shipment Information",
  },
  {
    name: "supplier_reliability",
    label: "Supplier Reliability",
    placeholder: "0.80",
    type: "number",
    step: "0.01",
    section: "Risk Factors",
  },
  {
    name: "historical_delay_rate",
    label: "Historical Delay Rate",
    placeholder: "0.20",
    type: "number",
    step: "0.01",
    section: "Risk Factors",
  },
  {
    name: "weather_risk",
    label: "Weather Risk",
    placeholder: "0.30",
    type: "number",
    step: "0.01",
    section: "Risk Factors",
  },
  {
    name: "inventory_level",
    label: "Inventory Level",
    placeholder: "500",
    type: "number",
    suffix: "units",
    section: "Capacity & Demand",
  },
  {
    name: "supplier_capacity",
    label: "Supplier Capacity",
    placeholder: "2500",
    type: "number",
    suffix: "units",
    section: "Capacity & Demand",
  },
  {
    name: "demand_forecast",
    label: "Demand Forecast",
    placeholder: "1500",
    type: "number",
    suffix: "units",
    section: "Capacity & Demand",
  },
]

function InputField({ field, value, onChange }) {
  return (
    <div>
      <label className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-700">
          {field.label}
        </span>

        {field.step && (
          <span className="text-[9px] font-medium text-slate-400">
            0 – 1
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
          step={field.step}
          min={field.step ? "0" : "0"}
          max={field.step ? "1" : undefined}
          required
          className={`h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            field.suffix ? "pr-14" : ""
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
      return {
        wrapper: "border-red-100 bg-red-50",
        icon: "bg-red-100 text-red-600",
        text: "text-red-600",
      }
    }

    if (risk === "MEDIUM") {
      return {
        wrapper: "border-amber-100 bg-amber-50",
        icon: "bg-amber-100 text-amber-600",
        text: "text-amber-600",
      }
    }

    return {
      wrapper: "border-emerald-100 bg-emerald-50",
      icon: "bg-emerald-100 text-emerald-600",
      text: "text-emerald-600",
    }
  }

  const groupedFields = {
    "Shipment Information": fields.filter(
      (field) => field.section === "Shipment Information"
    ),
    "Risk Factors": fields.filter(
      (field) => field.section === "Risk Factors"
    ),
    "Capacity & Demand": fields.filter(
      (field) => field.section === "Capacity & Demand"
    ),
  }

  const riskStyle = result
    ? getRiskStyle(result.risk_level)
    : null

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-slate-600">Predictions</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Shipment Prediction
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Analyze shipment data and predict the probability of delivery delay.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />

          <span className="text-[10px] font-bold text-blue-600">
            AI Prediction Engine
          </span>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.55fr_0.75fr]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                01
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Shipment Details
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Enter the information required by the prediction model.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {Object.entries(groupedFields).map(
              ([section, sectionFields], sectionIndex) => (
                <div
                  key={section}
                  className={sectionIndex > 0 ? "mt-7 border-t border-slate-100 pt-7" : ""}
                >
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      {section}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {sectionFields.map((field) => (
                      <InputField
                        key={field.name}
                        field={field}
                        value={form[field.name]}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {error && (
            <div className="mx-5 mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 sm:mx-6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-500">!</span>

                <p className="text-xs font-medium text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <p className="text-[10px] text-slate-400">
              All fields are required for an accurate prediction.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analyzing Shipment..." : "Predict Delay Risk →"}
            </button>
          </div>
        </form>

        {/* Result */}
        <div className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Prediction Result
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  AI-generated shipment risk assessment
                </p>
              </div>

              <span className="rounded-md bg-slate-50 px-2 py-1 text-[9px] font-semibold text-slate-400">
                LIVE
              </span>
            </div>
          </div>

          {!result ? (
            <div className="p-5">
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl text-blue-500 shadow-sm">
                  ◔
                </div>

                <p className="mt-4 text-xs font-bold text-slate-700">
                  Awaiting shipment data
                </p>

                <p className="mx-auto mt-1.5 max-w-[220px] text-[10px] leading-5 text-slate-400">
                  Complete the form to generate an AI-powered delay prediction.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Model
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    XGBoost
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Output
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    Risk %
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5">
              {/* Main Result */}
              <div className="rounded-xl bg-[#111c2e] p-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Delay Probability
                    </p>

                    <p className="mt-2 text-4xl font-bold tracking-tight">
                      {Number(result.delay_percentage).toFixed(1)}%
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Estimated probability of shipment delay
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm">
                    AI
                  </div>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${Math.min(
                        Number(result.delay_percentage),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div
                className={`mt-4 rounded-lg border p-4 ${riskStyle.wrapper}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${riskStyle.icon}`}
                  >
                    !
                  </div>

                  <div className="flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Risk Level
                    </p>

                    <p className={`mt-0.5 text-sm font-bold ${riskStyle.text}`}>
                      {result.risk_level}
                    </p>
                  </div>

                  <span className={`text-lg font-bold ${riskStyle.text}`}>
                    {Number(result.delay_percentage).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Probability
                  </p>

                  <p className="mt-1.5 text-lg font-bold text-slate-900">
                    {(Number(result.delay_probability) * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Model Status
                  </p>

                  <p className="mt-1.5 text-lg font-bold text-emerald-600">
                    Ready
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-[10px] font-bold text-blue-700">
                  Recommendation
                </p>

                <p className="mt-1 text-[10px] leading-5 text-blue-600">
                  Use the Recommendations page to identify the most suitable
                  mitigation strategy for this shipment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Prediction