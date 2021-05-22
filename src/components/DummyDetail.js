import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,

    width: "100%",
  },

  dummy: {
    fontWeight: "900",
    fontSize: 20,
  },
});

const DummyDetail = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4} style={{ paddingRight: 40, paddingLeft: 40 }}>
          <div>
            <span style={{ float: "left" }} className={classes.dummy}>
              &#8358;1500.00
            </span>
            <span style={{ float: "right" }} className={classes.dummy}>
              3.3Km | 24 Mins
            </span>
          </div>

          <Button
            variant="contained"
            fullWidth
            color="primary"
            style={{
              padding: 10,
              right: 15,
              margin: 10,
              backgroundColor: "#00b300",
            }}
          >
            Enter Parcel Details
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Paper>
  );
};

export default DummyDetail;
