/** @format */
import React, { useState, useEffect } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import {
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Post({
  caption,
  userName,
  userEmail,
  profileImage,
  messageImage,
  id,
}) {
  const [comment, setComment] = useState("");
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const docRef = collection(db, "posts", id, "comments");
    const Queried = query(docRef, orderBy("timestamp", "desc"));
    onSnapshot(Queried, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [db, id]);

  useEffect(() => {
    const docRef = collection(db, "posts", id, "likes");
    onSnapshot(docRef, (snapshot) => {
      setLikes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [db, id]);

  useEffect(
    () =>
      setHasLiked(likes.findIndex((likes) => likes.id === user?.uid) !== -1),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    }
  };

  const sendComment = async (e) => {
    const commentTosend = comment;
    setComment("");

    e.preventDefault();
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentTosend,
      user: user.displayName,
      userImg: user.photoURL,
      timestamp: serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="w-full border bg-white my-6">
      {/* header div */}
      <div className="flex items-center p-2">
        <img
          src={profileImage}
          className="h-10 w-10 rounded-full mr-2 object-contain"
          alt=""
        />
        {/* header info div */}
        <div className="flex flex-col w-full flex-1">
          <h3>{userName}</h3>
          <p className="text-sm text-gray-600">{userEmail}</p>
        </div>
        <DotsHorizontalIcon className="h-6" />
      </div>
      <img src={messageImage} />
      {user && (
        <>
          {/* likes and icon div */}
          <div className="flex items-center mb-2 mt-4 mx-2">
            <div className="flex items-center space-x-4 flex-1">
              {hasLiked ? (
                <HeartIconSolid
                  className="h-7 cursor-pointer text-red-500"
                  onClick={likePost}
                />
              ) : (
                <HeartIcon className="h-7 cursor-pointer" onClick={likePost} />
              )}
              <ChatIcon className="h-7 cursor-pointer " />
              <PaperAirplaneIcon className="h-7 rotate-45 -mt-1 cursor-pointer" />
            </div>
            <BookmarkIcon className="h-7" />
          </div>
          {/* number of likes below */}
          {likes.length >= 1 && (
            <p className="font-bold mx-2 text-sm">
              {likes.length} {""}
              {likes.length > 1 ? "likes" : "like"}
            </p>
          )}
          {/* caption and comment div */}
          <div className="flex items-center mx-2 mb-1">
            <h3 className="font-bold mr-2">{userName}</h3>
            <p>{caption}</p>
          </div>
          {/* whole comments */}
          <>
            {comments.length >= 1 && (
              <>
                <span className="font-bold mx-2">{comments.length == 1 ? "comment" : "comments"}</span>
                <div className="overflow-y-scroll max-h-20 mx-4 mb-4">
                  {comments.map(({ id, data: { comment, user, userImg } }) => (
                    <div className="flex space-x-2 items-center my-3" key={id}>
                      <img
                        src={userImg}
                        className="h-7 w-7 rounded-full mr-2 object-contain"
                        alt=""
                      />
                      <h5 className="text-sm">{user}</h5>
                      <p className="text-sm font-bold text-gray-500">
                        {comment}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
          {/* comment input div */}
          <div className="flex items-center border-t h-[44px] pt-3 pb-3 mx-2">
            <EmojiHappyIcon className="h-7 cursor-pointer mr-2" />
            <input
              type="text"
              className=" flex-1 outline-none border-none"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment.trim()}
              className="text-blue-500 font-bold"
              onClick={sendComment}
            >
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
