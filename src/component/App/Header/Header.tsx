import React, { useEffect, useState } from 'react';
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Conteudo from "../../../shared-component/Conteudo/Conteudo";
import { Link, useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

function Header() {
    const location = useLocation();
    const cookies = new Cookies();
    const [showMenu, setShowMenu] =  useState(true);
    const [nameUser, setNameUser] = useState('');
    
    useEffect(() => {
        const token = cookies.get('Token');
        if (!token) {
            return 
        }
        const object = JSON.parse(atob(token.split('.')[1]))
        setNameUser(object['nome']); 
    }, []);

    function exibindoNavbar() {
        return location.pathname === '/login' || location.pathname === '/nao-autorizado';
    }    

    return <div className="AppHeader" hidden={ exibindoNavbar() }>
            <Conteudo>
                <div className='Container'>
                    <div className='Logo'>
                        <Link to="/mesa-virtual"><b>SIM!</b></Link>
                    </div>
                    <div className="menu">
                        <Button href="#" onClick={() => setShowMenu(false)}><MenuIcon sx={{ color: 'white' }} fontSize="large" /></Button>
                    </div> 
                </div>
            </Conteudo>

            <ul className="navbar-menu" hidden={showMenu}>

               <button  className='buttondoheader' onClick={() => setShowMenu(true)}> 
                    <CloseIcon sx={{ color: 'white' }} fontSize="small" />
                </button> 

                <li className="navbar-usuario"><p>{nameUser.toUpperCase()}</p></li>
                <li className="navbar-menu-item"><Link to="/mesa-virtual">Home</Link></li>  
                <li className="navbar-menu-item"><Link to="/documento">Criar documento</Link></li>
                <li className="navbar-menu-item"><Link to="/listar-usuario">Cadastro usuário</Link></li>
                <li className="navbar-menu-item"><Link to="/home-orgao">Cadastro Organização</Link></li>
                <li className="navbar-menu-item"><Link to="/cadastro-orgao">Cadastro Departamento</Link></li>
                <li className="navbar-menu-item"><Link to={"/permissoes-usuario"}>Permissoes para usuário</Link></li>

            </ul>

        </div>
}

export default Header