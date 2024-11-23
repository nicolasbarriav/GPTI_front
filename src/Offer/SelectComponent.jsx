import { Form } from "react-bootstrap";

const SelectComponent = ({ label, value, options, onChange, isInvalid }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        required
        type="select"
        as="select"
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      >
        <option value="">Seleccione {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>

      <Form.Control.Feedback type="invalid">
        Por favor selecciona {label.toLowerCase()}.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default SelectComponent;
