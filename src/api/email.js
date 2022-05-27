import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function sendEmail(params) {
  return request({
    url: '/send-email',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + getToken() },
    params: params
  })
}
