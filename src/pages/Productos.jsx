// 1. NUEVO: Importamos useState (para guardar los datos dinámicos) y useEffect (para pedirlos al cargar la página)
import { useState, useEffect } from 'react';
import './Productos.css'; // INTACTO: Mantenemos tu misma hoja de estilos

export default function Productos() {
  // 2. REEMPLAZO: Antes tenías "const catalogo = [ { id: 1... } ]" escrito a mano.
  // Ahora 'catalogo' parte como un arreglo vacío [] y se llenará con lo que responda Spring Boot.
  const [catalogo, setCatalogo] = useState([]);

  // 3. NUEVO: Estados de control visual mientras viaja la petición por red o si el backend está apagado
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 4. NUEVO: Este bloque se ejecuta automáticamente UNA sola vez (por el "[]" final) cuando entras a /productos
  useEffect(() => {
    // Dispara la petición GET pública hacia tu controlador de Spring Boot
    fetch('http://localhost:8080/api/repuestos')
      .then((res) => {
        // Verifica que el servidor haya respondido con código exitoso (200 OK)
        if (!res.ok) {
          throw new Error(`Error del servidor: ${res.status}`);
        }
        // Convierte la respuesta cruda HTTP en un arreglo de objetos JSON usable en JavaScript
        return res.json();
      })
      .then((data) => {
        // Mete los repuestos reales de Oracle dentro de la variable 'catalogo' y apaga el aviso de carga
        setCatalogo(data);
        setCargando(false);
      })
      .catch((err) => {
        // Si Spring Boot está apagado o bloqueado por CORS, captura el fallo sin romper la pantalla
        console.error('Error cargando repuestos:', err);
        setError('No se pudo conectar con el servidor de repuestos.');
        setCargando(false);
      });
  }, []);

  return (
    <section className="page productos-page">
      {/* INTACTO: Tu cabecera original */}
      <header className="page-header">
        <h2>Catálogo de Repuestos</h2>
        <p>Repuestos nuevos y componentes recuperados garantizados.</p>
      </header>

      {/* 5. NUEVO: Renderizado condicional; solo aparecen en pantalla si están activos */}
      {cargando && <p>Cargando catálogo desde Oracle...</p>}
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      {/* 6. INTACTO: Tu grilla, tarjetas, clases CSS y botón de WhatsApp quedaron iguales,
          porque los campos (prod.id, prod.estado, prod.nombre, prod.descripcion) ya coinciden con Oracle */}
      <div className="productos-grid">
        {catalogo.map((prod) => (
          <article key={prod.id} className="producto-card">
            {prod.imagenUrl && (
  <img
    src={prod.imagenUrl}
    alt={prod.nombre}
    style={{
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '0.8rem'
    }}
  />
)}
            <span className="badge-estado">{prod.estado}</span>
            <h3>{prod.nombre}</h3>
            <p>{prod.descripcion}</p>
            <a
              href={`https://wa.me/56928168355?text=Hola,%20me%20interesa%20el%20repuesto:%20${encodeURIComponent(prod.nombre)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-small"
            >
              Consultar disponibilidad
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}