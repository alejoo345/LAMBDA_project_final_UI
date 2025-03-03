import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useLoanForm({ isOpen, reloadLoans, setIsOpen }) {
  const initialFormState = {
    user: "",
    book: "",
    loan_date: "",
    return_date: "",
    returned: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]); // Lista de préstamos activos

  useEffect(() => {
    if (isOpen) {
      fetchAllData("/users/", setUsers);
      fetchAllData("/list_create/", setBooks);
      fetchAllData("/loans/active/", setActiveLoans); // Obtener préstamos activos
    }
  }, [isOpen]);

  // Función para obtener todos los datos paginados
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprobar si el libro ya está prestado
    const libroPrestado = activeLoans.some(
      (loan) => loan.book.id === formData.book && !loan.returned
    );

    if (libroPrestado) {
      Swal.fire({
        title: "Error",
        text: "Este libro ya está prestado y aún no ha sido devuelto.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await api.post("/loans/", formData);

      Swal.fire({
        title: "¡Préstamo registrado!",
        text: "El préstamo se ha registrado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadLoans();
      setFormData(initialFormState);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al registrar el préstamo:", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el préstamo. Revisa los datos.",
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
