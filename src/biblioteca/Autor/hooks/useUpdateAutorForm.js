import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useUpdateAutorForm({ isOpen, reloadAutores, setIsOpen, autorEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
  });

  useEffect(() => {
    if (isOpen && autorEdit) {
      setFormData({
        name: autorEdit.name || "",
        birth_date: autorEdit.birth_date || "",
      });
    }
  }, [isOpen, autorEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        birth_date: formData.birth_date,
      };

      console.log("📤 Payload final enviado:", payload);
      await api.put(`/authors/update/${autorEdit.id}/`, payload);

      Swal.fire({
        title: "¡Autor actualizado!",
        text: "El autor ha sido actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setIsOpen(false);
      if (typeof reloadAutores === "function") {
        reloadAutores();
      }
    } catch (error) {
      console.error("❌ Error al actualizar el autor:", error);
      Swal.fire({
        title: "Error",
        text: error.response ? JSON.stringify(error.response.data) : error.message,
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
