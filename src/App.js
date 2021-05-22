import React, { useState, useEffect } from "react";
import MapPosition from "./components/MapPosition";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Geocode from "react-geocode";

import axios from "axios";
import { URD, apiKey } from "./components/Config";

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffLat, setDropOffLat] = useState(null);
  const [dropOffLng, setDropOffLng] = useState(null);
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLng, setCurrentLng] = useState(null);
  const [dbAddress, setDbAddress] = useState([]);
  const [pickUpTitle, setPickUpTitle] = useState("Your Location");
  const [dropOffTitle, setDropOffTitle] = useState("Drop Off");
  const [searchResultPickUp, setSearchResultPickUp] = useState([]);
  const [searchResultDropOff, setSearchResultDropOff] = useState([]);
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

  Geocode.setApiKey(apiKey);

  //Fetch Db addresses
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

  // check if address exist in database
  const searchDbForAddress = (address) => {
    let searchDb = dbAddress.filter((loc) => {
      let add = loc.description.toUpperCase();
      return add?.indexOf(address.toUpperCase()) > -1;
    });
    if (searchDb?.length > 1) {
      return searchDb;
    } else {
      return [];
    }
  };

  //fetch address details from DB where address selected - already in DB

  // get user location
  const getLocation = async () => {
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
  };

  //set user location on map onload
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchFromDb();
      getLocation();
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Onchange for pickup location
  const handlePickUp = (pickUpAddress) => {
    if (pickUpAddress !== "") {
      setPickUpAddress(pickUpAddress);
      setSearchResultPickUp(searchDbForAddress(pickUpAddress));
    } else {
      setPickUpAddress("");
      setLat(currentLat);
      setLng(currentLng);
    }
  };

  //onchange for dropoff location
  const handleDropOff = (dropOffAddress) => {
    setDropOffAddress(dropOffAddress);
    setSearchResultDropOff(searchDbForAddress(dropOffAddress));
  };

  //console.log(searchResultPickUps);

  //onselect for pickup location
  const handleSelectPickUp = async (address) => {
    setPickUpAddress(address);
    if (searchResultPickUp.length > 0) {
      await axios.get(`${URD}/location/fetch/${address}`).then((response) => {
        //    console.log(response.data[0]);
        setLat(response.data[0].latitude);
        setLng(response.data[0].longitude);
        setPickUpTitle("Pick Up");
      });
    } else {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          setLat(latLng.lat);
          setLng(latLng.lng);
          setPickUpTitle("Pick Up");
          const locationData = {
            address: address,
            latitude: latLng.lat,
            longitude: latLng.lng,
          };
          saveToDb(locationData);
        })

        .catch((error) => console.error("Error", error));
    }
  };

  //onselect for dropoff location
  const handleSelectDropOff = async (address) => {
    setDropOffAddress(address);
    if (searchResultDropOff.length > 0) {
      await axios.get(`${URD}/location/fetch/${address}`).then((response) => {
        setDropOffLat(response.data[0].latitude);
        setDropOffLng(response.data[0].longitude);
        setDropOffTitle("Drop Off");
      });
    } else {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          setDropOffLat(latLng.lat);
          setDropOffLng(latLng.lng);
          setDropOffTitle("Drop Off");
          const locationData = {
            address: address,
            latitude: latLng.lat,
            longitude: latLng.lng,
          };

          saveToDb(locationData);
        })
        .catch((error) => console.error("Error", error));
    }
  };

  // setting state for picking current location as pickup
  const handlePickCurrentLocation = () => {
    setPickCurrentLocation(true);
  };

  //onselect for current location as pickup location
  const handleSelectCurrentLocation = () => {
    setPickCurrentLocation(false);
    setPickUpTitle("Pick Up");

    setLat(currentLat);
    setLng(currentLng);

    //console.log("ooo");
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        // console.log(address);
        setPickUpAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
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
      pickUpTitle={pickUpTitle}
      dropOffTitle={dropOffTitle}
      searchResultPickUp={searchResultPickUp}
      searchResultDropOff={searchResultDropOff}
    />
  );
};

export default App;
