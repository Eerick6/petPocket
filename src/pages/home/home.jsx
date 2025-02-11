import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './home.scss'

function Home() {
  // Datos de ejemplo con arrays
  const totalMascotas = 125;
  const citasHoy = 8;
  const pagosPendientes = 350;

  const alertas = [
    { id: 1, message: "3 Vacunas pendientes" },
    { id: 2, message: "1 Cita cancelada" },
    { id: 3, message: "Stock bajo en medicamentos" },
  ];

  const atencionesRecientes = [
    { id: 1, descripcion: "Visita de control de vacunación", mascota: "Tommy" },
    { id: 2, descripcion: "Cita de cirugía programada", mascota: "Tommy" },
    { id: 3, descripcion: "Consulta de emergencia", mascota: "Tommy" },
  ];

  const pagosPendientesArray = [
    { id: 1, cliente: "John Doe", fecha: "12/02/2025", monto: "$150 USD" },
    { id: 2, cliente: "Jane Smith", fecha: "15/02/2025", monto: "$200 USD" },
  ];

  // Estado para controlar los modales
  const [showCitasModal, setShowCitasModal] = useState(false);
  const [showPagosModal, setShowPagosModal] = useState(false);
  const [showMascotasModal, setShowMascotasModal] = useState(false);

  const handleCloseModal = () => {
    setShowCitasModal(false);
    setShowPagosModal(false);
    setShowMascotasModal(false);
  };

  return (
    <div className=" dashboard">
      {/* Breadcrumb */}
      <ol className="breadcrumb float-xl-end">
          <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
          <li className="breadcrumb-item active">📊 Dashboard</li>
      </ol>

      {/* Header */}
      <h1 className="page-header">📊 Pet Pocket <small>Bienvenido</small></h1>

      {/* Secciones organizadas */}
      <div className="row g-3">
        {/* Tarjetas Resumen */}
        <div className="col-md-4 col-sm-6">
          <div className="card summary-card pets" onClick={() => setShowMascotasModal(true)}>
            <div className="card-body">
              <h5 className="card-title">🐾 Mascotas Registradas</h5>
              <p className="card-text display-7">Total: {totalMascotas} </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6">
          <div className="card summary-card appointments" onClick={() => setShowCitasModal(true)}>
            <div className="card-body">
              <h5 className="card-title">📅 Citas Programadas</h5>
              <p className="card-text display-7">Pendientes: {citasHoy} </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6">
          <div className="card summary-card payments" onClick={() => setShowPagosModal(true)}>
            <div className="card-body">
              <h5 className="card-title">💰 Pagos Pendientes</h5>
              <p className="card-text display-7"> Total: ${pagosPendientes} </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos o Reportes */}
      <div className="row mt-4 g-4">
        <div className="col-md-8">
          <div className="card recent-activity">
            <div className="card-body">
              <h5 className="card-title">⚕️ Atenciones Recientes</h5>
              <ul className="activity-list">
                {atencionesRecientes.map((atencion) => (
                  <li key={atencion.id} className="activity-item">
                    <span className="emoji-bullet">🩺</span>
                    {atencion.descripcion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card alerts">
            <div className="card-body">
              <h5 className="card-title">⚠️ Alertas Importantes</h5>
              <ul className="alert-list">
                {alertas.map((alerta) => (
                  <li key={alerta.id} className="alert-item">
                    <span className="alert-icon">❗</span>
                    {alerta.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      {/* Modal Citas Hoy */}
      <Modal show={showCitasModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>📅 Citas Hoy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Detalles de las citas programadas:</p>
          <ul>
            {atencionesRecientes.map((atencion) => (
              <li key={atencion.id}>{atencion.descripcion}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Pagos Pendientes */}
      <Modal show={showPagosModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>💰 Pagos Pendientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Detalles de pagos pendientes:</p>
          <ul>
            {pagosPendientesArray.map((pago) => (
              <li key={pago.id}>
                {pago.cliente} - Fecha: {pago.fecha} - Monto: {pago.monto}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Total Mascotas Registradas */}
      <Modal show={showMascotasModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>🐾 Total de Mascotas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Hay un total de {totalMascotas} mascotas registradas en el sistema.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Home;
