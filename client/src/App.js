import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import CurrentWeather from "./Pages/CurrentWeather";
import ChatComponent from "./Pages/ChatBot";

function App() {
  return (
    <>
      <BrowserRouter basename="/client">
        <Routes>
          <Route path="/weather">
            <Route index={true} element={<CurrentWeather />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/bot">
            <Route index={true} element={<ChatComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
