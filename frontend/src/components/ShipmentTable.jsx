import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ShipmentTable() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/decisions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch decisions")
        }

        return response.json()
      })
      .then((data) => {
        console.log("Shipment table data:", data)
        setDecisions(data)
      })
      .catch((error) => {
        console.error("Shipment table error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const recentDecisions = decisions.slice(0, 5)

  const getRisk = (probability) => {
    const value = Number(probability)

    if (value < 0.3) {
      return "Low"
    }

    if (value <= 0.5) {
      return "Medium"
    }

    return "High"
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Recent Shipments
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Latest shipment risk assessments and recommendations
          </p>
        </div>

        <Link
          to="/decision-history"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          View all →
        </Link>

      </div>


      {/* Loading */}

      {loading && (
        <div className="px-6 py-10 text-center text-sm text-gray-400">
          Loading shipments...
        </div>
      )}


      {/* Empty State */}

      {!loading && recentDecisions.length === 0 && (
        <div className="px-6 py-10 text-center text-sm text-gray-400">
          No saved shipment decisions yet.
        </div>
      )}


      {/* Table */}

      {!loading && recentDecisions.length > 0 && (

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px] text-left">

            <thead>

              <tr className="border-b border-gray-100 text-xs text-gray-400">

                <th className="px-6 py-4 font-medium">
                  Shipment
                </th>

                <th className="px-6 py-4 font-medium">
                  Supplier
                </th>

                <th className="px-6 py-4 font-medium">
                  Product
                </th>

                <th className="px-6 py-4 font-medium">
                  Risk
                </th>

                <th className="px-6 py-4 font-medium">
                  Probability
                </th>

                <th className="px-6 py-4 font-medium">
                  Recommendation
                </th>

              </tr>

            </thead>


            <tbody>

              {recentDecisions.map((decision) => {

                const risk = getRisk(
                  decision.delay_probability
                )

                return (

                  <tr
                    key={decision.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        SHP-{String(decision.id).padStart(4, "0")}
                      </span>
                    </td>


                    <td className="px-6 py-4 text-sm text-gray-600">
                      {decision.supplier}
                    </td>


                    <td className="px-6 py-4 text-sm text-gray-600">
                      {decision.product}
                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          risk === "High"
                            ? "bg-gray-900 text-white"
                            : risk === "Medium"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {risk}
                      </span>

                    </td>


                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {(Number(
                        decision.delay_probability
                      ) * 100).toFixed(2)}%
                    </td>


                    <td className="px-6 py-4 text-sm text-gray-600">
                      {decision.selected_action}
                    </td>

                  </tr>

                )
              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  )
}

export default ShipmentTable