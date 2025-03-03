import useUpdateReservacionesForm from "../hooks/useReservacionesUpdate";
import Select from "react-select";

export default function ReservacionesUpdateModal({ isOpen, setIsOpen, reloadReservaciones, reservacionEdit }) {
  const { formData, handleChange, handleUpdate, users, books } = useUpdateReservacionesForm({
    isOpen,
    reloadReservaciones,
    setIsOpen,
    reservacionEdit,
  });

  if (!isOpen || !reservacionEdit) return null; // Evita errores al abrir el modal sin datos

  const selectedUser = reservacionEdit?.user?.id
    ? users.find((u) => u.id === reservacionEdit.user.id)
    : null;

  const selectedBook = reservacionEdit?.book?.id
    ? books.find((b) => b.id === reservacionEdit.book.id)
    : null;

  const STATUS_CHOICES = [
    { value: "pending", label: "Pendiente" },
    { value: "confirmed", label: "Confirmada" },
    { value: "canceled", label: "Cancelada" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      user_id: formData.user || reservacionEdit.user?.id,
      book_id: formData.book || reservacionEdit.book?.id,
    };

    handleUpdate(updatedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Editar Reservación
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <Select
              name="user"
              value={
                selectedUser
                  ? { value: selectedUser.id, label: selectedUser.email }
                  : null
              }
              isDisabled={true}
              className="w-full border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Libro */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Libro</label>
            <Select
              name="book"
              value={
                selectedBook
                  ? { value: selectedBook.id, label: selectedBook.title }
                  : null
              }
              isDisabled={true}
              className="w-full border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          {/* Estado de Reservación */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado de la Reservación</label>
            <Select
              name="status"
              value={STATUS_CHOICES.find((option) => option.value === formData.status) || null}
              onChange={(selectedOption) => handleChange({ target: { name: "status", value: selectedOption.value } })}
              options={STATUS_CHOICES}
              className="w-full border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
