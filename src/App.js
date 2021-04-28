import React, { useState, useEffect } from "react";
import MapPosition from "./components/MapPosition";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const App = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffLat, setDropOffLat] = useState("");
  const [dropOffLng, setDropOffLng] = useState("");
  const [currentLat, setCurrentLat] = useState("");
  const [currentLng, setCurrentLng] = useState("");
  const [pickCurrentLocation, setPickCurrentLocation] = useState(false);

  useEffect(async () => {
    // Checking is location is available and accessible
    if ("geolocation" in navigator) {
      //console.log("Available");
      await navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setCurrentLat(position.coords.latitude);
        setCurrentLng(position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  // Onchange for pickup location
  const handlePickUp = (pickUpAddress) => {
    setPickCurrentLocation(false);
    if (pickUpAddress) {
      setPickUpAddress(pickUpAddress);
    } else {
      setPickUpAddress("");
      setLat(currentLat);
      setLng(currentLng);
    }
  };

  //onchange for dropoff location
  const handleDropOff = (dropOffAddress) => {
    setDropOffAddress(dropOffAddress);
  };

  //onselect for pickup location
  const handleSelectPickUp = (address) => {
    setPickUpAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLat(latLng.lat);
        setLng(latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };

  //onselect for dropoff location
  const handleSelectDropOff = (address) => {
    setDropOffAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setDropOffLat(latLng.lat);
        setDropOffLng(latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };

  // setting state for picking current location as pickup
  const handlePickCurrentLocation = () => {
    setPickCurrentLocation(true);
  };

  //onselect for current location as pickup location
  const handleSelectCurrentLocation = () => {
    setPickCurrentLocation(false);
    setPickUpAddress("Current Location");
    setLat(currentLat);
    setLng(currentLng);
  };

  return (
    <MapPosition
      lat={lat}
      lng={lng}
      handlePickUp={handlePickUp}
      handleSelectPickUp={handleSelectPickUp}
      pickUpAddress={pickUpAddress}
      handleDropOff={handleDropOff}
      handleSelectDropOff={handleSelectDropOff}
      dropOffAddress={dropOffAddress}
      dropOffLat={dropOffLat}
      dropOffLng={dropOffLng}
      pickCurrentLocation={pickCurrentLocation}
      handlePickCurrentLocation={handlePickCurrentLocation}
      handleSelectCurrentLocation={handleSelectCurrentLocation}
    />
  );
};

export default App;
