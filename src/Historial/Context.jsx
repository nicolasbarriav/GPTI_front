import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";

export default function Context({
  currentContext,
  handleUpdateContext,
  organizationContext,
  setOrganizationContext,
  updating,
}) {
  return (
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
  );
}
