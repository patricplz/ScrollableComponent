import React, { useState } from 'react';
import ScrollableComponent from '../ScrollableComponent';

// Componente de celda editable
const EditableCell = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onSave(value);
    }
  };
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onSave(value);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(initialValue);
    }
  };
  
  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <div className="editable-cell" onDoubleClick={handleDoubleClick}>
      {value}
      <small className="edit-hint">Doble clic para editar</small>
    </div>
  );
};

// Componente de celda con selector
const SelectCell = ({ options, initialValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value);
  };
  
  return (
    <div className="select-cell">
      <div className="select-display" onClick={handleToggle}>
        {selectedValue} <span className="arrow-down">▼</span>
      </div>
      
      {isOpen && (
        <div className="select-dropdown">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`select-option ${option === selectedValue ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente de fila expandible
const ExpandableRow = ({ row, columns, expandedContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <>
      <tr className={isExpanded ? 'expanded-row' : ''}>
        <td className="expand-cell">
          <button className="expand-button" onClick={toggleExpand}>
            {isExpanded ? '▼' : '►'}
          </button>
        </td>
        {columns.map((column, columnIndex) => (
          <td key={columnIndex}>{row[column.key]}</td>
        ))}
      </tr>
      {isExpanded && (
        <tr className="details-row">
          <td colSpan={columns.length + 1}>
            <div className="expanded-content">
              {expandedContent(row)}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// Componente principal de tabla compleja
const ComplexTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Proyecto A', status: 'En progreso', priority: 'Alta', deadline: '2025-05-15', progress: 65 },
    { id: 2, name: 'Proyecto B', status: 'Completado', priority: 'Media', deadline: '2025-04-30', progress: 100 },
    { id: 3, name: 'Proyecto C', status: 'No iniciado', priority: 'Baja', deadline: '2025-06-10', progress: 0 },
    { id: 4, name: 'Proyecto D', status: 'En progreso', priority: 'Alta', deadline: '2025-05-20', progress: 45 },
    { id: 5, name: 'Proyecto E', status: 'En pausa', priority: 'Media', deadline: '2025-05-25', progress: 30 },
  ]);
  
  const columns = [
    { key: 'name', title: 'Nombre del proyecto' },
    { key: 'status', title: 'Estado', type: 'select', options: ['No iniciado', 'En progreso', 'En pausa', 'Completado'] },
    { key: 'priority', title: 'Prioridad', type: 'select', options: ['Alta', 'Media', 'Baja'] },
    { key: 'deadline', title: 'Fecha límite', type: 'date' },
    { key: 'progress', title: 'Progreso', type: 'progress' },
    { key: 'actions', title: 'Acciones', type: 'actions' },
  ];
  
  // Manejadores para actualizar datos
  const handleUpdateCell = (rowId, key, value) => {
    setData(prevData => 
      prevData.map(row => 
        row.id === rowId ? { ...row, [key]: value } : row
      )
    );
  };
  
  const handleDelete = (rowId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      setData(prevData => prevData.filter(row => row.id !== rowId));
    }
  };
  
  // Contenido expandible
  const renderExpandedContent = (row) => (
    <div className="project-details">
      <h4>Detalles del proyecto: {row.name}</h4>
      <div className="details-grid">
        <div className="detail-item">
          <strong>Responsable:</strong>
          <SelectCell 
            options={['Ana García', 'Carlos López', 'Elena Martínez', 'David Sánchez']} 
            initialValue={row.manager || 'Sin asignar'} 
            onSelect={(value) => handleUpdateCell(row.id, 'manager', value)}
          />
        </div>
        <div className="detail-item">
          <strong>Descripción:</strong>
          <EditableCell 
            initialValue={row.description || 'Sin descripción'} 
            onSave={(value) => handleUpdateCell(row.id, 'description', value)}
          />
        </div>
        <div className="detail-item">
          <strong>Presupuesto:</strong>
          <EditableCell 
            initialValue={row.budget || '0'} 
            onSave={(value) => handleUpdateCell(row.id, 'budget', value)}
          />
        </div>
        <div className="detail-item">
          <strong>Notas:</strong>
          <textarea 
            className="notes-textarea"
            defaultValue={row.notes || ''} 
            onChange={(e) => handleUpdateCell(row.id, 'notes', e.target.value)}
          />
        </div>
      </div>
      <div className="subtasks">
        <h5>Subtareas</h5>
        <table className="subtasks-table">
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Estado</th>
              <th>Asignado a</th>
            </tr>
          </thead>
          <tbody>
            {(row.subtasks || [
              { name: 'Subtarea 1', status: 'En progreso', assignee: 'Ana García' },
              { name: 'Subtarea 2', status: 'No iniciado', assignee: 'Carlos López' }
            ]).map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.status}</td>
                <td>{task.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-subtask-button">Añadir subtarea</button>
      </div>
    </div>
  );
  
  return (
    <div className="complex-table-container">
      <h2>Gestión de Proyectos</h2>
      <div className="table-toolbar">
        <button className="add-project-button">Añadir proyecto</button>
        <div className="filter-controls">
          <select className="filter-select">
            <option value="">Todos los estados</option>
            <option value="En progreso">En progreso</option>
            <option value="Completado">Completado</option>
            <option value="No iniciado">No iniciado</option>
            <option value="En pausa">En pausa</option>
          </select>
          <select className="filter-select">
            <option value="">Todas las prioridades</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
      </div>
      
      <div className="table-wrapper">
        <ScrollableComponent className="complex-scroll-table" verticalScroll={true}>
          <table className="project-table">
            <thead>
              <tr>
                <th className="expand-header"></th>
                {columns.map((column, index) => (
                  <th key={index}>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <ExpandableRow 
                  key={row.id} 
                  row={{
                    ...row,
                    actions: (
                      <div className="row-actions">
                        <button onClick={() => alert(`Editar ${row.name}`)}>Editar</button>
                        <button onClick={() => handleDelete(row.id)}>Eliminar</button>
                      </div>
                    )
                  }} 
                  columns={columns}
                  expandedContent={renderExpandedContent}
                />
              ))}
            </tbody>
          </table>
        </ScrollableComponent>
      </div>
    </div>
  );
};

export default ComplexTable;