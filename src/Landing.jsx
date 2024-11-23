import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { ClockHistory, FileText, Gear } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Card className="shadow-lg mx-auto" style={{ maxWidth: "800px" }}>
        <Card.Body className="p-5">
          <h2 className="text-center mb-4">Sistema de ofertas</h2>
          <p className="text-center text-muted mb-4">
            Selecciona una opción para comenzar
          </p>

          <Row className="g-4">
            <Col md={6}>
              <Button
                className="d-flex-row justify-content align-items-center primary-button w-100"
                onClick={() => navigate("/historial")}
              >
                <ClockHistory className="menu-button-icon" /> Historial
              </Button>
            </Col>
            <Col md={6}>
              <Button
                className="d-flex-row justify-content align-items-center config-button w-100"
                onClick={() => navigate("/generar-oferta")}
              >
                <FileText className="menu-button-icon" /> Generar oferta
              </Button>
            </Col>
            <Col md={12}>
              <Button
                className="d-flex-row justify-content align-items-center secondary-button w-100"
                onClick={() => navigate("/contexto")}
              >
                <Gear className="menu-button-icon" /> Configurar contexto
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
