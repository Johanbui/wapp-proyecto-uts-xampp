import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export async function getListaOne(codigo, idPadre = '') {
  return await request({
    url: '/listas/getOne',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigo, idPadre }
  })
}

export async function getEstados(codigo) {
  return await request({
    url: '/listas/getEstados',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: { codigo }
  })
}
