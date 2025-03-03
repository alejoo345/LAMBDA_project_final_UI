import { createPortal } from "react-dom";
import Select from "react-select"; // Importamos React Select
import useLibroForm from "../../Libros/hooks/useCreateForm";

export default function ModalLibro({ isOpen, setIsOpen, reloadLibros, libroEdit }) {
  const {
    formData,
    authors,
    categories,
    loadingAuthors,
    loadingCategories,
    handleChange,
    handleSubmit,
    setFormData,
  } = useLibroForm({ isOpen, reloadLibros, setIsOpen, libroEdit });

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {libroEdit ? "Editar Libro" : "Agregar Libro"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              placeholder="Ingresa un título"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 border rounded-lg border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
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

          {/* Categorías - Usando React Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Categorías</label>
            <Select
              options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
              isMulti
              value={categories.filter((cat) => formData.categories.includes(cat.id)).map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onChange={(selectedOptions) =>
                setFormData((prev) => ({
                  ...prev,
                  categories: selectedOptions.map((opt) => opt.value),
                }))
              }
              placeholder="Selecciona categorías..."
              className="text-gray-900"
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
              onChange={handleChange}
              className="w-full p-2 border rounded-lg border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
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
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {"Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
