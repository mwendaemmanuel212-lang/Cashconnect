
"use client";

import { useState } from "react";

export default function DemoPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function createAccount(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    localStorage.setItem(
      "cashconnect_demo",
      JSON.stringify({ username, email })
    );

    setMessage("Demo account created successfully!");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-md mx-auto pt-12">
        <h1 className="text-3xl font-bold">
          🍨 Create Demo Account
        </h1>

        <p className="text-slate-400 mt-3">
          Try Cash Connect using a demo account.
          No real money is involved.
        </p>

        <form onSubmit={createAccount} className="mt-8 space-y-5">
          <input
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800"
          />

          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800"
          />

          <input
            required
            type="password"
            minLength={6}
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 p-4 rounded-lg font-bold"
          >
            Create Demo Account
          </button>
        </form>

        {message && (
          <p className="mt-5 text-green-400">{message}</p>
        )}
      </div>
    </main>
  );
}
