import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NodeService from '../../Controller/node_service';
import PlataformaService from '../../Controller/plataforma_service';
import Cancelar from "../../Componentes/cancelar"
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

 function CadastroNode() {

  const [id_node, setId] = useState('')
  const [nome_node, setNome] = useState('')
  const [ssh_node, setSSH] = useState('')
  const [vnc_node, setVNC] = useState('')
  const [rdp_node, setRDP] = useState('')
  const [router_node, setRouter] = useState('')
  const [host_plat_id, setHostPlat] = useState('')
  const [plataformas, setPlataforma] = useState([])
  const [sucesso, setSucesso] = useState(false)
  const [isError, setIsError] = useState(false)

 
   const  plataformaService = new PlataformaService();
    const nodeService = new NodeService();
    let IdRecebido = useParams();
    const navigate = useNavigate();


    useEffect(() => {
                  async function load() {
                    setId(IdRecebido.id)
                    console.log(id_node)
              
                const plataformas = await plataformaService.lplataforma();
                console.log(plataformas);
                setPlataforma(plataformas)

                if (id_node){
                  const nodes = await nodeService.getNodeById(id_node)
                
                  console.log(nodes)
                  const {id_node, nome_node, ssh_node, vnc_node, rdp_node, router_node, host_plat_id } = nodes
                  setId(id_node)
                  setNome(nome_node)
                  setSSH(vnc_node)
                  setRDP(rdp_node)
                  setRouter(router_node)
                  setHostPlat(host_plat_id)
                  document.getElementById('plataformaSelect').value = nodes.host_plat_id

                }
              }

            load();

            }, [id_node])



 const getselect = () => {
    let e = document.getElementById('plataformaSelect');
    let value = e.options[e.selectedIndex].value;
    return value;
  };

 const setCheck = () => {
    var selecionaIndex = document.getElementById('plataformaSelect').options;
     setHostPlat(selecionaIndex)
  };


  const limpaCampos = (event) => {
    event.preventDefault();
    setId()
      setNome('')
      setSSH()
      setRDP()
      setRouter("")
      setHostPlat()

  }

  const onSubmit = (event) => {
    event.preventDefault();
    if(nome_node === '' || router_node ==='' || host_plat_id ===''){
      
      setIsError(true)
    
    }

    const nodes = {
      
      nome: nome_node,
      ssh: ssh_node,
      vnc: vnc_node,
      rdp: rdp_node,
      router: router_node,
      host_plat_id: getselect(),
    };
  
    if (id_node){
    nodeService.salvar(nodes);
  }
    else{
      nodeService.updateNodes(nodes, id_node)
     navigate("/GerenciaNodes");
    
    }

    limpaCampos(event)
    


  
    return (
      <Container>
              <div className="card">
        <div className="card-header">Cadastro de Nodes</div>
        <div className="card-body">
          {sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Node gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a':'black' , }}>Nome Nodes:*</label>
                <input
                  type="text"
                  name="nome_node"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome_node}
                  className="form-control"
                  style={{ background: isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label>Porta SSH:</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  name="ssh_node"
                  onChange={(e) => setSSH(e.target.value)}
                  value={ssh_node}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group ">
                <label>Porta VNC:</label>
                <input
                  class="form-control form-control-sm"
                  type="number"
                  id="inputSmall"
                  min="1"
                  max="6"
                  name="vnc_node"
                  onChange={(e) => setVNC(e.target.value)}
                  value={vnc_node}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group ">
                <label>Porta RDP:</label>
                <input
                  class="form-control form-control-sm"
                  type="number"
                  id="inputSmall"
                  min="1"
                  max="6"
                  name="vnc_node"
                  onChange={(e) => setRDP(e.target.value)}
                  value={rdp_node}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a':'black' , }} >Ip:*</label>
                <input
                  type="text"
                  name="router_node"
                  onChange={(e) => setRouter(e.target.value)}
                  value={router_node}
                  className="form-control"
                  style={{ background: isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a':'black' , }} >Plataforma:*</label>
                <select
                  name="host_plat_id"
                  onChange={(e) => setHostPlat(e.target.value)}
                  className="form-control"
                  id="plataformaSelect"
                  style={{ background: isError ?  '#FFCCCB': 'white' , }}
                >
                  <option value=""></option>
                  {plataformas.map((plataformas) => {
                    return (
                      <option value={plataformas.id}>
                        {plataformas.nome_plataforma}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-1">
              <button className="btn btn-success" onClick={(e) => onSubmit(e)}>
                Salvar
              </button>
            </div>

            <div className="col-md-1">
              <button className="btn btn-warning" onClick={(e) => limpaCampos(e)}>
                Limpar
              </button>
            </div>
            <div className="col-md-1">
              <Cancelar></Cancelar>
            </div>
          </div>
        </div>
      </div>
      </Container>

    );
  
}


export default CadastroNode
