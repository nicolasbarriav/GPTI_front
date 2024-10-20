import React, { useState } from "react";
import { Form, Button, Row, Col, Stack, Badge } from "react-bootstrap";
import SelectComponent from "./SelectComponent";
import {
  areaOptions,
  cityOptions,
  contractTypeOptions,
  formatOptions,
} from "./options"; // Ajusta la ruta según sea necesario

export default function OfferForm({
  formData,
  handleFormChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
}) {
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

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

    // Si quieres ver los datos en un formato más legible:
    console.log(
      "Datos del formulario (formato JSON):",
      JSON.stringify(formData, null, 2)
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* PUESTO DE TRABAJO */}
      <Form.Group className="mb-3">
        <Form.Label>Puesto de trabajo</Form.Label>
        <Form.Control
          type="text"
          value={formData.jobTitle}
          onChange={(e) => handleFormChange("jobTitle", e.target.value)}
          placeholder="Ingresar título del trabajo"
        />
      </Form.Group>

      {/* AREA */}
      <Row className="mb-3">
        <Col>
          <SelectComponent
            label="Área"
            value={formData.area}
            options={areaOptions}
            onChange={(e) => handleFormChange("area", e.target.value)}
          />
        </Col>
        <Col>
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
      <Form.Group className="mb-3">
        <Form.Label>Responsabilidades</Form.Label>

        {/* Input */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              type="text"
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              onKeyDown={(e) =>
                handleKeyPress(e, "responsibilities", e.target.value)
              }
              placeholder="Nueva responsabilidad"
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              onClick={() => {
                if (newResponsibility.trim() !== "") {
                  addArrayItem("responsibilities", newResponsibility.trim());
                  setNewResponsibility("");
                }
              }}
            >
              Agregar
            </Button>
          </Col>
        </Row>

        {/* Responsabilidades agregadas */}
        <Stack direction="horizontal" gap={2}>
          {formData.responsibilities.length > 0 &&
            formData.responsibilities
              .slice(-10)
              .reverse()
              .map((resp, index) => (
                <Badge key={index} pill className="form-badge">
                  <Button
                    variant="form-delete-value"
                    size="sm"
                    onClick={() => removeArrayItem("responsibilities", resp)}
                  >
                    ✕
                  </Button>
                  {resp}
                </Badge>
              ))}
        </Stack>
      </Form.Group>

      {/* REQUERIMIENTOS */}
      <Form.Group className="mb-3">
        <Form.Label>Requerimientos</Form.Label>
        {/* Input */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              type="text"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyDown={(e) =>
                handleKeyPress(e, "requirements", e.target.value)
              }
              placeholder="Nuevo requerimiento"
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              onClick={() => {
                if (newRequirement.trim() !== "") {
                  addArrayItem("requirements", newRequirement.trim());
                  setNewRequirement("");
                }
              }}
            >
              Agregar
            </Button>
          </Col>
        </Row>
        {/* Requerimientos agregados */}
        <Stack direction="horizontal" gap={2}>
          {formData.requirements.length > 0 &&
            formData.requirements
              .slice(-10)
              .reverse()
              .map((req, index) => (
                <Badge key={index} pill className="form-badge">
                  <Button
                    variant="form-delete-value"
                    size="sm"
                    onClick={() => removeArrayItem("requirements", req)}
                  >
                    ✕
                  </Button>
                  {req}
                </Badge>
              ))}
        </Stack>
      </Form.Group>

      {/* BENEFICIOS */}
      <Form.Group className="mb-3">
        <Form.Label>Beneficios</Form.Label>

        {/* Input */}
        <Row className="mb-2">
          <Col>
            <Form.Control
              type="text"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, "benefits", e.target.value)}
              placeholder="Nuevo beneficio"
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              onClick={() => {
                if (newBenefit.trim() !== "") {
                  addArrayItem("benefits", newBenefit.trim());
                  setNewBenefit("");
                }
              }}
            >
              Agregar
            </Button>
          </Col>
        </Row>

        {/* Beneficios agregados */}
        <Stack direction="horizontal" gap={2}>
          {formData.benefits.length > 0 &&
            formData.benefits
              .slice(-10)
              .reverse()
              .map((benefit, index) => (
                <Badge key={index} pill className="form-badge">
                  <Button
                    variant="form-delete-value"
                    size="sm"
                    onClick={() => removeArrayItem("benefits", benefit)}
                  >
                    ✕
                  </Button>
                  {benefit}
                </Badge>
              ))}
        </Stack>
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <SelectComponent
            label="Formato"
            value={formData.format}
            options={formatOptions}
            onChange={(e) => handleFormChange("format", e.target.value)}
          />
        </Col>
        <Col className="btn-submit">
          <Button type="submit" variant="primary">
            Generar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
