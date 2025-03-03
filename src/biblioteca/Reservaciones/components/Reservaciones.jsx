import { useState } from "react";
import useReservaciones from "../hooks/useReservaciones";
import GenericTable from "../../Core/components/GenericTable";
import { FaPlus, FaEdit } from "react-icons/fa";
import ReservacionesForm from "../utils/ReservacionesForm";
import ReservacionesUpdateModal from "../utils/ReservacionesUpdateForm";

export default function Reservaciones() {
  const { reservaciones, loading, error, currentPage, totalPages, setCurrentPage, order, setOrder, reloadReservaciones } = useReservaciones();

  // Estado para abrir/cerrar los modales
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);

  // Función para abrir el modal de edición con la reservación seleccionada
  const handleEditClick = (reserva) => {
    setSelectedReserva(reserva);
    setModalUpdateOpen(true);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Reservaciones</h1>

      <GenericTable
        data={reservaciones.map((reserva) => ({
          id: reserva.id,
          user: reserva.user ? `${reserva.user.email}` : "Usuario desconocido",
          book: reserva.book ? reserva.book.title : "Libro desconocido",
          reserved_at: reserva.reserved_at || "Fecha no disponible",
          status: reserva.status || "Estado desconocido",
          actions: (
            <button
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
              onClick={() => handleEditClick(reserva)}
            >
              <FaEdit /> Editar
            </button>
          ),
        }))}
        columns={[
          { key: "id", label: "ID" },
          { key: "user", label: "Usuario" },
          { key: "book", label: "Libro" },
          { key: "status", label: "Estado" },
          { key: "actions", label: "Acciones" },
        ]}
        loading={loading}
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
              <FaPlus className="text-white" /> Agregar Reservación
            </button>
          </div>
        }
      />

      {/* Modal para CREAR una reservación */}
      {modalCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg text-black font-bold mb-4">Crear Reservación</h2>
            <ReservacionesForm isOpen={modalCreateOpen} reloadReservaciones={reloadReservaciones} setIsOpen={setModalCreateOpen} />
            <button
              onClick={() => setModalCreateOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para EDITAR una reservación */}
      {modalUpdateOpen && selectedReserva && (
        <ReservacionesUpdateModal
          isOpen={modalUpdateOpen}
          setIsOpen={setModalUpdateOpen}
          reservacionEdit={selectedReserva}
          reloadReservaciones={reloadReservaciones}
        />
      )}
    </div>
  );
}
