import Nav from "../components/Nav";
import SimpleNav from "../components/SimpleNav";
import PasswordInput from "../components/PasswordInput";

import { GiHand } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div>
        <SimpleNav />
      </div>
      <div className="flex justify-center items-center flex-grow ">
        <form className="w-96 bg-white shadow-lg p-6 py-10 rounded-lg ">
          <h2 className="title px-3 mb-7 border-b border-gray-200 pb-4">
            Welcome Back !
          </h2>
          <input
            type="text"
            placeholder="Enter email"
            className="bg-gray-100 rounded px-3 py-2 w-full shadow mb-5 hover:bg-gray-200"
            required
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <input
            type="submit"
            value="Login"
            className="w-full rounded-lg bg-indigo-600 shadow py-3 text-white mt-3 hover:bg-indigo-700"
          />
          <div className="mt-6 text-gray-700 text-center">
            Doesn't have an account yet ?{" "}
            <Link
              className="text-indigo-500 hover:text-indigo-700 hover:underline"
              to={"/signup"}
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
