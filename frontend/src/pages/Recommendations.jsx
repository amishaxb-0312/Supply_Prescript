import { useState } from "react"

function Recommendations() {
  const [formData, setFormData] = useState({
    order_quantity: "",
    shipping_cost: "",
    delay_probability: "",
    budget: "20000",
    max_acceptable_delay: "7",
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
        "http://127.0.0.1:8000/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_quantity: Number(formData.order_quantity),
            shipping_cost: Number(formData.shipping_cost),
            delay_probability: Number(
              formData.delay_probability
            ),
            budget: Number(formData.budget),
            max_acceptable_delay: Number(
              formData.max_acceptable_delay
            ),
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()

        throw new Error(
          errorData.detail ||
            "Recommendation request failed"
        )
      }

      const data = await response.json()

      console.log(
        "Recommendation response:",
        data
      )

      setResult(data)

    } catch (err) {
      console.error(err)

      setError(
        err.message ||
          "Unable to connect to the recommendation server."
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl">

      {/* Page Header */}

      <div>
        <p className="text-sm font-medium text-gray-400">
          Decision Support
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          Recommendations
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Find the best action to reduce shipment
          delay risk within your constraints.
        </p>
      </div>


      {/* Input Card */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Optimization Parameters
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Enter the shipment information and
            decision constraints.
          </p>
        </div>


        <form onSubmit={handleSubmit}>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">


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
                placeholder="e.g. 1200"
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
                placeholder="e.g. 12000"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </div>


            {/* Delay Probability */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Delay Probability
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                name="delay_probability"
                value={formData.delay_probability}
                onChange={handleChange}
                placeholder="e.g. 0.82"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Enter a value between 0 and 1.
              </p>
            </div>


            {/* Budget */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Maximum Budget
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
                placeholder="e.g. 7"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Maximum number of delay days allowed.
              </p>
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
              {loading
                ? "Optimizing..."
                : "Generate Recommendation"}
            </button>

          </div>

        </form>

      </div>


      {/* Recommended Action */}

      {result && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

          <p className="text-sm font-medium text-gray-400">
            Recommended Action
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-gray-900">
            {result.recommended_action}
          </h2>


          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">


            {/* Cost */}

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                Estimated Cost
              </p>

              <p className="mt-2 text-xl font-semibold text-gray-900">
                ₹{result.estimated_cost}
              </p>

            </div>


            {/* Delay */}

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                Expected Delay
              </p>

              <p className="mt-2 text-xl font-semibold text-gray-900">
                {result.expected_delay_days} days
              </p>

            </div>


            {/* Risk */}

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                Remaining Delay Risk
              </p>

              <p className="mt-2 text-xl font-semibold text-gray-900">
                {(
                  result.remaining_delay_risk * 100
                ).toFixed(2)}
                %
              </p>

            </div>

          </div>


          {/* Alternatives */}

          <div className="mt-8">

            <h3 className="text-base font-semibold text-gray-900">
              Available Recommendations
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Feasible actions ranked by optimization score.
            </p>


            <div className="mt-4 overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-gray-100 text-xs text-gray-400">

                    <th className="px-4 py-3 font-medium">
                      Action
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Cost
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Delay
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Remaining Risk
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Score
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {result.recommendations.map(
                    (recommendation, index) => (

                      <tr
                        key={recommendation.action}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                      >

                        <td className="px-4 py-4">

                          <span
                            className={
                              index === 0
                                ? "rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white"
                                : "text-sm text-gray-700"
                            }
                          >
                            {recommendation.action}
                          </span>

                        </td>


                        <td className="px-4 py-4 text-sm text-gray-600">
                          ₹{recommendation.cost}
                        </td>


                        <td className="px-4 py-4 text-sm text-gray-600">
                          {recommendation.delay_days} days
                        </td>


                        <td className="px-4 py-4 text-sm text-gray-600">
                          {(
                            recommendation.remaining_risk
                            * 100
                          ).toFixed(2)}
                          %
                        </td>


                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {recommendation.score}
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