import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Stack,
  Badge,
  Modal,
  InputGroup,
} from "react-bootstrap";
import SelectComponent from "./SelectComponent";
import {
  areaOptions,
  cityOptions,
  contractTypeOptions,
  formatOptions,
} from "./options";
import ListInput from "./ListInput";

export default function OfferForm({
  formData,
  setFormData,
  handleFormChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
}) {
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const [generated, setGenerated] = useState("");
  const [keyWords, setKeyWords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [validated, setValidated] = useState(false);

  const [loading, setLoading] = useState(false);

  // Agrego a formData los errores
  const updateFormDataErrors = (field, hasError) => {
    setFormData((prevData) => ({
      ...prevData,
      errors: {
        ...prevData.errors,
        [field]: hasError,
      },
    }));
  };

  // Reviso que se haya seleccionado una opción en cada select
  const validateSelects = () => {
    const selectFields = ["area", "location", "contractType", "format"];
    let isValid = true;

    selectFields.forEach((field) => {
      const hasError = formData[field] === "";
      updateFormDataErrors(field, hasError);
      if (hasError) isValid = false;
    });

    return isValid;
  };

  // Reviso que se haya agregado al menos un ítem en cada lista
  const validateLists = () => {
    const selectFields = ["responsibilities", "requirements", "benefits"];
    let isValid = true;

    selectFields.forEach((field) => {
      const hasError = formData[field].length === 0;
      updateFormDataErrors(field, hasError);
      if (hasError) isValid = false;
    });

    return isValid;
  };

  // Manejo del modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const generateKeyWords = () => {
    console.log("Generar palabras clave");
  };

  const formatHashtag = (keyword) => {
    return (
      "#" +
      keyword
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "")
    );
  };

  const hashtags = keyWords
    .filter((keyword) => keyword && keyword.trim())
    .map(formatHashtag);

  const fullContent = `${generated}\n\n${hashtags.join(" ")}`;

  // Función para copiar contenido al portapapeles
  const copyText = () => {
    navigator.clipboard.writeText(fullContent);
    alert("Copiado al portapapeles");
  };

  // Detectar "Enter" y agregar ítem
  const handleKeyPress = (e, field, newValue) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que el formulario se envíe
      if (newValue.trim() !== "") {
        addArrayItem(field, newValue.trim());

        // Limpiar el campo de entrada dependiendo de cuál se está usando
        if (field === "responsibilities") {
          setNewResponsibility("");
        } else if (field === "requirements") {
          setNewRequirement("");
        } else if (field === "benefits") {
          setNewBenefit("");
        }
      }
    }
  };

  // Envio el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el envío por defecto del formulario
    event.stopPropagation(); // Detenemos la propagación si el formulario no es válido

    setLoading(true);

    const eventForm = event.currentTarget;
    // const isFormValid = eventForm.checkValidity(); // Revisar si el formulario es valido
    // const isSelectedValid = validateSelects(); // Revisar select con valor seleccionado
    // const areListValuesValid = validateLists(); // Revisar si se ingresaron responsabilidades, requerimientos, beneficios

    const isFormValid = true;
    const isSelectedValid = true;
    const areListValuesValid = true;

    setValidated(true); // Indicamos que se ha intentado validar

    const apiData = {
      tituloTrabajo: formData.jobTitle,
      area: formData.area,
      ubicacion: formData.location,
      tipoEmpleo: formData.contractType,
      responsabilidades: formData.responsibilities,
      requisitos: formData.requirements,
      beneficios: formData.benefits,
      formato: formData.format,
    };

    if (isFormValid && isSelectedValid && areListValuesValid) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_GPT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setGenerated(data.response);
        setKeyWords(data.keywords);
        handleShow(); // Muestra el modal con la oferta generada
      } catch (err) {
        console.error("Error al generar la oferta: ", err);
        alert(
          "Hubo un error al generar la oferta. Por favor intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* PUESTO DE TRABAJO */}
        <Form.Group className="mb-3">
          <Form.Label>Puesto de trabajo</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleFormChange("jobTitle", e.target.value)}
              placeholder="Ingresar título del trabajo"
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresa un título de trabajo.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            {/* AREA */}
            <SelectComponent
              label="Área"
              value={formData.area}
              options={areaOptions}
              onChange={(e) => handleFormChange("area", e.target.value)}
            />
          </Col>
          <Col>
            {/* UBICACIÓN */}
            <SelectComponent
              label="Ubicación"
              value={formData.location}
              options={cityOptions}
              onChange={(e) => handleFormChange("location", e.target.value)}
            />
          </Col>
          <Col>
            {/* TIPO DE EMPLEO */}
            <SelectComponent
              label="Tipo de empleo"
              value={formData.contractType}
              options={contractTypeOptions}
              onChange={(e) => handleFormChange("contractType", e.target.value)}
            />
          </Col>
        </Row>

        {/* RESPONSABILIDADES */}
        <ListInput
          label="Responsabilidades"
          value={newResponsibility}
          setValue={setNewResponsibility}
          placeholder="Nueva responsabilidad"
          formData={formData}
          validated={validated}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />

        {/* REQUERIMIENTOS */}
        <ListInput
          label="Requerimientos"
          value={newRequirement}
          setValue={setNewRequirement}
          placeholder="Nuevo requerimiento"
          formData={formData}
          validated={validated}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />

        {/* BENEFICIOS */}
        <ListInput
          label="Beneficios"
          value={newBenefit}
          setValue={setNewBenefit}
          placeholder="Nuevo beneficio"
          formData={formData}
          validated={validated}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />

        <Row className="mb-3">
          <Col>
            {/* FORMATO */}
            <SelectComponent
              label="Formato"
              value={formData.format}
              options={formatOptions}
              onChange={(e) => handleFormChange("format", e.target.value)}
              validated={validated}
            />
          </Col>
          <Col className="btn-submit">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Generando...
                </>
              ) : (
                "Generar"
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal
        show={showModal}
        fullscreen
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="gap-2">
          <div style={{ flex: 1 }}>
            <span>Oferta Generada</span>
          </div>

          <div className="d-flex gap-2">
            <div>
              <Button variant="light" onClick={generateKeyWords}>
                Palabras clave
              </Button>
            </div>
            <div>
              <Button variant="light" onClick={copyText}>
                Copiar
              </Button>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body className="white-space-pre-wrap">
          <div className="offer-content">{fullContent}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
