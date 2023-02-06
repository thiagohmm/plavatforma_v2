
import React, { useEffect, useState }from 'react';

import { Outlet, Router } from "react-router-dom";
import Menu from "./Componentes/Menu/Menu"

import autenticacao from './Controller/authentication_service';
import { useNavigate } from "react-router-dom";


function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roleUser, setRoleUser] = useState();
    const service = new autenticacao()
    let navigate = useNavigate();

    const  applyRoleUser = async () => {
        const role = await service.lprofile()
        
        if (role === '500'){
            console.log(role)
            console.log("caiu aqui")
            localStorage.clear();
            localStorage.setItem('user-token', null);
            localStorage.setItem('user-role', null);
            setIsLoggedIn(false)
            navigate('/login')
        }else if ( role.role_user){
            setRoleUser(role.role_user)
             localStorage.setItem('user-role', role.role_user);

        }
    }


    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
        applyRoleUser();
    }, [isLoggedIn]);
	

    useEffect(() => {
        
        applyRoleUser();
    }, []);
	
	return (
		<React.Fragment>
			{isLoggedIn && <Menu userMenu={roleUser}/>}
			<Outlet />
			
		</React.Fragment>
	);
}

export default App;
