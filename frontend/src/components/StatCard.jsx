function StatCard({ title, value, change, description }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <span className="text-gray-400">
          ↗
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">

        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            {value}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            {description}
          </p>
        </div>

        {change && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            {change}
          </span>
        )}

      </div>

    </div>
  )
}

export default StatCard