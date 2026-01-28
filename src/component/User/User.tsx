import React, { useEffect, useState } from "react";
import Form from "../../shared-component/Form/Form";
import Input from "../../shared-component/Input/Input";
import Conteudo from "../../shared-component/Conteudo/Conteudo";
import { Grid, MenuItem, TextField } from "@mui/material";
import Button from "../../shared-component/Button/Button";
import './User.css'
import { buscarUsuarioPorId, cadastrarUsuario, editarUsuario } from "./Servico/Service";
import { listarDepartamentos, listarSetores } from "../Department/Service/Service";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

/* =========================
   MODELS
========================= */
interface Departamento {
    departamentoId: string;
    nome: string;
}

export class Usuario {
    id?: string;
    nome?: string;
    rg?: string;
    cpf?: string;
    endereco?: string;
    email?: string;
    telefone?: string;
    departmentId?: string;
}

function User() {
    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    /* =========================
       LISTAR DEPARTAMENTOS
    ========================= */
    useEffect(() => {
        async function carregarDepartamentos() {
            try {
                const response = await listarDepartamentos();
                setDepartamentos(response.content);
            } catch (error) {
                Swal.fire('Oops!', 'Erro ao carregar departamentos', 'error');
            }
        }

        carregarDepartamentos();
    }, []);

    /* =========================
       BUSCAR USUÁRIO
    ========================= */
    useEffect(() => {
        if (!id) return;

        buscarUsuarioPorId(id)
            .then(data => {
                setNome(data.nome);
                setRg(data.rg);
                setCpf(data.cpf);
                setEndereco(data.endereco);
                setEmail(data.email);
                setTelefone(data.telefone);
                setDepartmentId(data.departmentId);
            })
            .catch(err => {
                Swal.fire("Oops!", "Erro ao buscar usuário", "error");
            });
    }, [id]);

    /* =========================
       SUBMIT
    ========================= */
    async function enviarFormulario(e: any) {
        e.preventDefault();

        if (!nome || !rg || !cpf || !departmentId) {
            Swal.fire('Atenção!', 'Preencha todos os campos obrigatórios', 'warning');
            return;
        }

        const usuario: Usuario = {
            id,
            nome,
            rg,
            cpf,
            endereco,
            email,
            telefone,
            departmentId
        };

        try {
            if (!id) {
                await cadastrarUsuario(usuario);
            } else {
                await editarUsuario(usuario, id);
            }

            Swal.fire('Sucesso!', 'Usuário salvo com sucesso, aguarde o e-mail com senha e login', 'success');
        } catch (err: any) {
            Swal.fire('Oops!', err.message || 'Erro ao salvar usuário', 'error');
        }
    }

    return (
        <Conteudo>
            <Form
                title={!id ? "Cadastro de Usuário" : "Edição de Usuário"}
                onSubmit={enviarFormulario}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Input
                            label="Nome Completo"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Input label="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
                    </Grid>

                    <Grid item xs={4}>
                        <Input label="RG" value={rg} onChange={e => setRg(e.target.value)} />
                    </Grid>

                    <Grid item xs={4}>
                        <Input label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
                    </Grid>

                    <Grid item xs={8}>
                        <Input
                            label="Endereço"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Input
                            label="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>

                    {/* =========================
                        SELECT DEPARTAMENTO
                    ========================= */}
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Departamento"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            {departamentos.map(dep => (
                                <MenuItem key={dep.departamentoId} value={dep.departamentoId}>
                                    {dep.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={3}>
                        <Button>
                            {id ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Link to="/listar-usuario">
                            <Button color="grey">Voltar</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Form>
        </Conteudo>
    );
}

export default User;
