import React, { useRef, useState } from "react"; // Add missing imports
import AuthCard from "../components/AuthCard";
import Navbar from "../components/Navbar";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <Navbar></Navbar>
      <AuthCard
        title="Sign Up"
        footer={
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        }
      >
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
          <input type="text" placeholder="Full Name" required disabled={loading} />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            ref={emailRef} /* Add ref */
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            ref={passwordRef} /* Add ref */
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required 
            ref={passwordConfirmRef} /* Add ref */
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </AuthCard>
    </div>
  );
}