import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
    loadOrders();
  }, []);

  const loadNotifications = async (limit = 5) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/inventario-bajo?limit=${limit}`);
      setNotifications(response.data);
    } catch (err) {
      console.error('Error al cargar notificaciones:', err);
    }
  };

  const loadOrders = async (limit = 5) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/pedidos?limit=${limit}`);
      setOrders(response.data);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
    }
  };

  const loadAllNotifications = () => loadNotifications(Infinity);
  const loadAllOrders = () => loadOrders(Infinity);

  const viewOrderDetails = (id) => {
    alert(`Mostrando detalles del pedido ${id}`);
    // Aquí puedes implementar una navegación a una página de detalles
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.pedido_id.toString().includes(searchTerm)
  );

  return (
    <div style={{ borderTop: '5px solid #900C3F', borderBottom: '5px solid #900C3F' }}>
      <div className="top-bar">¡Bienvenido administrador!</div>
      <div className="container">
        <div className="sidebar">
          <h2><i className="fa-solid fa-wine-glass"></i> VINO</h2>
          <h3>¿Qué deseas hacer?</h3>
          <button onClick={() => navigate('/usuarios')}><i className="fa-solid fa-users"></i> Usuarios</button>
          <button onClick={() => navigate('/proveedores')}><i className="fa-solid fa-truck"></i> Proveedores</button>
          <button><i className="fa-solid fa-box"></i> Productos</button>
          <button><i className="fa-solid fa-shopping-cart"></i> Pedidos</button>
          <button><i className="fa-solid fa-tags"></i> Promociones</button>
          <button><i className="fa-solid fa-headset"></i> Soporte</button>
          <button><i className="fa-solid fa-chart-bar"></i> Reportes</button>
          <button className="logout-button" onClick={() => navigate('/')}><i className="fa-solid fa-sign-out-alt"></i> Salir</button>
        </div>
        <div className="main-content">
          <h1><i className="fa-solid fa-user"></i> ¡Bienvenido, administrador!</h1>
          <p>Has iniciado sesión correctamente!</p>
          <div className="action-buttons">
            <div className="action-buttons-row">
              <button><i className="fa-solid fa-clock"></i> Pedidos Pendientes</button>
              <button><i className="fa-solid fa-box-open"></i> Productos en Bajo Stock</button>
            </div>
            <div className="action-buttons-row">
              <button className="ticket-button"><i className="fa-solid fa-ticket-alt"></i> Tickets y Soporte Abierto</button>
            </div>
          </div>
          <div className="notification-box">
            <h2><i className="fa-solid fa-bell"></i> Notificaciones Pendientes</h2>
            <hr />
            <table id="notifications-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cava</th>
                  <th>Cantidad</th>
                  <th>Mínimo</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map(notification => (
                  <tr key={notification.producto_id}>
                    <td>{notification.vino}</td>
                    <td>{notification.cava}</td>
                    <td>{notification.cantidad_disponible}</td>
                    <td>{notification.cantidad_minima}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="#" className="view-all" onClick={loadAllNotifications}>Ver todo</Link>
          </div>
          <div className="pending-orders-box">
            <h2><i className="fa-solid fa-shopping-cart"></i> Pedidos Pendientes</h2>
            <hr />
            <input
              type="text"
              className="search-bar"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <table id="orders-table">
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.pedido_id}>
                    <td>{order.pedido_id}</td>
                    <td>{order.cliente_nombre}</td>
                    <td>{order.total}</td>
                    <td>{new Date(order.fecha_pedido).toLocaleDateString()}</td>
                    <td>{order.estado}</td>
                    <td>
                      <span className="view-details" onClick={() => viewOrderDetails(order.pedido_id)}>
                        Ver detalle
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="#" className="view-all" onClick={loadAllOrders}>Ver todo</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
