import { createPortal } from "react-dom";
import useCategoriasForm from "../hooks/useCategoriasForm";

export default function CategoriasForm({ isOpen, reloadCategorias, setIsOpen }) {
  const { formData, handleChange, handleSubmit, setFormData } = useCategoriasForm({
    isOpen,
    reloadCategorias,
    setIsOpen,
  });

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Registrar Categoría</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre de la categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de la Categoría</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
              className="w-full p-2 border rounded-lg border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
