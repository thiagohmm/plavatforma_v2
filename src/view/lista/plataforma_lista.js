import React, { useState, useEffect } from 'react';

import PlataformaService from '../../Controller/plataforma_service';
import { Container } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';


function ListaPlataforma() {
  
  const [plataforma, setPlataforma] = useState([])
  const plataformaservice = new PlataformaService();
  let IdRecebido = useParams();
  

 

    useEffect(() => {
      async function load() {
        
    const idprojeto = IdRecebido.id;
    const listplataformasProj = await plataformaservice.listaplataformaProj(
      idprojeto
    );
    
    setPlataforma(listplataformasProj)
  }

load();

}, [])


  
    return (
      <Container>
      <div className="jumbotron">
        <h1 className="display-6">Plataforma Unificada</h1>
        <p className="lead"></p>
        <hr className="my-3" />
        <div className="row">
          {plataforma.map((plataforma) => {
            return (
              <div className="col-md-4">
                <div className="form-group">
                  <div className="alert alert-dismissible alert-info">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    ></button>
                    <p>
                      <strong> {plataforma.nome_plataforma}</strong>
                      <span
                        style={{
                          float: 'right',
                        }}
                        className="badge badge-dark"
                      >
                        <Link
                          to={{
                            pathname: `/listaNodes/${plataforma.id}`,
                          }}
                        >
                          Ir
                        </Link>
                      </span>
                    </p>
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
export default ListaPlataforma;
