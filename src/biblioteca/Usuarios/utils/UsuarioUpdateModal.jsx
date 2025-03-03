import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaUserShield, FaTimes } from "react-icons/fa";
import useUpdateUsuarioForm from "../hooks/useUpdateUsuarioForm";

export default function UsuarioUpdateModal({ isOpen, setIsOpen, reloadUsuarios, usuarioEdit }) {
  const { formData, handleChange, handleUpdate } = useUpdateUsuarioForm({
    isOpen,
    reloadUsuarios,
    setIsOpen,
    usuarioEdit,
  });
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editar Usuario</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex items-center border rounded p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de Usuario"
              className="w-full outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded w-full" required />
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Apellido" className="border p-2 rounded w-full" required />
          </div>
          <div className="flex items-center border rounded p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" className="w-full outline-none" required />
          </div>
          <div className="flex items-center border rounded p-2">
            <FaPhone className="text-gray-500 mr-2" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" className="w-full outline-none" />
          </div>
          <div className="flex items-center border rounded p-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Nueva Contraseña (Opcional)"
              className="w-full outline-none"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 ml-2">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-xs text-gray-600">Déjelo vacío si no desea cambiar la contraseña.</p>
          <div className="flex items-center">
            <input type="checkbox" name="is_admin" checked={formData.is_admin} onChange={handleChange} className="mr-2" />
            <FaUserShield className="text-gray-500 mr-2" />
            <span className="text-sm">Es Administrador</span>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}
