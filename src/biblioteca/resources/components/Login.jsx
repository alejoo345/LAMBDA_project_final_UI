import { Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";

export default function LoginForm() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb", padding: "16px" }}>
      <Card sx={{ maxWidth: 400, width: "100%", padding: 3 }}>
        <CardHeader title="Iniciar sesión" subheader="Ingresa tus credenciales" />
        <CardContent>
          <TextField fullWidth label="Correo electrónico" margin="normal" />
          <TextField fullWidth label="Contraseña" type="password" margin="normal" />
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
