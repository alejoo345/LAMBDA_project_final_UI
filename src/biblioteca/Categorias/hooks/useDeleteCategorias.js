import { useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useDeleteCategoria(reloadCategorias) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCategoria = async (categoriaId) => {
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
      await api.delete(`/categories/delete/${categoriaId}/`);
      
      // ✅ Alerta de éxito con SweetAlert2
      Swal.fire({
        title: "¡Eliminado!",
        text: "La categoría ha sido eliminada correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadCategorias();
    } catch (err) {
      console.error("❌ Error al eliminar la categoría:", err);
      setError("Error al eliminar la categoría");

      // ⚠️ Alerta de error con SweetAlert2
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar la categoría.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteCategoria, loading, error };
}
