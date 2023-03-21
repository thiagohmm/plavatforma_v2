import React , { useState,  useEffect } from 'react';
import UserService from '../../Controller/usuarios.service'
import Modal from '../../Componentes/modalPersonificada/modal'
import { useNavigate } from 'react-router-dom';
import { Container } from "react-bootstrap";


function GerenciaUsuarios(props) {
  const [Usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [id, setId] = useState();
  let [nome, setNome] = useState();
  const service = new UserService();
  let navigate = useNavigate();

  useEffect (  () => {
    async function load(){
    const usuarios_load = await service.lusuarios();
    setUsuarios(usuarios_load)
   
    }
    load();
   
  },[])

  function excluir(obj){
    setShowModal(true)
    setId(obj.id_user)
    setNome(obj.user_user)
    

  }

 
  async function handleExcluir(id){
    setShowModal(false)
    const usuarios_load = await service.excluir(id);
    setUsuarios(usuarios_load)
  }
  

  const updateStatus = (status) => {
    setShowModal(status)

  }

  return (
    <Container>
    <div>
      <h2>Gerenciamento de Usuários</h2>
      <br/>
      {showModal == true ?( 
      <Modal showModal={showModal}
      updateStatus={updateStatus}
      id={id}
      handleExcluir={handleExcluir}
      texto="Usuario"   /> 
                 
          
     ):("")}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nome Usuário</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {Usuarios.map((v) => { return (
          <tr key={v.id_user}>
            <th scope="row">{v.email_user}</th>
            
            
            <td>
            <button type="button" className="btn btn-danger" onClick={() => excluir(v)}>Deletar</button></td>
            
          </tr>
           ) })}
        </tbody>
      </table>
    </div>
    </Container>
  );
}
export default  GerenciaUsuarios;
