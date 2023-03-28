import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./style.css";
import { useNavigate } from "react-router";
import Autentica_service from '../../Controller/authentication_service'

import { Link } from "react-router-dom";

function Login({ setToken }) {
  // React States
  const [erro, setErro] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [retypepass, setRetypePass] = useState();
  const [modalShow, setModalShow] = useState(false);

  const service = new Autentica_service()
 


  let navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    
    const autenticacao = {
      email: username,
      passwd: password
    };
   
    
    const token = await service.autentica(autenticacao)
    console.log("Exibindo", token[0])
    if( token.length >0){
      localStorage.clear();
            localStorage.setItem('user-token', token);
            setTimeout(() => {
                navigate('/');
            }, 500);

    }else{
      console.log("Caiu aqui")
      setErro(true);
    }

  }

  const handleRegister = async e => {
    e.preventDefault();

    if (password !== retypepass){
      setErro(true);
    }else{

      const registerObj ={
        email: username,
        passwd: password
      }

    const register = await service.register(registerObj)
    setModalShow(false)

    }


  }

  // JSX code for login form
  return (

    
    <div className="app">
    {modalShow == false ?(  
      <div className="login-form">
    <div className="form">
    <div className="title">Entrar</div>
   
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" onChange={e => setUserName(e.target.value)} name="uname" required />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" onChange={e => setPassword(e.target.value)} name="pass" required />
          {erro ?  <div className="error">Erro de Autenticação</div> : <div></div>} 
        </div>
        <div className="button-container">
          <input type="submit"  value="Login"/>
          
        </div>
      </form>

      <div className="register"><Link onClick={() => setModalShow(true)} >Registrar</Link>
    
      </div>
     </div>
    </div>
     ):(
     <div className="login-form">
     <div className="form">
     <div className="title">Entrar</div>
    
       <form onSubmit={handleRegister}>
         <div className="input-container">
           <label>Email </label>
           <input type="text" onChange={e => setUserName(e.target.value)} name="uname" required />
           
         </div>
         <div className="input-container">
           <label>Senha </label>
           <input type="password" onChange={e => setPassword(e.target.value)} name="pass" required />
           <label>Confirmar senha </label>
           <input type="password" onChange={e => setRetypePass(e.target.value)} name="retypepass" required />
           {erro ?  <div className="error">Erro na Confirmação</div> : <div></div>} 
         </div>
         <div className="button-container">
           <input type="submit" value="Registrar"/>
           
         </div>
       </form>
 
       <div className="register"><Link onClick={() => setModalShow(false)} >Login</Link>
     
       </div>
      </div>
     </div>
     )}
    </div>
   
    
  );

 
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;