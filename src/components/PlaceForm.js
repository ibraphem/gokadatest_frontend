import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SuggestionList from "./SuggestionList";

const PlaceForm = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  placeholder,
  searchResult,
  value,
}) => {
  const [address, setAddress] = useState([]);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    if (searchResult?.length > 0) {
      setAddress(searchResult);
    } else {
      setAddress(suggestions);
    }
  }, [address, suggestions, searchResult]);

  const hideList = () => {
    setShowList(false);
  };

  return (
    <>
      <TextField
        size="small"
        variant="outlined"
        fullWidth
        {...getInputProps({
          placeholder: placeholder,
          className: "location-search-input",
        })}
      />
      {showList && value !== "" ? (
        <>
          {address.map((suggestion, index) => (
            <SuggestionList
              key={index}
              suggestion={suggestion}
              getSuggestionItemProps={getSuggestionItemProps}
              index={index}
              hideList={hideList}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

export default PlaceForm;
