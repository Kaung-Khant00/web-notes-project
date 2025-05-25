import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TiPinOutline } from "react-icons/ti";
import { MdOutlineTimer } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import Label from "./Label";
import Detail from "../Page/Detail";
import { useState } from "react";
import dayjs from "dayjs";
import api from "../utils/axios_instance.js";
import { toast } from "react-toastify";
import Confirm from "./Confirm";
import Create from "../Page/Create";

function NoteCard({ note, fetchNotes }) {
  const [showDetail, setShowDetail] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  /*   Edit Notes API process */
  function handleEdit() {
    console.log("<<__<<__ trying to edit from detail __>>__>>", note);
    setShowEdit(true);
  }
  /*   Delete Notes API process */
  const handleDelete = async () => {
    try {
      const data = await api.delete(`/note/delete/${note._id}`);
      if (data.status === 200) {
        fetchNotes();
        setConfirming(false);

        toast.success("Note Deleted Successfully");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Error deleting note.");
    }
  };
  /*   Pin Notes API process */
  const handlePin = async (e) => {
    e.stopPropagation();
    try {
      const data = await api.put("/note/pin/" + note._id);
      console.log(data);
      if (data.status === 200) {
        fetchNotes();
        toast.success(data.data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error pinning note.");
    }
  };
  return (
    <>
      <div
        onClick={() => {
          setShowDetail(true);
        }}
        className="w-full relative bg-white active:bg-gray-200 shadow-md hover:shadow-xl p-5 pb-8 rounded-2xl transition-transform duration-200 hover:scale-[102%] border border-gray-200"
      >
        {/*   title of the note */}
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{note?.title}</h2>
          <Label text={"Pin the note"}>
            <button
              onClick={handlePin}
              className={`p-1 text-gray-800 hover:text-indigo-600 ${
                note.is_pinned && "text-indigo-400"
              }`}
            >
              <TiPinOutline size={27} />
            </button>
          </Label>
        </div>
        {/*   description or content about the notes  */}
        <p className="text-sm text-gray-600 mb-2 leading-relaxed">
          {note?.description.length > 70
            ? note?.description.slice(0, 75) + "..."
            : note?.description}
        </p>
        {/* tags */}
        <div className="mb-5">
          {note?.tags &&
            note.tags.map((tag) => (
              <span className="ms-1 bg-indigo-100 p-1 text-indigo-800 rounded-lg">
                #{tag}
              </span>
            ))}
        </div>

        {/*  actions icons  */}
        <div className="absolute right-3 bottom-0 mb-3 flex">
          <Label text={"Edit the note"}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="p-2 transition border border-indigo-400 text-indigo-500 hover:bg-indigo-400 hover:text-white rounded-full m-1"
            >
              <MdEdit size={20} />
            </button>
          </Label>

          <Label text={"Delete the note"}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirming(true);
              }}
              className="p-2 transition border border-red-400 text-red-500 hover:bg-red-400 hover:text-white rounded-full m-1"
            >
              <MdDelete size={20} />
            </button>
          </Label>
        </div>
        {/*   Detail info about time is here  */}
        <div className="flex items-center gap-2 absolute bottom-4">
          <LuCalendarClock className="text-gray-600" size={20} />
          <h4 className="text-gray-600">
            {note?.timeline
              ? dayjs(note.timeline).format("MMMM D YYYY")
              : "not provided"}
          </h4>
        </div>
      </div>
      <Detail
        handleDelete={handleDelete}
        handlePin={handlePin}
        handleEdit={handleEdit}
        note={note}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
      />
      <Confirm
        setConfirming={setConfirming}
        confirming={confirming}
        handleDelete={handleDelete}
      />
      <Create
        setShowCreate={setShowEdit}
        showCreate={showEdit}
        showEdit={showEdit}
        fetchNotes={fetchNotes}
        note={note}
        setShowEdit={setShowEdit}
      />
    </>
  );
}

export default NoteCard;
