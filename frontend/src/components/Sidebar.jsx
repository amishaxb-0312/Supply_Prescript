import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-gray-200 bg-white px-5 py-6">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-bold">
          S
        </div>

        <span className="text-xl font-semibold tracking-tight">
          SupplyPrescript
        </span>
      </div>


      {/* Main Navigation */}
      <nav className="space-y-1">

        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          Workspace
        </p>


        {/* Dashboard */}
        <Link
          to="/"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        >
          <span>▦</span>
          Dashboard
        </Link>


        {/* Shipments */}
        <Link
          to="/shipments"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        >
          <span>◫</span>
          Shipments
        </Link>


        {/* Predictions */}
        <Link
          to="/predictions"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        >
          <span>⌁</span>
          Predictions
        </Link>


        {/* Recommendations */}
        <Link
          to="/recommendations"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        >
          <span>✦</span>
          Recommendations
        </Link>


        {/* Decision History */}
        <Link
          to="/decision-history"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        >
          <span>☷</span>
          Decision History
        </Link>


        {/* Performance */}
        <Link
          to="/performance"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        >
          <span>↗</span>
          Performance
        </Link>

      </nav>


      {/* Bottom */}
      <div className="absolute bottom-6 left-5 right-5">

        {/* Settings */}
        <button className="mb-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900">
          <span>⚙</span>
          Settings
        </button>


        {/* User */}
        <div className="border-t border-gray-200 pt-4">

          <div className="flex items-center gap-3 px-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
              A
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                Supply Manager
              </p>
            </div>

          </div>

        </div>

      </div>

    </aside>
  )
}

export default Sidebar