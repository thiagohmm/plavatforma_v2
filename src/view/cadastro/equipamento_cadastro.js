import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlataformaService from '../../Controller/plataforma_service';
import EquipamentoService from '../../Controller/equipamento_service';
import Cancelar from "../../Componentes/cancelar"
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';




function CadastroEquipamento() {

  const [id_equip, setId] = useState('')
  const [nome_equipamento, setNome] = useState('')
  const [tipo_equipamento, setTipo] = useState('')
  const [local_equipamento, setLocal] = useState('')
  const [inf_equipamento, setInf] = useState('')
  const [url_equipamento, setUrl] = useState('')
  const [equip_plat_id, setEquipPlatId] = useState('')
  const [equipamentos, setEquipamentos] = useState([])
  const [plataforma, setPlataforma] = useState([])
  const [sucesso, setSucesso] = useState(false)
  const [isError, setIsError] = useState(false)
   
  let IdRecebido = useParams();
  const  plataformaService = new PlataformaService();
  const equipamentoService = new EquipamentoService();
  const navigate = useNavigate();



  

    useEffect(() => {
      async function load() {
        setId(IdRecebido.id)
       
   
    const plataformas = await plataformaService.lplataforma();
    
    setPlataforma(plataformas)

    if (id_equip){
      const equip = await equipamentoService.listaequipById(id_equip);
      setNome(equip.nome_equip)
      setTipo(equip.tipo_equip)
      setLocal(equip.local_equip)
      setInf(equip.inf_equip)
      setEquipPlatId(equip.equip_plat_id)
      setUrl(equip.url_equip)
      document.getElementById('tipoEquip').value = equip.tipo_equip
      document.getElementById('plataformaSelect').value = equip.equip_plat_id

      }
  }
  load();

}, [id_equip])

  const getselect = () => {
    let e = document.getElementById('plataformaSelect');
    let value = e.options[e.selectedIndex].value;
    return value;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if(nome_equipamento === '' || local_equipamento ==="" || equip_plat_id === ''){
     setIsError(true)
    
    }else{
    

    const equip = {
      id_equip,
      nome: nome_equipamento,
      tipo: tipo_equipamento,
      local: local_equipamento,
      inf: inf_equipamento,
      url: url_equipamento,
      equip_plat_id: parseInt(getselect(),10),
     
    };
      if (id_equip === undefined){
           equipamentoService.salvar(equip);
      }
      else{
        
          equipamentoService.updateEquipamentos(equip)
          navigate("/gerenciaEquipamentos");
       }
    limpaCampos(event);

    
    setSucesso(true)
    }
  };

  const limpaCampos = (event) => {
    event.preventDefault()
    setNome('')
    setTipo('')
    setLocal('')
    setInf('')
    setUrl('')
    setSucesso(false)
    setIsError(false)
    document.getElementById('tipoEquip').value = ''
    document.getElementById('plataformaSelect').value = ''
      };
  
    return (
      <Container>
      <div className="card">
        <div className="card-header">Cadastro de Equipamentos</div>
        <div className="card-body">
          {sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Equipamento gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a':'black' , }} >Nome Equipamento:*</label>
                <input
                  type="text"
                  name="nome_equipamento"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome_equipamento}
                  className="form-control"
                  style={{ background: isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="exampleSelect1">Tipo Equipamento</label>
                <select
                  name="tipo_equipamento"
                  onChange={(e) => setTipo(e.target.value)}
                  className="form-control"
                  id="tipoEquip"
                >
                  <option value=""></option>
                  <option value="Servidor Discreto">Servidor Discreto</option>
                  <option value="Servidor Blade">Servidor Blade</option>
                  <option value="Workstation">Workstation</option>
                  <option value="Notebook">Notebook</option>
                  <option value="Switch">Switch</option>
                  <option value="Router">Router</option>
                  <option value="Router">Storage</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a':'black' , }} >Local Equipamento:*</label>
                <input
                  type="text"
                  name="local_equipamento"
                  onChange={(e) => setLocal(e.target.value)}
                  value={local_equipamento}
                  className="form-control"
                  style={{ background: isError ?  '#FFCCCB': 'white' , }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <div class="form-check">
                  <label for="exampleTextarea">Informação Equipamento</label>
                  <textarea
                    name="inf_equipamento"
                    value={inf_equipamento}
                    onChange={(e) => setInf(e.target.value)}
                    className="form-control"
                    id="exampleTextarea"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ color: isError ? '#f70d1a':'black' , }}>Plataforma:*</label>
                <select
                  name="equip_plat_id"
                  onChange={(e) => setEquipPlatId(e.target.value)}
                  className="form-control"
                  id="plataformaSelect"
                  style={{ background: isError ?  '#FFCCCB': 'white' , }}
                >
                   <option value=""></option>
                  {plataforma.map((plataformas) => {
                    return (
                      <option value={plataformas.id}>
                        {plataformas.nome_plataforma}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>


            <div className="col-md-6">
              <div className="form-group">
                <div class="form-check">
                  <label for="url_equipamento">Gerenciamento Externo (ILO, IDRAC ou Adm. Web) </label>
                  <input
                    type='text'
                    name="url_equipamento"
                    value={url_equipamento}
                    onChange={(e) => setUrl(e.target.value)}
                    className="form-control"
                    id="url_equipamento"
                    placeholder='https://'
                  ></input>
                </div>
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


export default CadastroEquipamento;
