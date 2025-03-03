import React, { useState } from "react";
import useUsuarioForm from "../hooks/useUsuarioForm";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserShield, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

export default function UsuarioForm({ isOpen, reloadUsuarios, setIsOpen }) {
  const { formData, handleChange, handleSubmit } = useUsuarioForm({
    isOpen,
    reloadUsuarios,
    setIsOpen,
  });
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center border border-gray-300 rounded p-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nombre de Usuario"
                required
                className="w-full focus:outline-none"
              />
            </div>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Apellido"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            <div className="flex items-center border border-gray-300 rounded p-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                required
                className="w-full focus:outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full focus:outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded p-2 relative">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
                className="w-full focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_admin"
              checked={formData.is_admin}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="flex items-center text-gray-800">
              <FaUserShield className="mr-2" /> Es Administrador
            </label>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
