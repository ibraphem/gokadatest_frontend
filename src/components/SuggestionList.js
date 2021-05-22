import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    zIndex: 1,
    position: "relative",
    overflow: "auto",
    maxHeight: 120,
  },
}));

const SuggestionList = ({
  getSuggestionItemProps,
  suggestion,
  index,
  hideList,
}) => {
  const classes = useStyles();
  return (
    <List
      dense
      key={index}
      className={classes.root}
      s
      {...getSuggestionItemProps(suggestion, hideList)}
    >
      <ListItem style={{ cursor: "pointer" }} onClick={hideList}>
        <ListItemIcon>
          <AddLocationIcon style={{ color: "red" }} />
        </ListItemIcon>
        <ListItemText>{suggestion.description}</ListItemText>
      </ListItem>
    </List>
  );
};

export default SuggestionList;
