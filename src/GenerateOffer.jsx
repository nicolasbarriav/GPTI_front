import { Col, Container, Row } from "react-bootstrap";
import OfferForm from "./OfferForm";
import Preview from "./Preview";
import { useState } from "react";

export default function GenerateOffer() {
  const initialFormState = {
    jobTitle: "",
    area: "", // Departamento o área
    location: "",
    contractType: "", // Tipo de contrado: Jornada completa o parcial
    format: "", // Formato publicar oferta
    responsibilities: [],
    requirements: [],
    benefits: [], // Lista de beneficios
    errors: {}, // Errores validación
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleFormChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field, value = "") => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], value],
    }));
  };

  const removeArrayItem = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((item) => item !== value), // Filtra los elementos diferentes al valor a eliminar
    }));
  };

  return (
    <Container className="app-container">
      <h2>Ingresar requisitos</h2>
      <OfferForm
        formData={formData}
        setFormData={setFormData}
        handleFormChange={handleFormChange}
        handleArrayChange={handleArrayChange}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
      />
    </Container>
  );
}
