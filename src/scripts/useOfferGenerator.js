import { useState } from "react";

export const useOfferGenerator = () => {
  const [generated, setGenerated] = useState("");
  const [keyWords, setKeyWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatHashtag = (keyword) => {
    return (
      "#" +
      keyword
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "")
    );
  };

  const generateOffer = async (formData) => {
    setLoading(true);
    console.log(formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_GPT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tituloTrabajo: formData.tituloTrabajo || formData.jobTitle || "",
          area: formData.area || "",
          ubicacion: formData.ubicacion || formData.location || "",
          tipoEmpleo: formData.tipoEmpleo || formData.contractType || "",
          responsabilidades:
            formData.responsabilidades || formData.responsibilities || [],
          requisitos: formData.requisitos || formData.requirements || [],
          beneficios: formData.beneficios || formData.benefits || [],
          formato: formData.formato || formData.format || "",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGenerated(data.response);
      setKeyWords(data.keywords);
      return true;
    } catch (err) {
      console.error("Error al generar la oferta: ", err);
      throw new Error(
        "Hubo un error al generar la oferta. Por favor intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const getFullContent = () => {
    const hashtags = keyWords
      .filter((keyword) => keyword && keyword.trim())
      .map(formatHashtag);

    return `${generated}\n\n${hashtags.join(" ")}`;
  };

  return {
    generated,
    keyWords,
    loading,
    generateOffer,
    getFullContent,
  };
};
