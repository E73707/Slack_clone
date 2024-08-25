import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import "../css/Signin.css";
import logo from "../images/SYNK.png";
import googleLogo from "../images/google-logo.png";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store errors
  const auth = getAuth();
  const navigate = useNavigate();

  async function handleSignin(event) {
    event.preventDefault(); // Prevent form from reloading the page

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in successfully");
      console.log(userCredential.user);
      navigate("/home"); // Redirect to the home page
    } catch (error) {
      console.log(error);
      setError(error.message); // Set the error message
    }
  }

  const googleProvider = new GoogleAuthProvider();

  async function handleGoogleSignin() {
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
        <img className="synk-logo" src={logo} alt="SYNK" />
        <h1 className="signin-h1">
          First things first, enter your email address
        </h1>
        <h2 className="signin-h2">we recommend using your work email</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message */}
        <form className="signin-form" onSubmit={handleSignin}>
          <input
            className="signin-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email} // Controlled component
            required
          />
          <input
            className="signin-input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password} // Controlled component
            required
          />
          <button className="signin-button" type="submit">
            Sign In
          </button>
        </form>
        <h4 className="signin-h3">Or</h4>
        <button className="signin-google-button" onClick={handleGoogleSignin}>
          <img className="google-logo" src={googleLogo} alt="google logo"></img>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
