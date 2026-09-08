import { NavLink, Link } from "react-router-dom"

const navItems = [
  { name: "Dashboard", path: "/", icon: "⌂" },
  { name: "Predictions", path: "/predictions", icon: "◌" },
  { name: "Recommendations", path: "/recommendations", icon: "✦" },
  { name: "Decision History", path: "/decision-history", icon: "◷" },
  { name: "Performance", path: "/performance", icon: "↗" },
]

function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[250px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-100 px-5 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm">
            SP
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-[15px] font-bold tracking-tight text-slate-950">
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
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <span className="text-base leading-none">+</span>
          <span>New Shipment</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Workspace
        </p>

        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900"
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
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            System
          </p>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                isActive
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900"
                  }`}
                >
                  ⚙
                </span>

                <span>Settings</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
            SM

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-50 bg-emerald-500" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-900">
              Supply Manager
            </p>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Administrator
            </p>
          </div>

          <span className="text-slate-400">⋮</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar