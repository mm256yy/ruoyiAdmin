import request from '@/utils/request'

// 查询项目用户关联关系列表
export function listAutoTestProjectUserRe(query) {
  return request({
    url: '/autotest/AutoTestProjectUserRe/list',
    method: 'get',
    params: query
  })
}

// 查询项目用户关联关系详细
export function getAutoTestProjectUserRe(id) {
  return request({
    url: '/autotest/AutoTestProjectUserRe/' + id,
    method: 'get'
  })
}

// 新增项目用户关联关系
export function addAutoTestProjectUserRe(data) {
  return request({
    url: '/autotest/AutoTestProjectUserRe',
    method: 'post',
    data: data
  })
}

// 修改项目用户关联关系
export function updateAutoTestProjectUserRe(data) {
  return request({
    url: '/autotest/AutoTestProjectUserRe',
    method: 'put',
    data: data
  })
}

// 删除项目用户关联关系
export function delAutoTestProjectUserRe(id) {
  return request({
    url: '/autotest/AutoTestProjectUserRe/' + id,
    method: 'delete'
  })
}
