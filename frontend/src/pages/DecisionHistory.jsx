import { useEffect, useState } from "react"

function DecisionHistory() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDecisions()
  }, [])

  const fetchDecisions = async () => {
    try {
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

  return (
    <div className="max-w-6xl">

      {/* Page Header */}

      <div>
        <p className="text-sm font-medium text-gray-400">
          Records
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          Decision History
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View previously saved supply-chain decisions.
        </p>
      </div>


      {/* Main Card */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Saved Decisions
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Review the actions selected for previous shipments.
            </p>
          </div>

          <button
            onClick={fetchDecisions}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Refresh
          </button>

        </div>


        {/* Loading */}

        {loading && (
          <div className="mt-8 py-10 text-center text-sm text-gray-500">
            Loading decisions...
          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            {error}
          </div>
        )}


        {/* Empty State */}

        {!loading && !error && decisions.length === 0 && (
          <div className="mt-8 rounded-xl bg-gray-50 py-12 text-center">

            <p className="text-sm font-medium text-gray-700">
              No decisions found
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Saved decisions will appear here.
            </p>

          </div>
        )}


        {/* Decision Table */}

        {!loading && !error && decisions.length > 0 && (

          <div className="mt-7 overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="border-b border-gray-200 text-left">

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Supplier
                  </th>

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Product
                  </th>

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Action
                  </th>

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Delay Probability
                  </th>

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Cost
                  </th>

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Expected Delay
                  </th>

                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Remaining Risk
                  </th>

                </tr>

              </thead>


              <tbody>

                {decisions.map((decision) => (

                  <tr
                    key={decision.id}
                    className="border-b border-gray-100 last:border-0"
                  >

                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {decision.supplier}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {decision.product}
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {decision.selected_action}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {(decision.delay_probability * 100).toFixed(2)}%
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      ₹{decision.action_cost}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {decision.expected_delay_days} days
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {Number(
                        decision.remaining_delay_risk
                      ).toFixed(2)}%
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