import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './users.scss';

function Users() {
  const initialUsers = [
    { id: 1, name: "Stan Marsh", email: "stan@hotmail.com", rol: 'Administrador', img: "/assets/img/stan.jpg" },
    { id: 2, name: "Eric Cartman", email: "eric@yahoo.com", rol: 'Veterinario', img: "/assets/img/erick.jpg" },
    { id: 3, name: "Kyle Broflovski", email: "kyle@gmail.com", rol: 'Veterinario', img: "/assets/img/kyle.jpg" },
    { id: 4, name: "Kenny McCormick", email: "kenny@gmail.com", rol: 'Recepcionista', img: "/assets/img/keny.jpg" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowEditModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveChanges = () => {
    setUsers(users.map(user => user.id === editedUser.id ? editedUser : user));
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped mb-0 align-middle">
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
                <img src={user.img} alt={user.name} className="rounded" style={{ height: "30px" }} />
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
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de querer eliminar al usuario <strong>{selectedUser?.name}</strong>?
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
