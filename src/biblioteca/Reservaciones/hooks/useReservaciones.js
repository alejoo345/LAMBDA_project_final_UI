import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";

const useReservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id");

  const fetchReservaciones = useCallback(async (page = 1, pageSize = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/reservations/?page=${page}`);
      console.log("📌 Datos de reservaciones recibidos:", response.data);

      if (response.data && response.data.results) {
        setReservaciones(response.data.results || []);
        setTotalPages(response.data.count ? Math.ceil(response.data.count / pageSize) : 1);
      } else {
        setReservaciones([]);
        setError("No se encontraron reservaciones.");
      }
    } catch (err) {
      console.error("❌ Error al obtener reservaciones:", err);
      setError("Error al obtener reservaciones.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reloadReservaciones = useCallback(() => {
    fetchReservaciones(currentPage, 10);
  }, [fetchReservaciones, currentPage]);

  useEffect(() => {
    fetchReservaciones(currentPage, 10);
  }, [fetchReservaciones, currentPage]);

  return {
    reservaciones,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    order,
    setOrder,
    reloadReservaciones,
  };
};

export default useReservaciones;
