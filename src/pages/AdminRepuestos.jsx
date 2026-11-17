import { useState, useEffect } from 'react';

export default function AdminRepuestos() {
  const [token, setToken] = useState(localStorage.getItem('token_fullrepar') || '');

  // Estados para el formulario de Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para crear o editar un repuesto
  const [editandoId, setEditandoId] = useState(null); // <-- Si tiene un ID, estamos en modo UPDATE
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('Nuevo');
  const [descripcion, setDescripcion] = useState('');
  const [imagenBase64, setImagenBase64] = useState('');
  const [repuestos, setRepuestos] = useState([]);

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

  // 1. LOGIN
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

  // Comprimir imagen a Base64
  const manejarArchivoImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
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

  // Cargar datos en el formulario para editar
  const iniciarEdicion = (item) => {
    setEditandoId(item.id);
    setNombre(item.nombre);
    setEstado(item.estado);
    setDescripcion(item.descripcion);
    setImagenBase64(item.imagenUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombre('');
    setEstado('Nuevo');
    setDescripcion('');
    setImagenBase64('');
  };

  // 2. CREAR (POST) O ACTUALIZAR (PUT) REPUESTO
  const guardarRepuesto = async (e) => {
    e.preventDefault();
    const miToken = localStorage.getItem('token_fullrepar');

    // Si editandoId tiene valor usa PUT, si es null usa POST
    const url = editandoId
      ? `http://localhost:8080/api/repuestos/${editandoId}`
      : 'http://localhost:8080/api/repuestos';
    const metodo = editandoId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${miToken}`
      },
      body: JSON.stringify({
        nombre,
        estado,
        descripcion,
        imagenUrl: imagenBase64 || null,
        disponible: true
      })
    });

    if (res.status === 401 || res.status === 403) {
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      cerrarSesion();
      return;
    }

    if (res.ok) {
      const guardado = await res.json();
      if (editandoId) {
        setRepuestos(repuestos.map((item) => (item.id === editandoId ? guardado : item)));
        alert('Repuesto actualizado en Oracle');
      } else {
        setRepuestos([...repuestos, guardado]);
        alert('Repuesto guardado en Oracle');
      }
      cancelarEdicion();
      e.target.reset();
    } else {
      alert(`Error al guardar (Código ${res.status}).`);
    }
  };

  // 3. ELIMINAR REPUESTO (DELETE)
  const eliminarRepuesto = async (id) => {
    const miToken = localStorage.getItem('token_fullrepar');

    const res = await fetch(`http://localhost:8080/api/repuestos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${miToken}`
      }
    });

    if (res.status === 401 || res.status === 403) {
      alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      cerrarSesion();
      return;
    }

    if (res.ok) {
      setRepuestos(repuestos.filter((item) => item.id !== id));
      if (editandoId === id) cancelarEdicion();
    } else {
      alert(`No se pudo eliminar (Código ${res.status})`);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token_fullrepar');
    setToken('');
    cancelarEdicion();
  };

  // VISTA A: Login
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

  // VISTA B: Panel CRUD completo
  return (
    <section className="page" style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Panel de Repuestos (Oracle XE)</h2>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <form onSubmit={guardarRepuesto} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', margin: '1.5rem 0' }}>
        {editandoId && (
          <p style={{ color: '#4dabf7', margin: 0, fontWeight: 'bold' }}>
            Editando repuesto #{editandoId}
          </p>
        )}

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

        <label style={{ fontSize: '0.9rem' }}>
          {editandoId ? 'Cambiar foto (Opcional, conserva la actual si no eliges otra):' : 'Foto del repuesto (Opcional):'}
          <input
            type="file"
            accept="image/*"
            onChange={manejarArchivoImagen}
            style={{ display: 'block', marginTop: '0.3rem' }}
          />
        </label>

        {imagenBase64 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={imagenBase64}
              alt="Vista previa"
              style={{ width: '140px', height: '140px', objectFit: 'contain', backgroundColor: '#0b1324', borderRadius: '8px' }}
            />
            <button type="button" onClick={() => setImagenBase64('')} style={{ color: '#ff6b6b' }}>
              Quitar foto
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button type="submit" className="btn-primary-small" style={{ flex: 1 }}>
            {editandoId ? 'Actualizar Repuesto' : 'Guardar en Base de Datos'}
          </button>

          {editandoId && (
            <button type="button" onClick={cancelarEdicion} style={{ padding: '0.6rem 1rem' }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3>Inventario actual en Oracle ({repuestos.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {repuestos.map((item) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #333' }}>
            <span>
              <strong>#{item.id}</strong> - {item.nombre} ({item.estado}) {item.imagenUrl ? '📷' : ''}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => iniciarEdicion(item)} style={{ color: '#4dabf7' }}>
                Editar
              </button>
              <button onClick={() => eliminarRepuesto(item.id)} style={{ color: '#ff6b6b' }}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}