// ServicesGrid.jsx
import ServiceCard from './ServiceCard';

export default function ServicesGrid() {
  // Estos datos podrían venir de tu API de Spring Boot en el futuro
  const servicios = [
    {
      id: 1,
      titulo: "Servicio técnico área refrigeración",
      descripcion: "¿Tu refrigerador, freezer o congelador presenta problemas?",
      imagen: "/img/refrigeracion.jpg"
    },
    {
      id: 2,
      titulo: "Servicio técnico área lavado",
      descripcion: "¿Tienes un problema con tu lavadora o secadora?",
      imagen: "/img/lavado.jpg"
    }
    // Puedes agregar más sin tocar el HTML
  ];

  return (
    <section className="contenedor-servicios">
      <h2>Nuestros servicios</h2>
      <p>Soluciones técnicas rápidas y garantizadas para tu hogar</p>
      
      <div className="grilla">
        {servicios.map((servicio) => (
          <ServiceCard 
            key={servicio.id}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            imagen={servicio.imagen}
          />
        ))}
      </div>
    </section>
  );
}