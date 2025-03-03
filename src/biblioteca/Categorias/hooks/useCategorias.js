import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";

const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id");

  const fetchCategorias = useCallback(async (page = 1, pageSize = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/categories/?page=${page}`);
      console.log("📌 Datos de categorías recibidos:", response.data);

      if (response.data && response.data.results) {
        setCategorias(response.data.results || []);
        setTotalPages(response.data.count ? Math.ceil(response.data.count / pageSize) : 1);
      } else {
        setCategorias([]);
        setError("No se encontraron categorías.");
      }
    } catch (err) {
      console.error("❌ Error al obtener categorías:", err);
      setError("Error al obtener categorías.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reloadCategorias = useCallback(() => {
    fetchCategorias(currentPage, 10);
  }, [fetchCategorias, currentPage]);

  useEffect(() => {
    fetchCategorias(currentPage, 10);
  }, [fetchCategorias, currentPage]);

  return {
    categorias,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    order,
    setOrder,
    reloadCategorias,
  };
};

export default useCategorias;
