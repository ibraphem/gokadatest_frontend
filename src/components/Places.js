import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const Places = ({ value, onChange, onSelect, searchOptions, placeholder }) => {
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
            id="outlined-basic"
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
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <List dense {...getSuggestionItemProps(suggestion, {})}>
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <AddLocationIcon style={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemText>{suggestion.description}</ListItemText>
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
