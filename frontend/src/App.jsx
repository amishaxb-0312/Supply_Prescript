import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import StatCard from "./components/StatCard"
import RiskChart from "./components/RiskChart"
import RiskDistribution from "./components/RiskDistribution"
import ShipmentTable from "./components/ShipmentTable"

import Prediction from "./pages/Prediction"
import Recommendations from "./pages/Recommendations"
import DecisionHistory from "./pages/DecisionHistory"
import Performance from "./pages/Performance"

function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ☰
        </button>

        <div className="hidden max-w-[560px] flex-1 md:block">
          <div className="flex h-10 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-blue-400 focus-within:bg-white">
            <span className="text-lg text-slate-400">⌕</span>

            <input
              type="text"
              placeholder="Search shipments, suppliers, products..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="ml-4 flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ♧

          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
            3
          </span>
        </button>

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ♧

          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
            2
          </span>
        </button>

        <button
          type="button"
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:flex"
        >
          ⛶
        </button>

        <div className="hidden h-7 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            SM
          </span>

          <div className="hidden text-left lg:block">
            <p className="text-xs font-semibold text-slate-800">
              Supply Manager
            </p>

            <p className="text-[10px] text-slate-400">
              Administrator
            </p>
          </div>

          <span className="hidden text-xs text-slate-400 lg:block">
            ▾
          </span>
        </button>
      </div>
    </header>
  )
}

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
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
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

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-emerald-700">
              System Operational
            </span>
          </div>

          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:flex">
            <span className="text-slate-400">▣</span>

            <span className="text-xs font-medium text-slate-600">
              Today
            </span>
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
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <RiskChart />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <RiskDistribution />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <ShipmentTable />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#f5f7fb] text-slate-900">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <TopBar />

          <main>
            <div className="mx-auto w-full max-w-[1700px] p-5 sm:p-6 lg:p-7">
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

          <footer className="px-5 pb-5 sm:px-6 lg:px-7">
            <div className="flex flex-col justify-between gap-2 border-t border-slate-200 pt-4 text-[10px] text-slate-400 sm:flex-row">
              <span>
                © 2026 SupplyPrescript. All rights reserved.
              </span>

              <span>
                Smarter Decisions. Stronger Supply Chains.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App