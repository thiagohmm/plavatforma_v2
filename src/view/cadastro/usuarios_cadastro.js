import React , { useState,  useEffect } from 'react';
import UserService from '../../Controller/usuarios.service'
import Cancelar from '../../Componentes/cancelar'
import { Container } from "react-bootstrap";

function CadastroUsuario(props) {

  
  const [usuarios, setusUsuarios] = useState([]);
  const [passwd, setPasswd] = useState('');
  const [user, setUser] = useState('');
  const [isError, SetisError] = useState(true);
  const [sucesso, Setsucesso] = useState(false);
  const service = new UserService();

   useEffect (  () => {
     async function load(){
     const usuariosl = await service.lusuarios();
     setusUsuarios(usuariosl)
     
    }
   
    load();
   
   },[usuarios])

const verificaUsuario = (user) =>{
  let count = 0 ;
  usuarios.forEach((nome) => {

    let teste = JSON.stringify(nome.user_user).replace(/['"]+/g, '')
    if (teste.trim().localeCompare(user.trim()) === 0)
      // console.log(teste.trim().localeCompare(user.trim()))
      // console.log(` ${teste} comparado a ${user} `)
      count = count + 1;
     
     

  })
  return count;


}

const Limpar = () => {
  setUser('');
  setPasswd('');
  SetisError(true);

  document.getElementById("user").value = "";
  document.getElementById("password").value = "";
  
}
 
  const onSubmit = (event) => {
    event.preventDefault();
    
     if (verificaUsuario(user) === 0 && user != "" && passwd != "" ){

      const usuario = {
        usuario: user,
        passwd: passwd,
      };
     
      service.salvar(usuario)
      Setsucesso(true);
      Limpar()

     }else{
      SetisError(false);
      Setsucesso(false);
       //alert("usuario ja existe")
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
        <div className="col-md-3">
          <div className="form-group">
            <label style={{ color: isError ? 'black' : '#f70d1a', }}>Usuario:*</label>
            <input
              id="user"
              type="text"
              name="user"
              onChange={e => setUser(e.target.value)}
              className="form-control"
              style={{ background: isError ? 'white' : '#FFCCCB', }}
              
            />
            
          </div>
          
        </div>
        <div className="col-md-3">
          
            <label>Senha:*</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={e => setPasswd(e.target.value)}
              className="form-control"
            />
                                
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