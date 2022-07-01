
import service from './index'
import qs from 'qs'
import Cookies from 'js-cookie'

const prefix = '/dj_api/'
// 获取gif列表
export const getGifs = () => {
  return service({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${prefix}video2gif/gifs/`,
    method: 'get',
  });
}

// 获取gif列表
export const getVideos = () => {
  return service({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: `${prefix}video2gif/videos/`,
    method: 'get',
  });
}


// 上传文件
export const uploadFile = (data) => {
  return service({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `${prefix}video2gif/video_add/`,
    method: 'post',
    data
  });
}

export const uploadGif = (data) => {
  return service({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `${prefix}video2gif/gif_add/`,
    method: 'post',
    data
  });
}