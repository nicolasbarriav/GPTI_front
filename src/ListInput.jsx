import React from "react";
import { Form, InputGroup, Button, Stack, Badge } from "react-bootstrap";

export default function ListInput({
  label,
  value,
  setValue,
  placeholder,
  formData,
  validated,
  addArrayItem,
  removeArrayItem,
  listsErrors,
  setListsErrors,
}) {
  const labels = {
    Responsabilidades: "responsibilities",
    Requerimientos: "requirements",
    Beneficios: "benefits",
  };
  const propertyName = labels[label];
  const isListEmpty = formData[propertyName].length === 0;

  const isValid = formData[propertyName].length > 0;
  const showError = validated && !isValid; // Error si la lista esta vacia al validar
  const hasErrors = Object.keys(formData.errors).length !== 0;

  const handleAddItem = () => {
    if (value.trim() !== "") {
      addArrayItem(propertyName, value.trim());
      setValue("");
      setListsErrors((prev) => ({ ...prev, [propertyName]: false }));
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          className="prevent-validation"
          value={value}
          //   isValid={listsErrors[propertyName]}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem();
            }
          }}
          placeholder={placeholder}
        />
        <Button variant="outline-secondary" onClick={handleAddItem}>
          Agregar
        </Button>
      </InputGroup>
      {validated && isListEmpty && (
        <Form.Text className="text-danger">
          Debes agregar al menos un valor.
        </Form.Text>
      )}
      <Stack direction="horizontal" gap={2} className="mt-2">
        {formData[propertyName].map((item, index) => (
          <Badge key={index} pill className="form-badge">
            <Button
              className="btn-form-delete-value"
              size="sm"
              onClick={() => removeArrayItem(propertyName, item)}
            >
              ✕
            </Button>
            {item}
          </Badge>
        ))}
      </Stack>
    </Form.Group>
  );
}
