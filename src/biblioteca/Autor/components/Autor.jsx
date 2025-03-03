import { useState } from "react";
import useAutores from "../hooks/useAutores";
import useDeleteAutor from "../hooks/useDeleteAutor";
import GenericTable from "../../Core/components/GenericTable";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AutorForm from "../utils/AutorForm";
import AutorUpdateModal from "../utils/AutorUpdateModal";

export default function Autores() {
  const { autores, loading, error, currentPage, totalPages, setCurrentPage, order, setOrder, reloadAutores } = useAutores();
  const { deleteAutor } = useDeleteAutor(reloadAutores);
  
  // Estados para crear y editar autores
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [autorEdit, setAutorEdit] = useState(null);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Autores</h1>

      <GenericTable
        data={autores.map((autor) => ({
          id: autor.id,
          nombre: autor.name,
          fecha_nacimiento: autor.birth_date || "No disponible",
          acciones: (
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                onClick={() => {
                  setAutorEdit(autor);
                  setModalEditOpen(true);
                }}
              >
                <FaEdit /> Editar
              </button>
              <button
                className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                onClick={() => deleteAutor(autor.id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          ),
        }))}
        columns={[
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "fecha_nacimiento", label: "Fecha de Nacimiento" },
          { key: "acciones", label: "Acciones" },
        ]}
        error={error}
        order={order}
        setOrder={setOrder}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        extraControls={
          <div className="w-full flex justify-end">
            <button
              className="flex items-center font-black gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => setModalCreateOpen(true)}
            >
              <FaPlus className="text-white" /> Agregar Autor
            </button>
          </div>
        }
      />

      {/* Modal para CREAR un autor */}
      {modalCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg text-black font-bold mb-4">Crear Autor</h2>
            <AutorForm isOpen={modalCreateOpen} reloadAutores={reloadAutores} setIsOpen={setModalCreateOpen} />
            <button
              onClick={() => setModalCreateOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para EDITAR un autor */}
      {modalEditOpen && (
        <AutorUpdateModal
          isOpen={modalEditOpen}
          setIsOpen={setModalEditOpen}
          reloadAutores={reloadAutores}
          autorEdit={autorEdit}
        />
      )}
    </div>
  );
}
