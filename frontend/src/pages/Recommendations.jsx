import { useState } from "react"

function Recommendations() {
  const [formData, setFormData] = useState({
    supplier: "Supplier A",
    product: "Microchips",
    distance_km: 1200,
    order_quantity: 1200,
    supplier_reliability: 0.85,
    historical_delay_rate: 0.20,
    lead_time_days: 15,
    inventory_level: 800,
    supplier_capacity: 5000,
    shipping_cost: 12000,
    weather_risk: 0.40,
    demand_forecast: 1200,
    budget: 20000,
    max_acceptable_delay: 7,
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
      const response = await fetch(
        "http://127.0.0.1:8000/optimize",
        {
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
            historical_delay_rate: Number(
              formData.historical_delay_rate
            ),
            lead_time_days: Number(formData.lead_time_days),
            inventory_level: Number(formData.inventory_level),
            supplier_capacity: Number(
              formData.supplier_capacity
            ),
            shipping_cost: Number(formData.shipping_cost),
            weather_risk: Number(formData.weather_risk),
            demand_forecast: Number(formData.demand_forecast),
            budget: Number(formData.budget),
            max_acceptable_delay: Number(
              formData.max_acceptable_delay
            ),
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Optimization request failed")
      }

      const data = await response.json()

      console.log("Optimization response:", data)

      setResult(data)
    } catch (err) {
      console.error(err)
      setError(
        "Unable to connect to the optimization server."
      )
    } finally {
      setLoading(false)
    }
  }

  const bestRecommendation =
    result?.recommendations?.[0]

  return (
    <div className="max-w-6xl">

      {/* Header */}

      <div>
        <p className="text-sm font-medium text-gray-400">
          Decision Support
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          Recommendations
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Get optimized actions to reduce shipment delay risk.
        </p>
      </div>


      {/* Input Form */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Optimization Parameters
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Enter shipment information to generate an optimized recommendation.
          </p>
        </div>


        <form onSubmit={handleSubmit}>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

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
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
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
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
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
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
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
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
              />
            </div>


            {/* Budget */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Optimization Budget
              </label>

              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
              />
            </div>


            {/* Maximum Delay */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Maximum Acceptable Delay
              </label>

              <input
                type="number"
                name="max_acceptable_delay"
                value={formData.max_acceptable_delay}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
              />
            </div>

          </div>


          {error && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {error}
            </div>
          )}


          <div className="mt-7 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Optimizing..."
                : "Generate Recommendation"}
            </button>

          </div>

        </form>

      </div>


      {/* Recommendation Result */}

      {result && bestRecommendation && (

        <div className="mt-6">

          {/* Main Recommendation */}

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Recommended Action
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                  {bestRecommendation.action}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Best option based on cost, delay and remaining risk.
                </p>
                <button
  onClick={async () => {
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
            selected_action: bestRecommendation.action,
            action_cost: bestRecommendation.cost,
            expected_delay_days:
              bestRecommendation.expected_delay_days,
            remaining_delay_risk:
              bestRecommendation.remaining_delay_risk / 100,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to save decision")
      }

      const data = await response.json()

      alert(`Decision saved successfully! ID: ${data.decision_id}`)
    } catch (error) {
      console.error(error)
      alert("Unable to save decision.")
    }
  }}
  className="mt-5 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
>
  Save Decision
</button>

              </div>

              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                Optimized
              </span>

            </div>


            {/* Metrics */}

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-4">

              <div className="rounded-xl bg-gray-50 p-5">

                <p className="text-sm text-gray-500">
                  Estimated Cost
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  ₹{bestRecommendation.cost.toLocaleString()}
                </p>

              </div>


              <div className="rounded-xl bg-gray-50 p-5">

                <p className="text-sm text-gray-500">
                  Expected Delay
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {bestRecommendation.expected_delay_days} days
                </p>

              </div>


              <div className="rounded-xl bg-gray-50 p-5">

                <p className="text-sm text-gray-500">
                  Remaining Risk
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {bestRecommendation.remaining_delay_risk}%
                </p>

              </div>


              <div className="rounded-xl bg-gray-50 p-5">

                <p className="text-sm text-gray-500">
                  Original Risk
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {result.delay_percentage}%
                </p>

              </div>

            </div>

          </div>


          {/* Available Recommendations */}

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

            <div>

              <p className="text-sm font-medium text-gray-400">
                Optimization Results
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                Available Actions
              </h2>

            </div>


            <div className="mt-6 overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-gray-100 text-xs text-gray-400">

                    <th className="px-4 py-4 font-medium">
                      Action
                    </th>

                    <th className="px-4 py-4 font-medium">
                      Cost
                    </th>

                    <th className="px-4 py-4 font-medium">
                      Expected Delay
                    </th>

                    <th className="px-4 py-4 font-medium">
                      Remaining Risk
                    </th>

                    <th className="px-4 py-4 font-medium">
                      Score
                    </th>

                    <th className="px-4 py-4 font-medium">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {result.recommendations.map(
                    (recommendation, index) => (

                      <tr
                        key={recommendation.action}
                        className="border-b border-gray-50 last:border-0"
                      >

                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {recommendation.action}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600">
                          ₹{recommendation.cost.toLocaleString()}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600">
                          {recommendation.expected_delay_days} days
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600">
                          {recommendation.remaining_delay_risk}%
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600">
                          {recommendation.score}
                        </td>

                        <td className="px-4 py-4">

                          {index === 0 ? (

                            <span className="rounded-full bg-gray-900 px-2.5 py-1 text-xs font-medium text-white">
                              Recommended
                            </span>

                          ) : (

                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                              Available
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Recommendations