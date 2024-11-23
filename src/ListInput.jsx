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
      <div className="d-flex flex-wrap gap-2 mt-2">
        {formData[propertyName].map((item, index) => (
          <div
            key={index}
            className="badge bg-secondary rounded-pill d-flex align-items-center"
            style={{
              maxWidth: "100%",
              padding: "8px 12px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                marginRight: "8px",
              }}
            >
              {item}
            </span>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-white"
              style={{
                minWidth: "20px",
                marginLeft: "auto",
              }}
              onClick={() => removeArrayItem(propertyName, item)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </Form.Group>
  );
}
