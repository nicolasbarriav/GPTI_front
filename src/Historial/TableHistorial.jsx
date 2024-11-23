import { useState } from "react";
import { Button, Card, Form, Modal, Spinner, Table } from "react-bootstrap";
import { useOfferGenerator } from "../scripts/useOfferGenerator";
import ModalOffer from "../Offer/ModalOffer";
import { contractTypeOptions, formatOptions } from "../scripts/options";

export default function TableHistorial({ prompts }) {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedContractType, setSelectedContractType] = useState("");
  const [searchJob, setSearchJob] = useState("");
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

  const handleSelectFormat = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchJob(e.target.value);
  };

  const filteredPrompts = prompts.filter((prompt) => {
    const formatMatch =
      selectedFormat === "" || prompt.formato === selectedFormat;
    const searchTerm = searchJob.toLowerCase().trim();
    const searchMatch =
      searchTerm === "" ||
      prompt.tituloTrabajo?.toLowerCase().includes(searchTerm) ||
      prompt.area?.toLowerCase().includes(searchTerm) ||
      prompt.ubicacion?.toLowerCase().includes(searchTerm) ||
      prompt.tipoEmpleo?.toLowerCase().includes(searchTerm);
    return formatMatch && searchMatch;
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title>Ofertas Generadas</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="filters">
          <Form>
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center column gap-2 pb-3"
                style={{ flex: 1 }}
              >
                <Form.Control
                  type="text"
                  placeholder="Buscar oferta"
                  value={searchJob}
                  onChange={handleSearch}
                />
              </div>

              <Form.Group className="d-flex align-items-center column gap-2 pb-3">
                <Form.Select
                  value={selectedFormat}
                  onChange={handleSelectFormat}
                >
                  <option value="">Filtrar por formato</option>
                  {formatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </Form>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover className="fixed-width-table">
            <thead>
              <tr>
                <th>Formato</th>
                <th>Título</th>
                <th>Área</th>
                <th>Ubicación</th>
                <th>Tipo de Empleo</th>
                <th>Fecha</th>
                <th>Vista previa</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrompts.map((prompt) => (
                <tr key={prompt.id}>
                  <td className="cell-content">
                    {prompt.formato == "foro"
                      ? "Foro de trabajo online"
                      : prompt.formato == "mensaje"
                      ? "Mensaje de texto"
                      : prompt.formato}
                  </td>
                  <td className="cell-content" style={{ textAlign: "left" }}>
                    {prompt.tituloTrabajo}
                  </td>
                  <td className="cell-content">{prompt.area}</td>
                  <td className="cell-content">{prompt.ubicacion}</td>
                  <td className="cell-content">{prompt.tipoEmpleo}</td>
                  <td className="cell-content">
                    {new Date(prompt.createdAt).toLocaleDateString()}
                  </td>
                  <td className="cell-content">
                    <Button onClick={() => handlePreview(prompt)}>Ver</Button>
                  </td>
                </tr>
              ))}
              {filteredPrompts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center">
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
