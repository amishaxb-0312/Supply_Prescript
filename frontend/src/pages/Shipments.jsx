function Shipments() {
  const shipments = [
    {
      id: "SHP-1001",
      supplier: "Supplier A",
      product: "Microchips",
      quantity: 1200,
      risk: "High",
      probability: "74%",
      status: "At Risk",
    },
    {
      id: "SHP-1002",
      supplier: "Supplier B",
      product: "Steel Components",
      quantity: 800,
      risk: "Medium",
      probability: "48%",
      status: "Monitoring",
    },
    {
      id: "SHP-1003",
      supplier: "Supplier C",
      product: "Industrial Motors",
      quantity: 500,
      risk: "Low",
      probability: "21%",
      status: "On Track",
    },
    {
      id: "SHP-1004",
      supplier: "Supplier A",
      product: "Circuit Boards",
      quantity: 1500,
      risk: "High",
      probability: "81%",
      status: "At Risk",
    },
    {
      id: "SHP-1005",
      supplier: "Supplier D",
      product: "Plastic Parts",
      quantity: 1000,
      risk: "Low",
      probability: "16%",
      status: "On Track",
    },
  ]

  return (
    <div className="max-w-6xl">

      {/* Header */}

      <div>
        <p className="text-sm font-medium text-gray-400">
          Workspace
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          Shipments
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Monitor shipment status and predicted delay risk.
        </p>
      </div>


      {/* Summary Cards */}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Shipments
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-900">
            1,248
          </p>

        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            High Risk
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-900">
            24
          </p>

        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            On Track
          </p>

          <p className="mt-2 text-2xl font-semibold text-gray-900">
            1,002
          </p>

        </div>

      </div>


      {/* Shipment Table */}

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-100 px-6 py-5">

          <h2 className="text-base font-semibold text-gray-900">
            Shipment Overview
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Current shipment status and risk assessment
          </p>

        </div>


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
                  Quantity
                </th>

                <th className="px-6 py-4 font-medium">
                  Risk
                </th>

                <th className="px-6 py-4 font-medium">
                  Probability
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
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


                  <td className="px-6 py-4 text-sm text-gray-600">
                    {shipment.quantity}
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
                    {shipment.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Shipments