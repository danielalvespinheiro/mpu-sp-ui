import React, { useState } from 'react'

import './Login.css'
import { logar } from '../Servico/Service'; 
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../../assets/logo.png';

declare interface LoginProps {
    titulo?: string
    txtBotao?: String
    hidden?: boolean 
}
export class LoginModel {
    matricula?: string
    password?: string
}

function Login(props: LoginProps) {
    
    const navigate = useNavigate();
    const [ matricula, setMatricula] = useState('');
    const [ password, setPassword] = useState('');
    const login = new LoginModel()

    function enviarFormulario(e:any) {
        e.preventDefault();
        login.matricula = matricula
        login.password = password
        try {
            const object_token = logar(login)
            object_token.then(data => {
                const token = data.token;
                const cookies = new Cookies(null, { path: '/'});
                cookies.set('Token', token);
                // Redirecionar para a mesa-virtual após o login bem-sucedido
                navigate('/mesa-virtual');
            }).catch(error =>{
                console.error('Erro ao fazer login', error);
                Swal.fire("Oops!", error.message, "error")
            });
        } catch(err) {
            if (err instanceof Error)
            Swal.fire("Oops!", err.message, "error")
        }    
    }
    
    return <div className='bg'>
            <div className="box">
                <div className="box-header">
                <img style={{ width: '60px', filter: 'grayscale(100%)' }} src={LogoImage} alt="Logo" />

                    <p>Por favor, faça o login.</p>
                </div>

                <div className="box-login">
                    <form onSubmit={ enviarFormulario }>
                        <label htmlFor="Matrícula">Matrícula:</label>
                        <input
                            type="text"
                            id="MatriculaUser"
                            onChange={ (e) => setMatricula(e.target.value)}
                        />
                        <label htmlFor="SenhaUser">Senha:</label>
                        <input
                            type="password"
                            id="PasswordUser"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <div >
                        <button className='btn-entrar' type="submit">Login</button>
                        </div>
                    </form>
                </div>

                <div className="box-footer">
                    <a href="#">Esqueceu sua senha?</a>
                </div>
                
            </div>
        </div>
}

export default Login