import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export async function getAll(params) {
  return request({
    url: '/notificacion/getAll',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}

export function markAsReaded(params) {
  return request({
    url: '/notificacion/markAsReaded',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}
