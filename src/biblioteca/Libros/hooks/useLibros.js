import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api"; 

const useLibros = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id"); // Estado para ordenar

  const fetchLibros = useCallback(async (page = 1, pageSize = 4, ordering = "id") => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/list_create/?page=${page}&ordering=${ordering}`);
      const librosData = Array.isArray(response.data.results) ? response.data.results : [];
      setLibros(librosData);
      setTotalPages(response.data.count ? Math.ceil(response.data.count / pageSize) : 1);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response
        ? `Error ${err.response.status}: ${err.response.data.detail || "No se pudieron obtener los libros"}`
        : "Error de conexión con el servidor"
      );
    } finally {
      setLoading(false);
    }
  }, []);
  
  const reloadLibros = useCallback(() => {
    fetchLibros(currentPage, 4, order);
  }, [fetchLibros, currentPage, order]);
  
  useEffect(() => {
    fetchLibros(currentPage, 4, order);
  }, [fetchLibros, currentPage, order]);
  

  return {
    libros,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    order,
    setOrder,
    reloadLibros, // ✅ Asegurarse de exportar la función correctamente
  };
};

export default useLibros;