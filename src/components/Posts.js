/** @format */
import React from "react";
import Post from "../shared/Post";

const posts = [
  {
    id: 1,
    username: "Robert",
    avatar:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/3C8A/production/_107189451_hi054338739.jpg",
    postImg:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/3C8A/production/_107189451_hi054338739.jpg",
    caption: "cinema things on point",
    email: "robert@gmail.com",
  },
  {
    id: 2,
    username: "Dybala",
    avatar:
      "https://cdn.vox-cdn.com/thumbor/m2-k-R1l2oI04DSKFT77dOUDr8c=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23069630/1357348925.jpg",
    postImg:
      "https://cdn.vox-cdn.com/thumbor/m2-k-R1l2oI04DSKFT77dOUDr8c=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23069630/1357348925.jpg",
    caption: "footbal always",
    email: "dybala@gmail.com",
  },
];

function Posts() {
  return (
    <div className="mt-6">
      {posts.map((data, index) => (
        <Post
          key={index}
          caption={data.caption}
          postImg={data.postImg}
          username={data.username}
          avatar={data.avatar}
          email={data.email}
        />
      ))}
    </div>
  );
}

export default Posts;
