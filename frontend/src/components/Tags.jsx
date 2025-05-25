import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { TbTagPlus } from "react-icons/tb";

function Tags({ tags = [], setInfo }) {
  const [tagInput, setTagInput] = useState("");
  const handleAddTag = (e) => {
    console.log("making new tags");
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput !== "") {
        setInfo((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
        setTagInput("");
      }
    }
  };
  const handleRemoveTag = (targetTag) => {
    setInfo((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item !== targetTag),
    }));
  };
  return (
    <div>
      <label htmlFor="tags">TAGS</label>
      <div className="">
        <input
          type="text"
          className="input"
          placeholder="TAGS"
          onKeyDown={(e) => {
            handleAddTag(e);
          }}
          value={tagInput}
          onChange={({ target }) => {
            setTagInput(target.value);
          }}
        />
        {/* <button className="p-2 border rounded-lg border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">
          <TbTagPlus size={20} />
        </button> */}
      </div>
      <div className="mt-4 flex">
        {tags.length > 0 &&
          tags.map((item) => (
            <div className="ms-1 bg-red-100 p-1 rounded-lg flex items-center">
              {item}
              <button
                type="button"
                className="hover:text-gray-500"
                onClick={() => {
                  handleRemoveTag(item);
                }}
              >
                <IoIosClose size={25} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Tags;
