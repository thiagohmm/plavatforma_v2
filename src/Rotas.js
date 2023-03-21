/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Routes,Route, Navigate } from "react-router";
import Home from "./Componentes/home";
import Login from "./Componentes/Login/login";
import Projeto from "./view/cadastro/projeto_cadastro"
import CadastroPlataforma from "./view/cadastro/plataforma_cadastro"
import CadastroNode from "./view/cadastro/node_cadastro"
import CadastroEquipamento from "./view/cadastro/equipamento_cadastro";
import ListaPlataforma from "./view/lista/plataforma_lista"
import ListaNode from "./view/lista/node_lista";
import GerenciaProjeto from './view/gerenciamento/gerencia_projeto';
import GerenciaPlataforma from './view/gerenciamento/gerencia_plataforma';
import GerenciaNodes from './view/gerenciamento/gerencia_nodes';
import GerenciaEquipamentos from "./view/gerenciamento/gerencia_equipamento";
import GerenciaUsuarios from "./view/gerenciamento/gerencia_usuarios"
import RDPConnection from "./util/rdpConnection";
import ProtectedRoute from './util/ProtectedRoute';
import App from './App';


export default () => {
  return(
    <>
    <Routes>
				  
					<Route path='/login' element={<Login />} />
					
					
				<Route path="/" element={<App />}>
					<Route path='' element={<ProtectedRoute><Home />			
						</ProtectedRoute>
					} />
					<Route path="/cadastro-projeto/:id?" element={<ProtectedRoute><Projeto/></ProtectedRoute>}/>
					<Route path="/cadastro-plataforma/:id?" element={<ProtectedRoute><CadastroPlataforma /></ProtectedRoute>}/>
					<Route path="/cadastro-nodes/:id?" element={<ProtectedRoute><CadastroNode/></ProtectedRoute>}/>
					<Route path="/cadastro-equipamento/:id?" element={<ProtectedRoute><CadastroEquipamento/></ProtectedRoute>}/>
					<Route path="/listaPlataforma/:id?" element={<ProtectedRoute><ListaPlataforma/></ProtectedRoute>}/>
					<Route path="/listaNodes/:id?" element={<ProtectedRoute><ListaNode/></ProtectedRoute>}/>
					<Route path="/gerenciaProjeto/" element={<ProtectedRoute><GerenciaProjeto/></ProtectedRoute>}/>
					<Route path="/gerenciaPlataforma/" element={<ProtectedRoute><GerenciaPlataforma/></ProtectedRoute>}/>
					<Route path="/gerenciaNodes/" element={<ProtectedRoute><GerenciaNodes/></ProtectedRoute>}/>
					<Route path="/gerenciaEquipamentos/" element={<ProtectedRoute><GerenciaEquipamentos/></ProtectedRoute>}/>
					<Route path="/gerenciaUsuarios/" element={<ProtectedRoute><GerenciaUsuarios/></ProtectedRoute>}/>
				  <Route path="/rdp/:host/:porta" element={<ProtectedRoute><RDPConnection/></ProtectedRoute>}/>
				</Route>
			</Routes>
    </>
  )
}