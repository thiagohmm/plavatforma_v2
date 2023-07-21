import React, { useState, useEffect }  from 'react';
import "./style.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Popover } from 'react-tiny-popover'
const ConnectedUsers = (props) => {
  
   const [id, setId] = useState(props.id);
   const [email, setEmail] = useState([props.email])
  // const [UsuariosNovos, setUsuariosNovos] = useState([]);

  const [isPopoverOpen, setIsPopoverOpen] = useState('');
   
    
  useEffect(() => {
load()
  }, [props])
 function load(){
setEmail(props.email)

 }


    let row = email.map((emails) => { if ( emails.plataformaId === id){
      
      return (<ListGroup.Item>{emails.email}</ListGroup.Item>)
      
    } 
      
     
      
      })

      console.log(email)
 
  return (
    <div className='notifica'>
     
<Popover
  isOpen={isPopoverOpen}
  positions={['bottom']} // preferred positions by priority
  
  content={ <Card style={{ width: '18rem' }}>
  <ListGroup variant="flush">
      {row}
  </ListGroup>
</Card>
}
>


  <div onMouseEnter={() => setIsPopoverOpen(!isPopoverOpen)} >
  {isPopoverOpen ?(<img src={`${process.env.PUBLIC_URL}../../../ConnectedUsers.png`} />) 
  :(<img src={`${process.env.PUBLIC_URL}../../../ConnectedUsers_Green.png`} />) }
  </div>
</Popover>
</div>
  );
};

export default ConnectedUsers;

