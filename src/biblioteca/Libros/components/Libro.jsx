import { useState } from "react";
import useLibros from "../hooks/useLibros";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import ModalForm from "../utils/modal_crear";

export default function Libros() {
  const { libros, loading, error, currentPage, totalPages, setCurrentPage, order, setOrder } = useLibros();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Gestión de Libros</h1>

      {/* Controles superiores */}
      <div className="flex justify-between mb-4 text-black">
        {/* Selector de orden */}
        <div>
          <label className="text-gray-700 font-medium mr-2">Ordenar por:</label>
          <select
            value={order}
            onChange={handleOrderChange}
            className="p-2 border-amber-50 rounded-lg shadow-sm"
          >
            <option value="id">ID Ascendente</option>
            <option value="-id">ID Descendente</option>
          </select>
        </div>

        <button
          className="flex items-center font-black gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => setModalOpen(true)}
        >
          <FaPlus className="text-white" /> Agregar Libro
        </button>
      </div>

      {/* Modal */}
      <ModalForm isOpen={modalOpen} setIsOpen={setModalOpen} />

      {/* Manejo de carga y error */}
      {loading && <p className="text-center text-gray-600">Cargando libros...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Tabla de libros */}
      {!loading && !error && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-neutral-950 border-b">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Título</th>
                  <th className="p-3 text-left">Autor</th>
                  <th className="p-3 text-left">Categoría</th>
                  <th className="p-3 text-left">Fecha de Publicación</th>
                  <th className="p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {libros.length > 0 ? (
                  libros.map((libro) => (
                    <tr key={libro.id} className="hover:bg-gray-100 transition">
                      <td className="p-3 text-neutral-950">{libro.id}</td>
                      <td className="p-3 text-neutral-950">{libro.title}</td>
                      <td className="p-3 text-neutral-950">{libro.author}</td>
                      <td className="p-3 text-neutral-950">{libro.categories}</td>
                      <td className="p-3 text-neutral-950">{libro.publication_date}</td>
                      <td className="p-3 flex gap-2">
                        <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                          <FaEdit className="text-white" />
                        </button>
                        <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                          <FaTrash className="text-white" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No hay libros disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
            >
              Anterior
            </button>

            <span className="text-gray-700">Página {currentPage} de {totalPages}</span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
