import { useState } from "react"

function Prediction() {
  const [formData, setFormData] = useState({
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
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplier: formData.supplier,
          product: formData.product,
          distance_km: Number(formData.distance_km),
          order_quantity: Number(formData.order_quantity),
          supplier_reliability: Number(formData.supplier_reliability),
          historical_delay_rate: Number(formData.historical_delay_rate),
          lead_time_days: Number(formData.lead_time_days),
          inventory_level: Number(formData.inventory_level),
          supplier_capacity: Number(formData.supplier_capacity),
          shipping_cost: Number(formData.shipping_cost),
          weather_risk: Number(formData.weather_risk),
          demand_forecast: Number(formData.demand_forecast),
        }),
      })

      if (!response.ok) {
        throw new Error("Prediction request failed")
      }

      const data = await response.json()

      console.log("Prediction response:", data)

      setResult(data)

    } catch (err) {
      console.error(err)
      setError("Unable to connect to the prediction server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl">

      {/* Page Header */}
      <div>
        <p className="text-sm font-medium text-gray-400">
          Analysis
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          Shipment Prediction
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Analyze shipment data and predict the probability of delay.
        </p>
      </div>


      {/* Prediction Form */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Shipment Details
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Enter the required shipment information.
          </p>
        </div>


        <form onSubmit={handleSubmit}>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Supplier */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Supplier
              </label>

              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="e.g. Supplier A"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Product */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product
              </label>

              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Distance */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Distance (km)
              </label>

              <input
                type="number"
                name="distance_km"
                value={formData.distance_km}
                onChange={handleChange}
                placeholder="e.g. 1200"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Order Quantity */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Order Quantity
              </label>

              <input
                type="number"
                name="order_quantity"
                value={formData.order_quantity}
                onChange={handleChange}
                placeholder="e.g. 500"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Supplier Reliability */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Supplier Reliability
              </label>

              <input
                type="number"
                step="0.01"
                name="supplier_reliability"
                value={formData.supplier_reliability}
                onChange={handleChange}
                placeholder="e.g. 0.85"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Historical Delay Rate */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Historical Delay Rate
              </label>

              <input
                type="number"
                step="0.01"
                name="historical_delay_rate"
                value={formData.historical_delay_rate}
                onChange={handleChange}
                placeholder="e.g. 0.20"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Lead Time */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Lead Time (days)
              </label>

              <input
                type="number"
                name="lead_time_days"
                value={formData.lead_time_days}
                onChange={handleChange}
                placeholder="e.g. 15"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Inventory Level */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Inventory Level
              </label>

              <input
                type="number"
                name="inventory_level"
                value={formData.inventory_level}
                onChange={handleChange}
                placeholder="e.g. 800"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Supplier Capacity */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Supplier Capacity
              </label>

              <input
                type="number"
                name="supplier_capacity"
                value={formData.supplier_capacity}
                onChange={handleChange}
                placeholder="e.g. 5000"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Shipping Cost */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Shipping Cost
              </label>

              <input
                type="number"
                name="shipping_cost"
                value={formData.shipping_cost}
                onChange={handleChange}
                placeholder="e.g. 15000"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Weather Risk */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Weather Risk
              </label>

              <input
                type="number"
                step="0.01"
                name="weather_risk"
                value={formData.weather_risk}
                onChange={handleChange}
                placeholder="e.g. 0.40"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Demand Forecast */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Demand Forecast
              </label>

              <input
                type="number"
                name="demand_forecast"
                value={formData.demand_forecast}
                onChange={handleChange}
                placeholder="e.g. 1200"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>

          </div>


          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {error}
            </div>
          )}


          {/* Button */}
          <div className="mt-8 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Shipment"}
            </button>

          </div>

        </form>

      </div>


      {/* Prediction Result */}
      {result && (
  <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

    <p className="text-sm font-medium text-gray-400">
      Prediction Result
    </p>

    <h2 className="mt-1 text-2xl font-semibold text-gray-900">
      Shipment Analysis
    </h2>

    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

      {/* Delay Percentage */}
      <div className="rounded-xl bg-gray-50 p-5">
        <p className="text-sm text-gray-500">
          Delay Percentage
        </p>

        <p className="mt-2 text-xl font-semibold text-gray-900">
          {result.delay_percentage}%
        </p>
      </div>


      {/* Delay Probability */}
      <div className="rounded-xl bg-gray-50 p-5">
        <p className="text-sm text-gray-500">
          Delay Probability
        </p>

        <p className="mt-2 text-xl font-semibold text-gray-900">
          {(result.delay_probability * 100).toFixed(2)}%
        </p>
      </div>


      {/* Risk Level */}
      <div className="rounded-xl bg-gray-50 p-5">
        <p className="text-sm text-gray-500">
          Risk Level
        </p>

        <p className="mt-2 text-xl font-semibold text-gray-900">
          {result.risk_level}
        </p>
      </div>

    </div>

  </div>
)}

    </div>
  )
}

export default Prediction