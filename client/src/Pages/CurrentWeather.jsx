import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { APP_URL } from "../constants.js";
import Navbar from "../Components/Header.jsx";
import TodaysForecast from "../Components/TodaysForecast.jsx";
import { MutatingDots } from "react-loader-spinner";

export default function CurrentWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve(`${position.coords.latitude},${position.coords.longitude}`),
          (error) => {
            console.error("Error getting location:", error.message);
            reject(error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const getweatherData = async (location) => {
    const response = await axios.post(
      `${APP_URL}/currentWeather?location=${location}`,
      {
        location: location,
      }
    );
    setWeatherData(response.data.weatherData);
    if (response.status === 200) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await getCurrentLocation();
        location && (await getweatherData(location));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#FFA447"
            secondaryColor="#FFA447"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />

          <Typography>
            Please allow us to access your Location, so we can provide you with
            accurate Data
          </Typography>
        </Box>
      ) : (
        <Box sx={{ backgroundColor: "#eeedfa", minHeight: "100vh" }}>
          <Navbar weatherData={weatherData} />
          <TodaysForecast weatherData={weatherData} />
        </Box>
      )}
    </div>
  );
}
   
