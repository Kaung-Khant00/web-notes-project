import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TiPinOutline } from "react-icons/ti";
import { MdOutlineTimer } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import Label from "./Label";
import Detail from "../Page/Detail";
import { useState } from "react";

function NoteCard() {
  const [showDetail, setShowDetail] = useState(false);

  /*   Edit Notes API process */
  function handleEdit(e) {
    e.stopPropagation();
  }
  /*   Delete Notes API process */
  function handleDelete(e) {
    e.stopPropagation();
  }
  /*   Pin Notes API process */
  function handlePin(e) {
    e.stopPropagation();
  }
  return (
    <>
      <div
        onClick={() => {
          setShowDetail(true);
        }}
        className="w-full relative bg-white active:bg-gray-200 shadow-md hover:shadow-xl p-5 rounded-2xl transition-transform duration-200 hover:scale-[102%] border border-gray-200"
      >
        {/*   title of the note */}
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-gray-800">To Go Shower</h2>
          <Label text={"Pin the note"}>
            <button
              onClick={handlePin}
              className="p-2 text-gray-800 hover:text-indigo-500"
            >
              <TiPinOutline size={24} />
            </button>
          </Label>
        </div>
        {/*   description or content about the notes  */}
        <p className="text-sm text-gray-600 mt-2 mb-5 leading-relaxed">
          Don't forget to do blabla Lorem ipsum dolor, sit amet consectetur...
        </p>
        {/* tags */}
        <div className="mb-5">
          <span className="ms-1 bg-red-100 p-1 rounded-lg">#bath</span>
          <span className="ms-1 bg-red-100 p-1 rounded-lg">#bedroom</span>
        </div>

        {/*  actions icons  */}
        <div className="absolute right-3 bottom-0 mb-3 flex">
          <Label text={"Edit the note"}>
            <button
              onClick={handleEdit}
              className="p-2 transition border border-indigo-400 text-indigo-500 hover:bg-indigo-400 hover:text-white rounded-full m-1"
            >
              <MdEdit size={20} />
            </button>
          </Label>

          <Label text={"Delete the note"}>
            <button
              onClick={handleDelete}
              className="p-2 transition border border-red-400 text-red-500 hover:bg-red-400 hover:text-white rounded-full m-1"
            >
              <MdDelete size={20} />
            </button>
          </Label>
        </div>
        {/*   Detail info about time is here  */}
        <div className="flex items-center gap-2">
          <LuCalendarClock className="text-gray-600" size={20} />
          <h4 className="text-gray-600"> May 18, 2025 9:15 AM</h4>
        </div>
      </div>
      <Detail showDetail={showDetail} setShowDetail={setShowDetail} />
    </>
  );
}

export default NoteCard;
