import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import StatCard from "./components/StatCard"
import RiskChart from "./components/RiskChart"
import RiskDistribution from "./components/RiskDistribution"
import ShipmentTable from "./components/ShipmentTable"

import Prediction from "./pages/Prediction"
import Recommendations from "./pages/Recommendations"
import DecisionHistory from "./pages/DecisionHistory"
import Performance from "./pages/Performance"

function Dashboard() {
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/decisions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch decisions")
        }

        return response.json()
      })
      .then((data) => {
        setDecisions(data)
      })
      .catch((error) => {
        console.error("Dashboard error:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const totalDecisions = decisions.length

  const highRisk = decisions.filter(
    (decision) => Number(decision.delay_probability) > 0.5
  ).length

  const averageRisk =
    totalDecisions > 0
      ? decisions.reduce(
          (sum, decision) => sum + Number(decision.delay_probability),
          0
        ) / totalDecisions
      : 0

  const outcomesRecorded = decisions.filter(
    (decision) => Number(decision.outcome_recorded) === 1
  ).length

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-medium text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-slate-600">Dashboard</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Supply Chain Overview
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Monitor shipment risks and optimize supply chain decisions.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
              System Status
            </p>

            <p className="mt-0.5 text-xs font-bold text-slate-700">
              Operational
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Decisions"
          value={loading ? "..." : totalDecisions}
          subtitle="Saved decisions"
        />

        <StatCard
          title="High Risk"
          value={loading ? "..." : highRisk}
          subtitle="Above 50% delay risk"
        />

        <StatCard
          title="Average Risk"
          value={loading ? "..." : `${(averageRisk * 100).toFixed(1)}%`}
          subtitle="Across saved decisions"
        />

        <StatCard
          title="Outcomes Recorded"
          value={loading ? "..." : outcomesRecorded}
          subtitle="Completed evaluations"
        />
      </div>

      {/* Analytics */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <RiskChart />
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <RiskDistribution />
        </div>
      </div>

      {/* Recent Decisions */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <ShipmentTable />
      </div>
    </div>
  )
}

function PageFrame() {
  const location = useLocation()

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("supplyprescript-theme") === "dark"
  })

  const isDashboard = location.pathname === "/"

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
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f6f8fb]/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  SupplyPrescript AI
                </p>

                <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                  Intelligent supply chain management
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                  type="button"
                  onClick={() => setDarkMode((previous) => !previous)}
                  aria-label={
                    darkMode
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  title={
                    darkMode
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                  className="group flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[9px] font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="text-sm">
                    {darkMode ? "☀" : "☾"}
                  </span>

                  <span className="hidden sm:inline">
                    {darkMode ? "Light" : "Dark"}
                  </span>
                </button>

                {/* API Status */}
                <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-[9px] font-semibold text-slate-500">
                    API Connected
                  </span>
                </div>

                {/* User */}
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 shadow-sm">
                  SM
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="mx-auto w-full max-w-[1500px] px-5 py-6 sm:px-6 lg:px-8 lg:py-7">
            {!isDashboard && (
              <div className="mb-1 h-0.5 w-10 rounded-full bg-blue-600" />
            )}

            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/predictions"
                element={<Prediction />}
              />

              <Route
                path="/recommendations"
                element={<Recommendations />}
              />

              <Route
                path="/decision-history"
                element={<DecisionHistory />}
              />

              <Route
                path="/performance"
                element={<Performance />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <PageFrame />
    </BrowserRouter>
  )
}

export default App