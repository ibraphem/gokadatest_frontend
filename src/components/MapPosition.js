import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import { Grid, Paper } from "@material-ui/core";
import Places from "./Places";
//import DummyDetail from "./DummyDetail";
import { apiKey } from "./Config";

// Map style
const mapStyles = {
  width: "100%",
  height: "100%",
  PointerEvent: "none",
};

class MapPosition extends Component {
  // restricting search bounds to 50 km of current location
  defaultBounds = {
    north: this.props.lat + 0.5,
    south: this.props.lat - 0.5,
    east: this.props.lng + 0.5,
    west: this.props.lng - 0.5,
  };

  // defining search starting point
  origin = { lat: this.props.lat, lng: this.props.lng };

  // Setting search bounds
  searchOptions = {
    componentRestrictions: { country: "ng" },
    origin: this.origin,
    bounds: this.defaultBounds,
    types: ["address"],
  };

  render() {
    //coordinate of distance between pickup and drop off
    const coords = [
      { lat: this.props.lat, lng: this.props.lng },
      { lat: this.props.dropOffLat, lng: this.props.dropOffLng },
    ];

    // recentering around location
    var points = [
      { lat: this.props.lat, lng: this.props.lng },
      {
        lat:
          this.props.dropOffLat === null
            ? this.props.lat - 0.001
            : this.props.dropOffLat,
        lng:
          this.props.dropOffLng === null
            ? this.props.lng - 0.002
            : this.props.dropOffLng,
      },
    ];

    // defining bounds for centering
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <h3 style={{ textAlign: "center", padding: 0 }}>
                Parcel Request
              </h3>
            </Grid>
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

        <Paper>
          <Map
            google={this.props.google}
            style={mapStyles}
            initialCenter={{
              lat: this.props.lat,
              lng: this.props.lng,
            }}
            zoom={11}
            bounds={bounds}
          >
            <Marker
              position={{ lat: this.props.lat, lng: this.props.lng }}
              label={this.props.pickUpTitle}
            ></Marker>

            {this.props.dropOffAddress !== "" ? (
              <Marker
                position={{
                  lat: this.props.dropOffLat,
                  lng: this.props.dropOffLng,
                }}
                label={this.props.dropOffTitle}
              />
            ) : null}

            {this.props.dropOffLat !== null ? (
              <Polyline
                path={coords}
                strokeColor="#00e600"
                strokeOpacity={0.8}
                strokeWeight={4}
              />
            ) : null}
          </Map>
        </Paper>

        {/*    {this.props.dropOffLat !== null ? <DummyDetail /> : null} */}
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey,
})(MapPosition);
