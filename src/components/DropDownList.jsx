import React, { useState } from "react";
import "../sass/DropDownList.scss";

function DropDownList({ tags, matchingWords, setTags }) {
  const addItem = (tag) => {
    setTags([...tags, tag]);
  };

  const MatchningList = () => {
    const firstTen = matchingWords.slice(0, 10);
    return firstTen.map((tag, index) => {
      return (
        <li
          onClickCapture={() => addItem(tag)}
          className="list-item"
          key={index}
        >
          {tag}
        </li>
      );
    });
  };

  return (
    <div className="dropdown-list">
      <ul>
        <MatchningList />
        <li></li>
      </ul>
    </div>
  );
}

export default DropDownList;
