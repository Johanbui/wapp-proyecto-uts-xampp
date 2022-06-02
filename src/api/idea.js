import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getAll(params) {
  return request({
    url: '/idea/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function getAllInformes(params) {
  return request({
    url: '/idea/getAllInformes',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function create(params) {
  return request({
    url: '/idea/create',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function update(params) {
  return request({
    url: '/idea/update',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function getOne(id) {
  return request({
    url: '/idea/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id }
  })
}

export function getModalidades() {
  return request({
    url: '/idea/getModalidades',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  })
}

export function getLineasInvestigacion() {
  return request({
    url: '/idea/getLineasInvestigacion',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  })
}

export function getDirectores() {
  return request({
    url: '/idea/getDirectores',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  })
}

export function createArchivoIdeas(ideasArchivo) {
  return request({
    url: '/idea/createArchivoIdeas',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: ideasArchivo
  })
}

export function createArchivoIdeasEvaluacion(ideasArchivo) {
  return request({
    url: '/idea/createArchivoIdeasEvaluacion',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: ideasArchivo
  })
}

export function createIdeaEstado(ideaEstado) {
  return request({
    url: '/ideaEstado/createIdeaEstado',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: ideaEstado
  })
}

export function getArchivoIdeas(codigoListaGrupo, idIdea) {
  return request({
    url: '/idea/getArchivoIdeas',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigoListaGrupo, idIdea }
  })
}

export function createUsuariosIdeas(ideasUsuarios) {
  return request({
    url: '/idea/createUsuariosIdeas',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: ideasUsuarios
  })
}
export function getUsuariosIdeas(codigoListaGrupo, idIdea) {
  return request({
    url: '/idea/getUsuariosIdeas',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigoListaGrupo, idIdea }
  })
}

export function getEstudiantes() {
  return request({
    url: '/idea/getEstudiantes',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  })
}
export function createEstudiantesIdeas(estudiantes, idIdea) {
  return request({
    url: '/idea/createEstudiantesIdeas',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { estudiantes, idIdea }
  })
}

export function createArrArchivoIdeas(archivos, idIdea) {
  return request({
    url: '/idea/createArrArchivoIdeas',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { archivos, idIdea }
  })
}

export function createArrArchivoIdeasEvaluacion(archivos, idIdea) {
  return request({
    url: '/idea/createArrArchivoIdeasEvaluacion',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { archivos, idIdea }
  })
}

export function getArrArchivoIdeas(codigoListaGrupo, idIdea) {
  return request({
    url: '/idea/getArrArchivoIdeas',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigoListaGrupo, idIdea }
  })
}

export function getIdeaUsuario(id_usuario) {
  return request({
    url: '/idea/getIdeaUsuario',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id_usuario }
  })
}

export function getIdeaEstado(codigo_estado, id_idea) {
  return request({
    url: '/ideaEstado/getIdeaEstado',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigo_estado, id_idea }
  })
}
export function getResultadoProyecto(id_idea) {
  return request({
    url: '/ideaEstado/getResultadoProyecto',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id_idea }
  })
}

export function getLastEstadoProyecto(id_idea) {
  return request({
    url: '/idea/getLastEstadoProyecto',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id_idea }
  })
}

export function getIdeaEstadoExist(codigo_estado, id_idea) {
  return request({
    url: '/ideaEstado/getIdeaEstadoExist',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigo_estado, id_idea }
  })
}
