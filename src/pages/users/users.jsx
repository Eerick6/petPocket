import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './users.scss';

function Users() {
  const initialUsers = [
    { id: 1, name: "Stan Marsh", email: "stan@hotmail.com", rol: 'Administrador', img: "/assets/img/stan.jpg" },
    { id: 2, name: "Eric Cartman", email: "eric@yahoo.com", rol: 'Veterinario', img: "/assets/img/erick.jpg" },
    { id: 3, name: "Kyle Broflovski", email: "kyle@gmail.com", rol: 'Veterinario', img: "/assets/img/kyle.jpg" },
    { id: 4, name: "Kenny McCormick", email: "kenny@gmail.com", rol: 'Recepcionista', img: "/assets/img/keny.jpg" },
    { id: 1, name: "Stan Marsh", email: "stan@hotmail.com", rol: 'Administrador', img: "/assets/img/stan.jpg" },
    { id: 2, name: "Eric Cartman", email: "eric@yahoo.com", rol: 'Veterinario', img: "/assets/img/erick.jpg" },
    { id: 3, name: "Kyle Broflovski", email: "kyle@gmail.com", rol: 'Veterinario', img: "/assets/img/kyle.jpg" },
    { id: 4, name: "Kenny McCormick", email: "kenny@gmail.com", rol: 'Recepcionista', img: "/assets/img/keny.jpg" },
    { id: 1, name: "Stan Marsh", email: "stan@hotmail.com", rol: 'Administrador', img: "/assets/img/stan.jpg" },
    { id: 2, name: "Eric Cartman", email: "eric@yahoo.com", rol: 'Veterinario', img: "/assets/img/erick.jpg" },
    { id: 3, name: "Kyle Broflovski", email: "kyle@gmail.com", rol: 'Veterinario', img: "/assets/img/kyle.jpg" },
    { id: 4, name: "Kenny McCormick", email: "kenny@gmail.com", rol: 'Recepcionista', img: "/assets/img/keny.jpg" },
    { id: 1, name: "Stan Marsh", email: "stan@hotmail.com", rol: 'Administrador', img: "/assets/img/stan.jpg" },
    { id: 2, name: "Eric Cartman", email: "eric@yahoo.com", rol: 'Veterinario', img: "/assets/img/erick.jpg" },
    { id: 3, name: "Kyle Broflovski", email: "kyle@gmail.com", rol: 'Veterinario', img: "/assets/img/kyle.jpg" },
    { id: 4, name: "Kenny McCormick", email: "kenny@gmail.com", rol: 'Recepcionista', img: "/assets/img/keny.jpg" },
    { id: 1, name: "Stan Marsh", email: "stan@hotmail.com", rol: 'Administrador', img: "/assets/img/stan.jpg" },
    { id: 2, name: "Eric Cartman", email: "eric@yahoo.com", rol: 'Veterinario', img: "/assets/img/erick.jpg" },
    { id: 3, name: "Kyle Broflovski", email: "kyle@gmail.com", rol: 'Veterinario', img: "/assets/img/kyle.jpg" },
    { id: 4, name: "Kenny McCormick", email: "kenny@gmail.com", rol: 'Recepcionista', img: "/assets/img/keny.jpg" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    rol: 'Administrador',
    img: null, // Imagen para el nuevo usuario
  });

  // Función para abrir el modal de agregar usuario
  const handleAddClick = () => {
    setNewUser({ name: '', email: '', rol: 'Administrador', img: null }); // Resetear valores al abrir el modal
    setShowAddModal(true);
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser({ ...newUser, img: reader.result }); // Guardamos la imagen como base64
      };
      reader.readAsDataURL(file); // Leemos la imagen como base64
    }
  };

  // Función para guardar el nuevo usuario
  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setShowAddModal(false);
  };

  // Función para abrir el modal de edición
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowEditModal(true);
  };

  // Función para guardar los cambios en el usuario editado
  const handleSaveChanges = () => {
    setUsers(users.map(user => user.id === editedUser.id ? editedUser : user));
    setShowEditModal(false);
  };

  // Función para abrir el modal de eliminación
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="table-responsive">
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link to="/"><i className="fas fa-home"></i> Inicio</Link></li>
        <li className="breadcrumb-item"><Link to="/users"><i className="fas fa-users"></i> Usuarios</Link></li>
      </ol>
      <div className="page-header-u">
        <h1>Usuarios</h1>
        <div className="ms-auto">
          <Button variant="success" className="btn-rounded px-4 rounded-pill" onClick={handleAddClick}>
            <i className="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i> Añadir Usuario
          </Button>
        </div>
      </div>

      <table className="table table-bordered mb-0 align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Rol</th>
            <th style={{ width: "1%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.img || "/assets/img/default.jpg"} alt={user.name} className="rounded" style={{ height: "30px" }} />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <button onClick={() => handleEditClick(user)} className="btn btn-sm btn-primary me-1">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(user)} className="btn btn-sm btn-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Agregar Usuario */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="edit-modal text-white">
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {newUser && (
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <select
                  className="form-select"
                  value={newUser.rol}
                  onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Veterinario">Veterinario</option>
                  <option value="Recepcionista">Recepcionista</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Imagen</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Guardar Usuario
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="edit-modal text-white">
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedUser && (
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <select
                  className="form-select"
                  value={editedUser.rol}
                  onChange={(e) => setEditedUser({ ...editedUser, rol: e.target.value })}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Veterinario">Veterinario</option>
                  <option value="Recepcionista">Recepcionista</option>
                </select>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="edit-modal text-white">
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar a este usuario?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;
