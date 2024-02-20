import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import CurrentWeather from "./Pages/CurrentWeather";

function App() {
  return (
    <>
      <BrowserRouter basename="/client">
        <Routes>
          <Route path="/weather">
            <Route index={true} element={<CurrentWeather />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
