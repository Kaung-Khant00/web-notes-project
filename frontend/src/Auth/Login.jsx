import SimpleNav from "../components/SimpleNav.jsx";
import PasswordInput from "../components/PasswordInput.jsx";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../utils/validator.js";
import api from "../utils/axios_instance.js";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState({
    loading: false,
    email: null,
    password: null,
    general: null,
  });
  const validate = () => {
    setError({
      loading: false,
      general: null,
      email: null,
      password: null,
    });
    const { email, password } = info;
    if (!isValidEmail(email)) {
      setError((prev) => ({
        ...prev,
        email: "Please provide valid email address.",
      }));
    }
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    setError((prev) => ({ ...prev, loading: true }));
    console.log(info);
    try {
      const data = await api.post("/user/login", {
        email: info.email,
        password: info.password,
      });
      console.log(data);
      setError((prev) => ({ ...prev, loading: false }));
      if (data.status === 200) {
        toast.success("Login successed.");
        navigate("/");
      }
    } catch (err) {
      if (err.status >= 400 || err.response.status) {
        console.log("HELLO ERROR __>");
        setError((prev) => ({
          ...prev,
          email: err.response.data.message?.email || "",
          password: err.response.data.message?.password || "",
        }));
      }
      setError((prev) => ({ ...prev, loading: false }));
      console.log(err);
      toast.error("Login failed.");
    }
  };
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div>
        <SimpleNav />
      </div>
      <div className="flex justify-center items-center flex-grow ">
        <form
          className="w-96 bg-white shadow-lg p-6 py-10 rounded-lg "
          onSubmit={handleSubmit}
        >
          <h2 className="title px-3 mb-7 border-b border-gray-200 pb-4">
            Welcome Back !
          </h2>
          {error.email && (
            <div className="text-sm text-red-500">{error.email}</div>
          )}
          <input
            type="text"
            value={info.email}
            onChange={({ target }) => {
              setInfo((prev) => ({
                ...prev,
                email: target.value,
              }));
            }}
            placeholder="Enter email"
            className="bg-gray-100 rounded px-3 py-2 w-full shadow mb-5 hover:bg-gray-200"
            required
          />
          {error.password && (
            <div className="text-sm text-red-500">{error.password}</div>
          )}
          <PasswordInput info={info} setInfo={setInfo} />
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
