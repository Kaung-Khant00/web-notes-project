import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import User from "./Auth/User";
import Account from "./Home/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
