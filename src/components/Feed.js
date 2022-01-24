/** @format */
import React from "react";
import Modal from "../shared/Modal";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Feed() {
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [user] = useAuthState(auth);

  return (
    <>
      <Modal />
      <div
        className={`mt-20 max-w-6xl mx-auto grid grid-cols-3 relative ${
          openModal && ""
        }`}
      >
        <section className="col-span-2">
          <Stories />
          <Posts />
        </section>
        <section className="col-span-1 ml-20">
          <div className="fixed top-20 ml-10">{user && <Suggestions />}</div>
        </section>
      </div>
    </>
  );
}

export default Feed;
