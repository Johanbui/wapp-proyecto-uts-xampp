import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/me',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + token }
  })
}

export function logout(token) {
  return request({
    url: '/auth/logout',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + token }

  })
}

export function getAll(params) {
  return request({
    url: '/user/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function toggleEnable(params) {
  return request({
    url: '/user/toggleEnable',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function getOne(id) {
  return request({
    url: '/user/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { id }
  })
}

export function update(params) {
  return request({
    url: '/user/update',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function changePassword(params) {
  return request({
    url: '/user/changePassword',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function create(params) {
  return request({
    url: '/user/create',
    method: 'post',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}
