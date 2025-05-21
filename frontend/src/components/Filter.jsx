import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

function Filter({ closeFilter, showFilter }) {
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
      <div className="w-96 bg-white rounded-lg shadow-lg p-5 relative">
        <h2 className="title mb-6">Filter my notes</h2>
        <div>
          <div className="mt-3">
            <label htmlFor="data">Reminder</label>
            <select className="input" name="" id="data">
              <option value="" select>
                None
              </option>
              <option value="">Oldest</option>
              <option value="">Newest</option>
            </select>
          </div>
          <div className="mt-3">
            <label htmlFor="data">Category</label>
            <select className="input" name="" id="data">
              <option value="" select>
                None
              </option>
              <option value="">Workout</option>
              <option value="">Studying</option>
              <option value="">Language</option>
            </select>
          </div>
          <div className="mt-3">
            <label htmlFor="data">Type (Time)</label>
            <select className="input" name="" id="data">
              <option value="" select>
                None
              </option>
              <option value="">Daily</option>
              <option value="">Every other days</option>
              <option value="">Weekend</option>
            </select>
          </div>
          <button className="w-full mt-5 rounded-lg p-2 text-lg text-white bg-indigo-500 hover:bg-indigo-600">
            Filter
          </button>
          {/*  Close button */}
          <div className="absolute right-5 top-5" onClick={closeFilter}>
            <button className="p-3 hover:bg-gray-200 rounded-full">
              <IoClose size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
