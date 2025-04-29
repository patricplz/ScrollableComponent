import React, { useState } from 'react';
import ScrollableComponent from '../ScrollableComponent';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ventas');

  const salesData = Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    date: `2025-04-${(i + 1).toString().padStart(2, '0')}`,
    customer: `Cliente con nombre larguísimo número ${i + 1}`,
    product: `Producto Súper Extendido ${(i % 5) + 1}`,
    amount: Math.floor(Math.random() * 1000) + 100,
    status: ['Completado', 'Pendiente', 'Cancelado'][Math.floor(Math.random() * 3)],
  }));

  const inventoryData = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    sku: `SKU-${(1000 + i).toString()}`,
    name: `Nombre del artículo extremadamente largo ${i + 1}`,
    category: [`Electrónica`, `Ropa`, `Hogar`, `Deportes`, `Juguetes`][i % 5],
    stock: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 200) + 10,
    supplier: `Proveedor con un nombre muy largo ${(i % 3) + 1}`,
  }));

  const customersData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Cliente ${i + 1} Apellido Segundo`,
    email: `cliente.extremadamente.largo${i}@empresa-imaginaria.com`,
    phone: `+34 ${600000000 + i}`,
    totalOrders: Math.floor(Math.random() * 20),
    totalSpent: Math.floor(Math.random() * 5000) + 100,
    lastPurchase: `2025-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
  }));

  return (
    <div className="dashboard min-h-screen bg-gray-50 px-4 py-6">
      <div className="dashboard-header mb-6">
        <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>
        <div className="dashboard-tabs space-x-4">
          {['ventas', 'inventario', 'clientes'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-content max-h-[75vh] overflow-y-auto border rounded shadow-sm bg-white p-4">
        {activeTab === 'ventas' && (
          <div className="panel min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4">Ventas Recientes</h2>
            <ScrollableComponent className="dashboard-table-wrapper overflow-auto h-[500px] w-[900px] border border-gray-300 rounded" verticalScroll= {true}>
              <table className="min-w-[1200px] w-full table-fixed text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Fecha</th>
                    <th className="p-2 text-left">Cliente</th>
                    <th className="p-2 text-left">Producto</th>
                    <th className="p-2 text-left">Importe</th>
                    <th className="p-2 text-left">Estado</th>
                    <th className="p-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map(sale => (
                    <tr key={sale.id} className="border-t">
                      <td className="p-2">{sale.id}</td>
                      <td className="p-2">{sale.date}</td>
                      <td className="p-2">{sale.customer}</td>
                      <td className="p-2">{sale.product}</td>
                      <td className="p-2">{sale.amount.toFixed(2)} €</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded bg-${sale.status === 'Completado' ? 'green' : sale.status === 'Pendiente' ? 'yellow' : 'red'}-200`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button className="text-blue-600 mr-2">Detalles</button>
                        <button className="text-green-600">Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollableComponent>
          </div>
        )}

        {activeTab === 'inventario' && (
          <div className="panel min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4">Inventario Actual</h2>
            <ScrollableComponent className="dashboard-table-wrapper overflow-auto h-[500px] w-[900px] border border-gray-300 rounded" verticalScroll= {true}>
              <table className="min-w-[1300px] w-full table-fixed text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">SKU</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Categoría</th>
                    <th className="p-2">Stock</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Proveedor</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map(item => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.sku}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.category}</td>
                      <td className={`p-2 ${item.stock < 10 ? 'text-red-600 font-bold' : ''}`}>{item.stock}</td>
                      <td className="p-2">{item.price.toFixed(2)} €</td>
                      <td className="p-2">{item.supplier}</td>
                      <td className="p-2">
                        <button className="text-blue-600 mr-2">Detalles</button>
                        <button className="text-green-600">Actualizar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollableComponent>
          </div>
        )}

        {activeTab === 'clientes' && (
          <div className="panel min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4">Listado de Clientes</h2>
            <ScrollableComponent className="dashboard-table-wrapper overflow-auto h-[500px] w-[900px] border border-gray-300 rounded" verticalScroll= {true}>
              <table className="min-w-[1300px] w-full table-fixed text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Teléfono</th>
                    <th className="p-2">Total Pedidos</th>
                    <th className="p-2">Total Gastado</th>
                    <th className="p-2">Última Compra</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {customersData.map(customer => (
                    <tr key={customer.id} className="border-t">
                      <td className="p-2">{customer.id}</td>
                      <td className="p-2">{customer.name}</td>
                      <td className="p-2">{customer.email}</td>
                      <td className="p-2">{customer.phone}</td>
                      <td className="p-2">{customer.totalOrders}</td>
                      <td className="p-2">{customer.totalSpent.toFixed(2)} €</td>
                      <td className="p-2">{customer.lastPurchase}</td>
                      <td className="p-2">
                        <button className="text-blue-600 mr-2">Ver Perfil</button>
                        <button className="text-green-600">Historial</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollableComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
