import React, { useState } from 'react';
import ScrollableComponent from '../ScrollableComponent';

const ProductTable = () => {
  const [filter, setFilter] = useState('');
  
  // Datos de ejemplo
  const products = [
    { id: 1, name: 'Smartphone X', category: 'Electrónica', price: 699.99, stock: 23, image: 'phone.jpg' },
    { id: 2, name: 'Laptop Pro', category: 'Computadoras', price: 1299.99, stock: 15, image: 'laptop.jpg' },
    { id: 3, name: 'Auriculares Wireless', category: 'Audio', price: 199.99, stock: 42, image: 'headphones.jpg' },
    { id: 4, name: 'Smart TV 4K', category: 'Televisores', price: 899.99, stock: 8, image: 'tv.jpg' },
    { id: 5, name: 'Cámara DSLR', category: 'Fotografía', price: 749.99, stock: 17, image: 'camera.jpg' },
    // Añadir más productos...
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.category.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="product-catalog">
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Filtrar productos..." 
          value={filter} 
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
      
      <div className="table-container">
        <ScrollableComponent className="product-table-scroll" verticalScroll={true}>
          <table className="product-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-image">
                      <img 
                        src={`/images/${product.image}`} 
                        alt={product.name}
                        onError={(e) => e.target.src = '/images/placeholder.jpg'}
                      />
                    </div>
                  </td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <span className={product.stock < 10 ? 'low-stock' : ''}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => alert(`Ver detalles de ${product.name}`)}>
                        Ver
                      </button>
                      <button onClick={() => alert(`Editar ${product.name}`)}>
                        Editar
                      </button>
                      <button onClick={() => alert(`Eliminar ${product.name}`)}>
                        Eliminar
                      </button>
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

export default ProductTable;