import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Menu, User, LogOut } from "lucide-react";
import Dashboard from "./Sidebarr";
import useAuth from "../../Login/hooks/useAuth";
import useAuthUser from "../../Login/hooks/useAuthUser";


export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const { user, loading } = useAuthUser(); // 🔥 Obtener usuario autenticado

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <Dashboard />
      </aside>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white h-16 flex items-center px-6 justify-between z-40 transition-all duration-300 shadow-md">
        {/* Botón para abrir/cerrar Sidebar */}
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white p-2 rounded-md hover:bg-gray-700 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 text-xl font-semibold">Dashboard</span>
        </div>

        {/* Perfil de Usuario */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
            className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <User className="w-5 h-5 text-white" />
            <span className="hidden md:inline">
              {loading ? "Cargando..." : user ? user.first_name : "Usuario"}
            </span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white text-black divide-y divide-gray-200 rounded-md shadow-lg overflow-hidden">
              <div className="px-4 py-3">
                {loading ? (
                  <p className="text-sm text-gray-500">Cargando...</p>
                ) : user ? (
                  <>
                    <p className="text-sm font-medium">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No se encontró información</p>
                )}
              </div>
              <ul className="py-1">
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Contenido principal */}
      <main
        className={`pt-16 p-6 w-full transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
