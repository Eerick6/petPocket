import React, { useState } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './pets.scss';

function Pets() {
  const initialPets = [
    {
      id: 1,
      name: 'Firulais',
      breed: 'Labrador',
      age: 3,
      img: 'assets/img/scrapy.jpg',
      owner: 'Juan Pérez',
      healthStatus: 'Saludable',
      medicalHistory: [
        { date: '2024-01-10', diagnosis: 'Chequeo general', treatment: 'Ninguno', observations: 'Todo en orden.' },
      ],
    },
    {
      id: 2,
      name: 'Pelusa',
      breed: 'Gato',
      age: 2,
      img: 'assets/img/bola.jpg',
      owner: 'Ana García',
      healthStatus: 'En tratamiento',
      medicalHistory: [
        { date: '2024-02-01', diagnosis: 'Resfriado', treatment: 'Antibióticos', observations: 'Mejorando.' },
      ],
    },
    {
      id: 3,
      name: 'Rocky',
      breed: 'Bulldog',
      age: 4,
      img: 'assets/img/scrapy.jpg',
      owner: 'Carlos López',
      healthStatus: 'Recuperándose',
      medicalHistory: [
        { date: '2024-03-12', diagnosis: 'Accidente', treatment: 'Cirugía', observations: 'Recuperación lenta.' },
      ],
    },
    {
      id: 4,
      name: 'Luna',
      breed: 'Poodle',
      age: 1,
      img: 'assets/img/ay.jpg',
      owner: 'María Rodríguez',
      healthStatus: 'Saludable',
      medicalHistory: [],
    },
    {
      id: 1,
      name: 'Firulais',
      breed: 'Labrador',
      age: 3,
      img: 'assets/img/scrapy.jpg',
      owner: 'Juan Pérez',
      healthStatus: 'Saludable',
      medicalHistory: [
        { date: '2024-01-10', diagnosis: 'Chequeo general', treatment: 'Ninguno', observations: 'Todo en orden.' },
      ],
    },
    {
      id: 2,
      name: 'Pelusa',
      breed: 'Gato',
      age: 2,
      img: 'assets/img/bola.jpg',
      owner: 'Ana García',
      healthStatus: 'En tratamiento',
      medicalHistory: [
        { date: '2024-02-01', diagnosis: 'Resfriado', treatment: 'Antibióticos', observations: 'Mejorando.' },
      ],
    },
    {
      id: 3,
      name: 'Rocky',
      breed: 'Bulldog',
      age: 4,
      img: 'assets/img/scrapy.jpg',
      owner: 'Carlos López',
      healthStatus: 'Recuperándose',
      medicalHistory: [
        { date: '2024-03-12', diagnosis: 'Accidente', treatment: 'Cirugía', observations: 'Recuperación lenta.' },
      ],
    },
    {
      id: 4,
      name: 'Luna',
      breed: 'Poodle',
      age: 1,
      img: 'assets/img/ay.jpg',
      owner: 'María Rodríguez',
      healthStatus: 'Saludable',
      medicalHistory: [],
    },
    {
      id: 1,
      name: 'Firulais',
      breed: 'Labrador',
      age: 3,
      img: 'assets/img/scrapy.jpg',
      owner: 'Juan Pérez',
      healthStatus: 'Saludable',
      medicalHistory: [
        { date: '2024-01-10', diagnosis: 'Chequeo general', treatment: 'Ninguno', observations: 'Todo en orden.' },
      ],
    },
    {
      id: 2,
      name: 'Pelusa',
      breed: 'Gato',
      age: 2,
      img: 'assets/img/bola.jpg',
      owner: 'Ana García',
      healthStatus: 'En tratamiento',
      medicalHistory: [
        { date: '2024-02-01', diagnosis: 'Resfriado', treatment: 'Antibióticos', observations: 'Mejorando.' },
      ],
    },
    {
      id: 3,
      name: 'Rocky',
      breed: 'Bulldog',
      age: 4,
      img: 'assets/img/scrapy.jpg',
      owner: 'Carlos López',
      healthStatus: 'Recuperándose',
      medicalHistory: [
        { date: '2024-03-12', diagnosis: 'Accidente', treatment: 'Cirugía', observations: 'Recuperación lenta.' },
      ],
    },
    {
      id: 4,
      name: 'Luna',
      breed: 'Poodle',
      age: 1,
      img: 'assets/img/ay.jpg',
      owner: 'María Rodríguez',
      healthStatus: 'Saludable',
      medicalHistory: [],
    }
  ];

  const [pets, setPets] = useState(initialPets);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false); // Estado para controlar el modal de agregar mascota
  const [selectedPet, setSelectedPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState({});
  const [newHistory, setNewHistory] = useState({
    date: '',
    diagnosis: '',
    treatment: '',
    observations: '',
  });
  const [newPet, setNewPet] = useState({ // Estado para la nueva mascota
    name: '',
    breed: '',
    age: '',
    img: '',
    owner: '',
    healthStatus: '',
    medicalHistory: [],
  });

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (petId, isEditMode = false) => {
    const selected = pets.find(pet => pet.id === petId);
    setSelectedPet(selected);
    setIsEditing(isEditMode);
    setEditedPet(selected);
    setShowModal(true);
  };

  const openMedicalHistoryModal = (petId) => {
    const selected = pets.find(pet => pet.id === petId);
    setSelectedPet(selected);
    setShowMedicalHistoryModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditedPet({});
  };

  const handleSave = () => {
    const updatedPets = pets.map(pet =>
      pet.id === editedPet.id ? editedPet : pet
    );
    setPets(updatedPets);
    setShowModal(false);
  };

  const handleAddMedicalHistory = () => {
    const updatedPet = { ...selectedPet, medicalHistory: [...selectedPet.medicalHistory, newHistory] };
    const updatedPets = pets.map(pet => pet.id === selectedPet.id ? updatedPet : pet);
    setPets(updatedPets);
    setShowMedicalHistoryModal(false);
    setNewHistory({ date: '', diagnosis: '', treatment: '', observations: '' });
  };

  const handleAddPet = () => {
    const newId = pets.length ? pets[pets.length - 1].id + 1 : 1;
    const newPetWithId = { ...newPet, id: newId };
    setPets([...pets, newPetWithId]);
    setShowAddPetModal(false);
    setNewPet({ name: '', breed: '', age: '', img: '', owner: '', healthStatus: '', medicalHistory: [] });
  };

  return (
    <div className="pets-container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
        <li className="breadcrumb-item active">🐾 Mascotas</li>
      </ol>

      <div className="pets-header">
        <h2>¡Conoce a Nuestros Pacientes!</h2>

      </div>
      <div className="page-header-u">
        <Form.Control
          type="text"
          placeholder="Busca por nombre, raza o dueño"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
         <Button variant="success" onClick={() => setShowAddPetModal(true)}>Agregar Mascota</Button>
      </div>
     
      <div className="pets-cards">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <Card key={pet.id} className="pet-card">
              <Card.Img className="pet-image" variant="top" src={pet.img} alt={pet.name} />
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                  <i className="fa fa-paw" aria-hidden="true"></i> {pet.breed}<br />
                  <i className="fa fa-calendar" aria-hidden="true"></i> {pet.age} años<br />
                  <i className="fa fa-user" aria-hidden="true"></i> Dueño: {pet.owner}<br />
                  <i className="fa fa-heartbeat" aria-hidden="true"></i> Estado: {pet.healthStatus}
                </Card.Text>
                <div className="buttons-card">
                  <Button variant="primary" onClick={() => openModal(pet.id)}>Ver</Button>
                  <Button variant="secondary" onClick={() => openModal(pet.id, true)}>Editar</Button>
                  <Button variant="info" onClick={() => openMedicalHistoryModal(pet.id)}>Historial Médico</Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No se encontraron mascotas con ese nombre, raza o dueño.</p>
        )}
      </div>

      {selectedPet && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? `Editar ${selectedPet.name}` : `Detalles de ${selectedPet.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isEditing ? (
              <div>
                <Form.Group controlId="petName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedPet.name}
                    onChange={(e) => setEditedPet({ ...editedPet, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="petBreed">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedPet.breed}
                    onChange={(e) => setEditedPet({ ...editedPet, breed: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="petAge">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    value={editedPet.age}
                    onChange={(e) => setEditedPet({ ...editedPet, age: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="petOwner">
                  <Form.Label>Dueño</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedPet.owner}
                    onChange={(e) => setEditedPet({ ...editedPet, owner: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="petHealthStatus">
                  <Form.Label>Estado de Salud</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedPet.healthStatus}
                    onChange={(e) => setEditedPet({ ...editedPet, healthStatus: e.target.value })}
                  />
                </Form.Group>
              </div>
            ) : (
              <div>
                <p><strong>Nombre:</strong> {selectedPet.name}</p>
                <p><strong>Raza:</strong> {selectedPet.breed}</p>
                <p><strong>Edad:</strong> {selectedPet.age} años</p>
                <p><strong>Dueño:</strong> {selectedPet.owner}</p>
                <p><strong>Estado de Salud:</strong> {selectedPet.healthStatus}</p>

                <h5>Historial Médico</h5>
                {selectedPet.medicalHistory.length > 0 ? (
                  <ul>
                    {selectedPet.medicalHistory.map((history, index) => (
                      <li key={index}>
                        <strong>{history.date}</strong><br />
                        Diagnóstico: {history.diagnosis}<br />
                        Tratamiento: {history.treatment}<br />
                        Observaciones: {history.observations}<br />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tiene historial médico registrado.</p>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
            ) : (
              <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
            )}
          </Modal.Footer>
        </Modal>
      )}

      {selectedPet && (
        <Modal show={showMedicalHistoryModal} onHide={() => setShowMedicalHistoryModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Historial Médico de {selectedPet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="historyDate">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={newHistory.date}
                onChange={(e) => setNewHistory({ ...newHistory, date: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="historyDiagnosis">
              <Form.Label>Diagnóstico</Form.Label>
              <Form.Control
                type="text"
                value={newHistory.diagnosis}
                onChange={(e) => setNewHistory({ ...newHistory, diagnosis: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="historyTreatment">
              <Form.Label>Tratamiento</Form.Label>
              <Form.Control
                type="text"
                value={newHistory.treatment}
                onChange={(e) => setNewHistory({ ...newHistory, treatment: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="historyObservations">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                type="text"
                value={newHistory.observations}
                onChange={(e) => setNewHistory({ ...newHistory, observations: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMedicalHistoryModal(false)}>Cerrar</Button>
            <Button variant="primary" onClick={handleAddMedicalHistory}>Agregar Historial</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal para agregar una nueva mascota */}
      <Modal show={showAddPetModal} onHide={() => setShowAddPetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newPetName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={newPet.name}
              onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="newPetBreed">
            <Form.Label>Raza</Form.Label>
            <Form.Control
              type="text"
              value={newPet.breed}
              onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="newPetAge">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              value={newPet.age}
              onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="newPetImg">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              value={newPet.img}
              onChange={(e) => setNewPet({ ...newPet, img: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="newPetOwner">
            <Form.Label>Dueño</Form.Label>
            <Form.Control
              type="text"
              value={newPet.owner}
              onChange={(e) => setNewPet({ ...newPet, owner: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="newPetHealthStatus">
            <Form.Label>Estado de Salud</Form.Label>
            <Form.Control
              type="text"
              value={newPet.healthStatus}
              onChange={(e) => setNewPet({ ...newPet, healthStatus: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddPetModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={handleAddPet}>Agregar Mascota</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pets;
