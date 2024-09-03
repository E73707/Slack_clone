import "./App.css";
import Home from "./Routes/Home.jsx";
import Signin from "./Routes/Signin.jsx";
import Signup from "./Routes/Signup.jsx";
import CommunitySignup from "./Routes/CommunitySignup.jsx";
import CommunitySignin from "./Routes/CommunitySignin.jsx";
import CommunityChoice from "./Routes/CommunityChoice.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.jsx";
import { Protected } from "./Routes/Protected.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: "/home",
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: "/community-signup",
      element: (
        <Protected>
          <CommunitySignup />
        </Protected>
      ),
    },
    {
      path: "/community-signin",
      element: (
        <Protected>
          <CommunitySignin />
        </Protected>
      ),
    },
    { path: "/signin", element: <Signin></Signin> },
    { path: "/signup", element: <Signup></Signup> },
    {
      path: "/community-choice",
      element: (
        <Protected>
          <CommunityChoice />
        </Protected>
      ),
    },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
