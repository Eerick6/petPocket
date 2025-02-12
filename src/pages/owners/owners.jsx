import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './owners.scss';
import { Link } from 'react-router-dom';

const Owners = () => {
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '123-456-7890', 
      image: '/assets/img/p1.jpg', 
      pets: [
        { id: 1, name: 'Max', breed: 'Labrador', photo: '/assets/img/scrapy.jpg' },
        { id: 2, name: 'Bella', breed: 'Bulldog', photo: '/assets/img/scrapy.jpg' }
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      phone: '987-654-3210', 
      image: '/assets/img/p1.jpg', 
      pets: [
        { id: 3, name: 'Charlie', breed: 'Beagle', photo: '/assets/img/scrapy.jpg' }
      ]
    },
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '123-456-7890', 
      image: '/assets/img/p1.jpg', 
      pets: [
        { id: 1, name: 'Max', breed: 'Labrador', photo: '/assets/img/scrapy.jpg' },
        { id: 2, name: 'Bella', breed: 'Bulldog', photo: '/assets/img/scrapy.jpg' }
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      phone: '987-654-3210', 
      image: '/assets/img/p1.jpg', 
      pets: [
        { id: 3, name: 'Charlie', breed: 'Beagle', photo: '/assets/img/scrapy.jpg' }
      ]
    },
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '123-456-7890', 
      image: '/assets/img/p1.jpg', 
      pets: [
        { id: 1, name: 'Max', breed: 'Labrador', photo: '/assets/img/scrapy.jpg' },
        { id: 2, name: 'Bella', breed: 'Bulldog', photo: '/assets/img/scrapy.jpg' }
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      phone: '987-654-3210', 
      image: '/assets/img/p1.jpg', 
      pets: [
        { id: 3, name: 'Charlie', breed: 'Beagle', photo: '/assets/img/scrapy.jpg' }
      ]
    }
  ]);
  const [currentClient, setCurrentClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPetsModal, setShowPetsModal] = useState(false);
  const [currentPets, setCurrentPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para agregar un nuevo cliente
  const handleAddClient = () => {
    setCurrentClient({ id: null, name: '', email: '', phone: '', image: '/assets/img/p1.jpg', pets: [] });
    setShowModal(true);
  };

  // Función para editar un cliente
  const handleEditClient = (client) => {
    setCurrentClient({ ...client });
    setShowModal(true);
  };

  // Función para guardar los cambios del cliente
  const handleSaveClient = () => {
    if (currentClient.id) {
      setClients(clients.map(c => (c.id === currentClient.id ? currentClient : c)));
    } else {
      setClients([...clients, { ...currentClient, id: clients.length + 1 }]);
    }
    setShowModal(false);
  };

  // Función para eliminar un cliente
  const handleDeleteClient = (id) => {
    setClients(clients.filter(c => c.id !== id));
  };

  // Cerrar el modal sin guardar cambios
  const closeModal = () => {
    setShowModal(false);
    setCurrentClient(null);
  };

  // Función para abrir el modal de mascotas
  const handleViewPets = (pets) => {
    setCurrentPets(pets);
    setShowPetsModal(true);
  };

  // Función para cerrar el modal de mascotas
  const closePetsModal = () => {
    setShowPetsModal(false);
    setCurrentPets([]);
  };

  // Filtrar los clientes según la búsqueda
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  return (
    <div className="container mt-4">
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home"></i> Inicio</Link></li>
        <li className="breadcrumb-item"><Link to="/owners"><i className="fas fa-users"></i> Propietarios</Link></li>
      </ol>
      <div className="header page-header-u">
        <h1>Usuarios</h1>


        {/* Botón para agregar un cliente */}
        <div className="ms-auto">
          <Button variant="success" className="btn-rounded px-4 rounded-pill" onClick={handleAddClient}>
            <i className="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i> Añadir Cliente
          </Button>
        </div>
      </div>

      {/* Modal para agregar/editar cliente */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentClient?.id ? 'Editar' : 'Agregar'} Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveClient();
            }}
          >
            <Form.Group controlId="formClientName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del cliente"
                value={currentClient?.name || ''}
                onChange={(e) => setCurrentClient({ ...currentClient, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formClientEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electrónico del cliente"
                value={currentClient?.email || ''}
                onChange={(e) => setCurrentClient({ ...currentClient, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formClientPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el teléfono del cliente"
                value={currentClient?.phone || ''}
                onChange={(e) => setCurrentClient({ ...currentClient, phone: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {currentClient?.id ? 'Guardar Cambios' : 'Agregar Cliente'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para ver mascotas */}
      <Modal show={showPetsModal} onHide={closePetsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mascotas del Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {currentPets.map(pet => (
              <div key={pet.id} className="col-md-4">
                <div className="card">
                  <img src={pet.photo} alt={pet.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <p className="card-text">{pet.breed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      <div className="row mt-4 owners">
        {filteredClients.map(client => (
          <div key={client.id} className="col-md-4 card-owner">
            <div className="card">
              <img src={client.image} alt={client.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{client.name}</h5>
                <p className="card-text">{client.email}</p>
                <p className="card-text">{client.phone}</p>
                <div className="body-btn">
                <Button variant="warning" onClick={() => handleEditClient(client)}>Editar</Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDeleteClient(client.id)}>Eliminar</Button>
                <Button variant="info" className="ml-2" onClick={() => handleViewPets(client.pets)}>Ver Mascotas</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Owners;
