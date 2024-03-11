import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getAll(params) {
  return request({
    url: '/documentos/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params

  })
}

export function create(params) {
  return request({
    url: '/documentos/create',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function update(params) {
  return request({
    url: '/documentos/update',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function getOne(id) {
  return request({
    url: '/documentos/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id }
  })
}

