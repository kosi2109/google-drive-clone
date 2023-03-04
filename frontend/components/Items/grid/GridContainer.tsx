import React from "react";

function GridContainer({children, title}) {
  return (
    <div className="flex flex-col">
      <h5 className="m-3 text-sm font-semibold select-none">{title}</h5>
      <div
        className="flex flex-wrap justify-start px-2 lg:p-0 gap-2 transition-all"
      >
        {children}
      </div>
    </div>
  );
}

export default GridContainer;
