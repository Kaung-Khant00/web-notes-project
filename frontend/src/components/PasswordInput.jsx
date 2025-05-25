import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function PasswordInput({ setInfo, info }) {
  return (
    <div className="relative mb-5">
      <input
        type={info.showPassword ? "text" : "password"}
        value={info.password}
        onChange={({ target }) => {
          setInfo((prev) => ({
            ...prev,
            password: target.value,
          }));
        }}
        placeholder="Enter password"
        className="bg-gray-100 rounded px-3 py-2 w-full shadow hover:bg-gray-200"
      />
      <div
        onClick={() => {
          setInfo((prev) => ({
            ...prev,
            showPassword: !prev.showPassword,
          }));
        }}
        className="absolute right-0 top-0 px-2 inset-y-0 flex items-center text-gray-800 hover:text-gray-500"
      >
        {info.showPassword ? (
          <FaRegEye size={25} />
        ) : (
          <FaRegEyeSlash size={25} />
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
