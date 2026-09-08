import { Link } from "react-router-dom"

const features = [
  {
    icon: "◉",
    iconClass: "bg-violet-100 text-violet-600",
    title: "AI-Powered Prediction",
    description:
      "Uses XGBoost to predict shipment delays and estimate delivery risk.",
  },
  {
    icon: "✓",
    iconClass: "bg-emerald-100 text-emerald-600",
    title: "Risk Assessment",
    description:
      "Analyzes suppliers, routes and shipment conditions to identify risk.",
  },
  {
    icon: "⚙",
    iconClass: "bg-blue-100 text-blue-600",
    title: "Optimization Engine",
    description:
      "Recommends the best mitigation strategy based on cost and constraints.",
  },
  {
    icon: "▣",
    iconClass: "bg-amber-100 text-amber-600",
    title: "Track & Learn",
    description:
      "Stores decisions and actual outcomes to measure performance over time.",
  },
  {
    icon: "▥",
    iconClass: "bg-violet-100 text-violet-600",
    title: "Performance Insights",
    description:
      "Compare predicted and actual results to understand decision quality.",
  },
]

const workflow = [
  {
    number: "1",
    icon: "↥",
    title: "Input Data",
    description: "Add shipment details, constraints and preferences.",
    className: "bg-blue-100 text-blue-600",
  },
  {
    number: "2",
    icon: "◉",
    title: "Predict & Analyze",
    description: "AI model detects risks and estimates delay probability.",
    className: "bg-violet-100 text-violet-600",
  },
  {
    number: "3",
    icon: "✦",
    title: "Get Recommendations",
    description: "Optimization engine suggests the best actions.",
    className: "bg-emerald-100 text-emerald-600",
  },
  {
    number: "4",
    icon: "▥",
    title: "Track & Improve",
    description: "Record outcomes and measure decision performance.",
    className: "bg-blue-100 text-blue-600",
  },
]

