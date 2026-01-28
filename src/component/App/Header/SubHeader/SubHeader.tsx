import React, { useEffect, useState } from "react";
import './SubHeader.css' 
import { Avatar, Chip } from "@mui/material";
import Conteudo from "../../../../shared-component/Conteudo/Conteudo";
import Button from "../../../../shared-component/Button/Button";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router";

function SubHeader() {
    const [seconds, setSeconds] = useState(0);
    const location = useLocation();
    const [nameUser, setNameUser] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
        const token = cookies.get('Token');
        if (!token) {
            return 
        }
        const object = JSON.parse(atob(token.split('.')[1]))
        setNameUser(object['nome']);
    }, [cookies]);

    function logout() {
        cookies.remove('Token', { path: '/' })
        navigate('/login');
    }
 
    function exibindoNavbar() {
        console.log('....exibindoNavbar')
        return location.pathname === '/login' || location.pathname === '/nao-autorizado';
    }

    return <div className="AppSubHeader" hidden={ exibindoNavbar() }>
                <Conteudo>
                    <div className="MenuSubHeader">
                        
                        <div className="Ambiente">
                            <p>Ambiente de <b>desenvolvimento</b></p>
                        </div>
                            
                        <div className="Container2">
                            <Chip className="Avatar" color={"primary"} avatar={
                            <Avatar sx={{ background: '#212121' }}>

                                <p style={{color: 'white'}}>
                                    {nameUser.substring(0,1).toUpperCase()}
                                </p>
                                
                            </Avatar>} label={nameUser} />
                            <Button onClick={() => logout()} color="danger">
                                Sair
                            </Button>
                        </div> 

                    </div>
                </Conteudo>
        </div>
}

export default SubHeader