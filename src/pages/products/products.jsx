import React, { useState } from 'react';
import { Table, Form, Button, Pagination, Modal } from 'react-bootstrap';
import './products.scss';

function Products() {
  // Datos iniciales de los productos
  const initialProducts = [
    {
      id: 1,
      name: 'Vitaminas para Perros',
      description: 'Suplemento vitamínico para perros de todas las edades.',
      price: 19.99,
      stock: 50,
      category: 'Suplementos',
      image: 'assets/img/vitamina.jpg',
    },
    {
      id: 2,
      name: 'Shampoo Antipulgas',
      description: 'Shampoo especial para eliminar pulgas y garrapatas.',
      price: 14.99,
      stock: 30,
      category: 'Higiene',
      image: 'assets/img/shampoo.jpg',
    },
    {
      id: 3,
      name: 'Collar Antiparasitario',
      description: 'Collar que protege a tu mascota de parásitos externos.',
      price: 29.99,
      stock: 20,
      category: 'Accesorios',
      image: 'assets/img/collar.jpg',
    },
    {
      id: 4,
      name: 'Alimento para Gatos Senior',
      description: 'Alimento balanceado para gatos mayores de 7 años.',
      price: 24.99,
      stock: 40,
      category: 'Alimentos',
      image: 'assets/img/product/alimento.png',
    },
    {
      id: 5,
      name: 'Juguete Interactivo',
      description: 'Juguete que estimula la actividad física y mental de tu mascota.',
      price: 9.99,
      stock: 60,
      category: 'Juguetes',
      image: 'assets/img/product/juguete.png',
    },
    {
        id: 1,
        name: 'Vitaminas para Perros',
        description: 'Suplemento vitamínico para perros de todas las edades.',
        price: 19.99,
        stock: 50,
        category: 'Suplementos',
        image: 'assets/img/vitamina.jpg',
      },
      {
        id: 2,
        name: 'Shampoo Antipulgas',
        description: 'Shampoo especial para eliminar pulgas y garrapatas.',
        price: 14.99,
        stock: 30,
        category: 'Higiene',
        image: 'assets/img/shampoo.jpg',
      },
      {
        id: 3,
        name: 'Collar Antiparasitario',
        description: 'Collar que protege a tu mascota de parásitos externos.',
        price: 29.99,
        stock: 20,
        category: 'Accesorios',
        image: 'assets/img/collar.jpg',
      },
      {
        id: 4,
        name: 'Alimento para Gatos Senior',
        description: 'Alimento balanceado para gatos mayores de 7 años.',
        price: 24.99,
        stock: 40,
        category: 'Alimentos',
        image: 'assets/img/product/alimento.png',
      },
      {
        id: 5,
        name: 'Juguete Interactivo',
        description: 'Juguete que estimula la actividad física y mental de tu mascota.',
        price: 9.99,
        stock: 60,
        category: 'Juguetes',
        image: 'assets/img/product/juguete.png',
      },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
  });

  const productsPerPage = 10;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: '',
    });
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddProduct = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: '',
    });
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (selectedProduct) {
      const updatedProducts = products.map(product =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProducts(updatedProducts);
    } else {
      const newId = products.length ? products[products.length - 1].id + 1 : 1;
      const newProductWithId = { ...newProduct, id: newId };
      setProducts([...products, newProductWithId]);
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="product-content">
      <ol className="breadcrumb mb-2">
            <li className="breadcrumb-item"><a href="javascript:;">Home</a></li>
            <li className="breadcrumb-item active">Productos</li>
          </ol>
      <div className=" product-s page-header-u d-flex align-items-center mb-3">
        <div>
          
          <h1 >Productos</h1>
        </div>
        <div className="ms-auto">
          <Button variant="success" className="btn-rounded px-4 rounded-pill" onClick={handleAddProduct}>
            <i className="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i> Añadir Producto
          </Button>
        </div>
      </div>

      <div className="card border-0">
        
        <div className="tab-content p-3">
          <div className="tab-pane fade show active" id="allTab" role="tabpanel">
            <div className="input-group mb-3">
              <div className="flex-fill position-relative">
                <div className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 pe-0" style={{ zIndex: 1 }}>
                  <i className="fa fa-search opacity-5"></i>
                </div>
                <input
                  type="text"
                  className="form-control ps-35px bg-light"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th className="pt-0 pb-2"></th>
                    <th className="pt-0 pb-2">Producto</th>
                    <th className="pt-0 pb-2">Inventario</th>
                    <th className="pt-0 pb-2">Tipo</th>
                    <th className="pt-0 pb-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="w-10px align-middle">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id={`product${product.id}`} />
                          <label className="form-check-label" htmlFor={`product${product.id}`}></label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="w-50px h-50px bg-light d-flex align-items-center justify-content-center">
                            <img alt={product.name} className="mw-100 mh-100" src={product.image} />
                          </div>
                          <div className="ms-3">
                            <a href="#!" className="text-dark text-decoration-none" onClick={() => handleShowModal(product)}>
                              {product.name}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{product.stock} en stock</td>
                      <td className="align-middle">{product.category}</td>
                      <td className="align-middle">
                        <Button variant="warning" size="sm" onClick={() => handleShowModal(product)}>
                          <i className="fa fa-edit"></i>
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <i className="fa fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-md-flex align-items-center mt-3">
              <div className="me-md-auto text-md-left text-center mb-2 mb-md-0">
                Mostrando {indexOfFirstProduct + 1} a {Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length} productos
              </div>
              <Pagination>
                {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, index) => (
                  <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar o editar producto */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.name : newProduct.name}
                onChange={(e) =>
                  selectedProduct
                    ? setSelectedProduct({ ...selectedProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.description : newProduct.description}
                onChange={(e) =>
                  selectedProduct
                    ? setSelectedProduct({ ...selectedProduct, description: e.target.value })
                    : setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={selectedProduct ? selectedProduct.price : newProduct.price}
                onChange={(e) =>
                  selectedProduct
                    ? setSelectedProduct({ ...selectedProduct, price: e.target.value })
                    : setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="productStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={selectedProduct ? selectedProduct.stock : newProduct.stock}
                onChange={(e) =>
                  selectedProduct
                    ? setSelectedProduct({ ...selectedProduct, stock: e.target.value })
                    : setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="productCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.category : newProduct.category}
                onChange={(e) =>
                  selectedProduct
                    ? setSelectedProduct({ ...selectedProduct, category: e.target.value })
                    : setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="productImage">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
              {newProduct.image && <img alt="product" src={newProduct.image} className="mt-2" width="100" />}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            {selectedProduct ? 'Actualizar' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Products;
