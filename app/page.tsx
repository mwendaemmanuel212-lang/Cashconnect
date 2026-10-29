
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <nav className="nav wrap">
        <Link className="brand" href="/">
          <span className="brand-mark">P</span>
          Cash Connect
        </Link>
        <Link className="nav-link" href="/">Home</Link>
      </nav>

      <section className="dashboard wrap">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">CUSTOMER PORTAL</span>
            <h1>Your dashboard</h1>
            <p className="muted">
              A simple overview of your Cash Connect account.
            </p>
          </div>
          <span className="avatar large">PP</span>
        </div>

        <div className="balance-card dashboard-balance">
          <span className="small-label light">ACCOUNT BALANCE</span>
          <div className="balance">KES 0.00</div>
          <span className="balance-caption">
            Demo balance — real account data is not connected
          </span>
        </div>

        <div className="action-grid">
          <article className="action-card deposit-card">
            <span className="action-symbol">＋</span>
            <h2>Deposit</h2>
            <p>Start a deposit request to add money to your account.</p>
            <button className="button" disabled>
              Deposits coming after setup
            </button>
            <span className="micro-note">
              Payment provider not connected yet
            </span>
          </article>

          <article className="action-card">
            <span className="action-symbol muted-symbol">↗</span>
            <div className="title-row">
              <h2>Withdraw</h2>
              <span className="pill">Coming soon</span>
            </div>
            <p>
              Customer withdrawals are not available.
              This option is shown for information only.
            </p>
            <button className="button button-disabled" disabled>
              Coming soon
            </button>
            <span className="micro-note">
              Only an authorized administrator will be
              allowed to manage withdrawals.
            </span>
          </article>
        </div>

        <div className="notice notice-wide">
          <strong>Important:</strong> This is a visual starter only.
          No real money is accepted or moved. Authentication,
          a database, payment processing, and server-side
          authorization must be connected before launch.
        </div>
      </section>
    </main>
  );
}
