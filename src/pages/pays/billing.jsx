import React, { useState } from "react";
import { Modal, Button, Table, Row, Col } from "react-bootstrap";
import './billing.scss'
// Datos de ejemplo para productos, servicios, clientes y mascotas
const products = [
  { id: 1, name: "Consulta veterinaria", price: 30 },
  { id: 2, name: "Vacuna antirrábica", price: 15 },
  { id: 3, name: "Baño y corte", price: 20 },
];

const services = [
  { id: 1, name: "Corte de uñas", price: 10 },
  { id: 2, name: "Revisión médica", price: 25 },
  { id: 3, name: "Desparacitación", price: 18 },
];

const clients = [
  { id: 1, name: "Carlos Rodríguez" },
  { id: 2, name: "Ana Pérez" },
  { id: 3, name: "Luis González" },
];

const pets = [
  { id: 1, name: "Firulais", ownerId: 1 },
  { id: 2, name: "Miau", ownerId: 2 },
  { id: 3, name: "Luna", ownerId: 3 },
];

const InvoiceGenerator = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Función para manejar los cambios en los productos y servicios seleccionados
  const handleProductChange = (event) => {
    const productId = parseInt(event.target.value);
    const selectedProduct = products.find((p) => p.id === productId);
    setSelectedProducts((prev) => [...prev, selectedProduct]);
  };

  const handleServiceChange = (event) => {
    const serviceId = parseInt(event.target.value);
    const selectedService = services.find((s) => s.id === serviceId);
    setSelectedServices((prev) => [...prev, selectedService]);
  };

  // Función para eliminar productos o servicios seleccionados
  const handleRemoveItem = (id, type) => {
    if (type === "product") {
      setSelectedProducts(selectedProducts.filter((product) => product.id !== id));
    } else if (type === "service") {
      setSelectedServices(selectedServices.filter((service) => service.id !== id));
    }
  };

  // Función para calcular el total
  const calculateTotal = () => {
    const productTotal = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const serviceTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
    setTotal(productTotal + serviceTotal);
  };

  // Actualizar el total al cambiar productos o servicios
  React.useEffect(() => {
    calculateTotal();
  }, [selectedProducts, selectedServices]);

  // Función para mostrar el modal de pago
  const handlePaymentClick = () => {
    setShowModal(true);
  };

  // Función para manejar la confirmación del pago
  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    setShowModal(false);
  };

  return (
    <div id="content">
      <div className="d-flex align-items-center">
        <div>
          <h1 className="page-header">Generador de Factura</h1>
        </div>
      </div>

      {/* Selección de Cliente y Mascota */}
      <Row className="mb-3">
        <Col md={6}>
          <label htmlFor="client" className="form-label">Cliente</label>
          <select
            id="client"
            className="form-select"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Seleccionar Cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </Col>
        <Col md={6}>
          <label htmlFor="pet" className="form-label">Mascota</label>
          <select
            id="pet"
            className="form-select"
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
          >
            <option value="">Seleccionar Mascota</option>
            {pets
              .filter((pet) => pet.ownerId == selectedClient) // Filtramos mascotas por dueño
              .map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
          </select>
        </Col>
      </Row>

      {/* Selección de Productos y Servicios */}
      <Row className="mb-3">
        <Col md={6}>
          <label htmlFor="products" className="form-label">Productos</label>
          <select
            id="products"
            className="form-select"
            onChange={handleProductChange}
          >
            <option value="">Seleccionar Producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </Col>
        <Col md={6}>
          <label htmlFor="services" className="form-label">Servicios</label>
          <select
            id="services"
            className="form-select"
            onChange={handleServiceChange}
          >
            <option value="">Seleccionar Servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      {/* Resumen de la Factura */}
      <div className="card border-0 mb-4">
        <div className="card-header bg-none p-3 h6 m-0">Resumen de la Factura</div>
        <div className="card-body">
          <Table responsive>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem(product.id, "product")}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              {selectedServices.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>${service.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem(service.id, "service")}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>${total}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="card-footer bg-none d-flex p-3">
          <Button variant="primary" className="ms-auto" onClick={handlePaymentClick}>
            Pagar en Efectivo
          </Button>
        </div>
      </div>

      {/* Modal de Detalles de la Factura */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
              {selectedServices.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>${service.price}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>${total}</strong></td>
              </tr>
            </tbody>
          </Table>
          <p><strong>¿Desea confirmar el pago de ${total}?</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmPayment}>
            Confirmar Pago
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Mensaje de Confirmación de Pago */}
      {paymentConfirmed && (
        <div className="alert alert-success mt-4" role="alert">
          ¡Gracias! Su pago ha sido realizado con éxito.
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;
