import { getCurrentLocation } from "../Services/locationServices.js";
import { getCurrentWeather } from "../Services/weatherServices.js";
import getUnixDateTime from "../utils/getUnixDateTime.js";
export default async function currentWeatherController(location) {
  //const location = await getCurrentLocation();
    const timeStamp = await getUnixDateTime();
    //console.log(location,timeStamp)
  const currentweather = await getCurrentWeather(location, timeStamp);
 return currentweather;
}