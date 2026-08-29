import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import StatCard from "./components/StatCard"
import RiskChart from "./components/RiskChart"
import RiskDistribution from "./components/RiskDistribution"
import ShipmentTable from "./components/ShipmentTable"

import Prediction from "./pages/Prediction"


function Dashboard() {
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
          title="Total Shipments"
          value="1,248"
          change="+12.5%"
          description="vs. last month"
        />

        <StatCard
          title="High Risk"
          value="24"
          change="-8.2%"
          description="delay-risk shipments"
        />

        <StatCard
          title="Decisions Made"
          value="86"
          change="+18.4%"
          description="optimized decisions"
        />

        <StatCard
          title="Estimated Savings"
          value="₹1.24L"
          change="+14.7%"
          description="from optimized actions"
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

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  )
}

export default App