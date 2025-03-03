import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useUpdateUsuarioForm({ isOpen, reloadUsuarios, setIsOpen, usuarioEdit }) {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_admin: false,
    libros_favoritos: [],
    password: "", // 🔹 Nuevo campo para la contraseña (vacío por defecto)
  });

  useEffect(() => {
    if (isOpen && usuarioEdit) {
      setFormData({
        username: usuarioEdit.username || "",
        first_name: usuarioEdit.first_name || "",
        last_name: usuarioEdit.last_name || "",
        email: usuarioEdit.email || "",
        phone: usuarioEdit.phone || "",
        is_admin: usuarioEdit.is_admin ?? false,
        libros_favoritos: Array.isArray(usuarioEdit.libros_favoritos) 
          ? usuarioEdit.libros_favoritos.map((libro) => libro.id) 
          : [],
        password: "", // 🔹 No mostramos la contraseña por seguridad
      });
    }
  }, [isOpen, usuarioEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        is_admin: formData.is_admin,
        libros_favoritos: formData.libros_favoritos,
      };
  
      // 🔹 Solo agregar la contraseña si el usuario la cambia
      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }
  
      console.log("📤 Payload final enviado:", payload);
      await api.put(`/users/update/${usuarioEdit.id}/`, payload);
  
      Swal.fire({
        title: "¡Usuario actualizado!",
        text: "El usuario ha sido actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
  
      setIsOpen(false);
      if (typeof reloadUsuarios === "function") {
        reloadUsuarios();
      }
    } catch (error) {
      console.error("❌ Error al actualizar el usuario:", error);
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
