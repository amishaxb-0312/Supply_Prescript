import { useEffect, useState } from "react"

function DecisionHistory() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchDecisions = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        "http://127.0.0.1:8000/decisions"
      )

      if (!response.ok) {
        throw new Error("Failed to fetch decisions")
      }

      const data = await response.json()

      console.log("Decision history:", data)

      setDecisions(data)
    } catch (err) {
      console.error(err)
      setError("Unable to load decision history.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDecisions()
  }, [])

  return (
    <div className="max-w-6xl">

      {/* Header */}

      <div>
        <p className="text-sm font-medium text-gray-400">
          Decision Management
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          Decision History
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Review previously saved optimization decisions.
        </p>
      </div>


      {/* Main Card */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Card Header */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Saved Decisions
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Optimization decisions recorded in the system
            </p>
          </div>

          <button
            onClick={fetchDecisions}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Refresh
          </button>

        </div>


        {/* Loading */}

        {loading && (
          <div className="px-6 py-12 text-center">

            <p className="text-sm text-gray-500">
              Loading decisions...
            </p>

          </div>
        )}


        {/* Error */}

        {error && !loading && (
          <div className="px-6 py-12 text-center">

            <p className="text-sm text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchDecisions}
              className="mt-4 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Try Again
            </button>

          </div>
        )}


        {/* Empty State */}

        {!loading &&
          !error &&
          decisions.length === 0 && (
            <div className="px-6 py-12 text-center">

              <p className="text-sm font-medium text-gray-700">
                No decisions found
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Saved recommendations will appear here.
              </p>

            </div>
          )}


        {/* Table */}

        {!loading &&
          !error &&
          decisions.length > 0 && (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-gray-100 text-xs text-gray-400">

                    <th className="px-6 py-4 font-medium">
                      ID
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Supplier
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Product
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Delay Risk
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Selected Action
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Cost
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Expected Delay
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Remaining Risk
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {decisions.map((decision) => (

                    <tr
                      key={decision.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <span className="text-sm font-medium text-gray-900">
                          #{decision.id}
                        </span>

                      </td>


                      <td className="px-6 py-4 text-sm text-gray-600">
                        {decision.supplier}
                      </td>


                      <td className="px-6 py-4 text-sm text-gray-600">
                        {decision.product}
                      </td>


                      <td className="px-6 py-4">

                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                          {(
                            decision.delay_probability * 100
                          ).toFixed(2)}
                          %
                        </span>

                      </td>


                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {decision.selected_action}
                      </td>


                      <td className="px-6 py-4 text-sm text-gray-600">
                        ₹
                        {Number(
                          decision.action_cost
                        ).toLocaleString()}
                      </td>


                      <td className="px-6 py-4 text-sm text-gray-600">
                        {decision.expected_delay_days} days
                      </td>


                      <td className="px-6 py-4 text-sm text-gray-600">
                        {(
                          decision.remaining_delay_risk * 100
                        ).toFixed(2)}
                        %
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </div>
  )
}

export default DecisionHistory