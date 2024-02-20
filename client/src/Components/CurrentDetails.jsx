import { Box, Grid, IconButton, Typography } from "@mui/material";
import SunriseSunsetProgressBar from "./sunriseComponent";
import CircularProgress from "@mui/material/CircularProgress";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import TodaysForecast from "./TodaysForecast";
export default function CurrentData(props) {
  const weatherData = props.weatherData;
  const hourlydata = weatherData.days[0].hours[0];

  const formatTimeToAMPM = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");

    const sunsetDate = new Date();
    sunsetDate.setHours(parseInt(hours, 10));
    sunsetDate.setMinutes(parseInt(minutes, 10));
    sunsetDate.setSeconds(parseInt(seconds, 10));

    const formattedHours = sunsetDate.getHours();
    const formattedMinutes = sunsetDate.getMinutes();

    const formattedTime = `${
      formattedHours > 12 ? formattedHours - 12 : formattedHours
    }:${formattedMinutes < 10 ? "0" : ""}${formattedMinutes} ${
      formattedHours >= 12 ? "PM" : "AM"
    }`;

    return formattedTime;
  };
  // console.log(hourlydata);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "30vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Grid
        sx={{
          width: "95%",
          height: "90%",
          borderRadius: "20px",
          backgroundColor: "#FFF",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "95%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "20px", color: "#0A1D56" }}>
              Feels like
            </Typography>
            <Typography
              sx={{ fontSize: "90px", lineHeight: "90px", color: "#0A1D56" }}
            >
              {((weatherData.days[0].feelslike - 32) * (5 / 9)).toFixed(1)}°
              <span style={{ fontSize: "60px" }}>c</span>
            </Typography>

            <Typography sx={{ fontSize: "20px", color: "#0A1D56" }}>
              {weatherData.days[0].description}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <WbSunnyIcon sx={{ color: "orange" }} />
            </IconButton>
            <Typography>{`Sunrise: ${formatTimeToAMPM(
              weatherData.days[0].sunrise
            )}`}</Typography>
            <IconButton>
              <NightsStayIcon sx={{ color: "black" }} />
            </IconButton>
            <Typography>{`Sunset: ${formatTimeToAMPM(
              weatherData.days[0].sunset
            )}`}</Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
