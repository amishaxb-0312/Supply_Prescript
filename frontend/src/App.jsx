import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import StatCard from "./components/StatCard"
import RiskChart from "./components/RiskChart"
import RiskDistribution from "./components/RiskDistribution"
import ShipmentTable from "./components/ShipmentTable"

import Prediction from "./pages/Prediction"
import DecisionHistory from "./pages/DecisionHistory"


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

        console.log("Dashboard decisions:", data)

        setDecisions(data)

      })
      .catch((error) => {

        console.error("Dashboard error:", error)

      })
      .finally(() => {

        setLoading(false)

      })

  }, [])


  /* =========================
     KPI CALCULATIONS
  ========================= */

  const totalDecisions = decisions.length


  const highRisk = decisions.filter(
    (decision) =>
      Number(decision.delay_probability) >= 0.5
  ).length


  const averageDelayProbability =
    decisions.length > 0
      ? (
          decisions.reduce(
            (total, decision) =>
              total + Number(decision.delay_probability),
            0
          ) / decisions.length
        ) * 100
      : 0


  const totalActionCost =
    decisions.reduce(
      (total, decision) =>
        total + Number(decision.action_cost || 0),
      0
    )


  return (
    <>

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            Overview
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            Supply Chain Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Monitor shipments, predict delays and optimize decisions.
          </p>

        </div>


        <button className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
          + New Shipment
        </button>

      </div>


      {/* KPI Cards */}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">

        <StatCard
          title="Total Decisions"
          value={
            loading
              ? "..."
              : totalDecisions
          }
          change=""
          description="saved decisions"
        />


        <StatCard
          title="High Risk"
          value={
            loading
              ? "..."
              : highRisk
          }
          change=""
          description="delay-risk decisions"
        />


        <StatCard
          title="Avg Delay Probability"
          value={
            loading
              ? "..."
              : `${averageDelayProbability.toFixed(2)}%`
          }
          change=""
          description="across saved decisions"
        />


        <StatCard
          title="Total Action Cost"
          value={
            loading
              ? "..."
              : `₹${totalActionCost.toLocaleString("en-IN")}`
          }
          change=""
          description="optimization actions"
        />

      </div>


      {/* Analytics */}

      <div className="mt-6 grid grid-cols-1 gap-5 2xl:grid-cols-3">

        <div className="2xl:col-span-2">
          <RiskChart />
        </div>

        <RiskDistribution />

      </div>


      {/* Recent Shipments */}

      <ShipmentTable />

    </>
  )
}


function App() {

  return (

    <BrowserRouter>

      <div className="flex min-h-screen bg-[#f7f8fa]">

        <Sidebar />


        <main className="min-w-0 flex-1 px-8 py-7">

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
              path="/decision-history"
              element={<DecisionHistory />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  )
}


export default App