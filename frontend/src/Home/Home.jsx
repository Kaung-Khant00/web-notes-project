import Nav from "../components/Nav";
import NoteCard from "../components/NoteCard";
import { FaPlus } from "react-icons/fa6";
import Create from "../Page/Create";
import { useState } from "react";
import Filter from "../components/Filter";
import Search from "../components/Search";
import Detail from "../Page/Detail";

function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const closeFilter = () => {
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    setShowFilter(false);
  };

  return (
    <>
      <Nav setShowFilter={setShowFilter} />
      <div className="bg-gray-100 min-h-screen flex flex-col overflow-x-hidden">
        <div className=" md:hidden bg-white flex justify-center border-t border-gray-200 py-2 ">
          <Search setShowFilter={setShowFilter} />
        </div>
        <div className=" flex-grow ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 max-w-7xl mx-auto px-4 py-6">
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>
        </div>
        <button
          onClick={() => {
            setShowCreate(true);
          }}
          className="z-10 p-4 shadow-lg rounded-full fixed right-6 bottom-6 bg-indigo-500 hover:bg-indigo-600 text-white transition"
        >
          <FaPlus size={22} />
        </button>
        <Create setShowCreate={setShowCreate} showCreate={showCreate} />
        <Filter showFilter={showFilter} closeFilter={closeFilter} />
      </div>
    </>
  );
}

export default Home;
