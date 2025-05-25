import { TiPinOutline } from "react-icons/ti";
import { LuCalendarClock } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";

import Label from "../components/Label";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import dayjs from "dayjs";

function Detail({
  showDetail,
  setShowDetail,
  note,
  handleDelete,
  handleEdit,
  handlePin,
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div
      className={`${
        showDetail ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } overlap_box`}
    >
      <div className=" overflow-y-scroll relative bg-white rounded-lg shadow p-7 2xl:w-1/3 xl:w-1/2 lg:w-1/2 md:w-2/3 w-full h-full sm:h-auto sm:mx-10 flex flex-col ">
        <div className="flex justify-between sm:pe-15 items-center mb-5">
          <button
            className="inline sm:hidden p-2 rounded-lg "
            onClick={() => {
              setShowDetail(false);
            }}
          >
            <IoIosArrowBack size={25} className="inline" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">{note?.title}</h2>
          <Label text={"Pin the note"}>
            <button
              onClick={handlePin}
              className="p-2 rounded border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white"
            >
              <TiPinOutline size={24} className="inline" />
              {note?.is_pinned ? "Unpin" : "Pin"}
            </button>
          </Label>
        </div>
        <p className="text-gray-600 mb-5">
          {note?.description.length > 200 ? (
            <>
              {showMore
                ? note?.description
                : note?.description.slice(0, 200) + "..."}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-blue-500 hover:underline"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </>
          ) : (
            note?.description
          )}
        </p>
        <div className="mb-5">
          {note?.tags &&
            note.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <LuCalendarClock className="text-gray-600" size={20} />
          <h4 className="text-gray-600">
            <b>TimeLine:</b>{" "}
            {note?.timeLine
              ? dayjs(note.timeline).format("MMMM D YYYY")
              : "Not provided"}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <LuCalendarPlus className="text-gray-600 mb-2" size={20} />
          <h4 className="text-gray-600">
            <b>Created at:</b>{" "}
            {note?.createdAt && dayjs(note?.createdAt).format("MMMM D YYYY")}
          </h4>
        </div>
        <div className="grid grid-cols-2 mt-4">
          <button
            onClick={handleEdit}
            className="flex gap-2 justify-center items-center p-2 bg-blue-500 hover:bg-blue-600 shadow rounded-lg m-2 text-white"
          >
            <MdEdit size={20} />
            EDIT
          </button>
          <button
            onClick={handleDelete}
            className="flex gap-2 justify-center items-center p-2 bg-red-500 hover:bg-red-600 shadow rounded-lg m-2 text-white"
          >
            <MdDelete size={20} />
            DELETE
          </button>
        </div>
        <div className="sm:block hidden  absolute right-5 top-5">
          <button
            onClick={() => {
              setShowDetail(false);
            }}
            className="p-3 hover:bg-gray-200 rounded-full"
          >
            <IoClose size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
