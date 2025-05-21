import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

import Search from "./Search";
import Label from "./Label";

function Nav({ setShowFilter }) {
  return (
    <div className="z-30 sticky top-0 flex justify-between shadow w-full p-1 sm:p-3 px-5 items-center bg-white">
      <h2 className=" text-2xl font-medium text-indigo-500">Note Project</h2>
      <div className="hidden md:block">
        <Search setShowFilter={setShowFilter} />
      </div>
      <div className="flex gap-2 items-center">
        <Link to={"/user/account"}>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-lg me-2">
            KK
          </div>
        </Link>
        <div className="hidden md:block">
          <div className="text-sm mb-1">Kaung Khant</div>
          <Label text={"Logout my account"} position={"-trangray-x-2/3 mt-1 "}>
            <button className=" py-1 px-3 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 flex items-center">
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
