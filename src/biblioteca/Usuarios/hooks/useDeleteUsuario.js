import { useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default function useDeleteUsuario(reloadUsuarios) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUsuario = async (usuarioId) => {
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
      await api.delete(`/users/delete/${usuarioId}/`);
      
      // ✅ Alerta de éxito con SweetAlert2
      Swal.fire({
        title: "¡Eliminado!",
        text: "El usuario ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      reloadUsuarios();
    } catch (err) {
      console.error("❌ Error al eliminar el usuario:", err);
      setError("Error al eliminar el usuario");

      // ⚠️ Alerta de error con SweetAlert2
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el usuario.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteUsuario, loading, error };
}
