import './Productos.css';
export default function Productos() {
  const catalogo = [
    {
      id: 1,
      nombre: 'Bomba de desagüe universal',
      estado: 'Nuevo',
      descripcion: 'Compatible con LG, Samsung y Daewoo.'
    },
    {
      id: 2,
      nombre: 'Placa lógica lavadora (Desarme chequeada)',
      estado: 'Chequeada en banco',
      descripcion: 'Probada al 100% con voltajes estables de control y potencia.'
    }
  ];

  return (
    <section className="page productos-page">
      <header className="page-header">
        <h2>Catálogo de Repuestos</h2>
        <p>Repuestos nuevos y componentes recuperados garantizados.</p>
      </header>

      <div className="productos-grid">
        {catalogo.map((prod) => (
          <article key={prod.id} className="producto-card">
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