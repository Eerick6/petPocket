import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './services.scss'

function Services() {
  // Datos iniciales de los servicios
  const _initialServices = [
    {
      id: 1,
      name: 'Consulta General',
      img: 'assets/img/consulta.png',
      subcategorias: [
        { id: 1.1, name: 'Chequeo general' },
        { id: 1.2, name: 'Consulta por enfermedad' },
        { id: 1.3, name: 'Revisión anual' }
      ]
    },
    {
      id: 2,
      name: 'Vacunación y Desparasitación',
      img: 'assets/img/vacuna.jpg',
      subcategorias: [
        { id: 2.1, name: 'Vacuna antirrábica' },
        { id: 2.2, name: 'Vacuna polivalente' },
        { id: 2.3, name: 'Desparasitación interna' },
        { id: 2.4, name: 'Desparasitación externa' }
      ]
    },
    {
      id: 3,
      name: 'Cirugías y Emergencias',
      img: 'assets/img/cirugia.jpg',
      subcategorias: [
        { id: 3.1, name: 'Cirugía programada' },
        { id: 3.2, name: 'Emergencia médica' },
        { id: 3.3, name: 'Cirugía de traumatismos' }
      ]
    },
    {
      id: 4,
      name: 'Peluquería y Estética Canina/Felina',
      img: 'assets/img/peluqueria.jpg',
      subcategorias: [
        { id: 4.1, name: 'Corte de pelo' },
        { id: 4.2, name: 'Baño y secado' },
        { id: 4.3, name: 'Limpieza dental' },
        { id: 4.4, name: 'Estilismo para mascotas' }
      ]
    }
  ];

  const [_services] = useState(_initialServices);

  // Estado para controlar la visibilidad de los modales
  const [_showViewModal, _setShowViewModal] = useState(false);
  const [_showEditModal, _setShowEditModal] = useState(false);

  // Estado para almacenar los datos del servicio seleccionado
  const [_selectedService, _setSelectedService] = useState(null);

  // Función para cerrar ambos modales
  const _handleCloseModal = () => {
    _setShowViewModal(false);
    _setShowEditModal(false);
  };

  // Función para mostrar el modal de "Ver"
  const _handleShowViewModal = (service) => {
    _setSelectedService(service);
    _setShowViewModal(true);
  };

  // Función para mostrar el modal de "Editar"
  const _handleShowEditModal = (service) => {
    _setSelectedService(service);
    _setShowEditModal(true);
  };

  // Función de seguridad para evitar inyecciones HTML no deseadas
  const _escapeHtml = (str) => {
    return str.replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[char]);
  };

  // Función para validar la entrada del usuario al editar
  const _validateInput = (input) => {
    if (!input.trim()) {
      return "El nombre no puede estar vacío.";
    }
    // Aquí puedes agregar más validaciones según lo necesites.
    return null;
  };

  return (
    <div className="service-card">
      {_services.map((service) => (
        <div className="card card-s" key={service.id}>
          <img src={service.img} className="card-img-top" alt={service.name} />
          <div className="card-body">
            <h5 className="card-title">{service.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <div className="buttons-card">
                <Button variant="primary" onClick={() => _handleShowEditModal(service)}>Editar</Button>
                <Button variant="secondary" onClick={() => _handleShowViewModal(service)}>Ver</Button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal para Ver las Subcategorías */}
      <Modal show={_showViewModal} onHide={_handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Subcategorías de {_selectedService?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {_selectedService?.subcategorias.map((subcategoria) => (
              <li key={subcategoria.id}>{_escapeHtml(subcategoria.name)}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={_handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Editar Servicio */}
      <Modal show={_showEditModal} onHide={_handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Servicio: {_selectedService?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Nombre del Servicio:</label>
            <input
              type="text"
              value={_selectedService?.name}
              onChange={(e) => {
                const error = _validateInput(e.target.value);
                if (error) {
                  alert(error); // Alertar sobre el error de validación
                } else {
                  _setSelectedService({ ..._selectedService, name: e.target.value });
                }
              }}
              className="form-control"
            />
          </div>
          <div className="mt-2">
            <label>Subcategorías:</label>
            <ul>
              {_selectedService?.subcategorias.map((subcategoria) => (
                <li key={subcategoria.id}>
                  {_escapeHtml(subcategoria.name)}
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={_handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={_handleCloseModal}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Services;
