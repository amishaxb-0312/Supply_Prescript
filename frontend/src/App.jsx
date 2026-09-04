import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

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
    (decision) =>
      Number(decision.delay_probability) > 0.5
  ).length

  const averageRisk =
    totalDecisions > 0
      ? decisions.reduce(
          (sum, decision) =>
            sum + Number(decision.delay_probability),
          0
        ) / totalDecisions
      : 0

  const outcomesRecorded = decisions.filter(
    (decision) => decision.outcome_recorded
  ).length

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Supply Chain Overview
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor shipment risks and optimize supply chain decisions.
        </p>
      </div>


      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

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
          value={
            loading
              ? "..."
              : `${(averageRisk * 100).toFixed(1)}%`
          }
          subtitle="Across saved decisions"
        />

        <StatCard
          title="Outcomes Recorded"
          value={loading ? "..." : outcomesRecorded}
          subtitle="Completed evaluations"
        />

      </div>


      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">

        <RiskChart />

        <RiskDistribution />

      </div>


      {/* Shipment / Decision Table */}
      <ShipmentTable />

    </div>
  )
}


function App() {
  return (
    <BrowserRouter>

      <div className="flex min-h-screen bg-gray-50">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-8">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

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

        </main>

      </div>

    </BrowserRouter>
  )
}

export default App