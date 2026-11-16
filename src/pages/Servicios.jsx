import { useState } from 'react';
import './Servicios.css';

function TarjetaServicio({ item }) {
  const [desplegado, setDesplegado] = useState(false);

  return (
    <article className="tarjeta-servicio">
      {/* Contenedor interactivo tipo acordeón */}
      <div
        className={`imagen-wrapper ${desplegado ? 'imagen-desplegada' : ''}`}
        onClick={() => setDesplegado(!desplegado)}
        title="Haz clic para ampliar o reducir la imagen"
      >
        <img
          src={item.imagen}
          alt={item.titulo}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/400x240?text=Servicio+' +
              encodeURIComponent(item.etiqueta);
          }}
        />
        <span className="badge-categoria">{item.etiqueta}</span>
        <span className="badge-acordeon">
          {desplegado ? '▲ Reducir foto' : '▼ Ampliar foto'}
        </span>
      </div>

      {/* Ficha descriptiva orientada a la necesidad del cliente */}
      <div className="tarjeta-contenido">
        <h3>{item.titulo}</h3>
        <p className="descripcion-servicio">{item.descripcion}</p>

        <div className="bloque-fallas">
          <span className="titulo-fallas">Fallas frecuentes:</span>
          <ul>
            {item.fallasComunes.map((falla, idx) => (
              <li key={idx}>✓ {falla}</li>
            ))}
          </ul>
        </div>

        <div className="bloque-marcas">
          <small>
            <strong>Marcas:</strong> {item.marcas}
          </small>
        </div>

        <div className="tarjeta-acciones">
          <a
            href={`https://wa.me/56928168355?text=Hola,%20necesito%20agendar%20visita%20para%20reparar:%20${encodeURIComponent(
              item.titulo
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cotizar-servicio"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Servicios() {
  const servicios = [
    {
      id: 'lavado',
      titulo: 'Servicio Técnico Lavadoras y Secadoras',
      descripcion:
        'Reparación mecánica y electrónica en terreno. Diagnóstico certero para fallas de desagüe, centrifugado y ruidos molestos.',
      imagen: '/img/lavadoraCatalogo.png',
      etiqueta: 'Línea Lavado',
      fallasComunes: [
        'No bota el agua o no centrifuga',
        'Ruido excesivo o cambio de rodamientos',
        'Código de error en panel digital',
        'No ingresa agua o no corta el llenado'
      ],
      marcas: 'Samsung, LG, Mabe, Daewoo, Mademsa, Fensa'
    },
    {
      id: 'refrigeracion',
      titulo: 'Refrigeradores y Sistemas No Frost',
      descripcion:
        'Diagnóstico completo y reemplazo de componentes de descongelamiento y distribución de frío (No se carga gas).',
      imagen: '/img/refriMuestra.png',
      etiqueta: 'Línea Frío',
      fallasComunes: [
        'Congela arriba pero no enfría abajo',
        'Bloqueo severo de hielo en el freezer',
        'Pérdida de refrigerante o fuga en cañería',
        'Motor no arranca o corta por térmico',
        'Agua en mantenedor'
      ],
      marcas: 'Samsung, LG, Bosch, Mabe, General Electric, Daewoo'
    },
    {
      id: 'cocina-gas',
      titulo: 'Hornos y Calefont',
      descripcion:
        'Mantenimiento preventivo y correctivo de gas y temperatura. Detección de fugas, calibración de llama y encendido electrónico.',
      imagen: '/img/hornoMuestra.png',
      etiqueta: 'Gas y Cocción',
      fallasComunes: [
        'Calefont no enciende o se apaga al ducharse',
        'Horno no mantiene encendida la llama',
        'Chispas o bujías de encendido no activan',
        'Olor a gas o llama amarilla con hollín',
        'Calefont calienta poco o no mantiene temperatura estable'
      ],
      marcas: 'Junkers, Splendid, Neckar, Mademsa, Trotter, Sindelen'
    },
    {
      id: 'electronica',
      titulo: 'Reparación de Placas Electrónicas',
      descripcion:
        'Laboratorio propio de diagnóstico a nivel de componente. Reemplazo de piezas quemadas en banco para evitar compras de placas nuevas.',
      imagen: '/img/placaMuestra.png',
      etiqueta: 'Electrónica Aplicada',
      fallasComunes: [
        'Tarjeta no enciende (fuente conmutada quemada)',
        'TRIAC en cortocircuito activando válvulas directas',
        'Placa Inverter con error IPM de motor',
        'Pistas cortadas por sulfato o alza de voltaje'
      ],
      marcas: 'Tarjetas universales, inverter y convencionales'
    }
  ];

  return (
    <section className="page-servicios-container">
      <header className="servicios-header">
        <span className="subtitulo-seccion">Especialidades Técnicas</span>
        <h1>Nuestros Servicios de Reparación</h1>
        <p>
          Atención técnica garantizada a domicilio en La Florida, La Granja y comunas aledañas.
        </p>
      </header>

      <div className="grilla-servicios">
        {servicios.map((item) => (
          <TarjetaServicio key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}