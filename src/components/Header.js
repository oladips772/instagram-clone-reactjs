/** @format */
import React from "react";
import { HomeIcon } from "@heroicons/react/solid";
import {
  SearchIcon,
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";

function Header() {
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [user] = useAuthState(auth);

  const LOGIN = async () => {
    !user && signInWithPopup(auth, provider).catch((err) => alert(err));
  };

  return (
    <>
      <div className="fixed top-0 flex justify-around bg-white items-center w-full shadow pb-1 h-14 z-50 mb-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
          className="h-[40px] object-contain"
        />
        {/* input div */}
        <div className="items-center flex h-10 focus:ring-black border relative rounded bg-gray-50">
          <input
            type="text"
            placeholder="search..."
            className="outline-none ml-8 bg-gray-50"
          />
          <SearchIcon className="h-5 absolute text-gray-400 cursor-default ml-2" />
        </div>
        {/* icons div */}
        <div className="flex space-x-4 items-center">
          {user && (
            <>
              <HomeIcon className="h-7 object-contain cursor-pointer" />
              <HeartIcon className="h-7 object-contain cursor-pointer" />
              <PlusCircleIcon
                className="h-7 object-contain cursor-pointer"
                onClick={() => setOpenModal(true)}
              />
              <div className="relative -mt-1 cursor-pointer">
                <PaperAirplaneIcon className="h-7 object-contain rotate-45" />
                <span className="absolute -top-2 -right-1 bg-red-500 text-sm font-bold h-4 pb-2 w-4 rounded-full text-center text-white animate-pulse">
                  2
                </span>
              </div>
            </>
          )}
          <img
            onClick={LOGIN}
            src={
              user
                ? user.photoURL
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
            }
            className="h-9 w-9 rounded-full cursor-pointer"
          />
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Header;
