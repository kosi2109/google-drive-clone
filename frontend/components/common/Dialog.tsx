import React from "react";

function Dialog({
  setIsOpen,
  children,
  padding = "4px",
  width = "50%",
  height = "12px",
}: {
  setIsOpen?: Function;
  children: JSX.Element;
  padding?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center">
      <div
        onClick={() => setIsOpen && setIsOpen(false)}
        className="absolute w-full h-full opacity-50 bg-gray-600 z-50"
      ></div>
      <div
        className={`pointer-events-auto bg-white rounded-md z-50 transition-all`}
        style={{ height: height, width: width, padding: padding }}
      >
        {children}
      </div>
    </div>
  );
}

export default Dialog;
