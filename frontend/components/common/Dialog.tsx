import React, { Dispatch } from "react";

function Dialog({
  setIsOpen,
  children,
  padding = '4px',
  width = '50%',
  height = '12px'
}: {
  setIsOpen: Dispatch<boolean>;
  children: JSX.Element;
  padding? : string;
  width? : string;
  height? : string;
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[200] flex justify-center items-center">
      <div
        onClick={() => setIsOpen(false)}
        className="absolute w-full h-full opacity-50 bg-gray-600 z-[200]"
      ></div>
      <div className={`pointer-events-auto bg-white rounded-md z-[210] transition-all`} style={{height : height, width : width , padding : padding}}>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
