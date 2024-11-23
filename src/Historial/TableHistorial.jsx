import { useState } from "react";
import { Button, Card, Modal, Spinner, Table } from "react-bootstrap";
import { useOfferGenerator } from "../scripts/useOfferGenerator";
import ModalOffer from "../Offer/ModalOffer";

export default function TableHistorial({ prompts }) {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setSelectedPrompt(null);
  };

  const handlePreview = (prompt) => {
    setSelectedPrompt(prompt);
    setShowModal(true);
  };

  const copyToClipboard = () => {
    if (selectedPrompt) {
      const fullContent = getFullContent(
        selectedPrompt.generated,
        selectedPrompt.keywords
      );
      navigator.clipboard.writeText(fullContent);
      alert("Copiado al portapapeles");
    }
  };

  const formatHashtag = (keyword) => {
    return (
      "#" +
      keyword
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "")
    );
  };

  const getFullContent = (generated, keyWords) => {
    if (!generated || !keyWords) return "";

    const hashtags = keyWords
      .filter((keyword) => keyword && keyword.trim())
      .map(formatHashtag);

    return `${generated}\n\n${hashtags.join(" ")}`;
  };

  const getModalContent = () => {
    if (!selectedPrompt) return "";
    return getFullContent(selectedPrompt.generated, selectedPrompt.keywords);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Ofertas Generadas ({prompts.length})</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Título</th>
                <th>Área</th>
                <th>Ubicación</th>
                <th>Tipo de Empleo</th>
                <th>Fecha</th>
                <th>Vista previa</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((prompt) => (
                <tr key={prompt.id}>
                  <td>{prompt.tituloTrabajo}</td>
                  <td>{prompt.area}</td>
                  <td>{prompt.ubicacion}</td>
                  <td>{prompt.tipoEmpleo}</td>
                  <td>{new Date(prompt.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button onClick={() => handlePreview(prompt)}>Ver</Button>
                  </td>
                </tr>
              ))}
              {prompts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    No hay ofertas generadas
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {selectedPrompt && (
          <ModalOffer
            showModal={showModal}
            handleClose={handleClose}
            copyText={copyToClipboard}
            fullContent={getModalContent()}
          />
        )}
      </Card.Body>
    </Card>
  );
}
