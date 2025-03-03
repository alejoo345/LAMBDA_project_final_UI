import { useState, useEffect } from "react";
import api, { setAuthToken } from "../../../services/api";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Al cargar el hook, intenta restaurar la sesión desde localStorage
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // 🔹 Asegurar que el ID del usuario se guarda en localStorage
      if (parsedUser?.id) {
        localStorage.setItem("user_id", parsedUser.id);
        console.log("✅ ID del usuario restaurado y guardado en localStorage:", parsedUser.id);
      } else {
        console.warn("⚠️ El usuario restaurado no tiene ID.");
      }

      console.log("🔹 Usuario restaurado desde localStorage:", parsedUser);
    }
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await api.post("/auth/login/", { email, password });
      const { access, user } = response.data;

      if (user?.id) {
        localStorage.setItem("user_id", user.id);  // ✅ Guarda el ID del usuario
        console.log("✅ ID del usuario guardado en localStorage:", user.id);
      } else {
        console.error("❌ No se encontró el ID del usuario en la respuesta.");
      }

      localStorage.setItem("token", access);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthToken(access);
      setUser(user); // Asegura que el estado se actualiza

      return true;
    } catch (err) {
      setError("Correo o contraseña incorrectos. Inténtalo de nuevo.");
      console.error("⚠️ Error en login:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setAuthToken(null);
    setUser(null);
    console.log("🔹 Sesión cerrada, usuario eliminado de localStorage.");
  };

  return { user, login, logout, error };
};

export default useAuth;
