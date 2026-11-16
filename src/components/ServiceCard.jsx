// ServiceCard.jsx
export default function ServiceCard({ titulo, descripcion, imagen }) {
  return (
    <div className="card-servicio">
      <img src={imagen} alt={titulo} />
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <button type="button" className="btn-ver-mas">Ver más</button>
    </div>
  );
}