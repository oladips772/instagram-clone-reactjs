/** @format */
import React from "react";
import { People } from "../data/people";
import Story from "../shared/Story";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Stories() {
  const [user] = useAuthState(auth);
  return (
    <div className="flex items-center space-x-4 p-2 border overflow-x-scroll">
      {People.map((person, index) => (
        <Story key={index} name={person.username} image={person.avatar} />
        ))}
    </div>
  );
}

export default Stories;
