import { Box, Typography } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const inputStyles = {
  fontSize: "20px",
};
export default function Navbar(props) {
  const weatherData = props.weatherData;
  console.log(weatherData);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "10vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A1D56",
      }}
    >
      <Box
        sx={{
          ml: 5,
          mr: 5,
          width: "70%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <NightsStayIcon
            sx={{ color: "#FFF", height: "60px", width: "60px" }}
          />

          <Typography
            sx={{ fontSize: "25px", color: "#FFF", fontWeight: "700" }}
          >
            {/* {`Weather Data for ${weatherData.latitude},${weatherData.longitude}`} */}
            WeatherData
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              {/* {`Weather Data for ${weatherData.latitude},${weatherData.longitude}`} */}
              {`Latitude  : ${weatherData.latitude}`}
            </Typography>

            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              {/* {`Weather Data for ${weatherData.latitude},${weatherData.longitude}`} */}
              {`Longitude  : ${weatherData.longitude}`}
            </Typography>
          </Box>

          <Box sx={{ ml: 3 }}>
            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              {/* {`Weather Data for ${weatherData.latitude},${weatherData.longitude}`} */}
              {`TimeZone  : ${weatherData.timezone}`}
            </Typography>

            <Typography
              sx={{ fontSize: "12px", color: "#FFF", fontWeight: "400" }}
            >
              {/* {`Weather Data for ${weatherData.latitude},${weatherData.longitude}`} */}
              {`Date  : ${weatherData.days[0].datetime}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
