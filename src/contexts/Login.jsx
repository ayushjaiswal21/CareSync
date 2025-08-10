import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { loginWithGoogle, loading, user } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // Redirect or show success message after login
    } catch {
      alert("Google sign-in failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (user) return <p>Welcome, {user.displayName}</p>;

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}
