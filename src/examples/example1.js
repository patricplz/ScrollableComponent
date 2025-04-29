import React, { useEffect, useState, useRef } from 'react';
import ScrollableComponent from '../ScrollableComponent';
import '../output.css';

const Example1 = () => {

  return (
    
    <div className="app-container relative min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tabla con Scroll Horizontal</h1>

      <div className="overflow-hidden table-container">
        <ScrollableComponent className="" horizontalScroll={true} verticalScroll={true}>
          <table className="">
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
              {Array.from({ length: 100 }).map((_, index) => (
                <tr
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>Usuario {index + 1}</td>
                  <td>usuario{index + 1}@ejemplo.com</td>
                  <td>+34 600 12 34 {index.toString().padStart(2, '0')}</td>
                  <td>Ciudad {index + 1}</td>
                  <td>País {index + 1}</td>
                  <td>Desarrollador</td>
                  <td>Empresa {index + 1}</td>
                  <td>
                    <button onClick={() => alert(`Editar usuario ${index + 1}`)}>Editar</button>
                    <button onClick={() => alert(`Eliminar usuario ${index + 1}`)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollableComponent>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-2">Versión con scroll vertical y horizontal</h2>
      <div className="overflow-hidden table-container">
        <ScrollableComponent className="" verticalScroll={true}>
        <table className="">
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
              {Array.from({ length: 100 }).map((_, index) => (
                <tr
                  key={index}
                >
                  <td>{index + 1}</td>
                  <td>Usuario {index + 1}</td>
                  <td>usuario{index + 1}@ejemplo.com</td>
                  <td>+34 600 12 34 {index.toString().padStart(2, '0')}</td>
                  <td>Ciudad {index + 1}</td>
                  <td>País {index + 1}</td>
                  <td>Desarrollador</td>
                  <td>Empresa {index + 1}</td>
                  <td>
                    <button onClick={() => alert(`Editar usuario ${index + 1}`)}>Editar</button>
                    <button onClick={() => alert(`Eliminar usuario ${index + 1}`)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollableComponent>
      </div>
    </div>
  );
};

export default Example1;
