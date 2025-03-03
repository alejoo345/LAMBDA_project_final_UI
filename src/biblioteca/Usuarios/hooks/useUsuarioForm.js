import { useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useUsuarioForm({ isOpen, reloadUsuarios, setIsOpen }) {
  const initialFormState = {
    username: "",
    first_name: "",  // Nuevo campo
    last_name: "",   // Nuevo campo
    email: "",
    phone: "",       // Nuevo campo
    password: "",
    is_admin: false, 
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/", formData);

      Swal.fire({
        title: "¡Usuario creado!",
        text: "El usuario se ha registrado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadUsuarios();
      setFormData(initialFormState);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al crear el usuario:", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el usuario. Revisa los datos.",
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
