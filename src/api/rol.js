import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getAll(params) {
  return request({
    url: '/rol/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params

  })
}

export function toggleEnable(params) {
  return request({
    url: '/rol/toggleEnable',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function create(params) {
  return request({
    url: '/rol/create',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function update(params) {
  return request({
    url: '/rol/update',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function getOne(id) {
  return request({
    url: '/rol/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id }
  })
}

