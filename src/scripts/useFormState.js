import { useState } from "react";

export const useFormState = () => {
  const initialState = {
    jobTitle: "",
    area: "",
    location: "",
    contractType: "",
    format: "",
    responsibilities: [],
    requirements: [],
    benefits: [],
  };

  const [formData, setFormData] = useState(initialState);

  const resetForm = () => {
    setFormData(initialState);
  };

  // Maneja cambios en campos simples
  const handleFormChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Agrega un elemento a un array específico
  const addArrayItem = (field, item) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...(prevState[field] || []), item],
    }));
  };

  // Elimina un elemento de un array específico
  const removeArrayItem = (field, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
  };

  return {
    formData,
    setFormData,
    handleFormChange,
    addArrayItem,
    removeArrayItem,
    resetForm,
  };
};
