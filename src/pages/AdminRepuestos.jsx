import { useState, useEffect } from 'react';

export default function AdminRepuestos() {
  // Revisa si ya tienes un token guardado en el navegador
  const [token, setToken] = useState(localStorage.getItem('token_fullrepar') || '');

  // Estados para el formulario de Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para crear un repuesto nuevo
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Nuevo');
  const [descripcion, setDescripcion] = useState('');
  const [imagenBase64, setImagenBase64] = useState(''); // <-- Guarda la imagen comprimida
  const [repuestos, setRepuestos] = useState([]);

  // Cargar lista actual de repuestos (público)
  const cargarRepuestos = () => {
    fetch('http://localhost:8080/api/repuestos')
      .then((res) => res.json())
      .then((data) => setRepuestos(data))
      .catch((err) => console.error('Error cargando repuestos:', err));
  };

  useEffect(() => {
    if (token) {
      cargarRepuestos();
    }
  }, [token]);

  // 1. LOGIN MANUAL: Envía credenciales y guarda el token recibido en localStorage
  const manejarLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token_fullrepar', data.token);
      setToken(data.token);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  // Procesa la foto seleccionada desde el PC/celular y la comprime a Base64 liviano
  const manejarArchivoImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
      setImagenBase64('');
      return;
    }

    const lector = new FileReader();
    lector.onload = (evento) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxAncho = 600;
        const escala = img.width > maxAncho ? maxAncho / img.width : 1;
        canvas.width = img.width * escala;
        canvas.height = img.height * escala;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const comprimida = canvas.toDataURL('image/jpeg', 0.75);
        setImagenBase64(comprimida);
      };
      img.src = evento.target.result;
    };
    lector.readAsDataURL(archivo);
  };

  // 2. CREAR REPUESTO MANUAL: Rescata el token y lo pega en Authorization
  const crearRepuesto = async (e) => {
    e.preventDefault();

    const miToken = localStorage.getItem('token_fullrepar');

    const res = await fetch('http://localhost:8080/api/repuestos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${miToken}`
      },
      body: JSON.stringify({
        nombre,
        estado,
        descripcion,
        imagenUrl: imagenBase64 || null, // <-- Manda null a Oracle si no subiste foto
        disponible: true
      })
    });

    if (res.ok) {
      const nuevo = await res.json();
      setRepuestos([...repuestos, nuevo]);
      setNombre('');
      setDescripcion('');
      setImagenBase64('');
      e.target.reset(); // <-- Limpia el nombre del archivo en el botón
      alert('Repuesto guardado en Oracle');
    } else {
      alert(`Error al guardar (Código ${res.status}). Revisa tu sesión.`);
    }
  };

  // 3. ELIMINAR REPUESTO MANUAL: También rescata y pega el token
  const eliminarRepuesto = async (id) => {
    const miToken = localStorage.getItem('token_fullrepar');

    const res = await fetch(`http://localhost:8080/api/repuestos/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${miToken}`
      }
    });

    if (res.ok) {
      setRepuestos(repuestos.filter((item) => item.id !== id));
    } else {
      alert(`No se pudo eliminar (Código ${res.status})`);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token_fullrepar');
    setToken('');
  };

  // VISTA A: Si no hay token, muestra el Login
  if (!token) {
    return (
      <section className="page" style={{ maxWidth: '400px', margin: '3rem auto', padding: '1rem' }}>
        <h2>Acceso Administrador</h2>
        <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Usuario (ej: admin)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary-small">Ingresar</button>
        </form>
      </section>
    );
  }

  // VISTA B: Si ya tienes token, muestra el panel de carga en Oracle
  return (
    <section className="page" style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Panel de Repuestos (Oracle XE)</h2>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <form onSubmit={crearRepuesto} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', margin: '1.5rem 0' }}>
        <input
          type="text"
          placeholder="Nombre del repuesto (ej: Presostato digital LG)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Nuevo">Nuevo</option>
          <option value="Nuevo - Alternativo">Nuevo - Alternativo</option>
          <option value="Original de desarme">Original de desarme</option>
          <option value="Chequeada en banco">Chequeada en banco</option>
          <option value="Recuperado">Recuperado</option>
          <option value="Reacondicionado">Reacondicionado</option>
          <option value="Usado">Usado</option>
          <option value="A pedido">A pedido</option>
        </select>

        <textarea
          placeholder="Descripción técnica o compatibilidad"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        {/* Casilla opcional para subir foto desde el dispositivo */}
        <label style={{ fontSize: '0.9rem' }}>
          Foto del repuesto (Opcional):
          <input
            type="file"
            accept="image/*"
            onChange={manejarArchivoImagen}
            style={{ display: 'block', marginTop: '0.3rem' }}
          />
        </label>

        {imagenBase64 && (
          <img
            src={imagenBase64}
            alt="Vista previa"
            style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
          />
        )}

        <button type="submit" className="btn-primary-small">Guardar en Base de Datos</button>
      </form>

      <h3>Inventario actual en Oracle ({repuestos.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {repuestos.map((item) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #333' }}>
            <span>
              <strong>#{item.id}</strong> - {item.nombre} ({item.estado}) {item.imagenUrl ? '📷' : ''}
            </span>
            <button onClick={() => eliminarRepuesto(item.id)} style={{ color: '#ff6b6b' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}