import React, { useEffect, useState, useRef } from 'react';
import ScrollableComponent from '../ScrollableComponent';
import '../output.css';

const Example1 = () => {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalRows = 100;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Resetear posición del scroll
    scrollRef.current?.resetPosition();
  };

  const data = Array.from({ length: totalRows });

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
 const handleCtrlDragChange = (isCtrlDragging) => {
    if (isCtrlDragging) {
      console.log('¡El usuario está arrastrando con Ctrl!');
      // Aquí podrías ejecutar OTRA FUNCIÓN si onCtrlDragChange es true
    } else {
      console.log('El usuario ha dejado de arrastrar con Ctrl.');
    }
  };

  return (
    <div className="app-container relative min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Tabla con Scroll Horizontal y Paginación</h1>

      <div className="overflow-hidden table-container border rounded shadow">
        <ScrollableComponent
          ref={scrollRef}
          className="max-h-[300px]"
          horizontalScroll={true}
          verticalScroll={true}
          onCtrlDragChange={handleCtrlDragChange}
        >
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>País</th>
                <th>Ocupación</th>
                <th>Empresa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((_, index) => {
                const actualIndex = (currentPage - 1) * rowsPerPage + index;
                return (
                  <tr key={actualIndex}>
                    <td>{actualIndex + 1}</td>
                    <td>Usuario {actualIndex + 1}</td>
                    <td>usuario{actualIndex + 1}@ejemplo.com</td>
                    <td>+34 600 12 34 {actualIndex.toString().padStart(2, '0')}</td>
                    <td>Ciudad {actualIndex + 1}</td>
                    <td>País {actualIndex + 1}</td>
                    <td>Desarrollador</td>
                    <td>Empresa {actualIndex + 1}</td>
                    <td>
                      <button onClick={() => alert(`Editar usuario ${actualIndex + 1}`)}>Editar</button>
                      <button onClick={() => alert(`Eliminar usuario ${actualIndex + 1}`)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollableComponent>
      </div>

      {/* Paginador */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Example1;