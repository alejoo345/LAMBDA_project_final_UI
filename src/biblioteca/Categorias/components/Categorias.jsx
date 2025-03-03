import { useState } from "react";
import useCategorias from "../hooks/useCategorias";
import useDeleteCategorias from "../hooks/useDeleteCategorias";
import GenericTable from "../../Core/components/GenericTable";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CategoriasForm from "../utils/CategoriasForm";
import CategoriasUpdateModal from "../utils/CategoriasUpdateForm";

export default function Categorias() {
  const { categorias, loading, error, currentPage, totalPages, setCurrentPage, order, setOrder, reloadCategorias } = useCategorias();
  const { deleteCategoria } = useDeleteCategorias(reloadCategorias);
  
  // Estados para crear y editar categorías
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [categoriaEdit, setCategoriaEdit] = useState(null);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Categorías</h1>

      <GenericTable
        data={categorias.map((categoria) => ({
          id: categoria.id,
          nombre: categoria.name,
          acciones: (
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                onClick={() => {
                  setCategoriaEdit(categoria);
                  setModalEditOpen(true);
                }}
              >
                <FaEdit /> Editar
              </button>
              <button
                className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                onClick={() => deleteCategoria(categoria.id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          ),
        }))}
        columns={[
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
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
              <FaPlus className="text-white" /> Agregar Categoría
            </button>
          </div>
        }
      />

      {/* Modal para CREAR una categoría */}
      {modalCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg text-black font-bold mb-4">Crear Categoría</h2>
            <CategoriasForm isOpen={modalCreateOpen} reloadCategorias={reloadCategorias} setIsOpen={setModalCreateOpen} />
            <button
              onClick={() => setModalCreateOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para EDITAR una categoría */}
      {modalEditOpen && (
        <CategoriasUpdateModal
          isOpen={modalEditOpen}
          setIsOpen={setModalEditOpen}
          reloadCategorias={reloadCategorias}
          categoriaEdit={categoriaEdit}
        />
      )}
    </div>
  );
}
