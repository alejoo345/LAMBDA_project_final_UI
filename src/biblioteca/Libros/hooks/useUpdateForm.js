import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../services/api";

export default function useUpdateForm({ isOpen, reloadLibros, setIsOpen, libroEdit }) {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    author: null,
    categories: [],
    publication_date: "",
    is_available: false, // Asegúrate de que este campo esté presente
  });

  const [authors, setAuthors] = useState([]); 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen && libroEdit) {
      setFormData({
        id: libroEdit.id || null,
        title: libroEdit.title || "",
        author: libroEdit.author ? { value: libroEdit.author.id, label: libroEdit.author.name } : null,
        categories: Array.isArray(libroEdit.categories) ? libroEdit.categories.map((c) => ({ value: c.id, label: c.name })) : [],
        publication_date: libroEdit.publication_date || "",
      });

      api.get("/authors/")
        .then((res) => {
          if (Array.isArray(res.data.results)) {
            setAuthors(res.data.results.map((a) => ({ value: a.id, label: a.name })));
          } else {
            console.error("❌ La API no devolvió un array en /authors/", res.data);
          }
        })
        .catch((err) => console.error("Error al obtener autores", err));

      api.get("/categories/")
        .then((res) => {
          if (Array.isArray(res.data.results)) {
            setCategories(res.data.results.map((c) => ({ value: c.id, label: c.name })));
          } else {
            console.error("❌ La API no devolvió un array en /categories/", res.data);
          }
        })
        .catch((err) => console.error("Error al obtener categorías", err));
    }
  }, [isOpen, libroEdit]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      if (field === "author") {
        return { ...prev, author: value ? value.value : null };
      }
      if (field === "categories") {
        return { ...prev, categories: value ? value.map((opt) => opt.value) : [] };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "¿Actualizar libro?",
      text: "Se modificarán los datos del libro.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    // Asegúrate de que las categorías no estén vacías
    if (!formData.categories || formData.categories.length === 0) {
      Swal.fire({
        title: "Error",
        text: "El libro debe tener al menos una categoría.",
        icon: "error",
      });
      return;
    }

    const updatedData = {
      ...formData,
      author: formData.author ? formData.author.value : null, // Enviar solo el ID del autor
      categories: formData.categories, // Ya son los IDs
    };

    console.log("Datos a enviar:", updatedData);

    try {
      await api.put(`/books/update/${libroEdit.id}/`, updatedData);
      reloadLibros();
      setIsOpen(false);

      Swal.fire({
        title: "¡Éxito!",
        text: "Libro actualizado correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error("❌ Error al actualizar libro:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el libro.",
        icon: "error",
      });
    }
  };

  return {
    formData,
    authors,
    categories,
    handleChange,
    handleUpdate,
    setFormData,
  };
}
