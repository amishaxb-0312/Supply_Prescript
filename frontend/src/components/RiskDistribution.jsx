function RiskDistribution() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div>
        <p className="text-sm font-medium text-gray-500">
          Risk Distribution
        </p>

        <h2 className="mt-1 text-2xl font-semibold text-gray-900">
          1,248
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Total active shipments
        </p>
      </div>

      {/* Distribution */}
      <div className="mt-8 space-y-5">

        {/* Low */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              Low Risk
            </span>

            <span className="font-medium text-gray-900">
              62%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-gray-900"
              style={{ width: "62%" }}
            />
          </div>
        </div>

        {/* Medium */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              Medium Risk
            </span>

            <span className="font-medium text-gray-900">
              25%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-gray-500"
              style={{ width: "25%" }}
            />
          </div>
        </div>

        {/* High */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              High Risk
            </span>

            <span className="font-medium text-gray-900">
              13%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-gray-300"
              style={{ width: "13%" }}
            />
          </div>
        </div>

      </div>

    </div>
  )
}

export default RiskDistribution