import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Importamos useNavigate para redirigir después del logout
import Dashboard from "./Sidebarr";
import Libros from "../../Libros/components/Libro";
import useAuth from "../../Login/hooks/useAuth";
export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <Dashboard />
      </aside>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-16 flex items-center px-4 justify-between z-40 transition-all duration-300">
        {/* Botón para abrir/cerrar Sidebar */}
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <span className="ml-4 text-xl font-semibold dark:text-white">
            Dashboard
          </span>
        </div>

        {/* Perfil de Usuario */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full z-50 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 dark:text-white">Neil Sims</p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1">
       
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Contenido principal */}
      <main
        className={`pt-16 p-6 transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
      </main>
      
      {/* contenido de libros */}
      <Libros />
    </div>
  );
}
