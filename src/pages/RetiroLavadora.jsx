import { useState } from 'react';

const NUMERO_WHATSAPP = '56928168355';

export default function RetiroLavadora() {
  const [datos, setDatos] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    mensaje: '',
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    const texto =
      `Hola, quiero coordinar el retiro de una lavadora usada.\n\n` +
      `*Nombre:* ${datos.nombre}\n` +
      `*Teléfono:* ${datos.telefono}\n` +
      `*Dirección:* ${datos.direccion}\n` +
      `*Detalle:* ${datos.mensaje || 'Sin detalles adicionales'}`;

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="page retiro-page">
      <div className="hero-banner">
        <h1>Retiro de Lavadoras Usadas</h1>
        <p>
          ¿Tienes una lavadora que ya no usas? Déjanos tus datos y coordinamos el retiro
          a domicilio.
        </p>
      </div>

      <form className="retiro-form" onSubmit={enviar}>
        <div className="form-fila">
          <div className="form-campo">
            <label htmlFor="nombre">Nombre ________ :</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Tu nombre completo"
              autoComplete="name"
              value={datos.nombre}
              onChange={manejarCambio}
              required
            />
          </div>
          <br />

          <div className="form-campo">
            <label htmlFor="telefono">Teléfono___________:</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="+56 9 1234 5678"
              autoComplete="tel"
              inputMode="tel"
              pattern="[0-9+\s]{8,15}"
              title="Ingresa un teléfono válido, por ejemplo +56 9 1234 5678"
              value={datos.telefono}
              onChange={manejarCambio}
              required
            />
          </div>
        </div>
        <br />

        <div className="form-campo">
          <label htmlFor="direccion">Dirección de retiro_________:</label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            placeholder="Calle, número, comuna"
            autoComplete="street-address"
            value={datos.direccion}
            onChange={manejarCambio}
            required
          />
        </div>
        <br />

        <div className="form-campo">
          <label htmlFor="mensaje">Mensaje (Que artefacto es?)</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            placeholder="Ej: Lavadora Samsung de 8 kg, no centrifuga. Vivo en 3er piso con ascensor."
            value={datos.mensaje}
            onChange={manejarCambio}
          />
        </div>

        <button type="submit" className="btn-primary btn-enviar">
          Enviar por WhatsApp
        </button>
      </form>
    </section>
  );
}