import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Columna 1: Identidad y Propuesta de Valor */}
        <div className="footer-col">
          <div className="footer-logo">
            <span className="logo-brand">Full</span>
            <span className="logo-accent">Repar</span>
          </div>
          <p className="footer-descripcion">
            Servicio técnico especializado en reparación de línea blanca, gas y electrónica aplicada. Diagnóstico con instrumental y atención directa en terreno.
          </p>
          <span className="footer-cobertura">
            📍 Cobertura: La Florida, La Granja, San Miguel, P.A.C., Santiago, Ñuñoa, Macul Peñalolén y alrededores.
          </span>
        </div>

        {/* Columna 2: Navegación Rápida */}
        <div className="footer-col">
          <h4>Navegación</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/trabajos">Trabajos y Respaldo</Link></li>
            <li><Link to="/productos">Repuestos</Link></li>
            <li><Link to="/retiro">Retiro de lavadoras</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto Directo y Horarios */}
        <div className="footer-col">
          <h4>Contacto Directo</h4>
          <p className="footer-info-item">
            <strong>Horario:</strong> Lunes a Sábado — 09:00 a 19:00 hrs.
          </p>
          <p className="footer-info-item">
            <strong>Teléfono / WhatsApp:</strong> +56 9 2816 8355
          </p>
          <p className="footer-info-item">
            <strong>Correo:</strong>{' '}
            <a
              href="mailto:documentos.sebastian.ignacio@hotmail.com?subject=Consulta%20Servicio%20T%C3%A9cnico"
              className="footer-email-link"
            >
              documentos.sebastian.ignacio@hotmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Barra inferior de derechos */}
      <div className="footer-bottom">
        <p>© {anioActual} FullRepar — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}