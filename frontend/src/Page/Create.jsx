import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Tags from "../components/Tags";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import api from "../utils/axios_instance.js";
import dayjs from "dayjs";

function Create({
  setShowCreate,
  showCreate,
  fetchNotes,
  note,
  showEdit = false,
  setShowEdit,
}) {
  // console.log("Finally the note is disappearing in the create component", note);
  /* 
        title: note?.title || "",
      description: note?.description || "",
      tags: note?.tags || [],
      timeline: note?.timeline
        ? info?.timeline
        : dayjs(note.timeline).format("YYYY-MM-DD"),
    }); */
  const [info, setInfo] = useState({
    title: note?.title || "",
    description: note?.description || "",
    tags: note?.tags || [],
    timeline: note?.timeline ? dayjs(note?.timeline).format("YYYY-MM-DD") : "",
  });

  const [error, setError] = useState({
    loading: false,
    title: null,
    description: null,
    timeline: null,
  });
  const validate = () => {
    setError({
      loading: false,
      title: null,
      description: null,
      timeline: null,
    });
    const { title, description } = info;
    let isReturn = false;
    if (!title) {
      isReturn = true;
      setError((prev) => ({ ...prev, title: "Title is required" }));
    }
    if (!description) {
      isReturn = true;
      setError((prev) => ({ ...prev, description: "Description is required" }));
    }
    return isReturn;
  };
  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setError((prev) => ({ ...prev, loading: true }));
    console.log(info);
    try {
      if (showEdit) {
        const data = await api.put("/note/update/" + note._id, {
          title: info.title,
          description: info.description,
          timeline: info.timeline,
          tags: info.tags,
        });
        console.log(data);
        setError((prev) => ({ ...prev, loading: false }));
        if (data.status === 200) {
          toast.success("Note updated  successfully.");
          setShowEdit(false);
          fetchNotes();
        }
      } else {
        console.log("Creating new note");
        const data = await api.post("/note/create", {
          title: info.title,
          description: info.description,
          timeline: info.timeline,
          tags: info.tags,
        });
        console.log(data);
        setError((prev) => ({ ...prev, loading: false }));
        if (data.status === 201) {
          toast.success("Note created successfully.");
          setShowCreate(false);
          fetchNotes();
        }
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
      if (err.status !== 401) {
        toast.error("Note creating error.");
      }
    }
  };
  const onClose = () => {
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    console.log("removing");
    setShowCreate(false);
    setInfo({
      title: "",
      description: "",
      tags: [],
      timeline: "",
    });
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
      <form
        onSubmit={handleCreateNote}
        className="sm:z-0 z-50 h-full sm:h-auto overflow-y-scroll sm:overflow-auto relative bg-white sm:rounded-lg shadow p-7 2xl:w-1/3 xl:w-1/2 lg:w-1/2 md:w-2/3 w-full sm:mx-10  flex gap-4 flex-col "
      >
        <div className="relative">
          <button
            type="button"
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
          {error.title && (
            <div className="text-sm text-red-500">{error.title}</div>
          )}
          <input
            value={note?.title || info.title}
            onChange={({ target }) => {
              setInfo((prev) => ({ ...prev, title: target.value }));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            type="text"
            className="text-lg  shadow-md input"
            placeholder="TITLE"
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-1">
            DESCRIPTION
          </label>
          {error.description && (
            <div className="text-sm text-red-500">{error.description}</div>
          )}
          <textarea
            value={note?.description || info.description}
            onChange={({ target }) => {
              setInfo((prev) => ({ ...prev, description: target.value }));
            }}
            type="text"
            className="  shadow-md input"
            placeholder="DESCRIPTION "
          />
        </div>
        <Tags setInfo={setInfo} tags={note?.tags || info.tags} />
        {console.log("What is wrong with you bro !!!  ", info)}
        <div>
          <label htmlFor="timeline" className="mb-1">
            TIMELINE
          </label>
          <input
            value={note?.timeline || info.timeline}
            onChange={({ target }) => {
              setInfo((prev) => ({ ...prev, timeline: target.value }));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            type="date"
            className="text-lg  shadow-md input"
            placeholder="TIMELINE"
          />
        </div>
        <button
          type="submit"
          className="text-lg w-full bg-indigo-500 p-2 text-white rounded-lg hover:bg-indigo-600 shadow-md mt-5"
        >
          Create
        </button>
        {/*  Close button */}
        <div
          className="hidden sm:block absolute right-5 top-5"
          onClick={onClose}
        >
          <button type="button" className="p-3 hover:bg-gray-200 rounded-full">
            <IoClose size={30} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
