import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getAll(params) {
  return request({
    url: '/acta/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params

  })
}

export function create(params) {
  return request({
    url: '/acta/create',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function update(params) {
  return request({
    url: '/acta/update',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function getOne(id) {
  return request({
    url: '/acta/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id }
  })
}

