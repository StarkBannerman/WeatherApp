import Router from "express";
import currentWeatherController from "../Controller/currentWeatherController.js";
const router = Router();

router.post('/', async (req, res) => {
  const location = req.body.location;
  const weatherData = await currentWeatherController(location);
  //console.log(weatherData)
  res.status(200).json({
    msg: "Request Received",
    weatherData: weatherData,
  });
})



export default router