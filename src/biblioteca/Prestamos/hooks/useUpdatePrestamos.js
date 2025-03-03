import { useState, useEffect } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useUpdateLoanForm({ isOpen, reloadLoans, setIsOpen, loanEdit }) {
  const [formData, setFormData] = useState({
    user: "",
    book: "",
    loan_date: "",
    return_date: "",
    returned: false,
  });

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchAllData("/users/", setUsers);
      fetchAllData("/list_create/", setBooks);
    }
  }, [isOpen]);

  // ✅ Función para obtener datos paginados
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
      console.log(`✅ Datos cargados de ${endpoint}:`, allResults); // 🔍 Debug
    } catch (error) {
      console.error(`❌ Error al obtener ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    if (isOpen && loanEdit) {
      setFormData({
        user: loanEdit.user?.id || "",
        book: loanEdit.book?.id || "",
        loan_date: loanEdit.loan_date || "",
        return_date: loanEdit.return_date || "",
        returned: loanEdit.returned || false,
      });
    }
  }, [isOpen, loanEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault(); 
    }
  
    try {
      // Asegurarnos de que 'returned' sea un valor booleano
      const payload = {
        user_id: formData.user?.id || loanEdit.user?.id, // Asegurar que sea un ID
        book_id: formData.book?.id || loanEdit.book?.id, // Asegurar que sea un ID
        loan_date: formData.loan_date,
        return_date: formData.return_date,
        // Convertir el valor de 'returned' a un booleano, incluso si llega como string
        returned: formData.returned === true || formData.returned === "true", 
      };
  
      console.log("Enviando datos:", payload);  // Verifica los datos enviados
  
      await api.put(`/loans/update/${loanEdit.id}/`, payload);
  
      Swal.fire({
        title: "¡Préstamo actualizado!",
        text: "El préstamo ha sido actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
  
      setIsOpen(false);
      if (typeof reloadLoans === "function") {
        reloadLoans();
      }
    } catch (error) {
      console.error("❌ Error al actualizar el préstamo:", error);
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
