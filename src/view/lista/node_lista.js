import React, { useState, useEffect } from 'react';

import PlataformaService from '../../Controller/plataforma_service';
import NodesService from '../../Controller/node_service';
import EquipamentoService from '../../Controller/equipamento_service';
import SearchBox from '../../Componentes/searchbox';
import { useParams } from 'react-router-dom';
import { Container} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ConnectedUsers from '../../Componentes/ConnectUsers/connectedUsers';


function ListaNode() {
  
    
   const  plataformaservice = new PlataformaService();
   const nodeservice = new NodesService();
   const  equipamentoservice = new EquipamentoService();

   let IdRecebido = useParams();
    
    const [plataforma, setPlataforma] = useState([])
    const [nodes, setNodes] = useState([])
    const [equipamento, setEquipamento] = useState([])
    const [searchfield, setSearchfield] = useState('')
    
    const [rdpHostname, SetrdpHostname] = useState('')
    const [portaRDP, SetPortaRDP] = useState(0)
    const [role, setRole] = useState(localStorage.getItem('user-role'))
    const [responseSocket, setResponseScocket] = useState([])
  
    const client = new WebSocket('ws://localhost:9876/');
    const TOKEN_KEY = "user-email";

    const getEmail = () => localStorage.getItem(TOKEN_KEY);


  const conectToVnc = (event, ip, porta, nome) => {
    event.preventDefault();
    const alias = plataforma.alias_plataforma;
    const vnc = {
      nome: nome,
      porta: porta,
      prefix: alias,
      ip: ip,
   
    };
    
    nodeservice.vncConnect(vnc);
    // window.open(
    //   `http://localhost/novncp/vnc.html?host=localhost&port=6080&path=${nome}${porta}${alias}?show_dot=true`
    // );
    
    window.open(
      `http://${window.location.hostname}:8080/vnc/vnc.html?host=${window.location.hostname}&port=6080&path=${nome}${porta}${alias}?show_dot=true`
      
    );
    }

    const connectRDP = ( hostname, porta) =>{
     
      SetrdpHostname(hostname)
      SetPortaRDP(porta)
      window.open(`http://${window.location.hostname}:3000/rdp/${hostname}/${porta}`)
    }

  const conectToSSH = (event, ip, porta) => {
    event.preventDefault();
    //window.open(`http://localhost:2222/ssh/host/${ip}?port=${porta}`);
    window.open(`/ssh/host/${ip}?port=${porta}`);
  };

  useEffect(() => {
    
      load();
}, [])


async function load() {
  const id = IdRecebido.id;
 
  const getplataforma = await plataformaservice.getplataformaName(id);
  setPlataforma(getplataforma);

  const getnodes = await nodeservice.listanodesplataforma(id);
   setNodes(getnodes)
  
  const equip = await equipamentoservice.listaequipPlataforma(id);
   setEquipamento(equip)


 
   
}



useEffect(() => {
  connectWebSocket();
}, [setResponseScocket])


function connectWebSocket(){

  const apiCall = {
    email: getEmail(),
    plataformaId: IdRecebido.id
  };



  client.onopen = () => {

    client.send(JSON.stringify(apiCall));
  
    //client.send(`{"email": "${localStorage.getItem('user-email')}", "plataformaId": ${IdRecebido.id}}`)
}

client.onmessage = (message) => {
  if (message.data) {
      const parsedData = JSON.parse(message.data)
      console.log("exibindo", message.data)
      console.log("exibindo PARSE", parsedData)
      setResponseScocket(parsedData)
  }
}


return () => {
  client.close()
}

}



   
    return (
      <Container>
        
       
       
        <div className="alert alert-warning">
        <ConnectedUsers id={IdRecebido.id}  email={responseSocket}>
          
          
          </ConnectedUsers>
        <h4 className="alert-heading">Informações</h4>
        <p className="mb-0">{plataforma.inf_plataforma}</p>
        </div>
       
        <Tabs>
    <TabList>
      <Tab>Nodes</Tab>
      <Tab>Equipamentos</Tab>
    </TabList>

    <TabPanel>
    <SearchBox
                  placeholder="Nome da posição"
                  handleChange={(event) =>
                  setSearchfield(event.target.value)
                  }
                />



      <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Porta ssh</th>
                    <th scope="col">Porta vnc</th>
                    <th scope="col">Porta RDP</th>
                    <th scope="col">IP</th>
                    <th scope="col">Conectar Usando</th>
                  </tr>
                </thead>
                
                <tbody>
                  {nodes.filter((posicao) => posicao.nome_node.toLowerCase().includes(searchfield.toLowerCase())).map((node) => {
                    return(
                      <tr>
                        <th scope="row">{node.nome_node}</th>
                        <td>{node.ssh_node}</td>
                        <td>{node.vnc_node}</td>
                        <td>{node.rdp_node}</td>
                        <td>{node.router_node}</td>
                        <td>
                          {node.vnc_node === '' ? (
                           ''
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={(event) =>
                                conectToVnc(
                                  event,
                                  node.router_node,
                                  node.vnc_node,
                                  node.nome_node
                                )
                              }
                            >

                              VNC
                            </button>
                          )}

                          {node.ssh_node === '' ? (
                           ''
                          ) : (
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={(event) =>
                                conectToSSH(
                                  event,
                                  node.router_node,
                                  node.ssh_node
                                )
                              }
                            >
                              SSH
                            </button>
                          )}


                          {node.rdp_node === '' ? (
                           ''
                          ) : (
                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={() =>
                                connectRDP(
                                  
                                  node.router_node,
                                  node.rdp_node)
                              }
                            >
                              RDP
                            </button>
                          )}  
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
    </TabPanel>
    <TabPanel>
      
    { role !== 1 ? (
    <div>
     

                {equipamento.map((equipamentos) => {
                  return (
                    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{equipamentos.nome_equip}</Accordion.Header>
        <Accordion.Body>
          <ul>
        <li>
        <h4>Informação:</h4>
        <h5>{equipamentos.inf_equip}</h5>
        </li>
        <li>
        <h4>Tipo:</h4>
        <h5>{equipamentos.tipo_equip}</h5>
        </li>
        <li>
        <h4>Local:</h4>
        <h5>{equipamentos.local_equip}</h5>
        </li>
        <li>
        <h4>ILO/IDRAC:</h4>
        <h5>{equipamentos.url_equip}</h5>
        </li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
                  );
                })}
               
              </div>
               ) : "Acesso não Permitido"}
    </TabPanel>
  </Tabs>
 
    
      </Container>
    );
  }

export default ListaNode;
