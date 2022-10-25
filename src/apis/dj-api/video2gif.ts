
import service from './index'
import qs from 'qs'
import Cookies from 'js-cookie'

const prefix = '/dj_api/'
export const gifAdd = (data: any) => {
  return service({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${prefix}video2gif/gifs/add/`,
    method: 'post',
    data
  });
}


// 上传文件
export const addVideo = (data: any) => {
  return service({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `${prefix}video2gif/videos/add/`,
    method: 'post',
    data
  });
}



export const apiRequest = (url: string, method: string, data?:any) => {
  return service({
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${prefix}${url}`,
    method,
    data
  });
}

export const genGif = (data:any) => {
  return service({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    url: `${prefix}video2gif/videos/${data.id}/convert_to_gif/`,
    method: 'post',
    responseType: 'blob',
    data
  });
}
