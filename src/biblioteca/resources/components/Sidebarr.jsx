import { useState } from "react";
import { Menu, X, User } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-5 text-white transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-5">
          <ul>
            <li className="p-2 hover:bg-gray-700 rounded">Usuarios</li>
            <li className="p-2 hover:bg-gray-700 rounded">Libros</li>
            <li className="p-2 hover:bg-gray-700 rounded">Autores</li>
            <li className="p-2 hover:bg-gray-700 rounded">Prestamos</li>
            <li className="p-2 hover:bg-gray-700 rounded">Reservaciones</li>
          </ul>
        </nav>
      </div>


    </div>
  );
}
