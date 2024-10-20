import { Form } from "react-bootstrap";

const SelectComponent = ({ label, value, options, onChange }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        <option value="">Seleccione {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectComponent;
