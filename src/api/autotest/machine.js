import request from '@/utils/request'

// 查询自动化测试执行机列表
export function listMachine(query) {
  return request({
    url: '/autotest/machine/list',
    method: 'get',
    params: query
  })
}

// 查询自动化测试执行机详细
export function getMachine(id) {
  return request({
    url: '/autotest/machine/' + id,
    method: 'get'
  })
}

// 新增自动化测试执行机
export function addMachine(data) {
  return request({
    url: '/autotest/machine',
    method: 'post',
    data: data
  })
}

// 修改自动化测试执行机
export function updateMachine(data) {
  return request({
    url: '/autotest/machine',
    method: 'put',
    data: data
  })
}

// 删除自动化测试执行机
export function delMachine(id) {
  return request({
    url: '/autotest/machine/' + id,
    method: 'delete'
  })
}
