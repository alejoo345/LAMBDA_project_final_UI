import { useState } from "react";
import useUsuarios from "../hooks/useUsuarios";
import useDeleteUsuario from "../hooks/useDeleteUsuario";
import GenericTable from "../../Core/components/GenericTable";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import UsuarioForm from "../utils/UsuarioForm";
import UsuarioUpdateModal from "../utils/UsuarioUpdateModal";

export default function Usuarios() {
  const { usuarios, loading, error, currentPage, totalPages, setCurrentPage, order, setOrder, reloadUsuarios } = useUsuarios();
  const { deleteUsuario } = useDeleteUsuario(reloadUsuarios);
  
  // Estados para crear y editar usuarios
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Usuarios</h1>

      <GenericTable
        data={usuarios.map((usuario) => ({
          id: usuario.id,
          nombre: usuario.first_name,
          apellido: usuario.last_name,
          email: usuario.email,
          telefono: usuario.phone || "No disponible",
          favorite_books: Array.isArray(usuario.favorite_books) && usuario.favorite_books.length > 0
            ? usuario.favorite_books.map(libro => libro.title).join(", ") // Usamos 'title'
            : "Sin favoritos",
          acciones: (
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                onClick={() => {
                  setUsuarioEdit(usuario);
                  setModalEditOpen(true);
                }}
              >
                <FaEdit /> Editar
              </button>
              <button
                className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                onClick={() => deleteUsuario(usuario.id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          ),
        }))}  
        columns={[
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "apellido", label: "Apellido" },
          { key: "email", label: "Correo Electrónico" },
          { key: "telefono", label: "Teléfono" },
          { key: "favorite_books", label: "Libros Favoritos" },
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
              <FaPlus className="text-white" /> Agregar Usuario
            </button>
          </div>
        }
      />

      {/* Modal para CREAR un usuario */}
      {modalCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center  ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg text-black font-bold mb-4">Crear Usuario</h2>
            <UsuarioForm isOpen={modalCreateOpen} reloadUsuarios={reloadUsuarios} setIsOpen={setModalCreateOpen} />
            <button
              onClick={() => setModalCreateOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para EDITAR un usuario */}
      {modalEditOpen && (
        <UsuarioUpdateModal
          isOpen={modalEditOpen}
          setIsOpen={setModalEditOpen}
          reloadUsuarios={reloadUsuarios}
          usuarioEdit={usuarioEdit}
        />
      )}
    </div>
  );
}
