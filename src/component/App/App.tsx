import React from 'react';
import './App.css';
import { Navigate } from 'react-router'
import { Route, Routes } from 'react-router-dom';
import Document from '../Document/Document';
import Login from '../User/Login/Login';
import VirtualTable from '../VirtualTable/VirtualTable';
import View from '../Document/View/View';
import UserList from '../User/List/UserList';
import User from '../User/User';
import UsuarioHome from '../User/UsuarioHome'; // Remover!
import Department from '../Department/Department';
import PaginaNaoEncontrada from '../../cross-cutting/PaginaNaoEncontrada/PaginaNaoEncontrada';
import Process from '../Document/Process/Process';
import PermissoesUsuario from '../User/Auth/TelaDePermissoes';

import OrganizationList from '../Organization/List/OrganizationList';
import FormularioOrgao from '../Organization/Organization';
import NaoAutorizado from '../../cross-cutting/NaoAutorizado/NaoAutorizado';
import Incluir from '../Document/Cossignatario/Incluir';
import Organization from '../Organization/Organization';

function App() { 
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mesa-virtual" element={<VirtualTable />} />
          <Route path="/documento/:sigla" element={<Document />} /> 
          <Route path="/documento" element={<Document />} /> 
          <Route path="/formulario-usuario" element={<User />} />
          <Route path="/formulario-usuario/:id" element={<User />} />
          <Route path="/visualizar-documento" element={<View />} />
          <Route path="/visualizar-documento/:codigo" element={<View />} />
          <Route path="/listarusuario" element={<UserList />} />
          <Route path="/listar-usuario" element={<UsuarioHome />} />
          <Route path="/Tramitar-documento" element={<Process />} />
          <Route path="/cadastro-departamento" element={<Department />} />
          <Route path="/cadastro-departamento/:id" element={<Department />} />
          <Route path="/permissoes-usuario" element={<PermissoesUsuario />} />
          <Route path="/orgao" element={<Organization />} />
          <Route path="/orgao/:id" element={<Organization />} /> 
          <Route path="/home-orgao" element={<OrganizationList />} />
          <Route path="/nao-autorizado" element={<NaoAutorizado />} />
          <Route path="/Incluir-Consignatario" element={<Incluir />} />
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes>
    </div>
    
  );
}

export default App;