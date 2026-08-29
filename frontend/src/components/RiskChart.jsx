function RiskChart() {
  const points = [35, 42, 38, 55, 48, 65, 58, 72, 64, 78, 70, 82]

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Delay Risk Overview
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-gray-900">
            68.4%
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Average predicted delay risk
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          Last 12 periods
        </span>
      </div>

      {/* Chart */}
      <div className="mt-8 flex h-48 items-end gap-3">

        {points.map((point, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col justify-end"
          >
            <div
              className="w-full rounded-t-lg bg-gray-900 transition-all hover:bg-gray-700"
              style={{ height: `${point}%` }}
            />
          </div>
        ))}

      </div>

      {/* Labels */}
      <div className="mt-3 flex justify-between text-xs text-gray-400">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>

    </div>
  )
}

export default RiskChart