
"use client";

import { useState } from "react";

type DepositRequest = {
  id: number;
  amount: number;
  status: "Pending";
};

export default function DashboardPage() {
  const [amount, setAmount] = useState("");
  const [requests, setRequests] = useState<DepositRequest[]>([]);
  const [message, setMessage] = useState("");

  function submitDeposit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setMessage("Enter an amount greater than KES 0.");
      return;
    }

    if (value > 1000000) {
      setMessage("For this demo, the maximum request is KES 1,000,000.");
      return;
    }

    setRequests((previous) => [
      ...previous,
      {
        id: Date.now(),
        amount: Math.round(value * 100) / 100,
        status: "Pending",
      },
    ]);

    setAmount("");
    setMessage(
      "Demo request created. No payment has been made."
    );
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        fontFamily: "Arial, sans-serif",
        color: "#173d2e",
      }}
    >
      <nav style={{ marginBottom: 32 }}>
        <strong>🟢 Cash Connect</strong>
        {"  "}Home
      </nav>

      <p style={{ color: "#16734b", fontWeight: "bold" }}>
        CUSTOMER PORTAL
      </p>

      <h1>Your dashboard</h1>
      <p>A simple overview of your Cash Connect account.</p>

      <section
        style={{
          background: "#16734b",
          color: "white",
          padding: 24,
          borderRadius: 16,
          marginTop: 24,
        }}
      >
        <p>ACCOUNT BALANCE</p>
        <h2 style={{ fontSize: 32, margin: "8px 0" }}>
          KES 0.00
        </h2>
        <p>
          Demo balance — real account data is not connected.
        </p>
      </section>

      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: 16,
          padding: 20,
          marginTop: 20,
        }}
      >
        <h2>＋ Deposit</h2>
        <p>
          Submit a demo deposit request for administrator
          review.
        </p>

        <form onSubmit={submitDeposit}>
          <label
            htmlFor="amount"
            style={{ display: "block", marginBottom: 8 }}
          >
            Amount (KES)
          </label>

          <input
            id="amount"
            type="number"
            min="0.01"
            max="1000000"
            step="0.01"
            inputMode="decimal"
            required
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="e.g. 500"
            style={{
              boxSizing: "border-box",
              width: "100%",
              padding: 12,
              border: "1px solid #bbb",
              borderRadius: 8,
              fontSize: 16,
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: 14,
              padding: "12px 18px",
              background: "#16734b",
              color: "white",
              border: 0,
              borderRadius: 8,
              fontSize: 16,
            }}
          >
            Create demo request
          </button>
        </form>

        {message && (
          <p role="status" aria-live="polite">
            {message}
          </p>
        )}

        {requests.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3>Your demo requests</h3>

            {requests.map((request) => (
              <article
                key={request.id}
                style={{
                  borderTop: "1px solid #ddd",
                  padding: "12px 0",
                }}
              >
                <strong>
                  KES {request.amount.toLocaleString("en-KE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
                <p style={{ margin: "6px 0" }}>
                  Status: <strong>Pending</strong>
                </p>
                <small>
                  Demo request only — payment not received.
                </small>
              </article>
            ))}
          </div>
        )}

        <p style={{ color: "#777", fontSize: 13 }}>
          Demo only. Requests disappear when the page is
          refreshed. No money is collected.
        </p>
      </section>

      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: 16,
          padding: 20,
          marginTop: 16,
        }}
      >
        <h2>↗ Withdraw</h2>
        <p>
          Customer withdrawals are not available yet.
        </p>
        <button type="button" disabled>
          Coming soon
        </button>
        <p>
          Withdrawals require secure administrator
          authorization and a verified backend.
        </p>
      </section>

      <p style={{ marginTop: 24, color: "#777", fontSize: 13 }}>
        Cash Connect demo — no real payments are processed.
      </p>
    </main>
  );
              }
