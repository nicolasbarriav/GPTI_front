import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import TableHistorial from "./TableHistorial";

const Historial = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [organizationContext, setOrganizationContext] = useState("");
  const [currentContext, setCurrentContext] = useState("");
  const [updating, setUpdating] = useState(false);
  const [alert, setAlert] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL_ORGANIZATION;

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Función para cargar los prompts y el contexto actual
  const fetchData = async () => {
    try {
      console.log(
        "Fetching from:",
        `${import.meta.env.VITE_API_URL_ORGANIZATION}/context`
      );

      const [promptsResponse, contextResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL_ORGANIZATION}/prompts`),
        fetch(`${import.meta.env.VITE_API_URL_ORGANIZATION}/context`),
      ]);

      if (!promptsResponse.ok) {
        throw new Error(
          `Prompts error: ${promptsResponse.status} ${promptsResponse.statusText}`
        );
      }
      if (!contextResponse.ok) {
        throw new Error(
          `Context error: ${contextResponse.status} ${contextResponse.statusText}`
        );
      }

      const promptsData = await promptsResponse.json();
      const contextData = await contextResponse.json();

      console.log("Prompts data:", promptsData);
      console.log("Context data:", contextData);

      setPrompts(promptsData.prompts);
      setCurrentContext(
        contextData.currentPrompt || "No hay contexto definido"
      );
    } catch (error) {
      console.error("Error completo:", error);
      showAlert(`Error al cargar los datos: ${error.message}`, "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateContext = async (e) => {
    e.preventDefault();
    if (!organizationContext.trim()) {
      showAlert("El contexto no puede estar vacío", "danger");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`${API_URL}/updateContextPrompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organizationContext }),
      });

      if (!response.ok) {
        throw new Error("Error updating context");
      }

      showAlert("Contexto actualizado correctamente", "success");
      await fetchData(); // Recarga tanto los prompts como el contexto
      setOrganizationContext("");
    } catch (error) {
      showAlert("No se pudo actualizar el contexto", "danger");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }
  console.log(prompts);
  return (
    <Container className="py-4">
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      

      <Row>
        <Col>
          <TableHistorial prompts={prompts} />
        </Col>
      </Row>
    </Container>
  );
};

export default Historial;
