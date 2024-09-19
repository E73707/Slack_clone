import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import synkLogo from "../images/SYNK.png";
import googleLogo from "../images/google-logo.png";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store errors
  const auth = getAuth();
  const navigate = useNavigate();

  async function sendGoogleDataToBackend(user) {
    console.log("sendDataToBackend called with user:", user); // Add this log
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      const data = await response.json();
      console.log("User stored in database", data);
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user");
    }
  }

  async function sendDataToBackend(user) {
    console.log("sendDataToBackend called with user:", user); // Add this log
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: username,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      const data = await response.json();
      console.log("User stored in database", data);
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user");
    }
  }

  async function handleSignup(event) {
    event.preventDefault(); // Prevent form from reloading the page

    console.log("Signup form submitted"); // Log at the start

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Firebase signup successful:", userCredential); // Log after Firebase signup

      const user = userCredential.user;
      console.log("User object:", user); // Log the user object

      console.log("Calling sendDataToBackend"); // Log before calling the backend
      await sendDataToBackend(user); // This should call the function
      console.log("Data sent to backend successfully"); // Log after successful backend call

      navigate("/home");
    } catch (error) {
      console.log("Error during signup:", error); // Log any errors
      setError(error.message); // Set the error message
    }
    console.log("Signup process complete"); // Log at the end
  }

  const googleProvider = new GoogleAuthProvider();

  async function handleGoogleSignup() {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      await sendGoogleDataToBackend(user);
      console.log("User signed in with Google", user);

      navigate("/home");
    } catch (error) {
      console.log(error);
      setError(error.message); // Set the error message
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <img className="synk-logo" src={synkLogo} alt="SYNK"></img>
        <h1>Join us on SYNK</h1>
        <h4>We reccomed signing up with your work email</h4>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            className="signup-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email} // Controlled component
            required
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="signup-input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password} // Controlled component
            required
          />
          <button className="signup-button" type="submit">
            Sign up
          </button>
        </form>
        <h4>OR</h4>
        <button className="signup-google-button" onClick={handleGoogleSignup}>
          <img className="google-logo" src={googleLogo} alt="" />
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
