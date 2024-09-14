import React from "react";
import LeftSidebar from "../../component/leftSidebar/LeftSidebar";
import UserList from "./UserList";
import "./Users.css";

function Users({ slideIn }) {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <h1 style={{ fontWeight: "400" }}>Users</h1>
        <UserList />
      </div>
    </div>
  );
}

export default Users;
