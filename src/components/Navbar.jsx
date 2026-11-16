import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  const claseLink = ({ isActive }) => (isActive ? 'nav-item active' : 'nav-item');

  return (
    <header className="navbar-header">
      {/* Logo de la marca con Isotipo y Texto */}
      <div className="navbar-logo">
        <Link to="/" onClick={cerrar} className="logo-link">
          {/* El nuevo isotipo del brazo musculoso y la llave punta corona */}
          <img 
            src="/img/logo.png" 
            alt="FullRepar Logo" 
            className="logo-img" 
          />
          
        </Link>
      </div>

      {/* Botón hamburguesa (solo se ve en celular) */}
      <button
        className="navbar-toggle"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? '✕' : '☰'}
      </button>

      {/* Casillas de navegación */}
      <nav className={`navbar-links ${abierto ? 'abierto' : ''}`}>
        <NavLink to="/" end className={claseLink} onClick={cerrar}>
          Inicio
        </NavLink>
        <NavLink to="/servicios" className={claseLink} onClick={cerrar}>
          Servicios
        </NavLink>
        <NavLink to="/trabajos" className={claseLink} onClick={cerrar}>
          Trabajos y Respaldo
        </NavLink>
        <NavLink to="/productos" className={claseLink} onClick={cerrar}>
          Repuestos
        </NavLink>
        <NavLink to="/retiro" className={claseLink} onClick={cerrar}>
          Retiro de Lavadoras
        </NavLink>
      </nav>

      {/* Botón de acción rápida */}
      <div className={`navbar-actions ${abierto ? 'abierto' : ''}`}>
        <a
          href="https://wa.me/56928168355?text=Hola,%20quiero%20agendar%20una%20visita%20tecnica"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-contacto-header"
          onClick={cerrar}
        >
          Agendar por WhatsApp
        </a>
      </div>
    </header>
  );
}