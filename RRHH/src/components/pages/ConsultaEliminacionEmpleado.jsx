import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Form, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { BiSearch, BiTrash } from 'react-icons/bi'; // Importar los iconos de Bootstrap


function ConsultaEliminacionEmpleado() {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [notification, setNotification] = useState(null);
  const [identidad, setIdentidad] = useState('');
  const [nombre, setNombre] = useState('');
  const [showNuevoEmpleadoModal, setShowNuevoEmpleadoModal] = useState(false);
  const [showEmpleadoAgregadoAlert, setShowEmpleadoAgregadoAlert] = useState(false);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/empleados');
      setEmpleados(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error al obtener la lista de empleados:', error);
    }
  };

  const handleVerInformacion = (empleado) => {
    setSelectedEmpleado(empleado);
    setIdentidad(empleado.identidad);
    setNombre(empleado.nombre);
    setModalShow(true);
  };

  const handleEliminarRegistro = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/empleados/${id}`);
      fetchEmpleados();

      const data = response.data[0];

      if (data.mensaje === "Eliminado") {

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Empleado Eliminado exitosamente',
        });
        setIdentidad('');
        setNombre('');

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar usuario',
        });
      }



    } catch (error) {

      setNotification('Error al eliminar el empleado.' & error);
    }
  };

  const handleActualizarEmpleado = async () => {
    if (!selectedEmpleado) return;
    try {
      const response = await axios.put(`http://localhost:4000/api/empleados/${selectedEmpleado.id}`, { identidad, nombre });
      fetchEmpleados();
      const data = response.data[0];

      if (data.mensaje === "Actualizado") {

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Empleado Actualizado exitosamente',
        });
        setIdentidad('');
        setNombre('');
        setModalShow(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al Actualizado usuario',
        });
      }

    } catch (error) {

      setNotification('Error al actualizar el empleado. ' & error);
    }
  };


  const handleEmpleadoAgregado = () => {
    setShowEmpleadoAgregadoAlert(true);
    setTimeout(() => {
      setShowEmpleadoAgregadoAlert(false);
    }, 3000);
    fetchEmpleados();
  };
  return (

    <div >
      <h1 style={{ marginLeft: '305px' }}>Lista de Empleados</h1>

      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}
      {showEmpleadoAgregadoAlert && (
        <Alert variant="success" onClose={() => setShowEmpleadoAgregadoAlert(false)} dismissible>
          Empleado agregado exitosamente.
        </Alert>
      )}
      <div className="container " style={{ maxHeight: "80vh", overflowY: "auto" }}>


        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Foto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>

                  {empleado.foto ? (
                    <img src={`data:image/jpeg;base64,${empleado.foto}`} alt="Foto de Empleado" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  ) : (
                    <img src="https://tienda.cderma.com.co/wp-content/uploads/2022/05/IMAGEN-NO-DISPONIBLE.png" alt="Imagen Predeterminada" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  )}

                </td>
             
                  <td>
                    <BiSearch style={{ cursor: 'pointer' ,color:'blue'}} onClick={() => handleVerInformacion(empleado)} title="Ver Información" />
                    {' '}
                    <BiTrash style={{ cursor: 'pointer',color:'red' }} onClick={() => handleEliminarRegistro(empleado.id)} title="Eliminar Registro" />
                  </td>
            
              </tr>
            ))}
          </tbody>

        </Table>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <ModalHeader closeButton>
          Información del Empleado / Actualizar Empleado
        </ModalHeader>
        <ModalBody>
          {selectedEmpleado && (
            <div>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={selectedEmpleado.id} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Identidad</Form.Label>
                <Form.Control type="text" value={identidad} onChange={(e) => setIdentidad(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </Form.Group>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleActualizarEmpleado}>Actualizar</Button>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Cerrar</Button>
        </ModalFooter>
      </Modal>


    </div>
  );
}

export default ConsultaEliminacionEmpleado;
