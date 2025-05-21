import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { TbTagPlus } from "react-icons/tb";

function Tags({ tags, setTags }) {
  const [tagInput, setTagInput] = useState("");
  const handleAddTag = (e) => {
    if (e.nativeEvent.code === "Enter") {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };
  useEffect(
    () => {
      console.log(tags);
    },
    { tags }
  );
  const handleRemoveTag = (targetTag) => {
    setTags((oldTags) => {
      return oldTags.filter((item) => item !== targetTag);
    });
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
