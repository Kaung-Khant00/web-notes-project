import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

import Search from "./Search";
import Label from "./Label";
import api from "../utils/axios_instance.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getFirstTwoLetter } from "../utils/validator.js";

function Nav({ setShowFilter, setNotes }) {
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = async () => {
    try {
      const data = await api.get("/user/logout");
      console.log(data);
      if (data.status === 200) {
        toast.success(data.data.message);
        window.location.href = "/login";
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };
  const getUserData = async () => {
    try {
      const data = await api.get("/user");
      console.log(data.data.user);
      if (data.status === 200) {
        const firstLetters = getFirstTwoLetter(data.data.user.user_name);
        console.log(firstLetters);
        setUser({ ...data.data.user, firstLetters });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const searchNotes = async () => {
    if (searchQuery.trim() === "") {
      return;
    }
    try {
      const data = await api.post(`/note/search`, {
        query: searchQuery,
      });
      if (data.status === 200) {
        setNotes(data.data.notes);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    searchNotes();
  }, [searchQuery]);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="z-30 sticky top-0 flex justify-between shadow w-full p-1 sm:p-3 px-5 items-center bg-white">
      <h2 className=" text-2xl font-medium text-indigo-500">Note Project</h2>
      <div className="hidden md:block">
        <Search
          setShowFilter={setShowFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Link to={"/user/account"}>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-lg me-2">
            {user?.firstLetters}
          </div>
        </Link>
        <div className="hidden md:block">
          <div className="text-sm mb-1">{user?.user_name}</div>
          <Label text={"Logout my account"} position={"-trangray-x-2/3 mt-1 "}>
            <button
              onClick={handleLogout}
              className=" py-1 px-3 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 flex items-center"
            >
              Logout
              <MdLogout className=" inline ms-1" />
            </button>
          </Label>
        </div>
      </div>
    </div>
  );
}

export default Nav;
