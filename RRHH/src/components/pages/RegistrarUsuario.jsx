import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrarUsuario = () => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('usuario', usuario);
      formData.append('correo', correo);
      formData.append('contrasena', contrasena);
      formData.append('imagen', imagen);

      const response = await axios.post('http://localhost:4000/api/usuario', formData);
   

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario registrado exitosamente',
      });
      
      setUsuario('');
      setCorreo('');
      setContrasena('');
      setImagen(null);

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el usuario',
      });
    }
  };

  return (
    <div className="container mt-5">

      <div className="row">
        <div className="col-md-6">
          <h2>Registrar Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">Usuario</label>
              <input type="text" className="form-control" id="usuario" value={usuario} onChange={handleUsuarioChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input type="email" className="form-control" id="correo" value={correo} onChange={handleCorreoChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="contrasena" value={contrasena} onChange={handleContrasenaChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">Imagen</label>
              <input type="file" className="form-control" id="imagen" accept="image/*" onChange={handleImagenChange} />
            </div>
            <button type="submit" className="btn btn-primary">Registrar</button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Previsualización de la Imagen</h2>
          {imagen && (
            <img src={URL.createObjectURL(imagen)} alt="Previsualización" className="img-fluid" />
          )}
          {!imagen && (
            <p>Sin imagen</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrarUsuario;
