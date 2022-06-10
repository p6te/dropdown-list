import React from "react";
import { MdClose } from "react-icons/md";
import "../sass/InputSearcher.scss";

function InputSearcher({ data, tags, setTags }) {
  const addtags = () => {};
  return (
    <div className="input-searcher">
      <ul>
        <li>
          <span>car</span>
          <MdClose className="colse-tag"/>
        </li>
        <li>
          <span>car</span>
          <MdClose />
        </li>
        <li>
          <span>car</span>
          <MdClose />
        </li>
      </ul>
      <input
        type="text"
        placeholder="Search by tags..."
        onKeyUp={(e) => (e.key === "Enter" ? addtags(e) : null)}
      />
    </div>
  );
}

export default InputSearcher;
