import React, { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { auth, storage } from "../firebase";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Profile.css";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { currentUser } = useAuth();
  const nameRef = useRef();
  const fileRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!nameRef.current.value.trim()) {
      return setError("Name cannot be empty.");
    }

    try {
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: nameRef.current.value.trim(),
      });
      setMessage("Display name updated successfully.");
    } catch (err) {
      setError("Failed to update display name: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, currentUser.email);
      setMessage("Password reset email sent to " + currentUser.email);
    } catch (err) {
      setError("Failed to send reset email: " + err.message);
    }
  };

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!fileRef.current.files[0]) {
      return setError("Please select an image file first.");
    }

    try {
      setLoading(true);
      const file = fileRef.current.files[0];
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL });
      setMessage("Profile picture updated successfully.");
    } catch (err) {
      setError("Failed to update profile picture: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stack">
        <Navbar></Navbar>
        <div className="profile-settings-container">
        <h2>Profile Settings</h2>

        {error && <div className="profile-error">{error}</div>}
        {message && <div className="profile-message">{message}</div>}

        <div className="profile-info">
            <p><strong>Email:</strong> {currentUser?.email}</p>
            <p><strong>Current Name:</strong> {currentUser?.displayName || "Not set"}</p>
            {currentUser?.photoURL && (
            <img
                src={currentUser.photoURL}
                alt="Profile"
                className="profile-preview"
            />
            )}
        </div>

        {/* Update display name */}
        <form onSubmit={handleNameUpdate} className="profile-form">
            <label>New Display Name</label>
            <input
            type="text"
            placeholder="Enter new name"
            ref={nameRef}
            disabled={loading}
            />
            <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Name"}
            </button>
        </form>

        <hr />

        {/* Update profile picture */}
        <form onSubmit={handlePhotoUpdate} className="profile-form">
            <label>Update Profile Picture</label>
            <input
            type="file"
            accept="image/*"
            ref={fileRef}
            disabled={loading}
            />
            <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Picture"}
            </button>
        </form>

        <hr />

        {/* Password reset */}
        <div className="profile-actions">
            <button onClick={handlePasswordReset}>
            Send Password Reset Email
            </button>
        </div>
        </div>
    </div>
  );
}

