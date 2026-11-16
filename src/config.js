// src/config.js
export const WHATSAPP_CONFIG = {
  // Pon aquí tu número real sin espacios ni signos
  numero: "56928168355", 
  crearLink: (mensaje) => {
    const texto = encodeURIComponent(mensaje || "Hola, necesito consultar por un servicio técnico.");
    return `https://wa.me/${WHATSAPP_CONFIG.numero}?text=${texto}`;
  }
};