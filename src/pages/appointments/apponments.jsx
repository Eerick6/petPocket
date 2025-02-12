import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AppoinmentsPage = () => {
    const initialOrders =  [
      {
        id: 1016,
        fecha: 'Mar 14 Ene, 05:45pm',
        cliente: 'Felipe Díaz',
        total: 360.00,
        estadoPago: 'No Pagado',
        mascota: 'No Cumplido',
        estadoCita: 'Pendiente',
        productos: [
          { nombre: 'Desparacitación Perro', cantidad: 3, precio: 90.00 }
        ]
      },
      {
        id: 1017,
        fecha: 'Mar 15 Ene, 10:30am',
        cliente: 'Ana López',
        total: 150.00,
        estadoPago: 'Pagado',
        mascota: 'Cumplido',
        estadoCita: 'Completada',
        productos: [
          { nombre: 'Vacunación Gato', cantidad: 1, precio: 150.00 }
        ]
      },
      {
        id: 1018,
        fecha: 'Mar 16 Ene, 02:15pm',
        cliente: 'Carlos Martínez',
        total: 200.00,
        estadoPago: 'No Pagado',
        mascota: 'No Cumplido',
        estadoCita: 'Pendiente',
        productos: [
          { nombre: 'Corte de Pelo Perro', cantidad: 2, precio: 100.00 }
        ]
      },
      {
        id: 1019,
        fecha: 'Mar 17 Ene, 11:00am',
        cliente: 'Laura García',
        total: 400.00,
        estadoPago: 'Pagado',
        mascota: 'Cumplido',
        estadoCita: 'Completada',
        productos: [
          { nombre: 'Desparacitación Gato', cantidad: 4, precio: 100.00 }
        ]
      },
      {
        id: 1020,
        fecha: 'Mar 18 Ene, 03:45pm',
        cliente: 'Pedro Pérez',
        total: 250.00,
        estadoPago: 'No Pagado',
        mascota: 'No Cumplido',
        estadoCita: 'Pendiente',
        productos: [
          { nombre: 'Corte de Uñas Perro', cantidad: 5, precio: 50.00 }
        ]
      },
      {
        id: 1021,
        fecha: 'Mar 19 Ene, 09:30am',
        cliente: 'Sofía Rodríguez',
        total: 180.00,
        estadoPago: 'Pagado',
        mascota: 'Cumplido',
        estadoCita: 'Completada',
        productos: [
          { nombre: 'Vacunación Perro', cantidad: 1, precio: 180.00 }
        ]
      },
      {
        id: 1022,
        fecha: 'Mar 20 Ene, 04:00pm',
        cliente: 'Luis García',
        total: 210.00,
        estadoPago: 'No Pagado',
        mascota: 'No Cumplido',
        estadoCita: 'Pendiente',
        productos: [
          { nombre: 'Desparacitación Gato', cantidad: 3, precio: 70.00 }
        ]
      },
      {
        id: 1023,
        fecha: 'Mar 21 Ene, 12:15pm',
        cliente: 'Isabel Sánchez',
        total: 350.00,
        estadoPago: 'Pagado',
        mascota: 'Cumplido',
        estadoCita: 'Completada',
        productos: [
          { nombre: 'Corte de Pelo Gato', cantidad: 2, precio: 175.00 }
        ]
      },
      {
        id: 1024,
        fecha: 'Mar 22 Ene, 07:30pm',
        cliente: 'Jorge Díaz',
        total: 500.00,
        estadoPago: 'No Pagado',
        mascota: 'No Cumplido',
        estadoCita: 'Pendiente',
        productos: [
          { nombre: 'Vacunación Perro', cantidad: 2, precio: 250.00 }
        ]
      },
      {
        id: 1025,
        fecha: 'Mar 23 Ene, 01:00pm',
        cliente: 'Marta Gómez',
        total: 300.00,
        estadoPago: 'Pagado',
        mascota: 'Cumplido',
        estadoCita: 'Completada',
        productos: [
          { nombre: 'Corte de Uñas Gato', cantidad: 3, precio: 100.00 }
        ]
      }
    ];
    
  ;

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelectedOrders) =>
      prevSelectedOrders.includes(orderId)
        ? prevSelectedOrders.filter((id) => id !== orderId)
        : [...prevSelectedOrders, orderId]
    );
  };

  const handleFilter = (status) => {
    const filteredOrders = initialOrders.filter(
      (order) => order.estadoPago === status || order.mascota === status
    );
    setOrders(filteredOrders);
  };

  const handleShowAll = () => {
    setOrders(initialOrders); // Restablece a todos los pedidos
  };

  const handleChangePaymentStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, estadoPago: order.estadoPago === 'Pagado' ? 'No Pagado' : 'Pagado' }
          : order
      )
    );
  };

  const handleChangeFulfillmentStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, estadoCita: order.estadoCita === 'Pendiente' ? 'Cumplido' : 'Cancelada' }
          : order
      )
    );
  };

  const handleOpenModal = (orderDetails) => {
    setSelectedOrderDetails(orderDetails);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOrderDetails(null);
  };

  return (
    <div id="content" className="app-content">
      <ul className="breadcrumb mb-2">
            <li className="breadcrumb-item"><a href="#">Inicio</a></li>
            <li className="breadcrumb-item active">Citas</li>
          </ul>
      <div className="page-header-u d-flex align-items-center mb-3">
        
        <div>
          
          <h1 >Citas</h1>
        </div>
        
      </div>

      <div className="mb-3 d-md-flex fw-bold">
        <div className="mt-md-0 mt-2">
          <a href="#" className="text-dark text-decoration-none" onClick={() => handleFilter('Pagado')}>
            <i className="fa fa-download fa-fw me-1 text-dark text-opacity-50"></i> Filtrar Citas Pendientes
          </a>
        </div>
        <div className="ms-md-4 mt-md-0 mt-2">
          <a href="#" className="text-dark text-decoration-none" onClick={() => handleFilter('No Pagado')}>
            <i className="fa fa-download fa-fw me-1 text-dark text-opacity-50"></i> Filtrar Citas Cumplidas
          </a>
        </div>
        <div className="ms-md-4 mt-md-0 mt-2">
          <a href="#" className="text-dark text-decoration-none" onClick={handleShowAll}>
            <i className="fa fa-refresh fa-fw me-1 text-dark text-opacity-50"></i> Mostrar Todas las citas
          </a>
        </div>
      </div>

      <div className="card border-0">
        <div className="table-responsive mb-3">
          <table className="table table-hover table-panel text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Cita</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Mascota</th>
                <th>Total</th>
                <th>Pago</th>
                <th>Cita</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="w-10px align-middle">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`order${order.id}`}
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleCheckboxChange(order.id)}
                      />
                      <label className="form-check-label" htmlFor={`order${order.id}`}></label>
                    </div>
                  </td>
                  <td><a href="extra_order_details.html" className="fw-bold">#{order.id}</a></td>
                  <td>{order.fecha}</td>
                  <td>{order.cliente}</td>
                  
                  <td>{order.mascota} </td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>

                    <span
                      className={`badge ${order.estadoPago === 'Pagado' ? 'border border-success text-success' : 'border border-warning text-warning'} px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center`}
                      onClick={() => handleChangePaymentStatus(order.id)}
                    >
                      <i className="fa fa-circle fs-9px fa-fw me-5px"></i> {order.estadoPago}
                    </span>
                  </td>
                  <td>

                    <span
                      className={`badge ${order.estadoCita === 'Pendiente' ? 'border border-success text-success' : 'border border-warning text-warning'} px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center`}
                      onClick={() => handleChangeFulfillmentStatus(order.id)}
                    >
                      <i className="fa fa-circle fs-9px fa-fw me-5px"></i> {order.estadoCita}
                    </span>
                  </td>
                  <td>
                    <Button variant="info" onClick={() => handleOpenModal(order)}>Ver</Button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      <Modal show={modalVisible} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrderDetails && (
            <div>
              <p><strong>ID:</strong> {selectedOrderDetails.id}</p>
              <p><strong>Fecha:</strong> {selectedOrderDetails.fecha}</p>
              <p><strong>Cliente:</strong> {selectedOrderDetails.cliente}</p>
              <p><strong>Cita:</strong>{selectedOrderDetails.estadoCita}</p>
              <p><strong>Total:</strong> ${selectedOrderDetails.total.toFixed(2)}</p>
              <h5>Productos y Servicios:</h5>
              <ul>
                {selectedOrderDetails.productos.map((producto, index) => (
                  <li key={index}>
                    {producto.nombre} - {producto.cantidad} x ${producto.precio}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppoinmentsPage;
