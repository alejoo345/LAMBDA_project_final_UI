import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
export default function LoginForm() {
  const { login, error } = useAuth(); // Hook de autenticación
  const navigate = useNavigate(); // Hook para redireccionar

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const success = await login(email, password); // Intenta iniciar sesión

    if (success) {
      navigate("/dashboard"); // Redirige al dashboard si el login fue exitoso
    } else {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb", padding: "16px" }}>
      <Card sx={{ maxWidth: 400, width: "100%", padding: 3 }}>
        <CardHeader title="Iniciar sesión" subheader="Ingresa tus credenciales" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Correo electrónico" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth label="Contraseña" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>} {/* Muestra error si ocurre */}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
