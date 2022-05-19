import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getListaOne(codigo) {
  return request({
    url: '/listas/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigo }
  })
}
