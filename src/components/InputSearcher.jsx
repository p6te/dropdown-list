import React from "react";
import { MdClose } from "react-icons/md";
import "../sass/InputSearcher.scss";

function InputSearcher({
  data,
  tags,
  setTags,
  setMatchingWords,
  setInputValue,
  inputValue,
  selectedIndex,
  setSelectedIndex,
}) {
  //handle input

  const handleInput = (e) => {
    setInputValue(e.target.value);
    matchingWords(e);
  };

  //handling tags

  const addTag = (e) => {
    let counter = tags.filter((tag) => tag === e.target.value);
    if (counter.length > 0) {
      console.log(counter);
      return;
    } else if (e.target.value !== "" && e.target.value !== undefined) {
      setTags([...tags, e.target.value]);
      e.target.value = "";
      setInputValue("");
      setMatchingWords([]);
    }
    counter = [];
  };

  const deleteTag = (index) => {
    const deleteTag = tags.filter((i) => tags.indexOf(i) !== index);
    console.log(deleteTag);
    setTags(deleteTag);
  };

 // tag component

  const RenderTags = () => {
    if (tags.length > 0) {
      return tags.map((tag, index) => {
        return (
          <li key={index} index={index}>
            <span tabIndex={0}>{tag}</span>
            <MdClose className="colse-tag" onClick={() => deleteTag(index)} />
          </li>
        );
      });
    }
  };

  //matchnig words for input value

  const matchingWords = (e) => {
    const input = e.target.value;

    if (input === "") {
      setMatchingWords([]);
      return;
    }

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

    // deleting matchnig words which are already in tags

    const matchedWordsWithoutTags = matchedwords.filter(
      (item) => !tags.includes(item)
    );

    setMatchingWords(matchedWordsWithoutTags);
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
        onChange={(e) => handleInput(e)}
        value={inputValue}
        tabIndex={0}
      />
    </div>
  );
}

export default InputSearcher;
