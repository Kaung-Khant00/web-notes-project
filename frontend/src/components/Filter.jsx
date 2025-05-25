///  need to fix FILTER SELECTION saying to add an useState with initial object

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Tags from "./Tags";
import api from "../utils/axios_instance.js";

function Filter({ closeFilter, showFilter, setNotes }) {
  const [info, setInfo] = useState({
    startDate: "",
    endDate: "",
    tags: [],
  });
  const [error, setError] = useState("");
  const handleFilter = async (e) => {
    e.preventDefault();

    if (!info.startDate && !info.endDate && info.tags.length === 0) {
      setError("Please select at least one filter option.");
      return;
    }
    if (new Date(info.startDate) > new Date(info.endDate)) {
      setError("Start date cannot be later than end date.");
      return;
    }
    setError("");
    const filterData = {
      startDate: info.startDate,
      endDate: info.endDate,
      tags: info.tags,
    };
    try {
      const data = await api.post("/note/filter", filterData);
      setNotes(data.data.notes);
      closeFilter();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (showFilter) {
      function LockScrolling() {
        const body = document.querySelector("body");
        body.classList.add("overflow-hidden");
      }
      LockScrolling();
    }
  }, [showFilter]);
  return (
    <div
      className={`overlap_box ${
        showFilter ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <div className="w-auto bg-white rounded-lg shadow-lg p-5 relative">
        <h2 className="title mb-6">Filter my notes</h2>
        <form onSubmit={handleFilter}>
          <div className="mt-3">
            <label className="block" htmlFor="data">
              REMINDER
            </label>
            <div className=" flex gap-3">
              <div>
                {" "}
                <label className="text-gray-600" htmlFor="startDate">
                  starting date
                </label>
                <input
                  onChange={({ target }) => {
                    setInfo((prev) => ({ ...prev, startDate: target.value }));
                  }}
                  className="input text-gray-500"
                  name="startDate"
                  type="date"
                  id=""
                />
              </div>
              <div>
                <label className="text-gray-600" htmlFor="endDate">
                  ending date
                </label>
                <input
                  onChange={({ target }) => {
                    setInfo((prev) => ({ ...prev, endDate: target.value }));
                  }}
                  className="input text-gray-500"
                  name="endDate"
                  type="date"
                  id=""
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Tags tags={info.tags} setInfo={setInfo} />
          </div>
          <div className="text-red-500 text-sm">{error}</div>
          <button className="w-full mt-5 rounded-lg p-2 text-lg text-white bg-indigo-500 hover:bg-indigo-600">
            Filter
          </button>
          {/*  Close button */}
          <div className="absolute right-5 top-5" onClick={closeFilter}>
            <div className="p-3 hover:bg-gray-200 rounded-full">
              <IoClose size={30} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
