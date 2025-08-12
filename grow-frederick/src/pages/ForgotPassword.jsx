import React from "react";
import AuthCard from "../components/AuthCard";
import Navbar from "../components/Navbar";

export default function ForgotPassword() {
  return (
    <div className="stack">
      <Navbar></Navbar>
      <AuthCard
        title="Reset Password"
        footer={<p><a href="/login">Back to Login</a></p>}
      >
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Send Reset Link</button>
        </form>
      </AuthCard>
    </div>
  );
}