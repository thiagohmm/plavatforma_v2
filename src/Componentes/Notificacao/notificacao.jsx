import React, { useState, useEffect }  from 'react';
import "./style.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import UserService from '../../Controller/usuarios.service'


const Notificacao = () => {
  
  const [count, setCount] = useState();
  const [UsuariosNovos, setUsuariosNovos] = useState([]);
  const service = new UserService();
 
  
 
 
  useEffect (  () => {
    async function load(){
    const usuarios_count = await service.countUsers();
    setCount(usuarios_count)

    const usuarios_aprove = await service.getNewUsers();
    setUsuariosNovos(usuarios_aprove)

   
    }
    load();
   
  },[])



  async function handleExcluir(id){
   
    const usuarios_load = await service.excluir(id);
    const usuarios_aprove = await service.getNewUsers();
    setUsuariosNovos(usuarios_aprove)
    const usuarios_count = await service.countUsers();
    setCount(usuarios_count)
    
  }

  async function handleAprove(user){
    const usuarios ={
      id_user: user.id_user,
      ativo_user:true,
    }
    console.log("recebendo o user", user)
    const usuarios_load = await service.aprove(usuarios);
    const usuarios_aprove = await service.getNewUsers();
    setUsuariosNovos(usuarios_aprove)
    const usuarios_count = await service.countUsers();
    setCount(usuarios_count)
    
  }


  return (
    <div >
    {count !== 0 ?(
    
      <Dropdown className='drop' >
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
      <img src={`${process.env.PUBLIC_URL}../../../letter.png`}  />
               <span id="group">
                
                 <span class="badge badge-light">{count}</span>

               </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item >Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}

        <table className="table table-hover" >
        <thead>
          <tr>
            <th scope="col">Usuário</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody > 
          {UsuariosNovos.map((v) => { return (
          <tr key={v.id_user}>
            <th scope="row" >{v.email_user}</th>
            
            
            <td className='line' >
            <Button  variant="success" size="sm" onClick={() => handleAprove(v)}>&#x2713;</Button>
            <Button  variant="danger" size="sm" onClick={() => handleExcluir(v.id_user)}>&#x2715;</Button>
            
            </td>
          </tr>
           ) })}
        </tbody>
      </table>
      
      
      </Dropdown.Menu>
    </Dropdown>
   

   
   ):(
    <>
    <img src={`${process.env.PUBLIC_URL}../../../letter.png`}  />
               <span id="group">
                
                 <span class="badge badge-light">0</span>

               </span>
    
    </>
    )}
</div>
  );
};

export default Notificacao;
