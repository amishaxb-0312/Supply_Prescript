import { Link } from "react-router-dom"

const features = [
  {
    icon: "◉",
    iconClass: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    title: "AI-Powered Prediction",
    description:
      "Uses XGBoost to predict shipment delays and estimate delivery risk.",
  },
  {
    icon: "✓",
    iconClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    title: "Risk Assessment",
    description:
      "Analyzes suppliers, routes and shipment conditions to identify risk.",
  },
  {
    icon: "⚙",
    iconClass: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    title: "Optimization Engine",
    description:
      "Recommends the best mitigation strategy based on cost and constraints.",
  },
  {
    icon: "▣",
    iconClass: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    title: "Track & Learn",
    description:
      "Stores decisions and actual outcomes to measure performance over time.",
  },
  {
    icon: "▥",
    iconClass: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
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
    className:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },
  {
    number: "2",
    icon: "◉",
    title: "Predict & Analyze",
    description: "AI model detects risks and estimates delay probability.",
    className:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  },
  {
    number: "3",
    icon: "✦",
    title: "Get Recommendations",
    description: "Optimization engine suggests the best actions.",
    className:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  {
    number: "4",
    icon: "▥",
    title: "Track & Improve",
    description: "Record outcomes and measure decision performance.",
    className:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },
]

function SupplyChainVisual() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[680px] sm:h-[470px]">
      {/* Background glow */}
      <div className="absolute inset-x-8 top-12 h-[320px] rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20" />

      {/* World/map-style background */}
      <div className="absolute left-2 top-14 h-[280px] w-[92%] rounded-[48%] bg-gradient-to-br from-blue-50 via-sky-100/80 to-blue-50 dark:from-blue-950/40 dark:via-slate-800 dark:to-blue-950/30 sm:left-8 sm:h-[320px] sm:w-[520px]">
        <div className="absolute inset-8 opacity-50">
          <div className="absolute left-[15%] top-[32%] h-px w-[55%] rotate-[12deg] border-t-2 border-dashed border-blue-300 dark:border-blue-700" />

          <div className="absolute left-[25%] top-[55%] h-px w-[60%] -rotate-[18deg] border-t-2 border-dashed border-blue-300 dark:border-blue-700" />

          <div className="absolute left-[45%] top-[25%] h-[130px] w-px rotate-[35deg] border-l-2 border-dashed border-blue-200 dark:border-blue-800" />

          <span className="absolute left-[20%] top-[27%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />

          <span className="absolute left-[47%] top-[48%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />

          <span className="absolute left-[72%] top-[30%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />

          <span className="absolute left-[64%] top-[68%] h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />
        </div>
      </div>

      {/* Airplane */}
      <div className="absolute right-5 top-4 rotate-[-10deg] text-4xl drop-shadow-md sm:right-12 sm:text-5xl">
        ✈
      </div>

      {/* Ship */}
      <div className="absolute bottom-[62px] left-[12px] z-10 sm:bottom-[78px] sm:left-[68px]">
        <div className="relative">
          <div className="absolute bottom-[-7px] left-[-20px] h-3 w-[150px] rounded-full bg-blue-300/40 blur-sm sm:w-[185px]" />

          <div className="relative h-8 w-[125px] rounded-b-[45%] rounded-t-md bg-slate-800 sm:w-[155px]">
            <div className="absolute left-4 top-[-24px] flex gap-1">
              <span className="h-7 w-6 rounded-sm bg-orange-400 sm:w-7" />
              <span className="h-7 w-6 rounded-sm bg-blue-500 sm:w-7" />
              <span className="h-7 w-6 rounded-sm bg-red-400 sm:w-7" />
              <span className="h-7 w-6 rounded-sm bg-emerald-400 sm:w-7" />
            </div>

            <div className="absolute right-4 top-[-18px] h-5 w-12 rounded-t-md bg-white" />
          </div>

          <div className="absolute -bottom-5 left-[-8px] h-3 w-[145px] rounded-full bg-blue-300/50 sm:w-[175px]" />
        </div>
      </div>

      {/* Truck */}
      <div className="absolute bottom-[54px] left-[170px] z-10 sm:bottom-[70px] sm:left-[270px]">
        <div className="relative flex items-end">
          <div className="h-[55px] w-[88px] rounded-md rounded-br-sm bg-slate-700 shadow-lg sm:h-[62px] sm:w-[110px]">
            <div className="m-2 h-9 rounded bg-slate-100/90 sm:h-10" />

            <div className="absolute bottom-[-10px] left-4 h-5 w-5 rounded-full border-4 border-slate-700 bg-slate-300" />

            <div className="absolute bottom-[-10px] right-4 h-5 w-5 rounded-full border-4 border-slate-700 bg-slate-300" />
          </div>

          <div className="h-[42px] w-[42px] rounded-r-md bg-blue-500 shadow-lg sm:h-[48px] sm:w-[48px]">
            <div className="mt-2 h-5 w-8 rounded-r bg-blue-200/80" />
          </div>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="absolute right-0 top-[92px] z-20 w-[250px] rounded-2xl border border-white/80 bg-white p-4 shadow-2xl shadow-blue-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 sm:right-[20px] sm:top-[105px] sm:w-[280px] sm:p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Shipment Delay Prediction
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              23%
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">
              Estimated delay risk
            </p>
          </div>

          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[7px] border-slate-100 dark:border-slate-800 sm:h-16 sm:w-16">
            <div className="absolute inset-[-7px] rounded-full border-[7px] border-transparent border-t-red-400 border-r-red-400 rotate-[-30deg]" />

            <span className="text-[8px] font-bold text-slate-600 dark:text-slate-300">
              LOW
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400">
              On Time
            </span>

            <span className="ml-auto text-[9px] font-bold text-slate-700 dark:text-slate-200">
              77%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />

            <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400">
              Delayed
            </span>

            <span className="ml-auto text-[9px] font-bold text-slate-700 dark:text-slate-200">
              23%
            </span>
          </div>
        </div>
      </div>

      {/* Risk Trend Card */}
      <div className="absolute right-0 top-[265px] z-20 w-[135px] rounded-2xl border border-white/80 bg-white p-3 shadow-xl shadow-blue-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 sm:right-[-5px] sm:top-[285px] sm:w-[155px] sm:p-4">
        <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400">
          Risk Trend
        </p>

        <div className="mt-4 flex h-12 items-end gap-1.5">
          <span className="h-[30%] w-3 rounded-t bg-blue-200 dark:bg-blue-900" />
          <span className="h-[48%] w-3 rounded-t bg-blue-300 dark:bg-blue-800" />
          <span className="h-[38%] w-3 rounded-t bg-blue-300 dark:bg-blue-800" />
          <span className="h-[65%] w-3 rounded-t bg-blue-400 dark:bg-blue-700" />
          <span className="h-[52%] w-3 rounded-t bg-blue-400 dark:bg-blue-700" />
          <span className="h-[82%] w-3 rounded-t bg-blue-500" />
          <span className="h-[95%] w-3 rounded-t bg-blue-600" />
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="absolute bottom-0 right-[20px] z-30 w-[250px] rounded-2xl border border-white/80 bg-white p-4 shadow-2xl shadow-blue-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 sm:right-[72px] sm:w-[290px]">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            ✦
          </div>

          <div>
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
              AI Recommendation
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-500 dark:text-slate-400">
              Consider an alternative route or supplier to reduce shipment
              delay risk.
            </p>

            <p className="mt-1 text-[10px] font-bold text-slate-800 dark:text-slate-200">
              Optimization score: 0.182
            </p>
          </div>
        </div>
      </div>

      {/* Optimized Badge */}
      <div className="absolute bottom-[8px] left-0 z-30 hidden items-center gap-2 rounded-xl border border-white bg-white px-3 py-2.5 shadow-xl shadow-blue-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 sm:flex sm:px-4 sm:py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
          ✓
        </div>

        <div>
          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Status
          </p>

          <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            Optimized Decision
          </p>
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-[#0b1120] dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-[#0b1120]">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111c2e] text-sm font-bold text-white shadow-md sm:h-11 sm:w-11 sm:text-base">
              SP
            </div>

            <div>
              <p className="text-[16px] font-bold tracking-tight text-slate-900 dark:text-white sm:text-[17px]">
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
              className="py-2 text-xs font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-sky-50 dark:from-[#0b1120] dark:via-[#101a2e] dark:to-[#0d1b2e]"
      >
        <div className="absolute left-[-120px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-900/20" />

        <div className="absolute right-[-100px] top-[100px] h-[400px] w-[400px] rounded-full bg-sky-100/50 blur-3xl dark:bg-sky-900/15" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-2 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-12">
          {/* Hero Content */}
          <div className="relative z-10 max-w-[610px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-100/70 px-4 py-2 dark:border-blue-500/20 dark:bg-blue-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
                AI-Powered Supply Chain Intelligence
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#101d38] dark:text-white sm:text-5xl lg:text-[58px]">
              Smarter Decisions for a{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Stronger Supply Chain
              </span>
            </h1>

            <p className="mt-6 max-w-[530px] text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-[15px]">
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
                className="inline-flex items-center gap-2 px-3 py-3 text-xs font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-200 text-[9px] dark:border-blue-500/30">
                  i
                </span>

                Learn More
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5">
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  XGBoost
                </p>

                <p className="text-[9px] text-slate-400">
                  Prediction Model
                </p>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  AI + Optimization
                </p>

                <p className="text-[9px] text-slate-400">
                  Decision Intelligence
                </p>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  Real-time
                </p>

                <p className="text-[9px] text-slate-400">
                  Decision Tracking
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mt-4 min-h-[430px] lg:mt-0 lg:min-h-[500px]">
            <SupplyChainVisual />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-5 py-10 dark:bg-[#0b1120] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-[#111827] dark:hover:border-slate-700 dark:hover:shadow-black/20"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${feature.iconClass}`}
                >
                  {feature.icon}
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#132342] dark:text-slate-100">
                  {feature.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-500 dark:text-slate-400">
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
        className="border-t border-slate-100 bg-gradient-to-br from-blue-50/70 via-white to-sky-50/60 px-5 py-14 dark:border-slate-800 dark:from-[#101a2e] dark:via-[#0b1120] dark:to-[#0d1b2e] sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="max-w-[430px]">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                How It Works
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#12203c] dark:text-white sm:text-3xl">
                From Prediction to Better Decisions
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                SupplyPrescript analyzes your supply chain data, predicts
                risks, recommends optimized solutions and helps you track the
                results — all in one place.
              </p>

              <Link
                to="/dashboard"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <span>→</span>
                Go to Dashboard
              </Link>
            </div>

            <div className="relative">
              <div className="absolute left-[12%] right-[12%] top-10 hidden h-px border-t-2 border-dashed border-blue-200 dark:border-blue-900 lg:block" />

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

                    <p className="mt-4 text-xs font-bold text-[#12203c] dark:text-slate-100">
                      {step.number}. {step.title}
                    </p>

                    <p className="mx-auto mt-2 max-w-[150px] text-[9px] leading-5 text-slate-500 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-5">
            <span className="hidden h-px w-14 bg-blue-200 dark:bg-blue-900 sm:block" />

            <span className="text-[9px] font-bold tracking-[0.35em] text-blue-400">
              PREDICT · OPTIMIZE · STRENGTHEN
            </span>

            <span className="hidden h-px w-14 bg-blue-200 dark:bg-blue-900 sm:block" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-5 py-6 dark:border-slate-800 dark:bg-[#0b1120] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#111c2e] text-[8px] font-bold text-white">
              SP
            </div>

            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
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