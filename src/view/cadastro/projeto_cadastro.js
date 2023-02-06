import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjetoService from '../../Controller/projeto_service';
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Cancelar from '../../Componentes/cancelar'



function CadastroProjeto()  {

  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [atualizando, setAtualizando] = useState(false)
  const [isError, setIsError] = useState(false)
  const [privateProj, setPrivateProj] = useState(0)
  let IdRecebido  = useParams();
  const service = new ProjetoService();
  




  //state = estadoInicial;

 
  const onSubmit = (event) => {
    event.preventDefault();

if(nome === ''){
  setIsError(true);

}else{


    const projeto = {
      id,
      nome,
      privateProj
    };
    
    
    if (projeto.id) {
      
      service.salvar(projeto);
    } else {
     
      service.updateProjeto(projeto);
    }

    
    limpaCampos(event);
    setSucesso(true)
  }
  };

  const limpaCampos = (e) => {
    e.preventDefault()
    setId('')
    setNome('')
    setSucesso(false)
    setAtualizando(false)
    setIsError(false)
    setPrivateProj(0)
   
  };


  useEffect (  () => {
    async function load(){
      
   setId(IdRecebido.id)
   console.log(id)

    if (id){
    const projeto = await service.buscaProjeto(id);
    console.log("mostrando projeto", projeto)
    
    setNome(projeto.nome_projeto)
    setPrivateProj(projeto.private_projeto)
   
        }


  }

load();

},[id])

  
    return (
      <Container>
      <div className="card">
        <div className="card-header">Cadastro de Projetos</div>
        <div className="card-body">
          {sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Projeto gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a':'black' , }} >Nome Projeto:*</label>
                <input
                  type="text"
                  name="nome"
                  onChange={(e ) =>setNome(e.target.value)}
                  value={nome}
                  className="form-control"
                  style={{ background: isError ?  '#FFCCCB': 'white' , }}
                />
                 </div>
            </div>
                <div className="col-md-5">
              <div className="form-group">
              <label   for="exampleSelect1">Projeto Tipo:*</label>
              <Form.Select name="privateProj"
                  value={privateProj}
                  onChange={(e ) =>setPrivateProj(e.target.value)}
                  className="form-control"
                  id="projectTypeSelect">
       
                <option value="0">Comum</option>
                <option value="2">Convidado</option>
                <option value="1">Administrador</option>
              </Form.Select>
                   </div>
          </div>
          </div>
          
          <div className="row">
            <div className="col-md-1">
              <button className="btn btn-success" onClick={(e) =>onSubmit(e)}>
                Salvar
              </button>
            </div>

            <div className="col-md-1">
              <button className="btn btn-warning" onClick={(e) =>limpaCampos(e)}>
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

export default  CadastroProjeto;
