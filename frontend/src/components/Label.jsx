import React, { useRef, useState } from "react";

function Label({ children, text, className = "relative", position }) {
  const [show, setShow] = useState(false);

  const timeRef = useRef(null);
  const mouseEnter = () => {
    timeRef.current = setTimeout(() => {
      setShow(true);
    }, 1500);
  };
  const mouseLeave = () => {
    clearTimeout(timeRef.current);
    setShow(false);
  };
  return (
    <div
      className={`${className} z-10`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {children}
      <div
        className={` ${
          show ? "scale-100 opacity-100" : "scale-0 opacity-0 "
        } z-40 absolute left-1/2 top-full text-sm bg-gray-600/80 text-white rounded p-2 whitespace-nowrap backdrop-blur-3xl -translate-x-1/2 shadow transition ${position}`}
      >
        {text}
      </div>
    </div>
  );
}

export default Label;
