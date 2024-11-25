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
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Función para cargar los prompts
  const fetchData = async () => {
    try {
      console.log(
        "Fetching from:",
        `${import.meta.env.VITE_API_URL_ORGANIZATION}/organization/prompts`
      );

      const promptsResponse = await fetch(`${import.meta.env.VITE_API_URL_ORGANIZATION}/organization/prompts`);

      if (!promptsResponse.ok) {
        throw new Error(
          `Prompts error: ${promptsResponse.status} ${promptsResponse.statusText}`
        );
      }

      const promptsData = await promptsResponse.json();

      console.log("Prompts data:", promptsData);

      setPrompts(promptsData.prompts);

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
