
export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-xl mx-auto pt-12">
        <a href="/" className="text-blue-400">
          ← Back to Cash Connect
        </a>

        <h1 className="text-3xl font-bold mt-8">
          🍨 Cash Connect Demo
        </h1>

        <p className="text-slate-400 mt-3">
          Welcome to the Cash Connect demonstration.
        </p>

        <div className="bg-slate-900 rounded-xl p-6 mt-8">
          <p className="text-slate-400">
            Demo Account Balance
          </p>
          <h2 className="text-3xl font-bold mt-2">
            KES 0.00
          </h2>
          <p className="text-sm text-slate-500 mt-3">
            Demonstration only. No real money is processed.
          </p>
        </div>

        <a
          href="/"
          className="block text-center bg-blue-600 rounded-lg p-4 mt-6 font-semibold"
        >
          Open Customer Dashboard
        </a>
      </div>
    </main>
  );
}
