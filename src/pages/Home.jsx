export default function Home() {
  return (
    <section className="page home-page">
      {/* Banner Principal */}
      <div className="hero-banner">
        <h1>Servicio Técnico Especialista en Línea Blanca</h1>
        <p>
          Diagnóstico certero y reparación a nivel de componentes en La Florida y comunas aledañas.
        </p>
        
      </div>

      {/* Sección de Confianza: Sobre el Técnico */}
      <div className="perfil-tecnico-card">
        <div className="perfil-foto-wrapper">
          <img
            src="/img/Tecnico.jpg"
            alt="Técnico especialista FullRepar"
            className="perfil-foto"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/220x220?text=Foto+Tecnico';
            }}
          />
          <span className="badge-verificado">Técnico Certificado</span>
        </div>

        <div className="perfil-info">
          <h2>Atención Directa y Respaldo Profesional</h2>
          <p className="perfil-subtitulo">
            Especialista en electrónica aplicada a línea blanca y climatización.
          </p>
          <p className="perfil-descripcion">
            Sin intermediarios ni empresas externas: te atiende directamente un técnico con
            formación electrónica e instrumental de precisión (osciloscopio, multímetro y banco de pruebas)
            para reparar placas, motores y sistemas de refrigeración buscando solucionar a nivel de componente.
          </p>

          <div className="perfil-puntos">
            <div className="punto-item">✓ Diagnóstico transparente con instrumental</div>
            <div className="punto-item">✓ Presupuesto claro antes de cualquier intervención</div>
            <div className="punto-item">✓ Garantía por cada trabajo realizado</div>
          </div>
        </div>
      </div>

      {/* Características del servicio */}
      <div className="home-features">
        <div className="feature-item">
          <h3>Diagnóstico Electrónico</h3>
          <p>Reparación de placas inverter y fuentes de poder sin cambios innecesarios.</p>
        </div>
        <div className="feature-item">
          <h3>Garantía Real</h3>
          <p>Solo uso de repuestos nuevos y garantía por cada trabajo realizado.</p>
        </div>
        <div className="feature-item">
          <h3>Atención a Domicilio</h3>
          <p>Puntualidad y coordinación directa por WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}