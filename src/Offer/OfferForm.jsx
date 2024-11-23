import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import SelectComponent from "./SelectComponent";
import {
  areaOptions,
  cityOptions,
  contractTypeOptions,
  formatOptions,
} from "../scripts/options";
import ListInput from "./ListInput";
import ModalOffer from "./ModalOffer";
import { useOfferGenerator } from "../scripts/useOfferGenerator";
import { useFormState } from "../scripts/useFormState";

export default function OfferForm() {
  const {
    formData,
    handleFormChange,
    addArrayItem,
    removeArrayItem,
    resetForm,
  } = useFormState();

  const [newResponsibility, setNewResponsibility] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({
    selects: {},
    lists: {},
  });

  const { loading, generateOffer, getFullContent } = useOfferGenerator();

  // Validación de selects
  const validateSelects = () => {
    const selectFields = ["area", "location", "contractType", "format"];
    let isValid = true;

    const newErrors = {};
    selectFields.forEach((field) => {
      const hasError = !formData[field] || formData[field] === "";
      newErrors[field] = hasError;
      if (hasError) isValid = false;
    });

    setFormErrors((prev) => ({
      ...prev,
      selects: newErrors,
    }));

    return isValid;
  };

  // Validación de listas
  const validateLists = () => {
    const listFields = ["responsibilities", "requirements", "benefits"];
    let isValid = true;

    const newErrors = {};
    listFields.forEach((field) => {
      const hasError = !formData[field] || formData[field].length === 0;
      newErrors[field] = hasError;
      if (hasError) isValid = false;
    });

    setFormErrors((prev) => ({
      ...prev,
      lists: newErrors,
    }));

    return isValid;
  };

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    resetFormStates();
  };

  const copyText = () => {
    navigator.clipboard.writeText(getFullContent());
    alert("Copiado al portapapeles");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isSelectsValid = validateSelects();
    const isListsValid = validateLists();
    setValidated(true);

    if (isSelectsValid && isListsValid) {
      try {
        const success = await generateOffer(formData);
        if (success) {
          handleShow();
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const resetFormStates = () => {
    setNewResponsibility("");
    setNewRequirement("");
    setNewBenefit("");
    setValidated(false);
    setFormErrors({
      selects: {},
      lists: {},
    });
    resetForm(); // Asumiendo que esta función está disponible en useFormState
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Puesto de trabajo */}
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
            <SelectComponent
              label="Área"
              value={formData.area}
              options={areaOptions}
              onChange={(e) => handleFormChange("area", e.target.value)}
              error={formErrors.selects.area}
            />
          </Col>
          <Col>
            <SelectComponent
              label="Ubicación"
              value={formData.location}
              options={cityOptions}
              onChange={(e) => handleFormChange("location", e.target.value)}
              error={formErrors.selects.location}
            />
          </Col>
          <Col>
            <SelectComponent
              label="Tipo de empleo"
              value={formData.contractType}
              options={contractTypeOptions}
              onChange={(e) => handleFormChange("contractType", e.target.value)}
              error={formErrors.selects.contractType}
            />
          </Col>
        </Row>

        <ListInput
          label="Responsabilidades"
          value={newResponsibility}
          setValue={setNewResponsibility}
          placeholder="Nueva responsabilidad"
          items={formData.responsibilities}
          onAdd={(value) => addArrayItem("responsibilities", value)}
          onRemove={(index) => removeArrayItem("responsibilities", index)}
          error={formErrors.lists.responsibilities}
        />

        <ListInput
          label="Requerimientos"
          value={newRequirement}
          setValue={setNewRequirement}
          placeholder="Nuevo requerimiento"
          items={formData.requirements}
          onAdd={(value) => addArrayItem("requirements", value)}
          onRemove={(index) => removeArrayItem("requirements", index)}
          error={formErrors.lists.requirements}
        />

        <ListInput
          label="Beneficios"
          value={newBenefit}
          setValue={setNewBenefit}
          placeholder="Nuevo beneficio"
          items={formData.benefits}
          onAdd={(value) => addArrayItem("benefits", value)}
          onRemove={(index) => removeArrayItem("benefits", index)}
          error={formErrors.lists.benefits}
        />

        <Row className="mb-3">
          <Col>
            <SelectComponent
              label="Formato"
              value={formData.format}
              options={formatOptions}
              onChange={(e) => handleFormChange("format", e.target.value)}
              error={formErrors.selects.format}
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

      <ModalOffer
        showModal={showModal}
        handleClose={handleClose}
        copyText={copyText}
        fullContent={getFullContent()}
      />
    </>
  );
}
