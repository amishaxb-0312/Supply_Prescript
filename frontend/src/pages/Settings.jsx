import { useEffect, useState } from "react"

function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("supplyprescript-theme") === "dark"
  })

  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    const root = document.documentElement

    if (darkMode) {
      root.classList.add("dark")
      localStorage.setItem("supplyprescript-theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("supplyprescript-theme", "light")
    }
  }, [darkMode])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-medium text-slate-400">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-slate-600">Settings</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Manage your SupplyPrescript workspace preferences.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        {/* Settings */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="text-sm font-bold text-slate-900">
              General Preferences
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Customize how the application looks and behaves.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Appearance */}
            <div className="flex flex-col justify-between gap-5 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm text-blue-600">
                    ◐
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Appearance
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Choose between light and dark interface.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setDarkMode(false)}
                  className={`rounded-md px-4 py-2 text-[9px] font-bold transition ${
                    !darkMode
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  ☀ Light
                </button>

                <button
                  type="button"
                  onClick={() => setDarkMode(true)}
                  className={`rounded-md px-4 py-2 text-[9px] font-bold transition ${
                    darkMode
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  ☾ Dark
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-sm text-violet-600">
                  ◉
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Notifications
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Receive system and decision updates.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNotifications((previous) => !previous)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  notifications ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* AI Engine */}
            <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-sm text-emerald-600">
                  ✦
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    AI Prediction Engine
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    XGBoost shipment delay prediction model.
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-emerald-600">
                Active
              </span>
            </div>

            {/* API */}
            <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-600">
                  ⇄
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Backend API
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    FastAPI service connection.
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5">
            <h2 className="text-sm font-bold text-slate-900">
              System Information
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Current application configuration.
            </p>
          </div>

          <div className="space-y-3 p-5">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Application
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                SupplyPrescript AI
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Frontend
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                React + Tailwind CSS
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Backend
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                FastAPI + Python
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Database
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                SQLite + SQLAlchemy
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Theme
              </p>

              <p className="mt-1 text-xs font-bold text-slate-800">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4">
            <p className="text-[9px] leading-4 text-slate-400">
              SupplyPrescript AI uses machine learning and optimization
              techniques to support supply chain risk decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings