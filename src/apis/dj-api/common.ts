
import service from './index'
import qs from 'qs'
import Cookies from 'js-cookie'

const prefix = '/dj_api/'

/**
 * 快速登录
 */
export const djLogin = (data: any) => {
  const dataEncoded = qs.stringify(data)
  return service({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'X-CSRFToken': Cookies.get('csrftoken'),
  },
    url: `${prefix}login/`,
    method: 'post',
    data:dataEncoded,
  });
};

export const getCsrfToken = () => {
  return service({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${prefix}app/get_token/`,
    method: 'get',
  });
}


// 刷新token
export const refreshAuthToken = (data: any) => {
  return service({
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${prefix}token/refresh/`,
    method: 'post',
    data
  });
}

// 验证token
export const verifyAuthToken = (data: any) => {
  return service({
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${prefix}token/verify/`,
    method: 'post',
    data,
  });
}

