import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useUpdateReservacionForm({ isOpen, reloadReservaciones, setIsOpen, reservacionEdit }) {
  const [formData, setFormData] = useState({
    user: "",
    book: "",
    reserved_at: "",
    status: "",
  });

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

  useEffect(() => {
    if (isOpen && reservacionEdit) {
      setFormData({
        user: reservacionEdit.user?.id || "",
        book: reservacionEdit.book?.id || "",
        reserved_at: reservacionEdit.reserved_at || "",
        status: reservacionEdit.status || "",
      });
    }
  }, [isOpen, reservacionEdit]);

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
    
    try {
      const payload = {
        user_id: formData.user,
        book_id: formData.book,
        status: formData.status,
      };

      await api.put(`/reservations/update/${reservacionEdit.id}/`, payload);

      Swal.fire({
        title: "¡Reserva actualizada!",
        text: "La reserva ha sido actualizada correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setIsOpen(false);
      if (typeof reloadReservaciones === "function") {
        reloadReservaciones();
      }
    } catch (error) {
      console.error("❌ Error al actualizar la reserva:", error);
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
    users,
    books,
  };
}
