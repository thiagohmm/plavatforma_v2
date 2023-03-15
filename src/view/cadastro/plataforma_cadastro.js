import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import PlataformaService from '../../Controller/plataforma_service';
import ProjetoService from '../../Controller/projeto_service';
import Cancelar from "../../Componentes/cancelar"
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';



function CadastroPlataforma() {

  const [id, setId] = useState('')
  const [nome_plataforma, setNome] = useState('')
  const [alias_plataforma, setAlias] = useState('')
  const [active_plataforma, setActive] = useState(1)
  const [inf_plataforma, setInf] = useState('')
  const [host_projt_id, setHostProjt] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [projetos, setProjetos] = useState([])
  const [isError, setIsError] = useState(false)
  const [privatePlat, setPrivatePlat] = useState(0)

  let IdRecebido = useParams();
  let navigate = useNavigate();
  const serviceProj = new ProjetoService();
  const servicePlat = new PlataformaService();





  const setCheckVariable = (event) => {
    
    if (event.target.checked == true) {

      setActive(1)
    } else {
      setActive(0)
    }
  };

  useEffect(() => {
    async function load() {
      setId(IdRecebido.id)
     
      const projetos = await serviceProj.lprojetos();
      setProjetos(projetos);

      if (id) {
        const plat = await servicePlat.getplataformaName(id);
        setNome(plat.nome_plataforma)
        setAlias(plat.alias_plataforma)
        setActive(plat.active_plataforma)
        setInf(plat.inf_plataforma)
        setHostProjt(plat.host_projt_id)
        setPrivatePlat(plat.private_plataforma)
        setId(id);
        document.getElementById('projectSelect').value = plat.host_projt_id
        verifySelect(plat.active_plataforma);
      }

    }

    load();

  }, [id])


  const verifySelect = (param) => {
    
    if (param === 1) {
     
      document.getElementById('active').checked = true
    } else {
     
      document.getElementById('active').checked = false
    }
  }

  const getselect = () => {
    let e = document.getElementById('projectSelect');
    let value = e.options[e.selectedIndex].value;
    return value;
  };


  const onSubmit = (event) => {
    event.preventDefault();

    if (nome_plataforma === '' || alias_plataforma === "" || host_projt_id === '') {

      setIsError(true)

    } else {


      
      const plataforma = {
        id,
        nome: nome_plataforma,
        alias: alias_plataforma,
        active_plataforma: parseInt(active_plataforma, 10),
        inf_plataforma,
        host_projt_id: parseInt(host_projt_id, 10),
        privatePlat: parseInt(privatePlat, 10)
      };
      if (id === undefined) {
        servicePlat.salvar(plataforma);
      } else {
        
        servicePlat.updatePlataforma(plataforma)
        navigate(`/gerenciaPlataforma`)
      }

      limpaCampos(event);
      setSucesso(true)


      setCheckVariable();
    }
  };

  const limpaCampos = (event) => {
    event.preventDefault()
    setId('')
    setNome('')
    setAlias('')
    setActive(1)
    setInf('')
    setHostProjt('')
    setSucesso(false)
    setProjetos([])
    setIsError(false)
    setPrivatePlat(0)
  };

  return (
    <Container>
      <div className="card">
        <div className="card-header">Cadastro de Plataforma</div>
        <div className="card-body">
          {sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Plataforma gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a' : 'black', }} >Nome Plataforma:*</label>
                <input
                  type="text"
                  name="nome_plataforma"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome_plataforma}
                  className="form-control"
                  style={{ background: isError ? '#FFCCCB' : 'white', }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a' : 'black', }} >Alias Plataforma:*</label>
                <input
                  type="text"
                  name="alias_plataforma"
                  onChange={(e) => setAlias(e.target.value)}
                  value={alias_plataforma}
                  className="form-control"
                  style={{ background: isError ? '#FFCCCB' : 'white', }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a' : 'black', }} for="exampleSelect1">Projeto:*</label>

                <select
                  name="host_projt_id"
                  onChange={(e) => setHostProjt(e.target.value)}
                  value={host_projt_id}
                  className="form-control"
                  id="projectSelect"
                  style={{ background: isError ? '#FFCCCB' : 'white', }}
                >
                  <option value="N/A"></option>
                  {projetos.map((projetos) => {
                    return (
                      <option value={projetos.id_projeto}>
                        {projetos.nome_projeto}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">

                <label>Plataforma ativa:</label>
                <input
                  id="active"
                  type="checkbox"
                  name="active_plataforma"
                  value={active_plataforma}
                  onClick={setCheckVariable}
                />

              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label for="exampleSelect1">Plataforma Tipo:*</label>
                <Form.Select name="privatePlat"
                  value={privatePlat}
                  onChange={(e) => setPrivatePlat(e.target.value)}
                  className="form-control"
                  id="projectTypeSelect">

                  <option value="0">Administrador</option>
                  <option value="2">Convidado</option>
                  <option value="1">Comum</option>
                </Form.Select>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-12">

              <label>Informações</label>
              <textarea class="form-control"
                id="exampleTextarea" rows="3"
                name="inf_plataforma"
                onChange={(e) => setInf(e.target.value)}
                value={inf_plataforma}></textarea>
            </div>
          </div>

          <br></br>

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

export default CadastroPlataforma;
