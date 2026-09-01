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
    budget: "",
    max_acceptable_delay: "",
  })

  const [result, setResult] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [selectedAction, setSelectedAction] = useState(null)

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState("")
  const [saveMessage, setSaveMessage] = useState("")

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
    setSaveMessage("")
    setResult(null)
    setRecommendations([])
    setSelectedAction(null)

    const shipmentData = {
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
      budget: Number(formData.budget),
      max_acceptable_delay: Number(formData.max_acceptable_delay),
    }

    try {
      // --------------------------------
      // STEP 1: PREDICTION
      // --------------------------------

      const predictionResponse = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shipmentData),
        }
      )

      if (!predictionResponse.ok) {
        throw new Error("Prediction request failed")
      }

      const predictionData = await predictionResponse.json()

      console.log("Prediction response:", predictionData)

      setResult(predictionData)


      // --------------------------------
      // STEP 2: OPTIMIZATION
      // --------------------------------

      const optimizeResponse = await fetch(
        "http://127.0.0.1:8000/optimize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shipmentData),
        }
      )

      if (!optimizeResponse.ok) {
        throw new Error("Optimization request failed")
      }

      const optimizeData = await optimizeResponse.json()

      console.log("Optimization response:", optimizeData)

      setRecommendations(optimizeData.recommendations || [])

    } catch (err) {
      console.error(err)

      setError(
        err.message || "Unable to connect to the prediction server."
      )
    } finally {
      setLoading(false)
    }
  }


  // --------------------------------
  // SAVE DECISION
  // --------------------------------

  const handleSaveDecision = async () => {
    if (!selectedAction || !result) {
      return
    }

    setSaving(true)
    setSaveMessage("")

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/decision",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier: formData.supplier,
            product: formData.product,

            delay_probability: result.delay_probability,

            selected_action: selectedAction.action,

            action_cost: selectedAction.cost,

            expected_delay_days:
              selectedAction.expected_delay_days,

            remaining_delay_risk:
              selectedAction.remaining_delay_risk,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to save decision")
      }

      const data = await response.json()

      console.log("Decision saved:", data)

      setSaveMessage("Decision saved successfully.")

    } catch (err) {
      console.error(err)

      setSaveMessage("Unable to save decision.")

    } finally {
      setSaving(false)
    }
  }


  return (
    <div className="max-w-6xl">

      {/* -------------------------------- */}
      {/* PAGE HEADER */}
      {/* -------------------------------- */}

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


      {/* -------------------------------- */}
      {/* PREDICTION FORM */}
      {/* -------------------------------- */}

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


            {/* Budget */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Budget
              </label>

              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. 20000"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />

            </div>


            {/* Maximum Acceptable Delay */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Maximum Acceptable Delay (days)
              </label>

              <input
                type="number"
                name="max_acceptable_delay"
                value={formData.max_acceptable_delay}
                onChange={handleChange}
                placeholder="e.g. 7"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />

            </div>

          </div>


          {/* ERROR */}

          {error && (

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {error}
            </div>

          )}


          {/* SUBMIT BUTTON */}

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


      {/* -------------------------------- */}
      {/* PREDICTION RESULT */}
      {/* -------------------------------- */}

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


      {/* -------------------------------- */}
      {/* RECOMMENDED ACTIONS */}
      {/* -------------------------------- */}

      {recommendations.length > 0 && (

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

          <p className="text-sm font-medium text-gray-400">
            Optimization
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-gray-900">
            Recommended Actions
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Recommended supply-chain actions based on cost, capacity and delay risk.
          </p>


          <div className="mt-6 space-y-4">

            {recommendations.map((recommendation, index) => (

              <div
                key={index}
                className={`rounded-xl border p-5 transition ${
                  selectedAction?.action === recommendation.action
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >


                {/* ACTION HEADER */}

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-base font-semibold text-gray-900">
                      {recommendation.action}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Expected delay: {recommendation.expected_delay_days} days
                    </p>

                  </div>


                  <span className="text-sm font-semibold text-gray-900">
                    ₹{recommendation.cost}
                  </span>

                </div>


                {/* ACTION DETAILS */}

                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">


                  {/* Remaining Risk */}

                  <div>

                    <p className="text-xs text-gray-400">
                      Remaining Risk
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {Number(
                        recommendation.remaining_delay_risk
                      ).toFixed(2)}
                      %
                    </p>

                  </div>


                  {/* Score */}

                  <div>

                    <p className="text-xs text-gray-400">
                      Score
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {recommendation.score}
                    </p>

                  </div>


                  {/* Rank */}

                  <div>

                    <p className="text-xs text-gray-400">
                      Rank
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      #{index + 1}
                    </p>

                  </div>

                </div>


                {/* SELECT ACTION */}

                <div className="mt-5 flex justify-end">

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAction(recommendation)
                      setSaveMessage("")
                    }}
                    className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                      selectedAction?.action === recommendation.action
                        ? "bg-black text-white"
                        : "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {selectedAction?.action === recommendation.action
                      ? "✓ Selected"
                      : "Select Action"}
                  </button>

                </div>

              </div>

            ))}


            {/* -------------------------------- */}
            {/* SAVE SELECTED DECISION */}
            {/* -------------------------------- */}

            {selectedAction && (

              <div className="mt-6 border-t border-gray-200 pt-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-400">
                      Selected Action
                    </p>

                    <p className="mt-1 text-base font-semibold text-gray-900">
                      {selectedAction.action}
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={handleSaveDecision}
                    disabled={saving}
                    className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Decision"}
                  </button>

                </div>


                {/* SAVE MESSAGE */}

                {saveMessage && (

                  <p className="mt-4 text-sm text-gray-600">
                    {saveMessage}
                  </p>

                )}

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  )
}

export default Prediction