import dotenv from "dotenv";
import axios from "axios";
dotenv.config();


export async function getCurrentWeather(location, date) { 
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/?key=${process.env.VISUAL_CROSSING_API_KEY}`
    );
    console.log(response.data)
    return response.data;
}