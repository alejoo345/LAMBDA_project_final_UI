import { useState } from "react";
import useLoans from "../hooks/usePrestamos";
import GenericTable from "../../Core/components/GenericTable";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import LoanForm from "../utils/PrestamosForm";
import LoanUpdateModal from "../utils/PrestamosUpdateForm";

export default function Loans() {
  const { loans, loading, error, currentPage, totalPages, setCurrentPage, order, setOrder, reloadLoans } = useLoans();

  // Estados para crear y editar préstamos
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [loanEdit, setLoanEdit] = useState(null);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Préstamos</h1>

      <GenericTable
        data={loans.map((loan) => ({
          id: loan.id,
          user: loan.user ? loan.user.email || "Usuario desconocido" : "Usuario no disponible",
          book: loan.book ? loan.book.title : "Libro no disponible",
          loan_date: loan.loan_date,
          return_date: loan.return_date || "No registrada",
          returned: loan.returned ? "Sí" : "No",
          acciones: (
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                onClick={() => {
                  setLoanEdit(loan);
                  setModalEditOpen(true);
                }}
              >
                <FaEdit /> Editar
              </button>
            </div>
          ),
        }))}
        columns={[
          { key: "id", label: "ID" },
          { key: "user", label: "Usuario" },
          { key: "book", label: "Libro" },
          { key: "loan_date", label: "Fecha de Préstamo" },
          { key: "return_date", label: "Fecha de Devolución" },
          { key: "returned", label: "Devuelto" },
          { key: "acciones", label: "Acciones" },
        ]}
        error={error}
        order={order}
        setOrder={setOrder}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        extraControls={
          <div className="w-full flex justify-end">
            <button
              className="flex items-center font-black gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => setModalCreateOpen(true)}
            >
              <FaPlus className="text-white" /> Agregar Préstamo
            </button>
          </div>
        }
      />

      {/* Modal para CREAR un préstamo */}
      {modalCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg text-black font-bold mb-4">Crear Préstamo</h2>
            <LoanForm isOpen={modalCreateOpen} reloadLoans={reloadLoans} setIsOpen={setModalCreateOpen} />
            <button
              onClick={() => setModalCreateOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para EDITAR un préstamo */}
      {modalEditOpen && (
        <LoanUpdateModal
          isOpen={modalEditOpen}
          setIsOpen={setModalEditOpen}
          reloadLoans={reloadLoans}
          loanEdit={loanEdit}
        />
      )}
    </div>
  );
}
