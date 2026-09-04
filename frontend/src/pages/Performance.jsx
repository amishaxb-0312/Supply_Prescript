import { useEffect, useState } from "react";

function Performance() {
  const [decisions, setDecisions] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [actualDelayDays, setActualDelayDays] = useState("");
  const [actualCost, setActualCost] = useState("");

  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchDecisions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/decisions");

      if (!response.ok) {
        throw new Error("Failed to fetch decisions");
      }

      const data = await response.json();
      setDecisions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDecisions();
  }, []);

  const recordOutcome = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");
    setPerformance(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/decision/${selectedId}/outcome`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actual_delay_days: Number(actualDelayDays),
            actual_cost: Number(actualCost),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to record outcome");
      }

      setMessage("Outcome recorded successfully.");

      await fetchPerformance(selectedId);

      setActualDelayDays("");
      setActualCost("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPerformance = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/decision/${id}/performance`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to fetch performance");
      }

      setPerformance(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDecisionChange = (e) => {
    const id = e.target.value;

    setSelectedId(id);
    setPerformance(null);
    setMessage("");
    setError("");

    if (id) {
      const decision = decisions.find((item) => item.id === Number(id));

      if (decision && decision.outcome_recorded) {
        fetchPerformance(id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Performance Analysis
          </h1>

          <p className="mt-2 text-gray-500">
            Compare predicted outcomes with actual shipment performance.
          </p>
        </div>

        {/* Outcome Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Record Shipment Outcome
          </h2>

          <form onSubmit={recordOutcome} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Decision
              </label>

              <select
                value={selectedId}
                onChange={handleDecisionChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              >
                <option value="">Select a decision</option>

                {decisions.map((decision) => (
                  <option key={decision.id} value={decision.id}>
                    #{decision.id} — {decision.supplier} — {decision.product}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Actual Delay (Days)
                </label>

                <input
                  type="number"
                  min="0"
                  value={actualDelayDays}
                  onChange={(e) => setActualDelayDays(e.target.value)}
                  required
                  placeholder="e.g. 4"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Actual Cost
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={actualCost}
                  onChange={(e) => setActualCost(e.target.value)}
                  required
                  placeholder="e.g. 5200"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !selectedId}
              className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Record Outcome"}
            </button>
          </form>

          {message && (
            <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Performance Result */}
        {performance && (
          <div className="mt-8">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Performance Result
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Predicted Risk</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {performance.predicted_delay_risk}%
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Expected Delay</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {performance.expected_delay_days} days
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Actual Delay</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {performance.actual_delay_days} days
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Actual Cost</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  ₹{Number(performance.actual_cost).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                  Expected Action Cost
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  ₹{Number(performance.expected_action_cost).toFixed(2)}
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  Cost Difference: ₹
                  {Number(performance.cost_difference).toFixed(2)}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                  Delay Difference
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {performance.delay_difference_days} days
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  Action: {performance.selected_action}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Outcome Status</p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {performance.outcome_status}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Performance;