function SupplyChainVisual() {
  return (
    <div className="relative mx-auto h-[470px] w-full max-w-[680px]">
      {/* Background glow */}
      <div className="absolute inset-x-8 top-12 h-[360px] rounded-full bg-blue-100/60 blur-3xl" />

      {/* World/map-style background */}
      <div className="absolute left-8 top-14 h-[320px] w-[520px] rounded-[48%] bg-gradient-to-br from-blue-50 via-sky-100/80 to-blue-50">
        <div className="absolute inset-8 opacity-50">
          {/* Decorative route lines */}
          <div className="absolute left-[15%] top-[32%] h-px w-[55%] rotate-[12deg] border-t-2 border-dashed border-blue-300" />
          <div className="absolute left-[25%] top-[55%] h-px w-[60%] -rotate-[18deg] border-t-2 border-dashed border-blue-300" />
          <div className="absolute left-[45%] top-[25%] h-[130px] w-px rotate-[35deg] border-l-2 border-dashed border-blue-200" />

          {/* Map dots */}
          <span className="absolute left-[20%] top-[27%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />
          <span className="absolute left-[47%] top-[48%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />
          <span className="absolute left-[72%] top-[30%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />
          <span className="absolute left-[64%] top-[68%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />
        </div>
      </div>

      {/* Airplane */}
      <div className="absolute right-12 top-4 rotate-[-10deg] text-5xl drop-shadow-md">
        ✈
      </div>

      {/* Ship */}
      <div className="absolute bottom-[78px] left-[68px] z-10">
        <div className="relative">
          <div className="absolute bottom-[-7px] left-[-20px] h-3 w-[185px] rounded-full bg-blue-300/40 blur-sm" />

          <div className="relative h-8 w-[155px] rounded-b-[45%] rounded-t-md bg-slate-800">
            <div className="absolute left-4 top-[-24px] flex gap-1">
              <span className="h-7 w-7 rounded-sm bg-orange-400" />
              <span className="h-7 w-7 rounded-sm bg-blue-500" />
              <span className="h-7 w-7 rounded-sm bg-red-400" />
              <span className="h-7 w-7 rounded-sm bg-emerald-400" />
            </div>

            <div className="absolute right-4 top-[-18px] h-5 w-12 rounded-t-md bg-white" />
          </div>

          <div className="absolute -bottom-5 left-[-8px] h-3 w-[175px] rounded-full bg-blue-300/50" />
        </div>
      </div>

      {/* Truck */}
      <div className="absolute bottom-[70px] left-[270px] z-10">
        <div className="relative flex items-end">
          <div className="h-[62px] w-[110px] rounded-md rounded-br-sm bg-slate-700 shadow-lg">
            <div className="m-2 h-10 rounded bg-slate-100/90" />

            <div className="absolute bottom-[-10px] left-4 h-5 w-5 rounded-full border-4 border-slate-700 bg-slate-300" />
            <div className="absolute bottom-[-10px] right-4 h-5 w-5 rounded-full border-4 border-slate-700 bg-slate-300" />
          </div>

          <div className="h-[48px] w-[48px] rounded-r-md bg-blue-500 shadow-lg">
            <div className="mt-2 h-5 w-8 rounded-r bg-blue-200/80" />
          </div>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="absolute right-[20px] top-[105px] z-20 w-[280px] rounded-2xl border border-white/80 bg-white p-5 shadow-2xl shadow-blue-900/10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Shipment Delay Prediction
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              23%
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">
              Estimated delay risk
            </p>
          </div>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[7px] border-slate-100">
            <div className="absolute inset-[-7px] rounded-full border-[7px] border-transparent border-t-red-400 border-r-red-400 rotate-[-30deg]" />

            <span className="text-[9px] font-bold text-slate-600">
              LOW
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-[9px] font-medium text-slate-500">
              On Time
            </span>

            <span className="ml-auto text-[9px] font-bold text-slate-700">
              77%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />

            <span className="text-[9px] font-medium text-slate-500">
              Delayed
            </span>

            <span className="ml-auto text-[9px] font-bold text-slate-700">
              23%
            </span>
          </div>
        </div>
      </div>

      {/* Risk Trend Card */}
      <div className="absolute right-[-5px] top-[285px] z-20 w-[155px] rounded-2xl border border-white/80 bg-white p-4 shadow-xl shadow-blue-900/10">
        <p className="text-[9px] font-bold text-blue-600">
          Risk Trend
        </p>

        <div className="mt-4 flex h-12 items-end gap-1.5">
          <span className="h-[30%] w-3 rounded-t bg-blue-200" />
          <span className="h-[48%] w-3 rounded-t bg-blue-300" />
          <span className="h-[38%] w-3 rounded-t bg-blue-300" />
          <span className="h-[65%] w-3 rounded-t bg-blue-400" />
          <span className="h-[52%] w-3 rounded-t bg-blue-400" />
          <span className="h-[82%] w-3 rounded-t bg-blue-500" />
          <span className="h-[95%] w-3 rounded-t bg-blue-600" />
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="absolute bottom-[8px] right-[72px] z-30 w-[290px] rounded-2xl border border-white/80 bg-white p-4 shadow-2xl shadow-blue-900/10">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg text-blue-600">
            ✦
          </div>

          <div>
            <p className="text-[10px] font-bold text-blue-600">
              AI Recommendation
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-500">
              Consider an alternative route or supplier to reduce
              shipment delay risk.
            </p>

            <p className="mt-1 text-[10px] font-bold text-slate-800">
              Optimization score: 0.182
            </p>
          </div>
        </div>
      </div>

      {/* Optimized Badge */}
      <div className="absolute bottom-[20px] left-[28px] z-30 flex items-center gap-2 rounded-xl border border-white bg-white px-4 py-3 shadow-xl shadow-blue-900/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          ✓
        </div>

        <div>
          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Status
          </p>

          <p className="text-[10px] font-bold text-emerald-600">
            Optimized Decision
          </p>
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111c2e] text-base font-bold text-white shadow-md">
              SP
            </div>

            <div>
              <p className="text-[17px] font-bold tracking-tight text-slate-900">
                SupplyPrescript
              </p>

              <p className="text-[10px] font-medium text-slate-400">
                AI Supply Chain
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 sm:flex">
            <a
              href="#home"
              className="relative py-2 text-xs font-semibold text-blue-600"
            >
              Home

              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
            </a>

            <Link
              to="/dashboard"
              className="py-2 text-xs font-semibold text-slate-600 transition hover:text-blue-600"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-sky-50"
      >
        <div className="absolute left-[-120px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute right-[-100px] top-[100px] h-[400px] w-[400px] rounded-full bg-sky-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-4 px-6 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-12">
          {/* Hero Content */}
          <div className="relative z-10 max-w-[610px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-100/70 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-blue-600">
                AI-Powered Supply Chain Intelligence
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#101d38] sm:text-5xl lg:text-[58px]">
              Smarter Decisions for a{" "}
              <span className="text-blue-600">
                Stronger Supply Chain
              </span>
            </h1>

            <p className="mt-6 max-w-[530px] text-sm leading-7 text-slate-500 sm:text-[15px]">
              SupplyPrescript uses machine learning and optimization
              techniques to predict shipment delays, assess risks and
              recommend the best decisions for your supply chain.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                <span className="text-base">→</span>
                Go to Dashboard
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-3 py-3 text-xs font-bold text-blue-600 transition hover:text-blue-700"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-200 text-[9px]">
                  i
                </span>

                Learn More
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5">
              <div>
                <p className="text-lg font-bold text-slate-900">
                  XGBoost
                </p>

                <p className="text-[9px] text-slate-400">
                  Prediction Model
                </p>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div>
                <p className="text-lg font-bold text-slate-900">
                  AI + Optimization
                </p>

                <p className="text-[9px] text-slate-400">
                  Decision Intelligence
                </p>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div>
                <p className="text-lg font-bold text-slate-900">
                  Real-time
                </p>

                <p className="text-[9px] text-slate-400">
                  Decision Tracking
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative min-h-[450px] lg:min-h-[500px]">
            <SupplyChainVisual />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${feature.iconClass}`}
                >
                  {feature.icon}
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#132342]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-t border-slate-100 bg-gradient-to-br from-blue-50/70 via-white to-sky-50/60 px-6 py-14 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            {/* Section Intro */}
            <div className="max-w-[430px]">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-blue-600">
                How It Works
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#12203c] sm:text-3xl">
                From Prediction to Better Decisions
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                SupplyPrescript analyzes your supply chain data, predicts
                risks, recommends optimized solutions and helps you track
                the results — all in one place.
              </p>

              <Link
                to="/dashboard"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <span>→</span>
                Go to Dashboard
              </Link>
            </div>

            {/* Workflow */}
            <div className="relative">
              <div className="absolute left-[12%] right-[12%] top-10 hidden h-px border-t-2 border-dashed border-blue-200 lg:block" />

              <div className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {workflow.map((step) => (
                  <div
                    key={step.number}
                    className="relative text-center"
                  >
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold shadow-sm ${step.className}`}
                    >
                      {step.icon}
                    </div>

                    <p className="mt-4 text-xs font-bold text-[#12203c]">
                      {step.number}. {step.title}
                    </p>

                    <p className="mx-auto mt-2 max-w-[150px] text-[9px] leading-5 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="mt-12 flex items-center justify-center gap-5">
            <span className="hidden h-px w-14 bg-blue-200 sm:block" />

            <span className="text-[9px] font-bold tracking-[0.35em] text-blue-400">
              PREDICT · OPTIMIZE · STRENGTHEN
            </span>

            <span className="hidden h-px w-14 bg-blue-200 sm:block" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#111c2e] text-[8px] font-bold text-white">
              SP
            </div>

            <span className="text-[10px] font-semibold text-slate-500">
              SupplyPrescript AI
            </span>
          </div>

          <p className="text-[9px] text-slate-400">
            Intelligent supply chain management
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home