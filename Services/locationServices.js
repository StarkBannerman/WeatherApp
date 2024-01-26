import axios from "axios";


// export async function getCurrentLocation() { 
//     const response = await axios.get("https://ipinfo.io/json");
//     return response.data.loc;
// }
export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
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