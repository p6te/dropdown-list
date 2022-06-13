import React, { useEffect, useReducer } from "react";
import "../sass/DropDownList.scss";
import useKeyPress from "../hooks/useKeyPress";

function DropDownList({
  tags,
  matchingWords,
  setTags,
  setMatchingWords,
  setInputValue,
}) {
  //add matching word from the list to the tags

  const addItem = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setMatchingWords([]);
      setInputValue("");
    }
  };

  // slice matching words for first ten elements to show

  const list = matchingWords.slice(0, 10);

  // arrows navigation

  const initialState = { selectedIndex: -1 };

  function reducer(state, action) {
    switch (action.type) {
      case "arrowUp":
        return {
          selectedIndex:
            state.selectedIndex !== -1
              ? state.selectedIndex - 1
              : list.length - 1,
        };
      case "arrowDown":
        return {
          selectedIndex:
            state.selectedIndex !== list.length - 1
              ? state.selectedIndex + 1
              : -1,
        };
      case "select":
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  }

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp" });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown" });
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && matchingWords.length > 0) {
        addItem(list[state.selectedIndex]);
        state.selectedIndex = 0;
      }
    };

    window.addEventListener("keydown", (e) => handleEnter(e));

    return () => {
      window.removeEventListener("keydown", (e) => handleEnter(e));
    };
  }, [state.selectedIndex]);

  return (
    <div className="dropdown-list">
      <ul>
        {list.map((item, i) => (
          <li
            onClickCapture={() => addItem(item)}
            className="list-item"
            key={i}
            onClick={() => {
              dispatch({ type: "select", payload: i });
            }}
            style={{
              cursor: "pointer",
              border: i === state.selectedIndex ? "1px solid white" : "none",
            }}
            role="button"
            aria-pressed={i === state.selectedIndex}
            tabIndex={0}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                dispatch({ type: "select", payload: i });
                e.target.blur();
                state.selectedIndex = 0;
                addItem(item);
                console.log(e);
              }
            }}
          >
            {item}
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}

export default DropDownList;
