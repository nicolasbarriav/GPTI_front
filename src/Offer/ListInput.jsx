import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export default function ListInput({
  label,
  value,
  setValue,
  placeholder,
  items,
  onAdd,
  onRemove,
  error,
}) {
  const handleAddItem = () => {
    if (value.trim() !== "") {
      onAdd(value.trim());
      setValue("");
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
      {error && (
        <Form.Text className="text-danger">
          Debes agregar al menos un valor.
        </Form.Text>
      )}
      <div className="d-flex flex-wrap gap-2 mt-2">
        {items.map((item, index) => (
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
              onClick={() => onRemove(index)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </Form.Group>
  );
}
