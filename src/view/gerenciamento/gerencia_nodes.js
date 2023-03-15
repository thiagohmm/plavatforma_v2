import React , { useState,  useEffect } from 'react';
import ProjetoService from '../../Controller/projeto_service'
import PlataformaService from '../../Controller/plataforma_service'
import NodeService from '../../Controller/node_service'
import SearchBox from '../../Componentes/searchbox';
import Modal from '../../Componentes/modalPersonificada/modal'
import { useNavigate } from 'react-router-dom';
import { Container } from "react-bootstrap";


function GerenciaNodes(props){

  const [projeto, setProjeto] = useState([]);
  const [plataforma, setPlataforma]  = useState([]);
  const [nodes, setNodes] = useState([]);
  const [filteredNodes,setfilteredNodes] =  useState([])
  const [showModal, setShowModal] = useState(false);
  
  let [id, setId] = useState();
  let [nome, setNome] = useState();
  let [hostplatID, sethostplatID] = useState();
  
  const Projetoservice = new ProjetoService();
  const Plataformaservice= new PlataformaService();
  const NodesService = new NodeService();
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


  const carregaNodes =  async () => {
    let e = document.getElementById('plataformaSelect');
    let value = e.options[e.selectedIndex].value;
    console.log("values" + value)
      const nodes = await NodesService.listanodesplataforma(value);
      setNodes(nodes)
      setfilteredNodes(nodes)
      
      console.log(nodes)
  }
    
  async function handleExcluir(id,idplataforma){
    setShowModal(false)
    const nodes = await NodesService.excluir(id,idplataforma);
    setNodes(nodes)
    setfilteredNodes(nodes)
    document.getElementById("searchbox").value = "";
    
   
  }
  
  const preparaEditar  = (id) => {
    console.log('editar para editar:', id);
    
   navigate(`/cadastro-nodes/${id}`);
  };

  function excluir(obj){
    console.log(obj)
    setShowModal(true)
    setId(obj.id_node)
    setNome(obj.nome_node)
    sethostplatID(obj.host_plat_id)
   
   

  }

  function updateInput(search)  {
    
   
    setfilteredNodes(nodes.filter((nodes) =>
      nodes.nome_node.toLowerCase().includes(search.toLowerCase())
    ));
   
    
  }


  const updateStatus = (status) => {
    setShowModal(status)

  }

 

  return (
    <Container>
    <div>
      <h2>Gerenciamento de Nodes</h2>
      <br/>
     {showModal == true ?( 
      <Modal showModal={showModal}
      updateStatus={updateStatus}
      id={id}
      hostplatID={hostplatID}
      handleExcluir={handleExcluir}
      texto="node"   /> 
                 
          
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
      onClick={() => carregaNodes()}
      className="form-control"
      id="plataformaSelect">
        <option value="N/A"></option>
      {plataforma.map((v) => { return ( 
         <option value={v.id}>
         {v.nome_plataforma}
       </option>
      )})}
      </select>
      </div>
      <SearchBox
        placeholder="Nome da posição"
        handleChange={ (event) => updateInput(event.target.value)}
                          
      />

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nome nodes</th>
            <th scope="col">Porta ssh</th>
            <th scope="col">Porta vnc</th>
            <th scope="col">IP</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredNodes.map((v) => { return (
          <tr key={v.idnode }>
            <th scope="row">{v.nome_node}</th>
            <th scope="row">{v.ssh_node}</th>
            <th scope="row">{v.vnc_node}</th>
            <th scope="row">{v.router_node}</th>

            <td><button type="button" className="btn btn-info" onClick={() => preparaEditar(v.id_node)}>Atualizar</button>
            <button type="button" className="btn btn-danger" onClick={() => excluir(v)}>Deletar</button></td>
          </tr>
           ) })}
        </tbody>
      </table>
    </div>
    </Container>

    

     
   
  )
          
}

export default GerenciaNodes;