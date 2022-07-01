import axios from "axios";
import Cookies from 'js-cookie'
import { message, Modal } from 'ant-design-vue';

const instance = axios.create({
  baseURL: "/",
  withCredentials: true,
});
instance.interceptors.request.use(
  config => {
      // do something before request is sent
      config.headers['Authorization'] = 'Bearer '  + Cookies.get('access') || ''
      // if (store.getters.token) {
      // }
    return config
  },
  (error: any) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
instance.interceptors.response.use(
  response => {
    const res = response.data
    return res // 目前没有code 直接返回res

    if(res.code>=200 && res.code<400){
      return res
    }
    if (res.code === 401) {
      if(res.msg.indexOf('No active account')!=-1){
      message.error('用户名或密码错误');
      }else{
        Modal.confirm({
          title: '确认退出?',
          content: '认证失败,请重新登陆.',
          onOk() {
              location.reload()
            //   store.dispatch('user/resetToken').then(() => {
            // })
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onCancel() {},
        });
        
      }
      
    } else if (res.code >= 400) {
      message.error(res.msg || '请求出错');
      return Promise.reject(new Error(res.msg || '请求出错'))
    }
  },
  error => {
    // console.log(error,response) // for debug
    message.error('服务器错误');
    return Promise.reject(error)
  }
)

export default instance