import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const OrdersPage = () => {
  // Simulamos los datos de pedidos en un array
  const initialOrders = [
    {
      id: 1010,
      fecha: 'Mar 14 Ene, 10:10am',
      cliente: 'Carlos Pérez',
      total: 220.00,
      estadoPago: 'Pendiente',
      estadoCumplimiento: 'En Progreso',
      productos: [
        { nombre: 'Vacuna Canina', cantidad: 2, precio: 50.00 },
        { nombre: 'Consulta Veterinaria', cantidad: 1, precio: 70.00 }
      ]
    },
    {
      id: 1011,
      fecha: 'Mar 14 Ene, 02:00pm',
      cliente: 'Laura Gómez',
      total: 380.00,
      estadoPago: 'Pagado',
      estadoCumplimiento: 'Cumplido',
      productos: [
        { nombre: 'Desparacitación Felina', cantidad: 3, precio: 60.00 },
        { nombre: 'Esterilización Perro', cantidad: 1, precio: 100.00 }
      ]
    },
    {
      id: 1012,
      fecha: 'Mar 14 Ene, 04:15pm',
      cliente: 'Miguel Sánchez',
      total: 150.00,
      estadoPago: 'No Pagado',
      estadoCumplimiento: 'No Cumplido',
      productos: [
        { nombre: 'Alimento para Perros', cantidad: 2, precio: 30.00 }
      ]
    },
    {
      id: 1013,
      fecha: 'Mar 14 Ene, 08:30am',
      cliente: 'Ana López',
      total: 500.00,
      estadoPago: 'Pagado',
      estadoCumplimiento: 'Cumplido',
      productos: [
        { nombre: 'Vacuna Antirrábica', cantidad: 3, precio: 80.00 },
        { nombre: 'Consulta Veterinaria', cantidad: 1, precio: 120.00 }
      ]
    },
    {
      id: 1014,
      fecha: 'Mar 14 Ene, 01:00pm',
      cliente: 'Juan Rodríguez',
      total: 270.00,
      estadoPago: 'Pendiente',
      estadoCumplimiento: 'En Progreso',
      productos: [
        { nombre: 'Corte de Uñas', cantidad: 2, precio: 40.00 },
        { nombre: 'Alimento para Gatos', cantidad: 1, precio: 90.00 }
      ]
    },
    {
      id: 1015,
      fecha: 'Mar 14 Ene, 03:30pm',
      cliente: 'Sofía Martínez',
      total: 410.00,
      estadoPago: 'Pagado',
      estadoCumplimiento: 'Cumplido',
      productos: [
        { nombre: 'Baño y Peluquería Canina', cantidad: 3, precio: 70.00 },
        { nombre: 'Consulta Veterinaria', cantidad: 1, precio: 120.00 }
      ]
    },
    {
      id: 1016,
      fecha: 'Mar 14 Ene, 05:45pm',
      cliente: 'Felipe Díaz',
      total: 360.00,
      estadoPago: 'No Pagado',
      estadoCumplimiento: 'No Cumplido',
      productos: [
        { nombre: 'Desparacitación Perro', cantidad: 3, precio: 90.00 }
      ]
    },
    {
      id: 1017,
      fecha: 'Mar 14 Ene, 09:00am',
      cliente: 'Carmen Ramírez',
      total: 200.00,
      estadoPago: 'Pagado',
      estadoCumplimiento: 'Cumplido',
      productos: [
        { nombre: 'Corte de Uñas Gato', cantidad: 2, precio: 30.00 },
        { nombre: 'Vacuna Felina', cantidad: 1, precio: 80.00 }
      ]
    }
  ]
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
      (order) => order.estadoPago === status || order.estadoCumplimiento === status
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
          ? { ...order, estadoCumplimiento: order.estadoCumplimiento === 'Cumplido' ? 'No Cumplido' : 'Cumplido' }
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
            <li className="breadcrumb-item active">Pedidos</li>
          </ul>
      <div className="page-header-u d-flex align-items-center mb-3">
        <div>
          
          <h1 className="mb-0">Pedidos</h1>
        </div>
        
      </div>

      <div className="mb-3 d-md-flex fw-bold">
        <div className="mt-md-0 mt-2">
          <a href="#" className="text-dark text-decoration-none" onClick={() => handleFilter('Pagado')}>
            <i className="fa fa-download fa-fw me-1 text-dark text-opacity-50"></i> Filtrar Pedidos Pagados
          </a>
        </div>
        <div className="ms-md-4 mt-md-0 mt-2">
          <a href="#" className="text-dark text-decoration-none" onClick={() => handleFilter('No Pagado')}>
            <i className="fa fa-download fa-fw me-1 text-dark text-opacity-50"></i> Filtrar Pedidos No Pagados
          </a>
        </div>
        <div className="ms-md-4 mt-md-0 mt-2">
          <a href="#" className="text-dark text-decoration-none" onClick={handleShowAll}>
            <i className="fa fa-refresh fa-fw me-1 text-dark text-opacity-50"></i> Mostrar Todos los Pedidos
          </a>
        </div>
      </div>

      <div className="card border-0">
        <div className="table-responsive mb-3">
          <table className="table table-hover table-panel text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Pedido</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Pago</th>
                <th>Cumplimiento</th>
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
                      className={`badge ${order.estadoCumplimiento === 'Cumplido' ? 'border border-success text-success' : 'border border-danger text-danger'} px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center`}
                      onClick={() => handleChangeFulfillmentStatus(order.id)}
                    >
                      <i className="fa fa-circle fs-9px fa-fw me-5px"></i> {order.estadoCumplimiento}
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

export default OrdersPage;
