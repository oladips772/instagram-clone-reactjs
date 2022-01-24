/** @format */
import React, { useState, useEffect } from "react";
import Post from "../shared/Post";
import {
  addDoc,
  collection,
  updateDoc,
  query,
  serverTimestamp,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = collection(db, "posts");
    const Queried = query(docRef, orderBy("timestamp", "desc"));
    onSnapshot(Queried, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  });

  return (
    <div className="mt-6">
      {posts.map(
        ({
          data: { caption, userName, userEmail, profileImage, image },
          id,
        }) => (
          <Post
            key={id}
            caption={caption}
            messageImage={image}
            userName={userName}
            profileImage={profileImage}
            userEmail={userEmail}
            id={id}
          />
        )
      )}
    </div>
  );
}

export default Posts;
