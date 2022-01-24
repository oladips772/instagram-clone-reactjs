/** @format */
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { XIcon, PhotographIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const removePost = () => {
    setOpen(false);
    setSelectedFile(null);
    setCaption("");
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      caption: caption,
      userName: user.displayName,
      userEmail: user.email,
      profileImage: user.photoURL,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
    setCaption("");
  };


  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000c9]  z-50 h-full w-full p-10 transition-all ease-in duration-200 delay-300">
          <div className="bg-white z-50 absolute left-[25%] top-[20%] rounded w-[620px] h-[360px] overflow-hidden">
            {/* header div */}
            <div className="flex items center border-b mx-4 p-1">
              <XIcon className="h-6 cursor-pointer" onClick={removePost} />
              <h3 className=" text-center justify-center flex-1 font-bold">
                Create a post
              </h3>
              <button
                disabled={loading}
                hidden={!caption && !selectedFile}
                className="font-bold text-blue-600"
                onClick={uploadPost}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
            {/* body div */}
            <div className="justify-center items-center text-center ">
              {!selectedFile ? (
                <PhotographIcon className="h-60 text-gray-400 ml-[200px]" />
              ) : (
                <div className="flex items center relative">
                  <XIcon
                    className="h-10 cursor-pointer absolute text-white p-2"
                    onClick={() => setSelectedFile(null)}
                  />
                  <img
                    src={selectedFile}
                    className="h-[370px] w-[320px]"
                    alt=""
                  />
                  <div>
                    <textarea
                      type="text"
                      className="w-[270px] min-h-[60px] outline-none border-none ml-2 resize-none"
                      placeholder="add caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {!selectedFile && (
                <button
                  onClick={() => filePickerRef.current.click()}
                  className="text-blue-500 mt-10"
                >
                  choose file
                </button>
              )}
              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={addImageToPost}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
