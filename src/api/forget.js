import request from '@/utils/request'
// 忘记考勤
export function forget_check(data) {
  return request({
    url: '/api/check_log/forget',
    method: 'post',
    data
  })
}

