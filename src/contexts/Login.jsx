import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginWithGoogle, loginWithEmail, loading, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch {
      alert("Google sign-in failed");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (user) return <p style={{ textAlign: "center" }}>Welcome, {user.displayName}</p>;

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: 8 }}>
      <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          style={{ padding: 10, fontSize: 16, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          style={{ padding: 10, fontSize: 16, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: 12,
            fontSize: 16,
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </form>

      <div style={{ margin: "1.5rem 0", textAlign: "center", color: "#555" }}>Or</div>

      <button
        onClick={handleGoogleSignIn}
        aria-label="Sign in with Google"
        title="Sign in with Google"
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          borderRadius: 4,
          border: "1px solid #ccc",
          backgroundColor: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#EA4335" d="M23.954 12.307c0-.823-.074-1.617-.214-2.382H12v4.512h6.417a5.492 5.492 0 01-2.37 3.608v3.003h3.831c2.242-2.064 3.58-5.108 3.58-8.741z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.947-2.9l-3.83-3.002c-1.07.72-2.442 1.146-4.117 1.146-3.17 0-5.854-2.14-6.812-5.013H1.28v3.15A11.999 11.999 0 0012 24z" />
          <path fill="#4A90E2" d="M5.188 14.23a7.31 7.31 0 01-.383-2.23c0-.778.14-1.528.383-2.23V6.63H1.28A11.996 11.996 0 000 12c0 1.89.46 3.683 1.28 5.37l3.908-3.14z" />
          <path fill="#FBBC05" d="M12 4.77c1.776 0 3.368.61 4.62 1.807l3.456-3.46C17.957 1.3 15.237 0 12 0 7.7 0 3.995 2.475 1.28 6.63l3.908 3.15C6.144 6.911 8.83 4.77 12 4.77z" />
        </svg>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
