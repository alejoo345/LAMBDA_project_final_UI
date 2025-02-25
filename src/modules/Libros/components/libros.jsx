import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "../utils/libros.css";


export default function libros(){
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Libros</h1>

      {/* Botón para agregar un nuevo libro */}
      <div className="container_add">
        <button className="add">
          <FaPlus /> Agregar Libro
        </button>
      </div>


      {/* Tabla de libros */}
      <div className="overflow-x-auto">
        <table className="w-full border border-bg-amber-500">
          <thead>
            <tr className="bg-amber-50">
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">Título</th>
              <th className="border p-3 text-left">Autor</th>
              <th className="border p-3 text-left">Categoría</th>
              <th className="border p-3 text-left">Fecha de Publicacion</th>
              <th className="border p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Datos de quemados */}
            <tr className="hover:bg-amber-50">
              <td className="border p-3">1</td>
              <td className="border p-3">Cien años de soledad</td>
              <td className="border p-3">Gabriel García Márquez</td>
              <td className="border p-3">Novela</td>
              <td className="border p-3">27-02-2025</td>
              <td className="border p-3 flex gap-2">
                <button className="edit">
                  <FaEdit />
                </button>
                <button className="delete">
                  <FaTrash />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-amber-50">
              <td className="border p-3">2</td>
              <td className="border p-3">El Principito</td>
              <td className="border p-3">Antoine de Saint-Exupéry</td>
              <td className="border p-3">Fantasía</td>
              <td className="border p-3">27-02-2025</td>
              <td className="border p-3 flex gap-2">
                <button className="edit">
                  <FaEdit />
                </button>
                <button className="delete">
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};