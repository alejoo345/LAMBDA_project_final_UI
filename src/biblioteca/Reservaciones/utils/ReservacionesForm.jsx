import Select from "react-select";
import useReservacionesForm from "../hooks/useReservacionesForm";

export default function ReservacionesForm({ isOpen, reloadReservaciones, setIsOpen }) {
  const { formData, handleChange, handleSubmit, users, books, setFormData } =
    useReservacionesForm({ isOpen, reloadReservaciones, setIsOpen });

  if (!isOpen) return null;

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name || user.email,
  }));

  const bookOptions = books.map((book) => ({
    value: book.id,
    label: book.title,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Registrar Reserva
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Selección de Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <Select
              options={userOptions}
              value={userOptions.find((u) => u.value === formData.user_id)}
              onChange={(selectedOption) =>
                setFormData((prev) => ({ ...prev, user_id: selectedOption.value }))
              }
              placeholder="Seleccione un usuario"
              className="w-full border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Selección de Libro */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Libro</label>
            <Select
              options={bookOptions}
              value={bookOptions.find((b) => b.value === formData.book_id)}
              onChange={(selectedOption) =>
                setFormData((prev) => ({ ...prev, book_id: selectedOption.value }))
              }
              placeholder="Seleccione un libro"
              className="w-full border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
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
              Registrar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
