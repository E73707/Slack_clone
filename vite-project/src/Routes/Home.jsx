import { signOut, getAuth } from "firebase/auth";

export default function Home() {
  const auth = getAuth();
  async function handleSignout() {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>This is the Home page</h1>
      <button onClick={() => handleSignout()}>Sign out</button>
    </div>
  );
}
