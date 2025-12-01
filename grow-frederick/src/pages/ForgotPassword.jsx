import React, { useRef, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import AuthCard from '../components/AuthCard';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

export default function ForgotPassword() {

  const emailRef = useRef();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, emailRef.current.value);
      setMessage('Check your inbox for further instructions.');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="stack">
      <Navbar></Navbar>
      <AuthCard 
      
        title="Password Reset" 
        footer={
          <div>
            <p>
              <Link to="/login">Log In</Link>
            </p>
            <p>
              Need an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        }
      >
        {message && <div style={{ color: 'green' }}>{message}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            ref={emailRef}
            placeholder="Enter your email"
            required
          />
          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
      </AuthCard>
    </div>
  );
}

