import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { X, Menu, Users, Book, Layers, Feather, CalendarCheck, CalendarClock } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Usuarios", icon: <Users className="w-5 h-5" />, path: "/dashboard/usuarios" },
    { name: "Libros", icon: <Book className="w-5 h-5" />, path: "/dashboard/libros" },
    { name: "Categorías", icon: <Layers className="w-5 h-5" />, path: "/dashboard/categorias" },
    { name: "Autores", icon: <Feather className="w-5 h-5" />, path: "/dashboard/autores" },
    { name: "Préstamos", icon: <CalendarCheck className="w-5 h-5" />, path: "/dashboard/prestamos" },
    { name: "Reservaciones", icon: <CalendarClock className="w-5 h-5" />, path: "/dashboard/reservaciones" },
  ];

  return (
    <div className="flex h-screen">
      {/* Botón para abrir el sidebar en móviles */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 left-4 text-white bg-gray-800 p-2 rounded-md md:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 p-5 text-white transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menú de navegación */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className="flex items-center gap-3 w-full p-3 text-left rounded-lg hover:bg-gray-700 transition"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
