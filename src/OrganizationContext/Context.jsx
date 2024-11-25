import React, { useState, useEffect } from "react";
import {
    Card,
    Form,
    Button,
    Spinner,
    Alert,
    Container,
  } from "react-bootstrap";

const Context = () => {
    const [loading, setLoading] = useState(true);
    const [organizationContext, setOrganizationContext] = useState("");
    const [currentContext, setCurrentContext] = useState("");
    const [updating, setUpdating] = useState(false);
    const [alert, setAlert] = useState(null);


    const showAlert = (message, type = "success") => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 5000);
    };

    const fetchData = async () => {
        try {
            console.log(
            "Fetching from:",
            `${import.meta.env.VITE_API_URL_ORGANIZATION}/organization/context`
            );
            
            const contextResponse = await fetch(`${import.meta.env.VITE_API_URL_ORGANIZATION}/organization/contextPrompt`);

            if (!contextResponse.ok) {
            throw new Error(
                `Context error: ${contextResponse.status} ${contextResponse.statusText}`
            );
            }

            const contextData = await contextResponse.json();


            console.log("Context data:", contextData);

            setCurrentContext(
            // contextData.currentPrompt || "No hay contexto definido"
            contextData.contextPrompt || "No hay contexto definido"	
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
            console.log(
                "Fetching from:",
                `${import.meta.env.VITE_API_URL_ORGANIZATION}/organization/context`
            );

            const response = await fetch(`${import.meta.env.VITE_API_URL_ORGANIZATION}/organization/updateContextPrompt`, {
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
            await fetchData();
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
    };

    return (
    <Container className="pt-3">
        <Card>
        <Card.Header>
            <Card.Title>Contexto de la Organización</Card.Title>
        </Card.Header>
        <Card.Body>
            <div className="mb-4">
            <h6 className="mb-3">Contexto Actual:</h6>
            <Alert variant="info">{currentContext}</Alert>
            </div>

            <h6 className="mb-3">Actualizar Contexto:</h6>
            <Form onSubmit={handleUpdateContext}>
            <Form.Group className="mb-3">
                <Form.Control
                as="textarea"
                rows={4}
                placeholder="Ingrese el nuevo contexto de la organización..."
                value={organizationContext}
                onChange={(e) => setOrganizationContext(e.target.value)}
                />
            </Form.Group>
            <Button
                type="submit"
                disabled={updating}
                className="d-flex align-items-center gap-2"
            >
                {updating && (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                )}
                {updating ? "Actualizando..." : "Actualizar Contexto"}
            </Button>
            </Form>
        </Card.Body>
        </Card>
    </Container>
    );
}

export default Context;
