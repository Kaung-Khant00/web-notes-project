import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { MdEdit, MdLogout } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LiaUserPlusSolid } from "react-icons/lia";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChangeUserName from "../components/ChangeUserName";
import UserColor from "../components/UserColor";
import api from "../axios_instance.js";
import { toast } from "react-toastify";
import { getFirstTwoLetter } from "../validator";

function Account() {
  const [changeUserName, setChangeUserName] = useState(false);
  const [userColor, setUserColor] = useState(null);
  const [info, setInfo] = useState(null);
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
        setInfo({ ...data.data.user, firstLetters });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="flex flex-col sm:items-center justify-between bg-white shadow-lg w-full h-full sm:h-auto sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 rounded-lg pt-8 relative">
      <Link
        to={"/home"}
        className="absolute left-3 top-3 p-2 rounded-lg border border-indigo-400 hover:bg-indigo-500 text-indigo-500 hover:text-white"
      >
        <IoIosArrowBack size={25} className="inline" /> Back{" "}
      </Link>
      {/*  user info start */}
      <div className="mb-7">
        <div className="flex items-center flex-col">
          <div
            className={` text-2xl w-15 h-15 rounded-full flex justify-center items-center  me-2 ${
              userColor
                ? userColor + " text-white "
                : info?.background_color
                ? info?.background_color + " text-white "
                : "bg-indigo-400 text-white"
            }`}
          >
            {info?.firstLetters}
          </div>
          <h2 className="font-medium text-lg text-center mt-3 text-gray-900">
            {info?.user_name}
          </h2>
          <ChangeUserName
            setChangeUserName={setChangeUserName}
            changeUserName={changeUserName}
          />
          <button
            className="text-base text-indigo-500 hover:text-indigo-800 mt-1"
            onClick={() => {
              setChangeUserName(true);
            }}
          >
            Change my username
            <MdEdit className="inline" />
          </button>
        </div>
        <UserColor
          setInfo={setInfo}
          userColor={userColor}
          setUserColor={setUserColor}
        />
      </div>
      {/*   seperated */}
      <div className="w-full mt-5">
        <div
          onClick={handleLogout}
          className=" border-t transition border-b group border-gray-200 p-3 text-lg text-red-500 hover:bg-red-400 hover:text-white"
        >
          Logout{" "}
          <MdLogout
            size={25}
            className=" inline ms-1 group-hover:trangray-x-1/3 transition"
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
