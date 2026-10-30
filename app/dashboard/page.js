
"use client";

const [user, setUser] = useState(null);
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [router]);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading || !user) {
    return (
      <main style={{ padding: 40, color: "#1e40af" }}>
        Loading Cash Connect...
      </main>
    );
  }

  const card = {
    background: "#ffffff",
    padding: 22,
    borderRadius: 16,
    boxShadow: "0 4px 15px rgba(37,99,235,0.07)",
    border: "1px solid #e5edff",
  };

  const actionCard = {
    ...card,
    borderTop: "4px solid #2563eb",
  };

  const blueButton = {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "11px 20px",
    borderRadius: 10,
    fontWeight: "bold" as const,
    cursor: "pointer",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5ff",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        color: "#172554",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          background: "#ffffff",
          padding: 16,
          borderRadius: 16,
          boxShadow: "0 3px 12px rgba(37,99,235,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              background: "#2563eb",
              color: "white",
              width: 52,
              height: 52,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: "-1px",
              boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
            }}
          >
            BWK
          </div>

          <div>
            <h2 style={{ margin: 0, color: "#1e40af" }}>
              Cash Connect
            </h2>
            <small style={{ color: "#64748b" }}>
              Secure Customer Portal
            </small>
          </div>
        </div>

        <button onClick={logout} style={blueButton}>
          Logout
        </button>
      </header>

      <section style={{ marginTop: 30 }}>
        <p style={{ color: "#2563eb", fontWeight: "bold" }}>
          CUSTOMER DASHBOARD
        </p>
        <h1 style={{ marginBottom: 8 }}>Welcome back!</h1>
        <p style={{ color: "#64748b" }}>{user.email}</p>
      </section>

      <section
        style={{
          background: "linear-gradient(120deg, #1e40af, #2563eb, #38bdf8)",
          color: "white",
          padding: 28,
          borderRadius: 20,
          marginTop: 25,
          boxShadow: "0 8px 22px rgba(37,99,235,0.2)",
        }}
      >
        <p style={{ opacity: 0.9 }}>AVAILABLE BALANCE</p>
        <h1 style={{ fontSize: 36, margin: "12px 0" }}>KES —</h1>
        <small>
          Your verified wallet balance will appear here.
        </small>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16,
          marginTop: 25,
        }}
      >
        <div style={actionCard}>
          <h3 style={{ color: "#2563eb" }}>＋ Deposit</h3>
          <p>Add money to your wallet</p>
        </div>

        <div style={actionCard}>
          <h3 style={{ color: "#2563eb" }}>↗ Withdraw</h3>
          <p>Withdraw your funds</p>
        </div>

        <div style={actionCard}>
          <h3 style={{ color: "#2563eb" }}>⇄ Send Money</h3>
          <p>Transfer funds securely</p>
        </div>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2 style={{ color: "#1e40af" }}>Payment Methods</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 16,
          }}
        >
          <div style={card}>
            <h3 style={{ color: "#2563eb" }}>M-Pesa</h3>
            <p>Safaricom</p>
          </div>

          <div style={card}>
            <h3 style={{ color: "#2563eb" }}>Airtel Money</h3>
            <p>Airtel</p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 30, ...card }}>
        <h2 style={{ color: "#1e40af" }}>Recent Transactions</h2>
        <p style={{ color: "#64748b" }}>No transactions yet.</p>
      </section>

      <footer
        style={{
          marginTop: 35,
          textAlign: "center",
          color: "#64748b",
        }}
      >
        <strong style={{ color: "#2563eb" }}>BWK</strong>
        <p>Cash Connect © 2026</p>
      </footer>
    </main>
  );
                }
        
