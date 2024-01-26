import { Box, Typography, Grid, IconButton } from "@mui/material";
import ColorizeIcon from "@mui/icons-material/Colorize";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CycloneIcon from "@mui/icons-material/Cyclone";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SolarPowerIcon from "@mui/icons-material/SolarPower";

export default function TodaysForecast(props) {
  const weatherData = props.weatherData;
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
  const values = [
    {
      feild: "Humidity",
      value: `${weatherData.days[0].humidity}%`,
      icon: <ColorizeIcon />,
    },
    {
      feild: "Wind Speed",
      value: ` ${weatherData.days[0].windspeed} km/h`,
      icon: <ArrowOutwardIcon />,
    },
    {
      feild: "Pressure",
      value: `${weatherData.days[0].pressure}`,
      icon: <DeviceThermostatIcon />,
    },
    {
      feild: "Precipitation",
      value: weatherData.days[0].precip,
      icon: <CycloneIcon />,
    },
    {
      feild: "Max Temp",
      value: ` ${((weatherData.days[0].tempmax - 32) * (5 / 9)).toFixed(
        1
      )} °C `,
      icon: <ThermostatIcon />,
    },
    {
      feild: "Min Temp",
      value: `${((weatherData.days[0].tempmin - 32) * (5 / 9)).toFixed(1)} °C`,
      icon: <ThermostatIcon />,
    },

    {
      feild: "Sunrise",
      value: formatTimeToAMPM(weatherData.days[0].sunrise),
      icon: <WbSunnyIcon />,
    },

    {
      feild: "Sunset",
      value: formatTimeToAMPM(weatherData.days[0].sunset),
      icon: <NightsStayIcon />,
    },

    {
      feild: "solarenergy",
      value: weatherData.days[0].solarenergy,
      icon: <SolarPowerIcon />,
    },
  ];
  console.log(values);
  const data = [
    {
      feild: "Windgust",
      value: weatherData.days[0].windgust,
    },
    {
      feild: "UV -Index",
      value: weatherData.days[0].uvindex,
    },

    {
      feild: "Severerisk",
      value: weatherData.days[0].severerisk,
    },
    {
      feild: "Dew",
      value: weatherData.days[0].dew,
    },
    {
      feild: "Cloudcover",
      value: weatherData.days[0].cloudcover,
    },
  ];

  const forecast = weatherData.days[0].description;
  return (
    <Box
      sx={{
        width: "100vw",
        height: "60vh",
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
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
              mt: 2,
            }}
          >
            {`Forecast: "${forecast}"`}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid container sx={{ width: "60%", ml: 2 }}>
            {values.map((val) => (
              <Grid
                item
                key={val}
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                sx={{
                  height: "120px",
                  borderRadius: "6px",
                  // border: "1px solid #ccc",
                  padding: "8px",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: "80%",
                    height: "90%",
                    backgroundColor: "#8EACCD",
                    borderRadius: "6px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton sx={{ color: "#000" }}>{val.icon}</IconButton>
                    <Typography sx={{ color: "#000" }}>{val.feild}</Typography>
                  </Box>

                  <Typography sx={{ color: "#000" }}>{val.value}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ ml: 10 }}>
            {data.map((dat) => (
              <Box>
                <Typography
                  sx={{ mt: 4 }}
                >{`${dat.feild} : ${dat.value}`}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
