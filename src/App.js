import React, { useState, useEffect } from "react";
import MapPosition from "./components/MapPosition";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";
import { URD } from "./components/Config";

const App = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffLat, setDropOffLat] = useState("");
  const [dropOffLng, setDropOffLng] = useState("");
  const [currentLat, setCurrentLat] = useState("");
  const [currentLng, setCurrentLng] = useState("");
  const [dbAddress, setDbAddress] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [pickCurrentLocation, setPickCurrentLocation] = useState(false);

  // Save Search to database

  const saveToDb = (locationData) => {
    axios
      .post(`${URD}/location/store`, locationData)
      .then((response) => {
        //     console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFromDb = () => {
    axios
      .get(`${URD}/location`)
      .then((response) => {
        setDbAddress(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchDbForAddress = (address) => {
    let searchDb = dbAddress.filter((loc) => {
      let add = loc.address.toUpperCase();
      return add?.indexOf(address.toUpperCase()) > -1;
    });
    if (searchDb) {
      setSearchResult(searchDb);
      return 1;
    } else {
      return 0;
    }
    // console.log(searchDb[0]);
  };

  // console.log(searchDbForAddress("Allen Avenue, Ikeja, Nigeria"));

  useEffect(() => {
    fetchFromDb();
    // Checking is location is available and accessible
    if ("geolocation" in navigator) {
      //console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
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

  // console.log(dbAddress);
  //onchange for dropoff location
  const handleDropOff = (dropOffAddress) => {
    setDropOffAddress(dropOffAddress);
  };

  //onselect for pickup location
  const handleSelectPickUp = (address) => {
    // searchDbForAddress(address);
    setPickUpAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLat(latLng.lat);
        setLng(latLng.lng);
        const locationData = {
          address: address,
          latitude: latLng.lat,
          longitude: latLng.lng,
        };
        saveToDb(locationData);
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
        const locationData = {
          address: address,
          latitude: latLng.lat,
          longitude: latLng.lng,
        };
        saveToDb(locationData);
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
