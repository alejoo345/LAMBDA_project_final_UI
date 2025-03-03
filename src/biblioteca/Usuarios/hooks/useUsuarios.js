import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [order, setOrder] = useState("id");

  const fetchUsuarios = useCallback(async (page = 1, pageSize = 4, ordering = "id") => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/users/?page=${page}&ordering=${ordering}`);
      const usuariosData = response.data.results || response.data;
      const pages = Math.ceil(response.data.count / pageSize) || 1;

      if (Array.isArray(usuariosData)) {
        // 📌 Obtener detalles de los libros favoritos de cada usuario en paralelo
        const usuariosConLibros = await Promise.all(
          usuariosData.map(async (usuario) => {
            if (usuario.favorite_books.length > 0) {
              try {
                const librosDetalles = await Promise.all(
                  usuario.favorite_books.map((bookId) =>
                    api.get(`/books/${bookId}/`).then((res) => res.data)
                  )
                );
                return { ...usuario, favorite_books: librosDetalles };
              } catch (error) {
                console.error(`⚠️ Error obteniendo libros de usuario ${usuario.id}:`, error);
                return { ...usuario, favorite_books: [] }; // Si falla, se asigna un array vacío
              }
            }
            return { ...usuario, favorite_books: [] }; // Si no tiene libros, se deja vacío
          })
        );

        setUsuarios(usuariosConLibros);
        setTotalPages(pages);
        setCurrentPage(page);
      } else {
        setError("Los datos recibidos no tienen el formato esperado.");
      }
    } catch (err) {
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.data.detail || "No se pudieron obtener los usuarios"}`
          : "Error de conexión con el servidor"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reloadUsuarios = useCallback(() => {
    fetchUsuarios(currentPage, 4, order);
  }, [fetchUsuarios, currentPage, order]);

  useEffect(() => {
    fetchUsuarios(currentPage, 4, order);
  }, [fetchUsuarios, currentPage, order]);

  return {
    usuarios,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    order,
    setOrder,
    reloadUsuarios,
  };
};

export default useUsuarios;
