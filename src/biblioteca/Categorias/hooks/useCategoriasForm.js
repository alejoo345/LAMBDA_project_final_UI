import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useCategoriasForm({ isOpen, reloadCategorias, setIsOpen }) {
  const initialFormState = {
    name: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire({
        title: "Error",
        text: "El nombre de la categoría no puede estar vacío.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await api.post("/categories/", formData);

      Swal.fire({
        title: "¡Categoría registrada!",
        text: "La categoría se ha creado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadCategorias();
      setFormData(initialFormState);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al registrar la categoría:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar la categoría. Revisa los datos.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    setFormData,
  };
}
