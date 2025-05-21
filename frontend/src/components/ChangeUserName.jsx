function ChangeUserName({ setChangeUserName, changeUserName }) {
  return (
    <div
      className={`fixed flex justify-center items-center  w-screen h-screen transition bg-black/30 top-0 left-0 ${
        changeUserName ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <div className="w-96 bg-white p-5  rounded-lg shadow">
        <h2 className="text-lg font-medium mb-5">Change my username</h2>
        <input type="text" className="input" placeholder="New Username" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => {
              setChangeUserName(false);
            }}
            className="rounded bg-red-500 hover:bg-red-600 p-2 text-white flex justify-center w-full "
          >
            Cancel
          </button>
          <button className="rounded bg-indigo-500 hover:bg-indigo-600 p-2 text-white flex justify-center w-full ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeUserName;
