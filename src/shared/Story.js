/** @format */
import React from "react";

function Story({ name, image }) {
  return (
    <div className="items-center flex flex-col">
      <img
        src={image}
        className="h-14 w-14 rounded-full p-[1.6px] border border-red-500 object-cover"
        alt=""
      />
      <p className="">{name}</p>
    </div>
  );
}

export default Story;
