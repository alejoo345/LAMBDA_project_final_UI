import { FaEdit, FaTrash } from "react-icons/fa";

export default function GenericTable({ title, data, columns, actions, loading, error, order, setOrder, currentPage, totalPages, setCurrentPage, extraControls }) {
    return (
      <div className="w-full bg-white p-4 shadow-md rounded-lg">
        {/* Contenedor de Filtros y Botón de Agregar */}
        <div className="flex justify-end items-center mb-4">
          {/* Filtros y Botón en línea */}
          <div className="flex items-center gap-4">
    

            {/* Botón de Agregar */}
            {extraControls && <div className="ml-2 justify-end">{extraControls}</div>}
          </div>
        </div>
  
        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-neutral-950 border-b">
                {columns.map(col => <th key={col.key} className="p-3 text-left">{col.label}</th>)}
                {actions && <th className="p-3 text-left">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={columns.length + 1} className="text-center p-4">Cargando...</td></tr>
              ) : error ? (
                <tr><td colSpan={columns.length + 1} className="text-center p-4 text-red-500">{error}</td></tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100 transition">
                    {columns.map(col => <td key={col.key} className="p-3 text-neutral-950">{item[col.key]}</td>)}
                    {actions && (
                      <td className="p-3 flex gap-2">
                        {actions.edit && (
                          <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition" onClick={() => actions.edit(item)}>✏️</button>
                        )}
                        {actions.delete && (
                          <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={() => actions.delete(item)}>🗑️</button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr><td colSpan={columns.length + 1} className="text-center p-4">No hay datos disponibles</td></tr>
              )}
            </tbody>
          </table>
        </div>
  
        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}>Anterior</button>
          <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}>Siguiente</button>
        </div>
      </div>
    );
}
