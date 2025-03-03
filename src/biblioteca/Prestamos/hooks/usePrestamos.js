import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";

const useLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id");

  const fetchLoans = useCallback(async (page = 1, pageSize = 10) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.get(`/loans/?page=${page}`);
      console.log("📌 Datos de préstamos recibidos:", response.data);
  
      if (response.data && response.data.results) {
        setLoans(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize) || 1);
      } else {
        setLoans([]);
        setError("No se encontraron préstamos.");
      }
    } catch (err) {
      console.error("Error al obtener préstamos:", err);
      setError("Error al obtener préstamos.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  

  const reloadLoans = useCallback(() => {
    fetchLoans(currentPage, 4, order);
  }, [fetchLoans, currentPage, order]);

  useEffect(() => {
    fetchLoans(currentPage, 4, order);
  }, [fetchLoans, currentPage, order]);

  return {
    loans,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    order,
    setOrder,
    reloadLoans,
  };
};

export default useLoans;
