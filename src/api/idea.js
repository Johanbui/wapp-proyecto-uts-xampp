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

