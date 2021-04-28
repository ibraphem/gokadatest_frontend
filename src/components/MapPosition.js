import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import { Grid, Paper } from "@material-ui/core";
import Places from "./Places";
import DummyDetail from "./DummyDetail";

// Map style
const mapStyles = {
  width: "100%",
  height: "auto",
};

class MapPosition extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  // Setting search bounds
  searchOptions = {
    location: new this.props.google.maps.LatLng(this.props.lat, this.props.lng),
    radius: 50,
    types: ["address"],
  };

  render() {
    const coords = [
      { lat: this.props.lat, lng: this.props.lng },
      { lat: this.props.dropOffLat, lng: this.props.dropOffLng },
    ];

    console.log(coords);
    return (
      <>
        <Paper
          style={{
            height: "auto",
            padding: 10,
            margin: 10,
            textAlign: "center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <div onClick={this.props.handlePickCurrentLocation}>
                <Places
                  value={this.props.pickUpAddress}
                  onChange={this.props.handlePickUp}
                  onSelect={this.props.handleSelectPickUp}
                  searchOptions={this.searchOptions}
                  placeholder="Select Pickup address..."
                />
              </div>
              {this.props.pickCurrentLocation &&
              this.props.pickUpAddress === "" ? (
                <span
                  style={{
                    float: "left",
                    margin: 15,
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={this.props.handleSelectCurrentLocation}
                >
                  Select your Current Location
                </span>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Places
                value={this.props.dropOffAddress}
                onChange={this.props.handleDropOff}
                onSelect={this.props.handleSelectDropOff}
                searchOptions={this.searchOptions}
                placeholder="Select dropoff address..."
              />
            </Grid>
          </Grid>
        </Paper>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
          center={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
        >
          <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
          {this.props.dropOffAddress !== "" ? (
            <Marker
              position={{
                lat: this.props.dropOffLat,
                lng: this.props.dropOffLng,
              }}
            />
          ) : null}
          <Polyline
            path={coords}
            strokeColor="#00e600"
            strokeOpacity={0.8}
            strokeWeight={4}
          />
        </Map>
        {this.props.dropOffLat !== "" ? <DummyDetail /> : null}
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAEaz96LXFlvRFi-u67_Be1TKnHojGXSRI",
})(MapPosition);
