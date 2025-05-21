import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Tags from "../components/Tags";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function Create({ setShowCreate, showCreate }) {
  const [tags, setTags] = useState([]);
  const onClose = () => {
    setTags([]);
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    setShowCreate(false);
  };
  useEffect(() => {
    if (showCreate) {
      function LockScrolling() {
        const body = document.querySelector("body");
        body.classList.add("overflow-hidden");
      }
      LockScrolling();
    }
  }, [showCreate]);
  return (
    <div
      className={`${
        showCreate ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } overlap_box `}
    >
      <div className="sm:z-0 z-50 h-full overflow-y-scroll relative bg-white sm:rounded-lg shadow p-7 2xl:w-1/3 xl:w-1/2 lg:w-1/2 md:w-2/3 w-full sm:mx-10  flex gap-4 flex-col ">
        <div className="relative">
          <button
            className="block sm:hidden absolute   p-2 rounded-lg "
            onClick={onClose}
          >
            <IoIosArrowBack size={25} className="inline" />
          </button>
          <h2 className="text-2xl font-medium text-center">Create new Note</h2>
        </div>
        <div>
          <label htmlFor="title" className="mb-1">
            TITLE
          </label>
          <input
            type="text"
            className="text-lg  shadow-md input"
            placeholder="TITLE"
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-1">
            DESCRIPTION
          </label>
          <textarea
            type="text"
            className="  shadow-md input"
            placeholder="DESCRIPTION "
          ></textarea>
        </div>
        <Category />
        <Tags setTags={setTags} tags={tags} />
        <button className="text-lg w-full bg-indigo-500 p-2 text-white rounded-lg hover:bg-indigo-600 shadow-md mt-5">
          Create
        </button>
        {/*  Close button */}
        <div
          className="hidden sm:block absolute right-5 top-5"
          onClick={onClose}
        >
          <button className="p-3 hover:bg-gray-200 rounded-full">
            <IoClose size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
