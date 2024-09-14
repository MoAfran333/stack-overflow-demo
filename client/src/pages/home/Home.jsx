import React from "react";
import LeftSidebar from "../../component/leftSidebar/LeftSidebar";
import RightSidebar from "../../component/rightSidebar/RightSidebar";
import HomeMainbar from "../../component/HomeMainbar/HomeMainbar";
import "../../App.css";

function Home({ slideIn }) {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} />
      <div className="home-container-2">
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  );
}

export default Home;
