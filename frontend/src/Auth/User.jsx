import { Link, Outlet } from "react-router-dom";
import SimpleNav from "../components/SimpleNav";

function User() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <SimpleNav />
      <div className="flex justify-center items-center flex-grow">
        {/*  The outlet is for making more action like add friend , share our notes to friends and see friends shared notes */}
        <Outlet />
      </div>
    </div>
  );
}

export default User;
