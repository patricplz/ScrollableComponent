import React, { useRef } from 'react';
import ScrollableComponent from '../ScrollableComponent';

const EnhancedTable = () => {
  const scrollRef = useRef(null);
  
  // Datos de ejemplo para la tabla
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Elemento ${i + 1}`,
    description: `Descripción extensa del elemento ${i + 1} con suficiente texto para demostrar el scroll.`,
    category: [`Categoría A`, `Categoría B`, `Categoría C`][i % 3],
    date: `2025-${Math.floor(i / 10) + 1}-${(i % 10) + 10}`,
    status: [`Activo`, `Inactivo`, `Pendiente`, `Completado`][i % 4],
    priority: [`Alta`, `Media`, `Baja`][i % 3],
    assignee: `Usuario ${(i % 5) + 1}`,
    progress: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
  }));
  
  // Función para desplazarse horizontalmente
  const handleScroll = (direction) => {
    if (scrollRef.current && scrollRef.current.containerRef.current) {
      const container = scrollRef.current.containerRef.current;
      const scrollAmount = 300; // Ajusta este valor según necesites
      
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="enhanced-table-container">
      <div className="table-controls">
        <h2>Tabla de datos</h2>
        <div className="scroll-controls">
          <button 
            className="scroll-button" 
            onClick={() => handleScroll('left')}
            aria-label="Desplazar a la izquierda"
          >
            &larr;
          </button>
          <span>Desplazar</span>
          <button 
            className="scroll-button" 
            onClick={() => handleScroll('right')}
            aria-label="Desplazar a la derecha"
          >
            &rarr;
          </button>
        </div>
      </div>
      
      <div className="scrollable-table-container">
        {/* 
          Aquí pasamos una referencia al componente para poder acceder 
          a sus métodos desde el componente padre
        */}
        <ScrollableComponent 
          ref={scrollRef}
          className="enhanced-table-scroll" 
          verticalScroll={true}
        >
          <table className="enhanced-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Asignado a</th>
                <th>Progreso</th>
                <th>Comentarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td className="description-cell">{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status-badge status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td>{item.assignee}</td>
                  <td>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${item.progress}%`, backgroundColor: 
                          item.progress < 30 ? '#ff6b6b' : 
                          item.progress < 70 ? '#ffd166' : '#06d6a0' 
                        }}
                      />
                      <span className="progress-text">{item.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="comments-indicator">
                      <span className="comments-icon">💬</span>
                      <span className="comments-count">{item.comments}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-button edit">Editar</button>
                      <button className="action-button delete">Eliminar</button>
                      <div className="dropdown">
                        <button className="dropdown-toggle">Más</button>
                        <div className="dropdown-menu">
                          <button className="dropdown-item">Ver detalles</button>
                          <button className="dropdown-item">Duplicar</button>
                          <button className="dropdown-item">Exportar</button>
                        </div>
                      </div>
                    </div>
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

// Para poder usar la referencia, necesitamos modificar el componente ScrollableComponent
// para usar React.forwardRef:

/*
import React, { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';

const ScrollableComponent = forwardRef(({ children, className = '', verticalScroll = false }, ref) => {
  const containerRef = useRef(null);
  // ... resto del código igual que antes
  
  // Exponemos el ref interno para acceder desde componentes padres
  useImperativeHandle(ref, () => ({
    containerRef,
    scrollTo: (x, y) => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = x;
        if (verticalScroll) {
          containerRef.current.scrollTop = y;
        }
      }
    }
  }));
  
  // ... resto del código igual que antes
  
  return (
    <div
      ref={containerRef}
      className={className}
      style={scrollStyle}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
});

export default ScrollableComponent;
*/

export default EnhancedTable;