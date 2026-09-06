import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

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
    <div className="min-h-full space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-gray-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-gray-600">Dashboard</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Supply Chain Overview
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Monitor shipment risks and optimize supply chain decisions.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
            System Status
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-gray-700">
              Operational
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
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <RiskChart />
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <RiskDistribution />
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <ShipmentTable />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#f7f8fa] text-gray-900">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1600px] p-5 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Prediction />} />
              <Route
                path="/recommendations"
                element={<Recommendations />}
              />
              <Route
                path="/decision-history"
                element={<DecisionHistory />}
              />
              <Route path="/performance" element={<Performance />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App