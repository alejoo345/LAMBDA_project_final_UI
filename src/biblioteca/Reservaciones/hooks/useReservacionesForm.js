import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useReservacionesForm({ isOpen, reloadReservaciones, setIsOpen }) {
    const initialFormState = {
        user_id: "", // ⬅ Cambiado de user a user_id
        book_id: "", // ⬅ Cambiado de book a book_id
        reserved_at: "",
        status: "pending", // ⬅ Asegura que coincida con los valores esperados por el backend
      };

  const [formData, setFormData] = useState(initialFormState);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchAllData("/users/", setUsers);
      fetchAllData("/list_create/", setBooks);
    }
  }, [isOpen]);

  const fetchAllData = async (endpoint, setData) => {
    try {
      let allResults = [];
      let nextUrl = endpoint;

      while (nextUrl) {
        const response = await api.get(nextUrl);
        allResults = [...allResults, ...response.data.results];
        nextUrl = response.data.next;
      }

      setData(allResults);
    } catch (error) {
      console.error(`❌ Error al obtener ${endpoint}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === "user_id" || name === "book_id" ? (value ? Number(value) : "") : value, // Convertir a número si hay valor
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que user_id y book_id no sean vacíos o nulos
    if (!formData.user_id || !formData.book_id) {
      Swal.fire({
        title: "Error",
        text: "Debes seleccionar un usuario y un libro.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    console.log("📤 Datos enviados:", formData);

    try {
      await api.post("/reservations/", formData);

      Swal.fire({
        title: "¡Reservación registrada!",
        text: "La reservación se ha registrado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadReservaciones();
      setFormData(initialFormState);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al registrar la reservación:", error);
      console.error("📥 Respuesta del servidor:", error.response?.data);
      
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar la reservación. Revisa los datos.",
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
    users,
    books,
  };
}
