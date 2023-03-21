import Guacamole from 'guacamole-common-js';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container} from "react-bootstrap";
import axios from 'axios';

//import encrypt from './encrypt.js';

function RDPConnection(props) {

  
  const [tkenc, setTkenc] = useState("");
  let IdRecebido = useParams();
  let myRef = useRef(null);



//  const token = {
//     connection: {
//       type: 'rdp',
//       settings: {
//         hostname: '10.103.3.172', // Replace with IP
//          username: 'openstack',
//          password: 'openstack',
//          port: 3389,
//          'disable-auth': false,
//          'disable-upload': true,
//         'enable-drive': false,
//         'create-drive-path': false,
//         security: 'any',
//         'ignore-cert': true,
//         'enable-wallpaper': false,
//         'width': 1920,
//         'height': 1080
//       },
//     },
//   };


const token = {
  connection: {
    type: 'rdp',
    settings: {
      hostname: IdRecebido.host, // Replace with IP
       username: '',
       password: '',
       port: IdRecebido.porta,
       'disable-auth': false,
       'disable-upload': true,
      'enable-drive': true,
      'create-drive-path': false,
      //security: 'any',
      'ignore-cert': true,
      'enable-wallpaper': true,
      'width': 1920,
      'height': 1080
    },
  },
};


   const  getToken = async (token)  => {
    try {
      
      const resp =  await axios.post('http://localhost:8081/encrypt/', token)
     // console.log(resp.data)
     setTkenc(resp.data)
      return(resp.data)

    }catch (err) {
      // Handle Error Here
      console.error(err);
  }
  }



  useEffect(() => {
    async function load(){
     const tk = await getToken(token)

     console.log(tk)
    const strws = `ws://localhost:8081/?token=${tk}`

     const tunnel = new Guacamole.WebSocketTunnel('ws://localhost:8080/')
     const client = new Guacamole.Client(tunnel)
    await client.connect(`token=${tk}`)

    myRef.current.appendChild(client.getDisplay().getElement())


    var keyboard = new Guacamole.Keyboard(document);
keyboard.onkeydown = function (keysym){
  client.sendKeyEvent(1, keysym)
};

keyboard.onkeyup = function (keysym){
  client.sendKeyEvent(0, keysym)
};



var mouse = new Guacamole.Mouse(client.getDisplay().getElement());
mouse.onmousedown =
mouse.onmouseup =
mouse.onmousemove = function(mouseState) {
client.sendMouseState(mouseState);
};

  }  load();

},[])



  return (
    
    <div className="Rdp"  >

    <div ref={myRef} style={{zIndex: 10, maxHeight: "1080px", maxWidth: "1920px", display: "block", float: "left", overflow: "hidden"}}>


    </div>




    </div>
    
  );
}

export default RDPConnection;