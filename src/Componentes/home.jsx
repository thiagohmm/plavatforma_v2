import React , { useState,  useEffect } from 'react';
import { Container } from "react-bootstrap";
import ProjetoService from '../Controller/projeto_service';
import { useNavigate } from 'react-router-dom';


function Home() {
  let navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);
  const service = new ProjetoService();

    const forceUpdate = React.useCallback(() => React.updateState({}), []);

  useEffect (  () => {
    async function load(){
    const projetos = await service.lprojetos();
    setProjetos(projetos)
    
    }
    
    load();
   
  },[])

  const refreshPage = () => {
    navigate(0);
  }
  


const listaPlataformaporProjeto = (id) => {
  navigate(`/listaPlataforma/${id}`);
};


  return ( 
   
    <Container>
          <div className="jumbotron">
        <h1 className="display-3">Plataforma Unificada</h1>
        <p className="lead"></p>
        <hr className="my-4" />
        <div className="row">
        {refreshPage}
        {projetos.map((projetos) => {
              return (
              <div
                style={{
                  height: 85,
                  margin: 5,
                  float: 'left',
                  backgroundColor: '#E8E8E8',
                  border: '1px solid #000000',
                }}
                className="card col-md-2"
              >
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      alignContent: 'left',
                      font: 'small-caps bold 20px Georgia, serif',
                    }}
                  >
                    {projetos.nome_projeto}
                    <p className="card-text">
                      <span
                        style={{
                          float: 'right',
                        }}
                        className="badge badge-light"
                        onClick={() =>
                          listaPlataformaporProjeto(projetos.id_projeto)
                        }
                      >
                        Ir
                   
                      </span>
                    </p>
                  </h5>
                </div>
              </div>
          
              );
                      })}
        </div>
      </div>
  </Container>
   );
  }
               
export default Home;