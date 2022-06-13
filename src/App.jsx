import "./sass/App.scss";
import React, { useEffect, useState } from "react";
import InputSearcher from "./components/InputSearcher";
import DropDownList from "./components/DropDownList";

function App() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [matchingWords, setMatchingWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // fetch data from mock api

  const fetchData = async () => {
    const response = await fetch(
      "https://62a0ea03a9866630f81aed05.mockapi.io/cars"
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched.");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="App">
      <InputSearcher
        data={data}
        tags={tags}
        setTags={setTags}
        setMatchingWords={setMatchingWords}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <DropDownList
        tags={tags}
        setTags={setTags}
        matchingWords={matchingWords}
        setMatchingWords={setMatchingWords}
        setInputValue={setInputValue}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}

export default App;
