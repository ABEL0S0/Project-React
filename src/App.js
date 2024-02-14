import React, { useState } from 'react';
import './App.css';
import Login from './paginas/login';

function App() {
  const [user, setUser] = useState(null);
  const [mensajeBajo, setMensajeBajo] = useState("");
  const [mensajeMedio, setMensajeMedio] = useState("");
  const [mensajeAlto, setMensajeAlto] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false); 

  const handleLogin = (user) => {
    setUser(user);
  };

  const limpiarInputs = () => {
    setMensajeBajo("");
    setMensajeMedio("");
    setMensajeAlto("");
  };

  const handleChangeMensaje = (event, nivel) => {
    switch (nivel) {
      case "Bajo":
        setMensajeBajo(event.target.value);
        break;
      case "Medio":
        setMensajeMedio(event.target.value);
        break;
      case "Alto":
        setMensajeAlto(event.target.value);
        break;
      default:
        break;
    }
  };

  const enviarMensaje = (mensaje, feed, nivel) => {
    // Enviar el mensaje a la feed 'MENSAJE'
    fetch(`https://io.adafruit.com/api/v2/Keso/feeds/mensaje/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': 'aio_BztM63xmDbKFTJcNnw4MlY0DEBSs',
      },
      body: JSON.stringify({ value: mensaje }),
    });
  
    // Enviar la variable correspondiente a la feed 'NIVEL'
    let variable;
    switch (nivel) {
      case "Bajo":
        variable = 1;
        break;
      case "Medio":
        variable = 2;
        break;
      case "Alto":
        variable = 3;
        break;
      default:
        variable = 0; // Si el nivel no es ninguno de los esperados, se asigna 0
    }
    fetch(`https://io.adafruit.com/api/v2/Keso/feeds/nivel/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': 'aio_BztM63xmDbKFTJcNnw4MlY0DEBSs',
      },
      body: JSON.stringify({ value: variable }),
    });
    setMostrarNotificacion(true);
    setTimeout(() => {
      setMostrarNotificacion(false);
    }, 3000);
    //Enviar a boton
    fetch(`https://io.adafruit.com/api/v2/Keso/feeds/boton/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': 'aio_BztM63xmDbKFTJcNnw4MlY0DEBSs',
      },
      body: JSON.stringify({ value: 'ON' }),
    });
    setTimeout(()=>{
      fetch(`https://io.adafruit.com/api/v2/Keso/feeds/boton/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': 'aio_BztM63xmDbKFTJcNnw4MlY0DEBSs',
        },
        body: JSON.stringify({ value: 'OFF' }),
      });
    },5000);
    
  };
  

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <header className="App-header">
          <h2>NIVELES DE ALERTA</h2>
          {mostrarNotificacion && <div className="notificacion">Datos enviados correctamente.</div>} {/* Notificación */}
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="alert alert-success" role="alert">
                  <p>Bajo</p>
                  <input type="text" value={mensajeBajo} onChange={(event) => handleChangeMensaje(event, "Bajo")} placeholder="Mensaje" />
                  <button className="btn btn-primary mt-2" onClick={() => {enviarMensaje(mensajeBajo, "MENSAJE", "Bajo"); limpiarInputs();}}>Enviar</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="alert alert-warning" role="alert">
                  <p>Medio</p>
                  <input type="text" value={mensajeMedio} onChange={(event) => handleChangeMensaje(event, "Medio")} placeholder="Mensaje" />
                  <button className="btn btn-primary mt-2" onClick={() => {enviarMensaje(mensajeMedio, "MENSAJE", "Medio");limpiarInputs();}}>Enviar</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="alert alert-danger" role="alert">
                  <p>Alto</p>
                  <input type="text" value={mensajeAlto} onChange={(event) => handleChangeMensaje(event, "Alto")} placeholder="Mensaje" />
                  <button className="btn btn-primary mt-2" onClick={() => {enviarMensaje(mensajeAlto, "MENSAJE", "Alto"); limpiarInputs();}}>Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default App;