import React , { useState,  useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Busca from '../busca';
import logout from '../../util/logout';
import { useNavigate } from 'react-router-dom';

export const RoleUser = "user-role";

export const getRoleUser = () => localStorage.getItem(RoleUser);

function Menu(props) {
 
  const [roleUserMenu, setRoleUserMenu] = useState(props.userMenu);
  let navigate = useNavigate();
  

  useEffect(() => {
    setRoleUserMenu(props.userMenu)
   
    
}, []);



const refreshPage = () => {
  navigate(0);
}

  return (
    <Container>
      {refreshPage}
      { props.userMenu === 1 ?(
    <Navbar bg="secondary" variant="dark" expand="lg"  >
      
        <Navbar.Brand href="#home">WebPlataforma</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            
            <NavDropdown title="Cadastrar" id="basic-nav-dropdown">
              <NavDropdown.Item href="/cadastro-projeto">Projeto</NavDropdown.Item>
              <NavDropdown.Item href="/cadastro-plataforma">Plataforma</NavDropdown.Item>
              <NavDropdown.Item href="/cadastro-nodes">Nodes</NavDropdown.Item>
              <NavDropdown.Item href="/cadastro-equipamento">Equipamento</NavDropdown.Item>
              
              
            </NavDropdown>
            <NavDropdown title="Gerenciar" id="basic-nav-dropdown">
              <NavDropdown.Item href="/gerenciaProjeto">Projeto</NavDropdown.Item>
              <NavDropdown.Item href="/gerenciaPlataforma">Plataforma</NavDropdown.Item>
              <NavDropdown.Item href="/gerenciaNodes">Nodes</NavDropdown.Item>
              <NavDropdown.Item href="/gerenciaEquipamentos">Equipamento</NavDropdown.Item>
              <NavDropdown.Item href="/gerenciaUsuarios">Usuários</NavDropdown.Item>
              
            </NavDropdown>
            <Nav.Link href="/" onClick={logout} >Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
     <Busca/>
     
    </Navbar>
       ):(<Navbar bg="secondary" variant="dark" expand="lg"  >
      
       <Navbar.Brand href="#home">WebPlataforma</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
           <Nav.Link href="/">Home</Nav.Link>
           <Nav.Link href="/" onClick={logout} >Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
     <Busca/>
     </Navbar>
     )}
   
    </Container>
  );
}

export default Menu;