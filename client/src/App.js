import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import CurrentWeather from "./Pages/CurrentWeather";

function App() {
  return (
    <>
      <BrowserRouter basename="/weather">
        <Routes>
          <Route path="/">
            <Route index={true} element={<CurrentWeather />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
