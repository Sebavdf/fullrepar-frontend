import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';

import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Trabajos from './pages/Trabajos';
import Productos from './pages/Productos';
import RetiroLavadora from './pages/RetiroLavadora';
import AdminRepuestos from './pages/AdminRepuestos'; // <-- 1. Importas la nueva página

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: '0rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/retiro" element={<RetiroLavadora />} />
          <Route path="/admin" element={<AdminRepuestos />} /> {/* <-- 2. Agregas la ruta */}
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  );
}