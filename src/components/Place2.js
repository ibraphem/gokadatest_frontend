import React from "react";
import PlaceForm from "./PlaceForm";
import PlacesAutocomplete from "react-places-autocomplete";

const Place2 = ({
  value,
  onChange,
  onSelect,
  searchOptions,
  placeholder,
  searchResult,
}) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <PlaceForm
          suggestions={suggestions}
          getInputProps={getInputProps}
          getSuggestionItemProps={getSuggestionItemProps}
          placeholder={placeholder}
          searchResult={searchResult}
          value={value}
        />
      )}
    </PlacesAutocomplete>
  );
};

export default Place2;
