import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([])
  

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
      
    </div>
  );
}

export default App;
