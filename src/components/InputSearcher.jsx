import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "../sass/InputSearcher.scss";

function InputSearcher({ data, tags, setTags, setOpenList, setMatchingWords }) {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
    matchingWords(e);
  };

  const handleBlur = (e) => {
    setOpenList(false);
    // setMatchingWords([])
  };

  const addTag = (e) => {
    if (e.target.value !== "") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
      setInputValue("");
    }
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

  const matchingWords = (e) => {

    const input = e.target.value;

    const countries = data.map((item) => {
      if (item.country.toLowerCase().includes(input.toLowerCase()))
        return item.country;
    });
    const matchedCountries = countries.filter((item) => item !== undefined);

    const vehicles = data.map((item) => {
      if (item.vehicle.toLowerCase().includes(input.toLowerCase()))
        return item.vehicle;
    });
    const matchedVehicles = vehicles.filter((item) => item !== undefined);

    const models = data.map((item) => {
      if (item.vehicle.toLowerCase().includes(input.toLowerCase()))
        return item.vehicle;
    });
    const matchedModels = models.filter((item) => item !== undefined);

    const types = data.map((item) => {
      if (item.vehicle.toLowerCase().includes(input.toLowerCase()))
        return item.vehicle;
    });
    const matchedTypes = types.filter((item) => item !== undefined);

    const matchedwords = [
      ...matchedCountries,
      ...matchedVehicles,
      ...matchedTypes,
      ...matchedModels,
    ];

    setMatchingWords(matchedwords);
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
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => handleInput(e)}
        value={inputValue}
      />
    </div>
  );
}

export default InputSearcher;
