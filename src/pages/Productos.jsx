// 1. NUEVO: Importamos useState (para guardar los datos dinámicos) y useEffect (para pedirlos al cargar la página)
import { useState, useEffect } from 'react';
import './Productos.css'; // INTACTO: Mantenemos tu misma hoja de estilos


export default function Productos() {
  const [catalogo, setCatalogo] = useState([]);
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/repuestos')
      .then((res) => res.json())
      .then((data) => setCatalogo(data))
      .catch((err) => console.error('Error cargando catálogo:', err));
  }, []);

  return (
    <section className="page">
      <h2>Repuestos Disponibles</h2>
      <p>Repuestos nuevos y componentes recuperados garantizados.</p>

      <div className="productos-grid">
        {catalogo.map((prod) => (
          <article key={prod.id} className="producto-card">
            {prod.imagenUrl && (
              <img
                src={prod.imagenUrl}
                alt={prod.nombre}
                title="Haz clic para ampliar"
                onClick={() => setImagenAmpliada(prod)}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'contain',
                  backgroundColor: '#0b1324',
                  padding: '0.4rem',
                  borderRadius: '8px',
                  marginBottom: '0.8rem',
                  cursor: 'zoom-in'
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

      {/* Modal / Visor para ampliar la imagen */}
      {imagenAmpliada && (
        <div
          onClick={() => setImagenAmpliada(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem',
            cursor: 'zoom-out'
          }}
        >
          <img
            src={imagenAmpliada.imagenUrl}
            alt={imagenAmpliada.nombre}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              cursor: 'default'
            }}
          />
          <p style={{ color: '#fff', marginTop: '0.8rem', fontWeight: 'bold' }}>
            {imagenAmpliada.nombre} — (Haz clic afuera para cerrar)
          </p>
        </div>
      )}
    </section>
  );
}