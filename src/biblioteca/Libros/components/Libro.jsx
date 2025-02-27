import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export default function Libros() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Gestión de Libros
      </h1>

      {/* Agregar nuevo libro */}
      <div className="flex justify-end">
        <button className="flex items-center font-black gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition">
          <FaPlus className="text-white"/> Agregar Libro
        </button>
      </div>

      {/* Tabla de libros */}
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
            {/* Datos quemados */}
            {[
              {
                id: 1,
                titulo: "Cien años de soledad",
                autor: "Gabriel García Márquez",
                categoria: "Novela",
                fecha: "27-02-2025",
              },
              {
                id: 2,
                titulo: "El Principito",
                autor: "Antoine de Saint-Exupéry",
                categoria: "Fantasía",
                fecha: "27-02-2025",
              },
            ].map((libro) => (
              <tr key={libro.id} className="hover:bg-gray-100 transition">
                <td className="p-3 text-neutral-950">{libro.id}</td>
                <td className="p-3 text-neutral-950">{libro.titulo}</td>
                <td className="p-3 text-neutral-950">{libro.autor}</td>
                <td className="p-3 text-neutral-950">{libro.categoria}</td>
                <td className="p-3 text-neutral-950">{libro.fecha}</td>
                <td className="p-3  flex gap-2">
                  <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                    <FaEdit className="text-white"/>
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    <FaTrash className="text-white"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
