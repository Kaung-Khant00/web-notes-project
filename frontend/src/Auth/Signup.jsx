import SimpleNav from "../components/SimpleNav";
import PasswordInput from "../components/PasswordInput";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isStrongPassword, isValidEmail } from "../validator";
import Spinner from "../components/Spinner";
import api from "../axios_instance";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    user_name: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState({
    loading: false,
    user_name: null,
    email: null,
    password: null,
    general: null,
  });
  const validate = () => {
    setError({
      loading: false,
      general: null,
      user_name: null,
      email: null,
      password: null,
    });
    const { user_name, email, password } = info;
    if (!user_name) {
      setError((prev) => ({ ...prev, user_name: "User Name is required" }));
    }
    if (!isValidEmail(email)) {
      setError((prev) => ({
        ...prev,
        email: "Please provide valid email address.",
      }));
    }
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (!isStrongPassword(password)) {
      setError((prev) => ({
        ...prev,
        password: "Password must be a strong password.",
      }));
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    setError((prev) => ({ ...prev, loading: true }));
    try {
      const data = await api.post("/user/signup", {
        user_name: info.user_name,
        email: info.email,
        password: info.password,
      });
      console.log(data);
      setError((prev) => ({ ...prev, loading: false }));
      if (data.status === 200) {
      toast.success("Signup succeed.");
        navigate("/home");
      }
    } catch (err) {
      if (err.status >= 400 || err.response.status) {
        console.log("HELLO ERROR __>");
        setError((prev) => ({
          ...prev,
          email: err.response.data.message?.email || "",
          user_name: err.response.data.message?.user_name || "",
          password: err.response.data.message?.password || "",
        }));
      }
      setError((prev) => ({ ...prev, loading: false }));
      console.log(err);
      toast.error("Signup failed.");
    }
  };
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="">
        <SimpleNav />
      </div>
      <div className="flex justify-center items-center flex-grow ">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-white shadow-lg p-6 py-8 rounded-lg "
        >
          <h2 className="title px-3 mb-7 border-b border-gray-200 pb-6">
            Let's start your <br /> notes journey
          </h2>
          {error.user_name && (
            <div className="text-sm text-red-500">{error.user_name}</div>
          )}
          <input
            type="text"
            placeholder="Enter User Name"
            className="bg-gray-100 rounded px-3 py-2 w-full shadow mb-5 hover:bg-gray-200"
            value={info.user_name}
            onChange={({ target }) => {
              setInfo((prev) => ({
                ...prev,
                user_name: target.value,
              }));
            }}
          />
          {error.email && (
            <div className="text-sm text-red-500">{error.email}</div>
          )}
          <input
            type="email"
            placeholder="Enter email"
            className="bg-gray-100 rounded px-3 py-2 w-full shadow mb-5 hover:bg-gray-200"
            value={info.email}
            onChange={({ target }) => {
              setInfo((prev) => ({
                ...prev,
                email: target.value,
              }));
            }}
          />
          {error.password && (
            <div className="text-sm text-red-500">{error.password}</div>
          )}
          <PasswordInput setInfo={setInfo} info={info} />
          {error.general && (
            <div className="text-sm text-red-500">{error.general}</div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 shadow py-3 text-white mt-3 hover:bg-indigo-700"
          >
            Signup
            {error.loading && <Spinner />}
          </button>

          <div className="mt-6 text-gray-700 text-center">
            Already have an account ?{" "}
            <Link
              className="text-indigo-500 hover:text-indigo-700 hover:underline"
              to={"/login"}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
