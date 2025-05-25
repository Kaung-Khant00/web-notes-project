import { toast } from "react-toastify";
import api from "../utils/axios_instance";

const colors = [
  "bg-red-400",
  "bg-green-400",
  "bg-indigo-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
];

function UserColor({ setUserColor, userColor, setInfo }) {
  const handleChangeColor = async () => {
    try {
      const data = await api.post("/user/update-color", {
        background_color: userColor,
      });
      console.log(data);
      if (data.status === 200) {
        setInfo((prev) => ({ ...prev, background_color: userColor }));
        toast.success(data.data.message);
        setUserColor(null);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=" p-2">
      <div>Choose my user color</div>
      <div className="sm:grid sm:grid-cols-2 sm:justify-items-center ">
        <div className="flex sm:mb-0 mb-3">
          {colors.map((color) => (
            <div
              onClick={() => {
                setUserColor(color);
              }}
              className={`${color} hover:opacity-70 rounded-full w-9 h-9 m-1`}
            ></div>
          ))}
        </div>
        {userColor && (
          <div className="flex gap-4">
            <button
              onClick={() => {
                setUserColor(null);
              }}
              className=" p-2 bg-red-500 hover:bg-red-600 text-white shadow rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleChangeColor}
              className=" p-2 bg-indigo-500 hover:bg-indigo-600 text-white shadow rounded-lg"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserColor;
