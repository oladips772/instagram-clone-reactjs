/** @format */
import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import {
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";

function Post({ email, postImg, avatar, caption, username }) {
  return (
    <div className="w-full border bg-white my-6">
      {/* header div */}
      <div className="flex items-center p-2">
        <img
          src={avatar}
          className="h-10 w-10 rounded-full mr-2 object-contain"
          alt=""
        />
        {/* header info div */}
        <div className="flex flex-col w-full flex-1">
          <h3>{username}</h3>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
        <DotsHorizontalIcon className="h-6" />
      </div>
      <img src={postImg} />
      {/* likes and icon div */}
      <div className="flex items-center mb-2 mt-4 mx-2">
        <div className="flex items-center space-x-4 flex-1">
          <HeartIcon className="h-7 cursor-pointer" />
          <ChatIcon className="h-7 cursor-pointer " />
          <PaperAirplaneIcon className="h-7 rotate-45 -mt-1 cursor-pointer" />
        </div>
        <BookmarkIcon className="h-7" />
      </div>
      {/* number of likes below */}
      <p className="font-bold mx-2 text-sm">4 likes</p>
      {/* caption and comment div */}
      <div className="flex items-center mx-2 mb-3">
        <h3 className="font-bold mr-2">{username}</h3>
        <p>{caption}</p>
      </div>
      {/* comment input div */}
      <div className="flex items-center border-t h-[44px] pt-3 pb-3 mx-2">
        <EmojiHappyIcon className="h-7 cursor-pointer mr-2" />
        <input
          type="text"
          className=" flex-1 outline-none border-none"
          placeholder="Add a comment"
        />
        <button className="text-blue-500 font-bold">Post</button>
      </div>
    </div>
  );
}

export default Post;
