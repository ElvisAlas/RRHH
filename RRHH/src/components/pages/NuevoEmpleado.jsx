
import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const NuevoEmpleadoForm = () => { 
  const [identidad, setIdentidad] = useState('');
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);



  const handleIdentidadChange = (event) => {
    setIdentidad(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
  
        const base64Image = reader.result.substring(reader.result.indexOf(',') + 1);
        setImagen(base64Image);

      };
      reader.readAsDataURL(file);
    } else {
      setImagen(null);
    }
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('identidad', identidad);
      formData.append('nombre', nombre);
      formData.append('imagen', imagen);


      const response = await axios.post('http://localhost:4000/api/empleados', formData, {

      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Empleado registrado exitosamente',
        });
        setIdentidad(''); 
        setNombre('');
        setImagen(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al registrar el Empleado',
        });
      }

     
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
        <Row>
          <Col>
            <Form.Label>Imagen</Form.Label>    
            <Form.Control type="file" id="imagen" accept="image/*" onChange={handleImagenChange} />      
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
