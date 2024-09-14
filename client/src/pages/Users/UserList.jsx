import React from "react";
import User from "./User";
import { useSelector } from "react-redux";
import "./Users.css";

function UserList() {
  const users = useSelector((state) => state.users);
  console.log(typeof users);

  return (
    <div className="user-list-containe">
      {users.map((user) => (
        <User user={user} key={user?.id} />
      ))}
    </div>
  );
}

export default UserList;
