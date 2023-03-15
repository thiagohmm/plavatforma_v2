import React , { useState,  useEffect } from 'react';
import ProjetoService from '../../Controller/projeto_service'
import PlataformaService from '../../Controller/plataforma_service'
import EquipamentoService from '../../Controller/equipamento_service'
import SearchBox from '../../Componentes/searchbox';
import equipamento_service from '../../Controller/equipamento_service';
import Modal from '../../Componentes/modalPersonificada/modal'
import { useParams, useNavigate } from 'react-router-dom';
import { Container} from "react-bootstrap";

function GerenciaEquipamentos (props){

  const [projeto, setProjeto] = useState([]);
  const [plataforma, setPlataforma]  = useState([]);
  
  
  const [equip, setEquip] = useState([]);
  

  let [id, setId] = useState();
  let [nome, setNome] = useState();
  let [hostplatID, sethostplatID] = useState();
  

  const [showModal, setShowModal] = useState(false);


  const Projetoservice = new ProjetoService();
  const Plataformaservice= new PlataformaService();
  const EquipamentoService = new equipamento_service()

  let navigate = useNavigate();

  useEffect (  () => {
    async function load(){
    const projetos = await Projetoservice.lprojetos();
    setProjeto(projetos)
   
    }
    load();
   
  },[])

 

  const carregaPlataforma =  async () => {
    let e = document.getElementById('projectSelect');
    let value = e.options[e.selectedIndex].value;
      const plataformas = await Plataformaservice.listaplataformaProj(value);
      setPlataforma(plataformas)
      console.log(plataforma)
  }


  const carregaEquipamento =  async () => {
    let e = document.getElementById('equipamentoSelect');
    let value = e.options[e.selectedIndex].value;
      const equip = await EquipamentoService.listaequipPlataforma(value);
      setEquip(equip)
      console.log(equip)
  }

  

  async function handleExcluir(id,idplataforma){
    setShowModal(false)
    const equip = await EquipamentoService.excluir(id,idplataforma);
    setEquip(equip)
    
  }
  
  const preparaEditar  = (id) => {
    console.log('editar para editar:', id);
    
    navigate(`/cadastro-equipamento/${id}`);
  };

  function excluir(obj){
    console.log(obj)
    setShowModal(true)
    setId(obj.id_equip)
    setNome(obj.nome_equip)
    sethostplatID(obj.equip_plat_id)
   
   

  }


  const updateStatus = (status) => {
    setShowModal(status)

  }
  
 

  return (
    <Container>
    <div>
      <h2>Gerenciamento de Equipamentos</h2>
      <br/>
      {showModal == true ?( 
      <Modal showModal={showModal}
      updateStatus={updateStatus}
      id={id}
      hostplatID={hostplatID}
      handleExcluir={handleExcluir}
      texto="equipamento"   /> 
                 
          
     ):("")}
      <div className="form-group">
      <label htmlFor="exampleSelect1">Projeto</label>
      <select
      name="host_projt_id"
      onClick={() => carregaPlataforma()}
      className="form-control"
      id="projectSelect">
        <option value="N/A"></option>
      {projeto.map((v) => { return ( 
         <option value={v.id_projeto}>
         {v.nome_projeto}
       </option>
      )})}
      </select>

      <label htmlFor="exampleSelect1">Plataforma</label>
      <select
      name="host_projt_id"
      onClick={() => carregaEquipamento()}
      className="form-control"
      id="equipamentoSelect">
        <option value="N/A"></option>
      {plataforma.map((v) => { return ( 
         <option value={v.id}>
         {v.nome_plataforma}
       </option>
      )})}
      </select>
      </div>
      
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nome Equipamento</th>
            <th scope="col">Tipo Equipamento</th>
            <th scope="col">Local Equimento</th>
            
          </tr>
        </thead>
        <tbody>
          
          {equip.map((v) => { return (
          <tr key={v.id_equip }>
            <th scope="row">{v.nome_equip}</th>
            <th scope="row">{v.tipo_equip}</th>
            <th scope="row">{v.local_equip}</th>
            
            <td><button type="button" className="btn btn-info" onClick={() => preparaEditar(v.id_equip)}>Atualizar</button>
            <button type="button" className="btn btn-danger" onClick={() => excluir(v)}>Deletar</button></td>
          </tr>
           ) })}
        </tbody>
      </table>
    </div>
    </Container>

    

     
   
  )
          
}

export default GerenciaEquipamentos;

  
