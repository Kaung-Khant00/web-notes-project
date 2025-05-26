const Confirm = ({ confirming, setConfirming, handleDelete }) => {
  return (
    <div
      className={`z-50 fixed flex justify-center items-center  w-screen h-screen transition bg-black/30 top-0 left-0 ${
        confirming ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <div className="w-96 bg-white p-6  rounded-lg shadow">
        <h2 className="text-lg font-medium mb-1 text-center">
          Are you sure to delete?
        </h2>
        <p className="text-gray-500 text-center mb-1">
          You can't get back if you delete it.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => {
              setConfirming(false);
            }}
            className="rounded bg-indigo-500 hover:bg-indigo-600 p-2 text-white flex justify-center w-full "
          >
            cancle
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="rounded bg-red-500 hover:bg-red-600 p-2 text-white flex justify-center w-full "
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
