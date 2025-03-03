import { useState, useEffect } from "react";
import api from "../../../services/api";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      setLoading(true);
      
      const userId = localStorage.getItem("user_id"); 

      console.log("🔍 ID obtenido del localStorage:", userId); // <-- Verifica que el ID se obtiene correctamente

      if (!userId) {
        setError("❌ No se encontró el ID del usuario.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/users/${userId}/`); 
        console.log("✅ Datos del usuario:", response.data); // <-- Verifica si la API devuelve datos

        setUser(response.data);
      } catch (err) {
        console.error("⚠️ Error al obtener el usuario:", err.response?.data || err.message);
        setError("No se pudo obtener la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return { user, loading, error };
};

export default useAuthUser;
