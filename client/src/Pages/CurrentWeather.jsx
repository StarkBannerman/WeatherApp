import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { APP_URL } from "../constants.js";

export default function CurrentWeather() {
  const [weatherData, setWeatherData] = useState({ data: "Arun" });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await getCurrentLocation();
        console.log("Location:", location);

        const response = await axios.post(
          `${APP_URL}/currentWeather?location=${location}`,
          {
            location: location,
          }
        );

        //   const response = await axios.get(
        //     `${APP_URL}/currentWeather?location=${location}`
        //   );

        console.log(response);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
    </Box>
  );
}
