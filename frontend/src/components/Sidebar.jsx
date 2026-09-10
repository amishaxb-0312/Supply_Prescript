import { NavLink, Link } from "react-router-dom"

const workspaceLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Predictions",
    path: "/predictions",
    icon: "◉",
  },
  {
    label: "Recommendations",
    path: "/recommendations",
    icon: "✦",
  },
  {
    label: "Decision History",
    path: "/decision-history",
    icon: "◷",
  },
  {
    label: "Performance",
    path: "/performance",
    icon: "▥",
  },
]

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[250px] flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0f172a]">
      {/* Logo */}
      <div className="px-5 py-6">
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111c2e] text-xs font-bold text-white shadow-md transition group-hover:scale-105">
            SP
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              SupplyPrescript
            </p>

            <p className="text-[9px] font-medium text-slate-400">
              AI Supply Chain
            </p>
          </div>
        </Link>
      </div>

      {/* Workspace */}
      <div className="px-4">
        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {workspaceLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm transition ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700 dark:group-hover:text-blue-400"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* System */}
      <div className="mt-7 px-4">
        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
          System
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700 dark:group-hover:text-blue-400"
                }`}
              >
                ⚙
              </span>

              <span>Settings</span>

              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </>
          )}
        </NavLink>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Profile */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            SM

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#0f172a]" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
              Supply Manager
            </p>

            <p className="text-[9px] text-slate-400">
              Administrator
            </p>
          </div>

          <span className="ml-auto text-xs text-slate-400">
            ›
          </span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar