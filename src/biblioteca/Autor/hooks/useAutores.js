import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";

const useAutores = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id");

  const fetchAutores = useCallback(async (page = 1, pageSize = 4, ordering = "id") => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/authors/?page=${page}&ordering=${ordering}`);
      console.log("📌 Datos de autores recibidos:", response.data);

      const autoresData = response.data.results || response.data;
      const pages = Math.ceil(response.data.count / pageSize) || 1;

      if (Array.isArray(autoresData)) {
        setAutores(autoresData);
        setTotalPages(pages);
        setCurrentPage(page);
      } else {
        setError("Los datos recibidos no tienen el formato esperado.");
      }
    } catch (err) {
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.data.detail || "No se pudieron obtener los autores"}`
          : "Error de conexión con el servidor"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reloadAutores = useCallback(() => {
    fetchAutores(currentPage, 4, order);
  }, [fetchAutores, currentPage, order]);

  useEffect(() => {
    fetchAutores(currentPage, 4, order);
  }, [fetchAutores, currentPage, order]);

  return {
    autores,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    order,
    setOrder,
    reloadAutores,
  };
};

export default useAutores;
