import request from '@/utils/request'

// 查询自动化测试项目-执行机关联关系列表
export function listAutoTestMachineProjectRe(query) {
  return request({
    url: '/autotest/AutoTestMachineProjectRe/list',
    method: 'get',
    params: query
  })
}

// 查询自动化测试项目-执行机关联关系详细
export function getAutoTestMachineProjectRe(id) {
  return request({
    url: '/autotest/AutoTestMachineProjectRe/' + id,
    method: 'get'
  })
}

// 新增自动化测试项目-执行机关联关系
export function addAutoTestMachineProjectRe(data) {
  return request({
    url: '/autotest/AutoTestMachineProjectRe',
    method: 'post',
    data: data
  })
}

// 修改自动化测试项目-执行机关联关系
export function updateAutoTestMachineProjectRe(data) {
  return request({
    url: '/autotest/AutoTestMachineProjectRe',
    method: 'put',
    data: data
  })
}

// 删除自动化测试项目-执行机关联关系
export function delAutoTestMachineProjectRe(id) {
  return request({
    url: '/autotest/AutoTestMachineProjectRe/' + id,
    method: 'delete'
  })
}
