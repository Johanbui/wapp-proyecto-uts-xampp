import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getAll(params) {
  return request({
    url: '/blog/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params

  })
}

export function create(params) {
  return request({
    url: '/blog/create',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function update(params) {
  return request({
    url: '/blog/update',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function getOne(id) {
  return request({
    url: '/blog/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id }
  })
}

