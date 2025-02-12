import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './services.scss';
import { Link } from "react-router-dom";

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
    },
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
    },
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

  const [_services, _setServices] = useState(_initialServices);

  // Estado para controlar la visibilidad de los modales
  const [_showViewModal, _setShowViewModal] = useState(false);
  const [_showEditModal, _setShowEditModal] = useState(false);
  const [_showAddModal, _setShowAddModal] = useState(false);

  // Estado para almacenar los datos del servicio seleccionado
  const [_selectedService, _setSelectedService] = useState(null);
  const [_newService, _setNewService] = useState({ name: '', img: '', subcategorias: [] });

  // Función para cerrar todos los modales
  const _handleCloseModal = () => {
    _setShowViewModal(false);
    _setShowEditModal(false);
    _setShowAddModal(false);
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

  // Función para mostrar el modal de "Agregar"
  const _handleShowAddModal = () => {
    _setNewService({ name: '', img: '', subcategorias: [] });
    _setShowAddModal(true);
  };

  // Función para agregar subcategorías
  const _addSubcategoria = (name) => {
    if (name.trim()) {
      const newSubcategoria = {
        id: Date.now(), // Generando un ID único temporalmente
        name: name
      };
      _setNewService((prevService) => ({
        ...prevService,
        subcategorias: [...prevService.subcategorias, newSubcategoria]
      }));
    }
  };

  // Función para eliminar una subcategoría
  const _removeSubcategoria = (id) => {
    _setNewService((prevService) => ({
      ...prevService,
      subcategorias: prevService.subcategorias.filter(sub => sub.id !== id)
    }));
  };

  // Función para agregar un nuevo servicio
  const _handleAddService = () => {
    if (!_newService.name || !_newService.img || _newService.subcategorias.length === 0) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const newService = { ..._newService, id: Date.now() };
    _setServices([..._services, newService]);
    _handleCloseModal();
  };

  // Función para editar un servicio
  const _handleEditService = () => {
    const updatedServices = _services.map((service) =>
      service.id === _selectedService.id ? { ..._selectedService, ..._newService } : service
    );
    _setServices(updatedServices);
    _handleCloseModal();
  };

  return (
    <div className="service-card">
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link to="/home"><i className="fas fa-home"></i> Inicio</Link></li>
        <li className="breadcrumb-item"><Link to="/users"><i className="fas fa-users"></i> Servicios</Link></li>
      </ol>
      <div className="page-header-u">
        <h1 > Servicios</h1>
        <div className="ms-auto">
          <Button variant="success" className="btn-rounded px-4 rounded-pill" onClick={_handleShowAddModal}>
            <i className="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i> Añadir Servicio
          </Button>
        </div>
      </div>
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
              <li key={subcategoria.id}>{subcategoria.name}</li>
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
                _setSelectedService({ ..._selectedService, name: e.target.value });
              }}
              className="form-control"
            />
          </div>
          <div className="mt-2">
            <label>Subcategorías:</label>
            <ul>
              {_selectedService?.subcategorias.map((subcategoria) => (
                <li key={subcategoria.id}>
                  {subcategoria.name}
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={_handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={_handleEditService}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Agregar Servicio */}
      <Modal show={_showAddModal} onHide={_handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Nombre del Servicio:</label>
            <input
              type="text"
              value={_newService.name}
              onChange={(e) => _setNewService({ ..._newService, name: e.target.value })}
              className="form-control"
            />
          </div>
          <div>
            <label>Imagen del Servicio:</label>
            <input
              type="file"
              onChange={(e) => _setNewService({ ..._newService, img: URL.createObjectURL(e.target.files[0]) })}
              className="form-control"
            />
          </div>
          <div className="mt-2">
            <label>Subcategorías:</label>
            <input
              type="text"
              placeholder="Agregar subcategoría"
              className="form-control"
              onBlur={(e) => _addSubcategoria(e.target.value)}
            />
            <ul>
              {_newService.subcategorias.map((subcategoria) => (
                <li key={subcategoria.id}>
                  {subcategoria.name} <Button variant="danger" size="sm" onClick={() => _removeSubcategoria(subcategoria.id)}>Eliminar</Button>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={_handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={_handleAddService}>
            Guardar Servicio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Services;
