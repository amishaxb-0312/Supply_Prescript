import { NavLink, Link } from "react-router-dom"

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "⌂",
  },
  {
    name: "Shipments",
    path: "/predictions",
    icon: "□",
  },
  {
    name: "Predictions",
    path: "/predictions",
    icon: "⌁",
  },
  {
    name: "Recommendations",
    path: "/recommendations",
    icon: "✦",
  },
  {
    name: "Decision History",
    path: "/decision-history",
    icon: "◷",
  },
  {
    name: "Performance",
    path: "/performance",
    icon: "↗",
  },
]

function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col bg-[#111c2e] text-white">
      {/* Logo */}
      <div className="border-b border-white/10 px-5 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
            SP
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-[16px] font-bold tracking-tight text-white">
              SupplyPrescript
            </h1>

            <p className="mt-0.5 text-[11px] font-medium text-slate-400">
              AI Supply Chain
            </p>
          </div>
        </Link>
      </div>

      {/* New Shipment */}
      <div className="px-4 pt-5">
        <Link
          to="/predictions"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
        >
          <span className="text-lg leading-none">+</span>
          <span>New Shipment</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Workspace
        </p>

        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-base transition ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* System */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
            System
          </p>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-base">
              ⚙
            </span>

            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            SM

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#111c2e] bg-emerald-400" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              Supply Manager
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Administrator
            </p>
          </div>

          <span className="text-slate-500">›</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar