import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { ClockHistory, FileText } from "react-bootstrap-icons";
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
                variant="outline-primary"
                size="lg"
                className="w-100 py-3 d-flex align-items-center justify-content-center"
                onClick={() => navigate('/historial')}
              >
                <ClockHistory
                  className="me-2"
                  size={20}
                  
                  />
                Historial
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3 d-flex align-items-center justify-content-center"
                onClick={() => navigate("/generar-oferta")}
              >
                <FileText className="me-2" size={20} />
                Generar oferta
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
