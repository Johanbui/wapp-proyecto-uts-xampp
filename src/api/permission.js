import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getAll(params) {
  return request({
    url: '/permission/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params

  })
}

export function update(params) {
  return request({
    url: '/permission/update',
    method: 'put',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}
