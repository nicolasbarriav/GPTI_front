import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateOffer from "./GenerateOffer";
import Historial from "./Historial";
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
          <Route path={"/generar-oferta"} element={<GenerateOffer />} />
          <Route path={"/historial"} element={<Historial />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
