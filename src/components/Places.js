import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const Places = ({ value, onChange, onSelect, searchOptions, placeholder }) => {
  let i = 0;
  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            size="small"
            {...getInputProps({
              placeholder: placeholder,
              className: "location-search-input",
            })}
            variant="outlined"
            style={{ position: "sticky" }}
            fullWidth
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              i++;
              return (
                <List dense key={i} {...getSuggestionItemProps(suggestion)}>
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon key={i}>
                      <AddLocationIcon style={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemText key={suggestion.description}>
                      {suggestion.description}
                    </ListItemText>
                  </ListItem>
                  {/*  <span key={index}>{suggestion.description}</span>*/}
                </List>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default Places;
