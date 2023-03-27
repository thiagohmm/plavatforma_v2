import React , { useState,  useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import UserService from '../../Controller/usuarios.service'
import Cancelar from '../../Componentes/cancelar'
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function CadastroUsuario(props) {

  
  
  const [id, setId] = useState('');
  const [passwdExisted, setPasswdExisted] = useState('');
  const [passwd, setPasswd] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0)
  const [ativo, setAtivo] = useState(false)
  const [isError, SetisError] = useState(true);
  const [sucesso, Setsucesso] = useState(false);
  const service = new UserService();
  let IdRecebido = useParams();
  const navigate = useNavigate();





  const setCheckVariable = (event) => {
    
    if (event.target.checked === true) {

      setAtivo(true)
    } else {
      setAtivo(false)
    }
  };


  const verifySelect = (param) => {
    
    if (param === true) {
     
      document.getElementById('active').checked = true
    } else {
     
      document.getElementById('active').checked = false
    }
  }



   useEffect (  () => {
     async function load(){
      setId(IdRecebido.id)
     
      
    
      if (id) {
        const userReceived = await service.listUsersById(id);
        console.log(userReceived)
        setId(id);
        setEmail(userReceived.email_user);
        setPasswd(userReceived.passwd_user)
        setPasswdExisted(userReceived.passwd_user)
        setRole(userReceived.role_user)
        verifySelect(userReceived.ativo_user);
        if (userReceived.ativo_user === 0){
          setAtivo(false)
        }else{
          setAtivo(true)
        }
       
       
      }
   
    
    }
    load();
   },[id])


const Limpar = () => {
  setEmail('');
  setPasswd('');
  SetisError(true);
 
}
 
  const onSubmit = async (event) => {
    event.preventDefault();
    
     if (email != "" ){
      let usuario = {}

      if (passwd === passwdExisted){

         usuario = {
        id_user: id,
        email_user: email,
        ativo_user: ativo,
        role_user: parseInt(role, 10)
     
          }
          await service.updateUsers(usuario)
          console.log("Dados recebidos sem passwd", usuario) 
      }else{

      usuario = {
        id_user: id,
        email_user: email,
        ativo_user: ativo,
        role_user: parseInt(role, 10),
        passwd_user: passwd,
        mudaPasswd: true
      }
        await service.updateUsers(usuario)
        console.log("Dados recebidos", usuario)
     
     }
     navigate(`/gerenciaUsuarios`)
      }
        else{
      SetisError(false);
      Setsucesso(false);
      
     }
    
  }

  return(
    <Container>
    <div className="card">
    <div className="card-header">Cadastro de Usuários</div>
    <div className="card-body">
    {sucesso ? (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Usuário gravado com Sucesso</strong>
            </div>
          ) : (
            <> </>
          )}
       <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label style={{ color: isError ? 'black' : '#f70d1a', }}>Email:*</label>
            <input
              id="user"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-control"
              style={{ background: isError ? 'white' : '#FFCCCB', }}
              disabled
            />
            
          </div>
          
        </div>
        <div className="col-md-4">
          
            <label>Senha:</label>
            <input
              id="password"
              type="password"
              name="passwd"
              value={passwd}
              onChange={e => setPasswd(e.target.value)}
              className="form-control"
            />
                                
        </div>
           
        <div className="col-md-4">
         
             

                <label>Usuario Ativo:</label>
                <Form.Check 
                type="switch"
                 id="active"
                 name="ativo"
                 value={ativo}
                 onClick={setCheckVariable}
        //label="Check this switch"
      />
            </div>
          
          </div>
         
          <div className="row">
        <div className="col-md-4">
          <div className="form-group">
                <label for="exampleSelect1">Tipo De Usuário:*</label>
                <Form.Select name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                  id="projectTypeSelect">
                  
                  <option value="0">Comum</option>
                  <option value="1">Administrador</option>
                  <option value="2">Convidado</option>
                  

                </Form.Select>
            
                </div>
            
            </div>

            </div>

            

      
      <div className="row">
        <div className="col-md-1">
          <button className="btn btn-success" onClick={onSubmit}  >
            Salvar
          </button>
        </div>

        <div className="col-md-1">
          <button className="btn btn-warning" onClick={Limpar}>
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

  )

}

export default CadastroUsuario;