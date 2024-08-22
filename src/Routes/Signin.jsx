import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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

  return (
    <div>
      <h1>This is the sign-In page</h1>
      <h2>TEST</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSignin}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          value={email} // Controlled component
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          value={password} // Controlled component
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
