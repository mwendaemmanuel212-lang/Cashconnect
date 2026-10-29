
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (!data.session) {
          setMessage("Registration received! Check your email to confirm your account.");
        } else {
          router.push("/");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "60px auto", padding: 24 }}>
      <h1>Cash Connect</h1>
      <h2>{isSignup ? "Create your account" : "Customer Login"}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 16px" }}
        />

        <label htmlFor="password">Password (at least 6 characters)</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={isSignup ? "new-password" : "current-password"}
          style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 16px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 12, cursor: "pointer" }}
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Register"
            : "Log in"}
        </button>
      </form>

      {message && <p role="status">{message}</p>}

      <p>
        {isSignup ? "Already have an account?" : "New to Cash Connect?"}
      </p>
      <button
        type="button"
        onClick={() => {
          setIsSignup(!isSignup);
          setMessage("");
        }}
      >
        {isSignup ? "Log in instead" : "Create an account"}
      </button>
    </main>
  );
        }
