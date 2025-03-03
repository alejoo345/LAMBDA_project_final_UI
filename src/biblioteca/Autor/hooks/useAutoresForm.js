import { useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useAutorForm({ isOpen, reloadAutores, setIsOpen }) {
  const initialFormState = {
    name: "",
    birth_date: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/authors/", formData);

      Swal.fire({
        title: "¡Autor creado!",
        text: "El autor se ha registrado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadAutores();
      setFormData(initialFormState);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al crear el autor:", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el autor. Revisa los datos.",
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
