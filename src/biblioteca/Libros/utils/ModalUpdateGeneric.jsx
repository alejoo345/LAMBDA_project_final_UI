import { createPortal } from "react-dom";
import Select from "react-select";
import useUpdateForm from "../hooks/useUpdateForm";

export default function ModalGenericoUpdate({ isOpen, setIsOpen, reloadLibros, libroEdit }) {
  const {
    formData,
    authors,
    categories,
    loadingAuthors,
    loadingCategories,
    handleChange,
    handleUpdate,
    setFormData,
  } = useUpdateForm({ isOpen, reloadLibros, setIsOpen, libroEdit });

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-xl font-bold mb-4 text-center text-black">Actualizar Libro</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full p-2 border rounded border-gray-700 text-black"
              required
            />
          </div>

          {/* Autor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Autor</label>
            <Select
                options={authors} // Usa la lista de autores cargados
                value={authors.find((a) => a.value === formData.author?.value) || null} // Busca el autor en la lista
                onChange={(selectedOption) => setFormData((prev) => ({ ...prev, author: selectedOption }))} // Almacena el objeto seleccionado
                placeholder="Seleccione un autor..."
                isLoading={loadingAuthors}
                className="text-black"
                />
          </div>
        {/* Disponibilidad */}
          {/* Categorías */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Categorías</label>
            <Select
                options={categories} // Usa la lista de categorías cargadas
                isMulti
                value={categories.filter((c) => formData.categories.includes(c.value))} // Busca los seleccionados en la lista
                onChange={(selectedOptions) =>
                    setFormData((prev) => ({
                    ...prev,
                    categories: selectedOptions.map((opt) => opt.value),
                    }))
                }
                placeholder="Selecciona categorías..."
                className="text-black"
                isLoading={loadingCategories}
                />
          </div>

          {/* Fecha de Publicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Publicación</label>
            <input
              type="date"
              name="publication_date"
              value={formData.publication_date}
              onChange={(e) => handleChange("publication_date", e.target.value)}
              className="w-full p-2 border rounded border-gray-700 text-black"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
