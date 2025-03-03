import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../services/api";

const useLibroForm = ({ isOpen, reloadLibros, setIsOpen, libroEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    categories: [],
    publication_date: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [authorsRes, categoriesRes] = await Promise.all([
          api.get("/authors/"),
          api.get("/categories/"),
        ]);

        setAuthors(Array.isArray(authorsRes.data.results) ? authorsRes.data.results : []);
        setCategories(Array.isArray(categoriesRes.data.results) ? categoriesRes.data.results : []);
      } catch (error) {
        console.error("Error cargando autores y categorías:", error);
      } finally {
        setLoadingAuthors(false);
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, [isOpen]);

  useEffect(() => {
    if (libroEdit) {
      setFormData({
        title: libroEdit.title || "",
        author: libroEdit.author || "",
        categories: libroEdit.categories || [],
        publication_date: libroEdit.publication_date || "",
      });
    } else {
      setFormData({
        title: "",
        author: "",
        categories: [],
        publication_date: "",
      });
    }
  }, [libroEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (libroEdit) {
        // 🔹 Confirmación antes de actualizar
        const result = await Swal.fire({
          title: "¿Actualizar libro?",
          text: "Se modificarán los datos del libro.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        await api.put(`/list_create/${libroEdit.id}/`, formData);
      } else {
        await api.post("/list_create/", formData);
      }

      reloadLibros();
      setIsOpen(false);

      // ✅ Éxito
      Swal.fire({
        title: "¡Éxito!",
        text: libroEdit ? "Libro actualizado correctamente" : "Libro agregado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error("Error guardando el libro:", error);

      // ❌ Error
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar el libro.",
        icon: "error",
      });
    }
  };

  return {
    formData,
    authors,
    categories,
    loadingAuthors,
    loadingCategories,
    handleChange,
    handleSubmit,
    setFormData,
  };
};

export default useLibroForm;
