import useUpdateLoanForm from "../hooks/useUpdatePrestamos";
import Select from "react-select";

export default function LoanUpdateModal({ isOpen, setIsOpen, reloadLoans, loanEdit }) {
  const { formData, handleChange, handleUpdate, users, books } = useUpdateLoanForm({
    isOpen,
    reloadLoans,
    setIsOpen,
    loanEdit,
  });

  if (!isOpen || !loanEdit) return null;

  const selectedUser = users.find((u) => u.id === loanEdit.user.id) || null;
  const selectedBook = books.find((b) => b.id === loanEdit.book.id) || null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      user_id: formData.user || loanEdit.user.id,
      book_id: formData.book || loanEdit.book.id,
    };

    console.log("Enviando datos:", updatedData);
    handleUpdate(updatedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Actualizar Préstamo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Selección de Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <Select
              name="user"
              value={selectedUser ? { value: selectedUser.id, label: selectedUser.email } : null}
              isDisabled={true}
              className="w-full border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Selección de Libro */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Libro</label>
            <Select
              name="book"
              value={selectedBook ? { value: selectedBook.id, label: selectedBook.title } : null}
              isDisabled={true}
              className="w-full border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Fecha de Préstamo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Préstamo
            </label>
            <input
              type="date"
              name="loan_date"
              value={formData.loan_date || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Fecha de Devolución */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Devolución
            </label>
            <input
              type="date"
              name="return_date"
              value={formData.return_date || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Estado de Devolución */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Devuelto</label>
            <select
              name="returned"
              value={formData.returned?.toString() || "false"}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
