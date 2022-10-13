import axios from 'axios'
import { ElMessage as Message } from 'element-plus'
import jscookie from 'js-cookie'
import qs from 'qs'
const longNumberToString = (jsonString: string) => {
  return jsonString
    .replace(/("\w*":)\s*(\d{16}\d*)/g, '$1"$2"')
    .replace(/(\\"\w*\\":)\s*(\d{16}\d*)/g, '$1\\"$2\\"')
    .replace(/("\w*":)\s*(\[\s*(\d{16}\d*)\s*(,\s*(\d{16}\d*)\s*)*])/g, (match, p1, p2) => {
      return `${p1}${
        p2.trim()
          .replace(/\[/, '["')
          .replace(/]/, '"]')
          .replace(/,/g, '","')
        }`
    })
    .replace(/(\\"\w*\\":)\s*(\[\s*(\d{16}\d*)\s*(,\s*(\d{16}\d*)\s*)*])/g, (match, p1, p2) => {
      return `${p1}${
        p2.trim()
          .replace(/\[/, '[\\"')
          .replace(/]/, '\\"]')
          .replace(/,/g, '\\",\\"')
        }`
    })
}

export function translateForm (json: any) {
  const k = Object.keys(json)
  const params = []

  for (let i = 0; i < k.length; i++) {
    const m = k[i]
    // eslint-disable-next-line no-prototype-builtins
    if (!json.hasOwnProperty(m)) continue
    params.push(`${m}=${encodeURIComponent(json[m] ?? '' )}`)
  }

  return params.join('&')
}
const qsquery = qs.parse(location.search, { ignoreQueryPrefix: true }) as any
if (qsquery['x1-bilispy-color']) {
  jscookie.set('x1-bilispy-color', qsquery['x1-bilispy-color'])
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
if (jscookie.get('x1-bilispy-color')) {
  axios.defaults.headers['x1-bilispy-color'] = jscookie.get('x1-bilispy-color')
}
// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
axios.interceptors.response.use((response) => {
    const data = response.data
    // 1.要自己处理错误，就丢给你response.data，你自己then处理
    if (response.config.handle) {
        return Promise.resolve(data)
    }

    // 3.如果code不正确，有错误就reject.
    if (data.code !== 0) {
    // 1.code
    // 4.根据silent来判断是否弹出错误提示
    if (!response.config.silent) {
        Message.error(data.message || data.msg)
    }
    return Promise.reject(data)
    }
    // 4.正常就resolve返回data
    return Promise.resolve(data)
}, error => {
    // Message.error('接口报错')
    return Promise.reject(error)
})
// 重写axios响应转换器，强制不经过 axios 的 json 解析
axios.defaults.transformResponse = [(data, headers) => {
    if (typeof data === 'string') {
    const replacedResponseText = longNumberToString(data)
    try {
        data = JSON.parse(replacedResponseText)
    } catch (e) {}
    }
    return data
}]

// POST请求处理form
axios.interceptors.request.use(request => {
    if (request && request.method === 'post') {
    if (request.isJson) {
        delete request.isJson
        return request
    }
    const originData = request.data || ''
    request.data = (isObject(originData) && !isFormData(originData))
        ? translateForm(originData) : originData
    }
    return request
})

function isObject (obj: any) {
    return obj !== null && typeof obj === 'object'
}
function isFormData (value: any) {
    return Object.prototype.toString.call(value) === '[object FormData]'
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    isJson?: boolean,
    handle?: any,
    silent?: any,
  }
}

export default axios