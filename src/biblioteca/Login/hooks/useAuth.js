import { useState } from "react";
import api, { setAuthToken } from "../../../services/api";
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null); // Limpiar errores previos
    try {
      const response = await api.post("/auth/login/", { email, password });
      const { access, user } = response.data;

      localStorage.setItem("token", access);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthToken(access);
      setUser(user);

      return true; // Éxito, redirigir al dashboard
    } catch (err) {
      setError("Correo o contraseña incorrectos. Inténtalo de nuevo.");
      return false; // Falló el login, no redirigir
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  return { user, login, logout, error };
};

export default useAuth;
