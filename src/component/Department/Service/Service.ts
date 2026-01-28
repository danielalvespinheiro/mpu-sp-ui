
import http from "../../../utils/http-department"; 
import { DepartmentActive } from "../List/DepartmentList";
import { DepartmentModel } from "../Department";

const baseURL = '/department/v1'

export const cadastrarSetor = (department: DepartmentModel) => {
    http.post(`${baseURL}/cadastrar`, department)
}

export const editarSetor = (department: DepartmentModel, id: String) => {
    http.put(`${baseURL}/editar/${id}`, department)
}

export const buscarSetorPorId = (id:string) => {
    return http
        .get(`${baseURL}/buscar/${id}`)
        .then(response => response.data); 
}  

export const listarDepartamentos = () => {
    return http
        .get(`${baseURL}`)
        .then(response => response.data); 
}  

export const listarSetores = (nome?: string, sigla?: string, page?: any, size?: any) => {
    return http
        .get(`${baseURL}/listar?page=${page}&size=${size}&nome=${nome}&sigla=${sigla}`)
        .then(response => response.data); 
}

export const ativarDesativarSetor = (id: String, departmentActive: DepartmentActive) => {
    return http
        .patch(`${baseURL}/ativar-desativar/${id}`, departmentActive)
        .then(response => response.data); 
}