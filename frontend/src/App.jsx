import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import StatCard from "./components/StatCard"
import RiskChart from "./components/RiskChart"
import RiskDistribution from "./components/RiskDistribution"
import ShipmentTable from "./components/ShipmentTable"

import Home from "./pages/Home"
import Prediction from "./pages/Prediction"
import DecisionHistory from "./pages/DecisionHistory"
import Recommendations from "./pages/Recommendations"
import Performance from "./pages/Performance"
import Settings from "./pages/Settings"

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f8fb] dark:bg-[#0b1120]">
      <Sidebar />

      <main className="min-h-screen pl-0 md:pl-[250px]">
        {children}
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-5 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              Overview
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Supply Chain Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Monitor shipments, predict delays and optimize decisions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/predictions"
            }}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#111c2e] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-blue-600 dark:shadow-blue-600/20 dark:hover:bg-blue-700"
          >
            <span className="text-base leading-none">+</span>
            New Prediction
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Decisions"
            value="11"
            subtitle="Saved decisions"
            trend="+22.2%"
            trendLabel="all time"
            icon="▣"
            iconClass="bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
          />

          <StatCard
            title="High Risk"
            value="2"
            subtitle="Above 50% delay risk"
            trend="2"
            trendLabel="high-risk decisions"
            icon="!"
            iconClass="bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
          />

          <StatCard
            title="Average Risk"
            value="37.3%"
            subtitle="Across saved decisions"
            trend="↓ 15.2%"
            trendLabel="vs previous"
            icon="◉"
            iconClass="bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400"
          />

          <StatCard
            title="Outcomes Recorded"
            value="2"
            subtitle="Completed evaluations"
            trend="100%"
            trendLabel="recorded"
            icon="✓"
            iconClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
          <section className="min-h-[390px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827] sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Delay Risk Overview
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Average predicted delay risk
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Last 12 periods
              </div>
            </div>

            <RiskChart />
          </section>

          <section className="min-h-[390px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827] sm:p-6">
            <div className="mb-5">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Risk Distribution
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Distribution of saved shipment decisions
              </p>
            </div>

            <RiskDistribution />
          </section>
        </div>

        {/* Recent Decisions */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827] sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Decisions
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Latest shipment risk assessments and recommendations
              </p>
            </div>

            <a
              href="/decision-history"
              className="text-[10px] font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
            >
              View all →
            </a>
          </div>

          <ShipmentTable />
        </section>
      </div>
    </DashboardLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Predictions */}
        <Route
          path="/predictions"
          element={
            <DashboardLayout>
              <Prediction />
            </DashboardLayout>
          }
        />

        {/* Recommendations */}
        <Route
          path="/recommendations"
          element={
            <DashboardLayout>
              <Recommendations />
            </DashboardLayout>
          }
        />

        {/* Decision History */}
        <Route
          path="/decision-history"
          element={
            <DashboardLayout>
              <DecisionHistory />
            </DashboardLayout>
          }
        />

        {/* Performance */}
        <Route
          path="/performance"
          element={
            <DashboardLayout>
              <Performance />
            </DashboardLayout>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App