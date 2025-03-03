import { useState, useEffect } from "react";
import useLibros from "../hooks/useLibros";
import useDeleteLibro from "../hooks/useDeleteLibro";
import api from "../../../services/api";
import GenericTable from "../../Core/components/GenericTable";
import ModalLibro from "../utils/ModalGeneric";
import ModalGenericoUpdate from "../utils/ModalUpdateGeneric";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Libros() {
  const { libros, loading, error, currentPage, totalPages, setCurrentPage, order, setOrder, reloadLibros } = useLibros();
  const { deleteLibro, loading: deleting } = useDeleteLibro(reloadLibros);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [libroEdit, setLibroEdit] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const [authorsRes, categoriesRes] = await Promise.all([
          api.get("/authors/"),
          api.get("/categories/"),
        ]);
  
        // ✅ Extraemos `results` correctamente
        setAuthors(Array.isArray(authorsRes.data.results) ? authorsRes.data.results : []);
  
        // ✅ Lo mismo con categorías
        setCategories(Array.isArray(categoriesRes.data.results) ? categoriesRes.data.results : []);
      } catch (error) {
        console.error("Error cargando autores y categorías:", error);
      }
    };
  
    fetchAuthorsAndCategories();
  }, []);

  const getAuthorName = (authorId) => {
    if (!Array.isArray(authors)) {
      console.error("❌ Error: authors no es un array", authors);
      return "Desconocido";
    }
    const author = authors.find((a) => a.id === authorId);
    return author ? author.name : "Desconocido";
  };
  

  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) return "Sin categoría";
    return categoryIds
      .map((catId) => {
        const category = categories.find((c) => c.id === catId);
        return category ? category.name : "Desconocido";
      })
      .join(", ");
  };


  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Libros</h1>

      <GenericTable
        data={libros.map((libro) => ({
          id: libro.id,
          title: libro.title,
          author: getAuthorName(libro.author),
          categories: getCategoryNames(libro.categories),
          publication_date: libro.publication_date,
          acciones: (
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                onClick={() => {
                  setLibroEdit(libro);
                  setModalUpdateOpen(true);
                }}
              >
                <FaEdit /> Editar
              </button>
              <button
                className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                onClick={() => deleteLibro(libro.id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          ),
        }))}
        columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Título" },
          { key: "author", label: "Autor" },
          { key: "categories", label: "Categoría" },
          { key: "publication_date", label: "Fecha de Publicación" },
          { key: "acciones", label: "Acciones" },
        ]}
        loading={loading || deleting}
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
              onClick={() => {
                setLibroEdit(null);
                setModalCreateOpen(true);
              }}
            >
              <FaPlus className="text-white" /> Agregar Libro
            </button>
          </div>
        }
      />

      {/* Modal para CREAR un libro */}
      {modalCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg text-black font-bold mb-4">Crear Libro</h2>
            <ModalLibro isOpen={modalCreateOpen} setIsOpen={setModalCreateOpen} reloadLibros={reloadLibros} />
            <button
              onClick={() => setModalCreateOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para EDITAR un libro */}
      {modalUpdateOpen && (
        <ModalGenericoUpdate
          isOpen={modalUpdateOpen}
          setIsOpen={setModalUpdateOpen}
          reloadLibros={reloadLibros}
          libroEdit={libroEdit}
        />
      )}
    </div>
  );
}
