import React, { useEffect, useState } from 'react';
import Conteudo from '../../../shared-component/Conteudo/Conteudo'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import InputGroup from '../../../shared-component/InputGroup/InputGroup'
import { Link } from 'react-router-dom';
import './UserList.scss'
import Button from '../../../shared-component/Button/Button';
import { ativarDesativarUsuario, listarUsuario } from '../Servico/Service';
import Swal from 'sweetalert2';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Dialog, DialogTitle, LinearProgress, Pagination } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: 'none',
    boxShadow: 24,
    p: 3
  };
export class UserActive {
    active?: boolean
}

function TabelaUsuario() {
    const SIZE_LIST = 5
    const [ usuarios, setUsuarios] = useState([])
    const [ paramBuscar, setParamBuscar ] = useState('')
    const [ tipoBuscar, setTipoBuscar ] = useState(0)

    /**PAGINAÇÃO */
    const [totalPage, setTotalPage] = useState(0);
    const [pageActual, setPageActual] = useState(0);
    const [numberPage, setNumberPage] = useState(0);
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPageActual(page - 1)
    };

    /**Modal */
    const [open, setOpen] = React.useState(false);
    const abrirDialog = () => {
        setOpen(true);
    }
    const fecharDialog = () => {
        setOpen(false);
    };

    async function listar() {
        try{  
            const _cadastros = await listarUsuario('', '', pageActual, SIZE_LIST)
            setUsuarios(_cadastros.content)
            setNumberPage(_cadastros.number)
            setTotalPage(_cadastros.totalPages)
        } catch(err) {
            if(err instanceof Error)
            Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error')
        }
    }

    async function buscar() {
        try{  
            const _cadastros = await listarUsuario(
                tipoBuscar === 0 ? paramBuscar : '22',
                tipoBuscar === 1 ? paramBuscar : '', 
                '', 
                SIZE_LIST)
            setUsuarios(_cadastros.content)
            setNumberPage(_cadastros.number)
            setTotalPage(_cadastros.totalPages)
        } catch(err) {
            if(err instanceof Error)
            Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error')
        }
    }

    async function ativacaoUsuario(id:any, active: any) {
        abrirDialog()
        const dep = new UserActive()
        console.log(active)
        dep.active = active 
        setTimeout(() => {
            fecharDialog();
        }, 6000);
        await ativarDesativarUsuario(id, dep)
        listar();
    } 

    useEffect(() => {
        listar()
    }, [pageActual])

    return  <Conteudo >
    <div className='HeaderUsuario'>
    <h2>Lista de Usuários <AssignmentIndIcon /></h2>
        <div className='left'>
            <InputGroup 
                onChange={ (e) => setParamBuscar(e.target.value) } 
                onClickButton={ buscar }
                placeholder='buscar usuários' />
        </div>
        <Link className='BtnCriarDocumento AppCriarDocumento right' to="/formulario-usuario">
            <Button color='create'>
                Novo Usuário
            </Button>
            </Link>
        <div className="clear"></div>
    </div>
    <table className="AppTabelaUsuario">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Departamento</th>
                <th>Contato</th>
                <th>Ações</th>
            </tr>
        </thead>
            <tbody>
                {
                    usuarios.map(( listValue:any, index:any ) => {
                            return (
                                <tr key={index}>
                                    <td>{ listValue.userModel.nome }</td>
                                    <td>{ listValue.department.nome }</td>
                                    <td>{ listValue.userModel.telefone }</td> 
                                    <td>
                                        <div style={{ display: 'flex', maxWidth: '40px' }}>
                                            <Link className='BtnEditar' to={`/formulario-usuario/${listValue.userModel.id}`}>
                                                <Button >
                                                    <BorderColorRoundedIcon/>
                                                </Button> 
                                            </Link>
                                            {
                                                listValue.userModel.active ? 
                                                    <a onClick={() => ativacaoUsuario(listValue.userModel.id, !listValue.userModel.active)} 
                                                        style={{'cursor': 'pointer', 'marginLeft': '10px'}}><HttpsOutlinedIcon color={'error'}/></a>
                                                :
                                                    <a onClick={() => ativacaoUsuario(listValue.userModel.id, !listValue.userModel.active)} 
                                                        style={{'cursor': 'pointer', 'marginLeft': '10px'}}><LockOpenIcon/></a>
                                            }
                                        </div>
                                    </td> 
                                </tr>
                            );
                        })
                }
            </tbody>
        </table>
        <div className="pagination-container">
            <Pagination 
                count={totalPage} 
                page={numberPage + 1} 
                onChange={handleChange} 
                variant="outlined" 
                shape="rounded" 
                color='primary'/>
        </div>
        <Dialog 
            open={open} >
          <Conteudo>
            <DialogTitle style={{fontSize: '15px'}}>Carregando...</DialogTitle>
            <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
                <LinearProgress  />
            </div>
          </Conteudo>
        </Dialog>
    </Conteudo>
}

export default TabelaUsuario