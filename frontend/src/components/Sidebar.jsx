import { NavLink, Link } from "react-router-dom"

function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Shipments",
      path: "/predictions",
    },
    {
      name: "Predictions",
      path: "/predictions",
    },
    {
      name: "Recommendations",
      path: "/recommendations",
    },
    {
      name: "Decision History",
      path: "/decision-history",
    },
    {
      name: "Performance",
      path: "/performance",
    },
  ]

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white px-5 py-6">

      {/* Logo */}
      <div className="mb-8">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
            SP
          </div>

          <div>
            <h1 className="text-base font-bold text-gray-900">
              SupplyPrescript
            </h1>

            <p className="text-xs text-gray-400">
              AI Supply Chain
            </p>
          </div>
        </Link>
      </div>


      {/* New Shipment */}
      <Link
        to="/predictions"
        className="mb-7 flex items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        + New Shipment
      </Link>


      {/* Navigation */}
      <nav className="flex-1 space-y-1">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {item.name}
          </NavLink>
        )}

        <div className="mt-8">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            System
          </p>

          <button
            type="button"
            className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
          >
            Settings
          </button>

        </div>

      </nav>


      {/* User Profile */}
      <div className="border-t border-gray-200 pt-5">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
            SM
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              Supply Manager
            </p>

            <p className="truncate text-xs text-gray-400">
              Admin
            </p>
          </div>

        </div>

      </div>

    </aside>
  )
}

export default Sidebar