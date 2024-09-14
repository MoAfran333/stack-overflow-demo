import React from "react";
import LeftSidebar from "../../component/leftSidebar/LeftSidebar.jsx";
import TagList from "./TagList.jsx";
import { tagsList } from "./tagsList.js";
import "./Tags.css";

function Tags({ slideIn }) {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} />
      <div className="home-container-2">
        <h1 className="tags-h1">Tags</h1>
        <p className="tags-p">
          A tag is a keyword or a label that categorizes your question with
          other similar questions.
        </p>
        <p className="tags-p">
          using the right tag makes it easier for others to find and answer your
          question.
        </p>
        <div className="tags-list-container">
          {tagsList.map((tag, index) => (
            <TagList tag={tag} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;
