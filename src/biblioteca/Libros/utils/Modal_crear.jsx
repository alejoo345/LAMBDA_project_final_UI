import { createPortal } from "react-dom";
import useLibroForm from "../hooks/useCreateForm";

export default function ModalForm({ isOpen, setIsOpen, reloadLibros }) {
  const {
    formData,
    authors,
    categories,
    loadingAuthors,
    loadingCategories,
    handleChange,
    handleSubmit,
    setFormData,
  } = useLibroForm({ isOpen, reloadLibros, setIsOpen });

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-xl font-bold mb-4 text-center text-black">Agregar Libro</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              placeholder="Ingresa un título"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-700 text-black"
              required
            />
          </div>

          {/* Autor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Autor</label>
            <select
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-700 text-black"
              required
            >
              <option value="">
                {loadingAuthors ? "Cargando autores..." : "Seleccione un autor"}
              </option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          {/* Categorías */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Categorías</label>
            <select
              name="categories"
              multiple
              value={formData.categories}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-700 text-black"
              required
            >
              {loadingCategories ? (
                <option value="">Cargando categorías...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Fecha de Publicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Publicación</label>
            <input
              type="date"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-700 text-black"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  author: "",
                  categories: [],
                  publication_date: "",
                });
                setIsOpen(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
