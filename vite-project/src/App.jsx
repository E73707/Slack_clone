import "./App.css";
import Home from "./Routes/Home.jsx";
import Signin from "./Routes/Signin.jsx";
import { Signup } from "./Routes/Signup.jsx";

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
    { path: "/signin", element: <Signin></Signin> },
    { path: "/signup", element: <Signup></Signup> },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
