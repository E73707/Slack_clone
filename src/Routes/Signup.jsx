import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store errors
  const auth = getAuth();

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

  return (
    <div>
      <h1>This is the sign-up page</h1>
      <h2>TEST</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
