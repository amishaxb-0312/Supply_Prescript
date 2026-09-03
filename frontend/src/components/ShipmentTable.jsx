import { Link } from "react-router-dom"

const shipments = [
  {
    id: "SHP-1001",
    supplier: "Supplier A",
    product: "Microchips",
    risk: "High",
    probability: "74%",
    action: "Air Freight",
  },
  {
    id: "SHP-1002",
    supplier: "Supplier B",
    product: "Steel Components",
    risk: "Medium",
    probability: "48%",
    action: "Standard Freight",
  },
  {
    id: "SHP-1003",
    supplier: "Supplier C",
    product: "Industrial Motors",
    risk: "Low",
    probability: "21%",
    action: "Ground Transport",
  },
  {
    id: "SHP-1004",
    supplier: "Supplier A",
    product: "Circuit Boards",
    risk: "High",
    probability: "81%",
    action: "Air Freight",
  },
  {
    id: "SHP-1005",
    supplier: "Supplier D",
    product: "Plastic Parts",
    risk: "Low",
    probability: "16%",
    action: "Standard Freight",
  },
]

function ShipmentTable() {
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

        {/* View All */}
        <Link
          to="/decision-history"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          View all →
        </Link>

      </div>


      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-left">

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

            {shipments.map((shipment) => (

              <tr
                key={shipment.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {shipment.id}
                  </span>
                </td>


                <td className="px-6 py-4 text-sm text-gray-600">
                  {shipment.supplier}
                </td>


                <td className="px-6 py-4 text-sm text-gray-600">
                  {shipment.product}
                </td>


                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      shipment.risk === "High"
                        ? "bg-gray-900 text-white"
                        : shipment.risk === "Medium"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {shipment.risk}
                  </span>

                </td>


                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {shipment.probability}
                </td>


                <td className="px-6 py-4 text-sm text-gray-600">
                  {shipment.action}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default ShipmentTable