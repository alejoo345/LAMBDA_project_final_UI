import { useState, useEffect } from "react";
import api from "../../../services/api";
export default function useLibroForm({ isOpen, reloadLibros, setIsOpen }) {
  const initialFormState = {
    title: "",
    author: "",
    categories: [],
    publication_date: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoadingAuthors(true);
      setLoadingCategories(true);

      api.get("/authors/")
        .then((res) => setAuthors(Array.isArray(res.data) ? res.data : []))
        .catch((err) => console.error("❌ Error cargando autores:", err))
        .finally(() => setLoadingAuthors(false));

      api.get("/categories/")
        .then((res) => setCategories(res.data.results || []))
        .catch((err) => console.error("❌ Error cargando categorías:", err))
        .finally(() => setLoadingCategories(false));
    }
  }, [isOpen]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "categories") {
      const selectedValues = Array.from(selectedOptions, (option) => parseInt(option.value));
      setFormData((prev) => ({ ...prev, categories: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/list_create/", {
        ...formData,
        categories: formData.categories.map((id) => parseInt(id)),
      });

      alert("✅ Libro agregado correctamente.");
      reloadLibros();
      setFormData(initialFormState);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al agregar el libro:", error);
      alert("⚠️ Error al agregar el libro. Revisa los datos.");
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
}
