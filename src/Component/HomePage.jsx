import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBInputGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import MapCard from "./MapCard";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [mapCards, setMapCards] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(
        "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=1000&view=Grid%20view",
        {
          headers: {
            Authorization: "Bearer keyfXgn8PL6pB3x32",
          },
        }
      );
      const data = await response.json();
      const options = data.records.map((record) => record.fields.Name);
      setRestaurantOptions(options);
    };
    fetchRestaurants();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddRestaurant = async () => {
    const chartUrl = `https://datastudio.google.com/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${inputValue}"}`;
    const newRestaurant = {
      id: uuidv4(),
      name: inputValue,
      chartUrl: chartUrl,
      price: 0,
    };
    const newRestaurants = [...restaurants, newRestaurant];
    setRestaurants(newRestaurants);
    setInputValue("");

    const mapCard = (
      <MapCard
        id={newRestaurant.id}
        name={inputValue}
        chartUrl={chartUrl}
        price={newRestaurant.price}
      />
    );
    const newMapCards = [...mapCards, mapCard];
    setMapCards(newMapCards);
    localStorage.setItem(
      "mapCard-" + newRestaurant.id,
      JSON.stringify(mapCard.props)
    );
  };

  const handleRemove = (id) => {
    localStorage.removeItem("mapCard-" + id);

    window.location.reload();
  };

  const { addItem } = useCart();

  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>Welcome To Homepage</MDBNavbarBrand>
          <MDBInputGroup
            className="d-flex w-50 mb-2 mt-2"
            textBefore={<MDBIcon fas icon="search" />}
          >
            <input
              className="form-control"
              placeholder="Search restaurant"
              aria-label="Search"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              list="restaurantOptions"
            />
            <MDBBtn outline onClick={handleAddRestaurant}>
              Add
            </MDBBtn>
            <datalist id="restaurantOptions">
              {restaurantOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </MDBInputGroup>
        </MDBContainer>
      </MDBNavbar>

      <h2 className="text-center mt-4 mb-3 bg-info text-white font-monospace">
        Added Restaurant
      </h2>

      <div className="mt-5 ms-5">
        {Object.keys(localStorage)
          .filter((key) => key.startsWith("mapCard-"))
          .map((key) => JSON.parse(localStorage.getItem(key)))
          .map((mapCardProps) => (
            <div key={mapCardProps.id} className="my-3">
              <MapCard
                id={mapCardProps.id}
                name={mapCardProps.name}
                chartUrl={mapCardProps.chartUrl}
                price={mapCardProps.price}
              />
              <MDBBtn
                rounded
                className="mx-2"
                color="info"
                onClick={() => {
                  addItem(mapCardProps);
                  toast.success(`${mapCardProps.name} added to bookmark`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  setTimeout(()=>{
                    handleRemove(mapCardProps.id);
                  },[2000]);
                  
                }}
              >
                Bookmark
              </MDBBtn>
              <MDBBtn
                rounded
                className="mx-2"
                color="danger"
                onClick={() => handleRemove(mapCardProps.id)}
              >
                Remove
              </MDBBtn>
            </div>
          ))}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default HomePage;
