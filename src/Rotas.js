/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Routes,Route, Navigate } from "react-router";
import Home from "./Componentes/home";
import Login from "./Componentes/Login/login";
import Projeto from "./view/cadastro/projeto_cadastro"
import CadastroPlataforma from "./view/cadastro/plataforma_cadastro"
import CadastroNode from "./view/cadastro/node_cadastro"
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
				</Route>
			</Routes>
    </>
  )
}