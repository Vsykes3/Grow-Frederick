import React, { useRef, useState } from "react";
import AuthCard from "../components/AuthCard";
import Navbar from "@/components/ui/Navbar";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase"; // import your firebase auth instance

// Force dynamic rendering for Next.js Pages Router
export async function getServerSideProps() {
  return { props: {} };
}

export default function SignUp() {
  const nameRef = useRef();
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

      // Create account
      const userCredential = await signup(emailRef.current.value, passwordRef.current.value);

      // Set display name
      await updateProfile(userCredential.user, {
        displayName: nameRef.current.value
      });

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <Navbar />
      <AuthCard
        title="Sign Up"
        footer={
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        }
      >
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            ref={nameRef}
            disabled={loading}
          />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            ref={emailRef}
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            ref={passwordRef}
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required 
            ref={passwordConfirmRef}
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

