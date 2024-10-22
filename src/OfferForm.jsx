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
  const [showModal, setShowModal] = useState(false);

  const [validated, setValidated] = useState(false);

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

  // Función para copiar contenido al portapapeles
  const copyText = () => {
    navigator.clipboard.writeText(generated);
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
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el envío por defecto del formulario
    event.stopPropagation(); // Detenemos la propagación si el formulario no es válido

    // Datos en un formato más legible:
    console.log(
      "Datos del formulario (formato JSON):",
      JSON.stringify(formData, null, 2)
    );

    const eventForm = event.currentTarget;
    const isFormValid = eventForm.checkValidity(); // Revisar si el formulario es valido
    const isSelectedValid = validateSelects(); // Revisar select con valor seleccionado
    const areListValuesValid = validateLists(); // Revisar si se ingresaron responsabilidades, requerimientos, beneficios

    setValidated(true); // Indicamos que se ha intentado validar

    if (isFormValid && isSelectedValid && areListValuesValid) {
      // Simulación de llamada a la API con datos ficticios
      const simulatedResponse = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            jobTitle: formData.jobTitle,
            area: formData.area,
            location: formData.location,
            contractType: formData.contractType,
            responsibilities: formData.responsibilities,
            requirements: formData.requirements,
            benefits: formData.benefits,
            format: formData.format,
          });
        }, 1000); // Simula un retraso de 1 segundo
      });

      simulatedResponse
        .then((data) => {
          console.log("Simulated API response:", data);
          setGenerated(JSON.stringify(data, null, 2)); // Muestra los datos en el modal
          setGenerated(
            "¡Oferta de trabajo!\n\nEmpresa: Falabella\nPosición: Desarrollador Full Stack\nÁrea: Tecnología\nUbicación: Madrid\nTipo de empleo: Tiempo completo\n\nResponsabilidades:\n- Desarrollar y mantener aplicaciones web.\n- Colaborar con el equipo de diseño para implementar nuevas características.\n- Realizar pruebas de código y depuración.\n\nRequisitos:\n- Experiencia mínima de 3 años en desarrollo"
          ); // Muestra los datos en el modal
          handleShow(); // Muestra el modal con la oferta generada
        })
        .catch((err) =>
          console.error("Error al generar la oferta simulada: ", err)
        );

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

      // API
      // fetch(`${import.meta.env.VITE_API_URL_GPT}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(apiData),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     setGenerated(JSON.stringify(data, null, 2));  REVISAR COMO GUARDARLO
      //     handleShow(); // Muestra el modal con la oferta generada
      //   })
      //   .catch((err) => console.error("Error al generar la oferta: ", err));
      // };
    } else {
      console.log("Formulario invalido");
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
            <Button type="submit" variant="primary">
              Generar
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <div style={{ flex: 1 }}>
            <span>Oferta Generada</span>
          </div>
          <div>
            <Button variant="light" onClick={copyText}>
              Copiar
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <pre style={{ backgroundColor: "#f8f9fa", padding: "10px" }}>
            {generated}
          </pre>
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
