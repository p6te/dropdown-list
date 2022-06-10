import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import "../sass/InputSearcher.scss";

function InputSearcher({ data, tags, setTags, setOpenList }) {
  
  const addTag = (e) => {
    if (e.target.value !== "") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const handleBlur = (e) => {
    setOpenList(false);
    addTag(e);
  };

  const deleteTag = (index) => {
    const deleteTag = tags.filter((i) => tags.indexOf(i) !== index);
    setTags(deleteTag);
  };

  const RenderTags = () => {
    if (tags.length > 0) {
      return tags.map((tag, index) => {
        return (
          <li key={index} index={index}>
            <span>{tag}</span>

            <MdClose className="colse-tag" onClick={() => deleteTag(index)} />
          </li>
        );
      });
    }
  };

  return (
    <div className="input-searcher">
      <ul>
        <RenderTags />
      </ul>
      <input
        type="text"
        placeholder="Search by tags..."
        onKeyUp={(e) => (e.key === "Enter" ? addTag(e) : null)}
        onFocus={() => setOpenList(true)}
        onBlur={(e) => handleBlur(e)}
      />
    </div>
  );
}

export default InputSearcher;
