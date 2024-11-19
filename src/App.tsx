import React, { useState, Fragment } from 'react';
import './App.css';
import mqtt from "mqtt"; 



const client  = mqtt.connect('mqtt://test.mosquitto.org:8081', {
	protocol: 'mqtts',
	clientId: 'a191124' 	// clientId solo te identifica como un cliente, escoje cualquiercadena que quieras 
});


client.subscribe('mensajesTec'); // mensajesTec.com is the MQTT topic

function App() {
  // Establece el estado de React por defecto
  const [mesg, setMesg] = useState(<Fragment><em>Nada Publicado</em></Fragment>); 
  const [topico, setTopico] = useState(<><em></em></>);

  client.on('message', (topic, message) => {
    // Actualiza el estado de react con el mensaje 
    setMesg(<Fragment><em>{message.toString()}</em></Fragment>);
    setTopico(<Fragment><em>{topic.toString()}</em></Fragment>)
    console.log(message.toString());
    client.end();
    });

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Una prueba de MQTT en React</h1>
          <p>El mensaje es: {mesg}</p>
          <p>
            <a href="https://tec.mx/es" style={{color: 'black'}}>{topico}</a>
          </p>
      </header>
		</div>
  );
}

export default App;