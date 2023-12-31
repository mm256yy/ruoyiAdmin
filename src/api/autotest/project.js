import request from '@/utils/request'

// 查询自动化测试-项目管理列表
export function listProject(query) {
  return request({
    url: '/autotest/project/list',
    method: 'get',
    params: query
  })
}

// 查询自动化测试-项目管理详细
export function getProject(id) {
  return request({
    url: '/autotest/project/' + id,
    method: 'get'
  })
}

// 新增自动化测试-项目管理
export function addProject(data) {
  return request({
    url: '/autotest/project',
    method: 'post',
    data: data
  })
}

// 修改自动化测试-项目管理
export function updateProject(data) {
  return request({
    url: '/autotest/project',
    method: 'put',
    data: data
  })
}

// 删除自动化测试-项目管理
export function delProject(id) {
  return request({
    url: '/autotest/project/' + id,
    method: 'delete'
  })
}
