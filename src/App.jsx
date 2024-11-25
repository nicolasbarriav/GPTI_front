import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateOfferDisplay from "./Offer/GenerateOfferDisplay";
import Historial from "./Historial/Historial";
import Context from "./OrganizationContext/Context";
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
          <Route path={"/informacion-adicional"} element={<Context />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
