import { useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useDeleteLibro(reloadLibros) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteLibro = async (libroId) => {
    // ⚠️ Confirmación con SweetAlert2 antes de eliminar
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.delete(`/books/delete/${libroId}/`);
      
      // ✅ Alerta de éxito con SweetAlert2
      Swal.fire({
        title: "¡Eliminado!",
        text: "El libro ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadLibros();
    } catch (err) {
      console.error("❌ Error al eliminar el libro:", err);
      setError("Error al eliminar el libro");

      // ⚠️ Alerta de error con SweetAlert2
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el libro.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteLibro, loading, error };
}
