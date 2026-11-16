import { useState } from 'react';
import './Trabajos.css';

function CarruselTrabajo({ imagenes, equipo, zona }) {
  const [indiceActual, setIndiceActual] = useState(0);

  const retroceder = (e) => {
    e.preventDefault();
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const avanzar = (e) => {
    e.preventDefault();
    setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const fotoActual = imagenes[indiceActual];

  return (
    <div className="trabajo-imagen-wrapper">
      <img
        src={fotoActual.url}
        alt={`${equipo} - ${fotoActual.etapa}`}
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x270?text=' + encodeURIComponent(fotoActual.etapa);
        }}
      />
      <span className="badge-zona">{zona}</span>
      <span className="badge-fase">{fotoActual.etapa}</span>

      {imagenes.length > 1 && (
        <>
          <button
            type="button"
            className="btn-flecha btn-flecha-izq"
            onClick={retroceder}
            aria-label="Foto anterior"
          >
            &#10094;
          </button>
          <button
            type="button"
            className="btn-flecha btn-flecha-der"
            onClick={avanzar}
            aria-label="Foto siguiente"
          >
            &#10095;
          </button>

          <div className="carrusel-dots">
            {imagenes.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === indiceActual ? 'dot-activo' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIndiceActual(idx);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Trabajos() {
  const casos = [
    {
      id: 1,
      equipo: 'Cambio de transmisión en Lavadora Mademsa 15 kg',
      falla: 'Lavadora con ruido al centrifugar y amarraba la ropa generando golpeteos.',
      solucion: 'Reemplazo de transmisión encargado de los movimientos de lavado y centrifugado (rodamientos).',
      zona: 'La Florida',
      imagenes: [
        { url: '/img/lavadoraoxido.jpeg', etapa: '1. Falla: Óxido en polea' },
        { url: '/img/lavadoratrasmision.jpeg', etapa: '2. Transmisión nueva instalada' }
      ]
    },
    {
      id: 2,
      equipo: 'Mantención a Calefont Multimarca Junkers / Splendid',
      falla: 'Mantención preventiva para que su llama sea siempre azul.',
      solucion: 'Se limpia conjunto quemador, serpentín e inyectores.',
      zona: 'Ñuñoa',
      imagenes: [
        { url: '/img/Calefont desarmado.jpeg', etapa: '1. Desarme quemador y serpentín' },
        { url: '/img/Quemador.jpeg', etapa: '2. Limpieza de inyectores' },
        { url: '/img/Calefont Armado.jpeg', etapa: '3. Calefont armado y sin fugas' }
      ]
    },
    {
      id: 3,
      equipo: 'Secadora 9k / Mademsa',
      falla: 'Fuerte ruido(chillido) al girar.',
      solucion: 'Cambio de rodamiento en la foto se ve el rodamiento que se cambiara oxidado.',
      zona: 'Buin',
      imagenes: [
        { url: '/img/secadoraAntes.jpeg', etapa: '1. Secadora con rodamiento agripado' },
        { url: '/img/secadoraDespues.jpeg', etapa: '2. Listo para cambiarlo' }
      ]
    },
    {
      id: 4,
      equipo: 'Placa Lavadora Electrolux / Mademsa',
      falla: 'Válvula de llenado activada permanente (no corta agua).',
      solucion: 'Reemplazo de TRIAC SMD en corto circuito y resistencia de compuerta.',
      zona: 'Peñalolén',
      imagenes: [
        { url: '/img/diagnostico de placas.jpg', etapa: 'Diagosticando para la reparacion' }
        
      ]
    }
  ];

  return (
    <section className="page-trabajos-container">
      <header className="trabajos-header">
        <span className="subtitulo-seccion">Respaldo y Transparencia</span>
        <h1>Casos de Éxito y Trabajos Realizados</h1>
        <p>
          Evidencia de intervenciones reales: mediciones electrónicas en banco de pruebas y soluciones a nivel de componente.
        </p>
      </header>

      <div className="trabajos-grid">
        {/* VIDEO 1: PRIMER REEL */}
        <article className="trabajo-card">
          <div className="trabajo-imagen-wrapper video-wrapper-fix">
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F891366200359960%2F&show_text=false&width=267&t=0"
              title="Diagnóstico en Terreno - Video 1"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen={true}
            />
            <span className="badge-zona">En Terreno</span>
            <span className="badge-fase">Reparacion de centrifugado</span>
          </div>

          <div className="trabajo-contenido">
            <h3>Diagnóstico y Reparación en Video</h3>
            <p>
              <strong>Falla detectada:</strong> No centrifuga al detectar la puerta abierta.
            </p>
            <p>
              <strong>Solución técnica:</strong> Comprobación de iman el que se encontraba corroido.
            </p>

            <div className="trabajo-acciones">
              <a
                href="https://wa.me/56928168355?text=Hola,%20vi%20su%20video%20de%20reparacion%201%20y%20quiero%20agendar%20una%20visita"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-consultar-caso"
              >
                Agendar Visita Técnica
              </a>
            </div>
          </div>
        </article>

        {/* VIDEO 2: SEGUNDO REEL (AL LADO) */}
        <article className="trabajo-card">
          <div className="trabajo-imagen-wrapper video-wrapper-fix">
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1960818087916296%2F&show_text=false&width=231&t=0"
              title="Diagnóstico en Terreno - Video 2"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen={true}
            />
            <span className="badge-zona">En Terreno</span>
            <span className="badge-fase">Mantención a Lavadora</span>
          </div>

          <div className="trabajo-contenido">
            <h3>Mantención en Vivo</h3>
            <p>
              <strong>Registro en terreno:</strong> Mantención a lavadora por mal olor y manchar la ropa.
            </p>
            <p>
              <strong>Solución técnica:</strong> Desarme completo , limpieza y lubricación.
            </p>

            <div className="trabajo-acciones">
              <a
                href="https://wa.me/56928168355?text=Hola,%20vi%20su%20video%20de%20reparacion%202%20y%20quiero%20agendar%20una%20visita"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-consultar-caso"
              >
                Agendar Visita Técnica
              </a>
            </div>
          </div>
        </article>

        {/* RESTO DE TARJETAS CON CARRUSEL DE FOTOS */}
        {casos.map((item) => (
          <article key={item.id} className="trabajo-card">
            <CarruselTrabajo
              imagenes={item.imagenes}
              equipo={item.equipo}
              zona={item.zona}
            />

            <div className="trabajo-contenido">
              <h3>{item.equipo}</h3>
              <p>
                <strong>Falla inicial:</strong> {item.falla}
              </p>
              <p>
                <strong>Solución técnica:</strong> {item.solucion}
              </p>

              <div className="trabajo-acciones">
                <a
                  href={`https://wa.me/56928168355?text=Hola,%20tengo%20un%20problema%20similar%20al%20caso:%20${encodeURIComponent(item.equipo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-consultar-caso"
                >
                  Consultar por una falla similar
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}