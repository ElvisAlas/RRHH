import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const NuevoEmpleadoForm = () => { 
  const [identidad, setIdentidad] = useState('');
  const [nombre, setNombre] = useState('');

  const handleIdentidadChange = (event) => {
    setIdentidad(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Identidad:', identidad);
    console.log('Nombre:', nombre);
    try {
     const request= await axios.post('http://localhost:4000/api/empleados', {
        identidad,
        nombre,
      });
     
      console.log(request)
      if (request.status===200){
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Empleado registrado exitosamente',
        });
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al registrar el Empleado',
        });
      }
    
      setIdentidad(''); 
      setNombre('');
     
    } catch (error) {
      console.error('Error al agregar empleado:', error);
     
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
       <div className="container mt-5">

    
      <Row>
        <Col>
          <Form.Group controlId="formIdentidad">
            <Form.Label>Identidad</Form.Label>
            <Form.Control type="text" value={identidad} onChange={handleIdentidadChange} />
          </Form.Group>
        </Col>
        </Row>
      <Row>
        <Col>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={handleNombreChange} />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className='mt-3'>
        Agregar Empleado
      </Button>
      </div>
    </Form>
  );
};

export default NuevoEmpleadoForm;
