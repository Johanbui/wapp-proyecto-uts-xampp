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

