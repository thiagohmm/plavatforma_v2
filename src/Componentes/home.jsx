import React , { useState,  useEffect } from 'react';
import { Container } from "react-bootstrap";
import ProjetoService from '../Controller/projeto_service';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




function Home() {
  let navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);
  
  const service = new ProjetoService();

    const forceUpdate = React.useCallback(() => React.updateState({}), []);

  useEffect (  () => {
    async function load(){
    const projetosLoad = await service.lprojetos();

    setProjetos(projetosLoad)
    
    
  }
    
    load();
   
  },[])

  

  const refreshPage = () => {
    navigate(0);
  }
  


const listaPlataformaporProjeto = (id) => {
  navigate(`/listaPlataforma/${id}`);
};

const onImageError = (e) => {
  e.target.src = placeholderImage
}
 
const placeholderImage = `${process.env.PUBLIC_URL}../../../skycontrol2.png`
  return ( 
   
    <Container>
          <div className="jumbotron" >
        <h1 className="display-3">Plataforma Unificada</h1>
        <p className="lead"></p>
        <hr className="my-3" />
        <div className="row">
        {refreshPage}
        {projetos.map((projetos) => {
              return (
                <div class="col-md-4">
              <div class="col-md-12 col-bg-color">
              <div class="row">
             
                <Card style={{ width: '300px', color: 'Black', fontSize: '33vw', backgroundColor: "white", border: '1px solid',  borderRadius: '10 px', margin: 5}}>
                
                <Card.Img variant="top" src={`${process.env.PUBLIC_URL}../../../${projetos.nome_projeto.toLowerCase()}.png` ? `${process.env.PUBLIC_URL}../../../${projetos.nome_projeto.toLowerCase()}.png` : placeholderImage} alt="cover image"
              onError={onImageError}/>
                             

                <Card.Body  >

                  <Card.Title> {projetos.nome_projeto}</Card.Title>
                  <Card.Text style={{ display: 'blocks', position: 'relative', alignItems: 'flex-end', float: 'right'}}>
                  <Button  style={{border: 'none',  borderRadius: '50%'}} variant="secondary" onClick={() =>
                          listaPlataformaporProjeto(projetos.id_projeto)
                        }>Ir</Button>
                  </Card.Text>
                  
                </Card.Body>
              </Card>

              </div>
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