import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [dataForm, setDataForm] = useState({
    nombre_usuario: "",
    pass: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/validarUsuario', {
        nombre_usuario: dataForm.nombre_usuario,
        pass: dataForm.pass
      });
      const data = response.data;
      if (data.success) {
        onLogin(dataForm.nombre_usuario);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Inicio de sesión exitoso',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al iniciar sesión',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre_usuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name="nombre_usuario" value={dataForm.nombre_usuario} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="pass" value={dataForm.pass} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" className="btn btn-primary w-100">Iniciar sesión</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
