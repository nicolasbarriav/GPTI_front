import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateOfferDisplay from "./Offer/GenerateOfferDisplay";
import Historial from "./Historial/Historial";
import CustomNavbar from "./CustomNavbar";
import "./assets/styles.css";
import Landing from "./Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/generar-oferta"} element={<GenerateOfferDisplay />} />
          <Route path={"/historial"} element={<Historial />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
