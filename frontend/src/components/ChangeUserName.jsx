import { toast } from "react-toastify";
import api from "../axios_instance";
import { useState } from "react";

function ChangeUserName({ setChangeUserName, changeUserName }) {
  const [info, setInfo] = useState({
    loading: false,
    user_name: "",
    error: null,
  });
  const handleChangeUserName = async () => {
    if (info.user_name === "") {
      setInfo((prev) => ({
        ...prev,
        error: "User name is required.",
      }));
    }
    setInfo((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const data = await api.post("/user/update-username", {
        user_name: info.user_name,
      });
      console.log(data);
      if (data.status === 200) {
        toast.success(data.data.message);
      }
    } catch (err) {
      console.log(err);
      setInfo((prev) => ({
        ...prev,
        loading: false,
        error: err.response.data.message,
      }));
    }
  };
  return (
    <div
      className={`fixed flex justify-center items-center  w-screen h-screen transition bg-black/30 top-0 left-0 ${
        changeUserName ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <form
        onSubmit={handleChangeUserName}
        className="w-96 bg-white p-5  rounded-lg shadow"
      >
        <h2 className="text-lg font-medium mb-5">Change my username</h2>
        <input
          value={info.user_name}
          onChange={({ target }) => {
            setInfo((prev) => ({
              ...prev,
              user_name: target.value,
            }));
          }}
          type="text"
          className="input"
          placeholder="New Username"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => {
              setChangeUserName(false);
            }}
            type="button"
            className="rounded bg-red-500 hover:bg-red-600 p-2 text-white flex justify-center w-full "
          >
            Cancel
          </button>
          <button className="rounded bg-indigo-500 hover:bg-indigo-600 p-2 text-white flex justify-center w-full ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeUserName;
