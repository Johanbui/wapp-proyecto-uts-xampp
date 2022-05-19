import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export async function getListaOne(codigo) {
  return await request({
    url: '/listas/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigo }
  })
}
