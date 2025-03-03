import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useCategoriasUpdate({ isOpen, reloadCategorias, setIsOpen, categoriaEdit }) {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (isOpen && categoriaEdit) {
      setFormData({
        name: categoriaEdit.name || "",
      });
    }
  }, [isOpen, categoriaEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
  
    if (!categoriaEdit?.id) {
      Swal.fire({
        title: "Error",
        text: "No se encontró el ID de la categoría.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  
    try {
      await api.put(`/categories/update/${categoriaEdit.id}/`, formData); 
  
      Swal.fire({
        title: "¡Categoría actualizada!",
        text: "La categoría ha sido actualizada correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
  
      setIsOpen(false);
      if (typeof reloadCategorias === "function") {
        reloadCategorias();
      }
    } catch (error) {
      console.error("❌ Error al actualizar la categoría:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.detail || "Hubo un problema al actualizar la categoría.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  return {
    formData,
    handleChange,
    handleUpdate,
    setFormData,
  };
}
