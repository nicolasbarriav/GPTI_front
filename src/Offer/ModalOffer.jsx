import { Button, Modal } from "react-bootstrap";

export default function ModalOffer({
  showModal,
  handleClose,
  copyText,
  fullContent,
}) {
  return (
    <Modal show={showModal} fullscreen onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="gap-2">
        <div style={{ flex: 1 }}>
          <span>Oferta Generada</span>
        </div>

        <div className="d-flex gap-2">
          <div>
            <Button variant="light" onClick={copyText}>
              Copiar
            </Button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="white-space-pre-wrap">
        <div className="offer-content">{fullContent}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
