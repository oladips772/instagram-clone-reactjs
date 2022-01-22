/** @format */
import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
  return (
    <div className="mt-20 max-w-6xl mx-auto grid grid-cols-3">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="col-span-1 ml-20">
        <div className="fixed top-20 ml-10">
          <Suggestions />
        </div>
      </section>
    </div>
  );
}

export default Feed;
