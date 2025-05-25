import { IoIosSearch } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

import Label from "./Label";

function Search({ setShowFilter, searchQuery, fetchNotes, setSearchQuery }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        onClick={fetchNotes}
        className=" max-w-10 text-indigo-500 hover:text-indigo-700 hover:underline leading-tight"
      >
        clear filter
      </div>
      <Label text={"Filter your notes"}>
        <button
          className="flex p-2 hover:text-gray-500"
          onClick={() => {
            setShowFilter(true);
          }}
        >
          <FiFilter size={30} />
        </button>
      </Label>
      <div className="relative w-full min-[400px]:w-90">
        <input
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          type="text"
          placeholder="Search"
          className="bg-gray-100 p-2 rounded shadow w-full ps-4"
        />
        {searchQuery && (
          <Label
            text="Clear the search"
            className={"absolute right-0 flex items-center inset-y-0"}
            position={"-trangray-x-full"}
          >
            <button
              onClick={() => {
                setSearchQuery("");
              }}
              className="p-1 hover:text-gray-500 absolute right-10 z-10"
            >
              <IoIosClose size={30} />
            </button>
          </Label>
        )}
        <Label
          text={"Search your notes"}
          className={"absolute right-0 flex items-center inset-y-0"}
        >
          <button className=" hover:text-gray-500 px-2">
            <IoIosSearch size={30} />
          </button>
        </Label>
      </div>
    </div>
  );
}

export default Search;
