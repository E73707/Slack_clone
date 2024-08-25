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

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store errors
  const auth = getAuth();
  const navigate = useNavigate();

  async function handleSignup(event) {
    event.preventDefault(); // Prevent form from reloading the page

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created successfully");
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
      setError(error.message); // Set the error message
    }
  }

  const googleProvider = new GoogleAuthProvider();

  async function handleGoogleSignup() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      console.log("User signed in successfully");
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
        {/* Display error message */}
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
