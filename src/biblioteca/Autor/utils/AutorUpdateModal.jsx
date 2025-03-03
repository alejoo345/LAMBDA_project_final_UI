import useUpdateAutorForm from "../hooks/useUpdateAutorForm";

export default function AutorUpdateModal({ isOpen, setIsOpen, reloadAutores, autorEdit }) {
  const { formData, handleChange, handleUpdate } = useUpdateAutorForm({
    isOpen,
    reloadAutores,
    setIsOpen,
    autorEdit,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Editar Autor
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Nombre del Autor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Autor
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre del autor"
              className="w-full p-2 border rounded-lg border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
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
