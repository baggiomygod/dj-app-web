<template>
<div>
   <section class="login-container">
  </section>
  <a-row :gutter="10">
    <a-col :span="4">
      <a-button size="large" type="primary" @click="getToken">csrf token</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="large" type="primary" @click="login">Login django</a-button>
      <a-button size="large" type="primary" @click="loginError">Login error</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="large" type="primary" @click="rereshToken">reresh token</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="large" type="primary" @click="verifyToken">verify token</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="large" type="primary" @click="getGifsList">Gifs</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="large" type="primary" @click="getVideosList">Videos</a-button>
    </a-col>
  </a-row>

    <a-row :gutter="10">
        <a-col :span="4">
          <a-upload
            :file-list="fileList"
            name="file"
            :customRequest="handleUploadVideo"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              Click to Upload Video
            </a-button>
          </a-upload>
        </a-col>

        <a-col :span="4">
          <a-upload
            :file-list="fileList"
            name="file"
            :customRequest="handleUploadGif"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              Click to Upload Gif
            </a-button>
          </a-upload>
        </a-col>
    </a-row>
    
  <div class="json-pretty-wrap">
    <vue-json-pretty :path="'res'" :data="resJson"> </vue-json-pretty>
  </div>
</div>
 
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { message } from 'ant-design-vue';

/* eslint-disable */
import VueRouter from "vue-router";
import { State, namespace } from "vuex-class";
import {djLogin, getCsrfToken, refreshAuthToken, verifyAuthToken} from '@/apis/dj-api/common'
import {getVideos, getGifs, uploadFile, uploadGif} from '@/apis/dj-api/video2gif'
import Cookies from 'js-cookie'

const someModule = namespace("app");


@Component({
  components: {
    VueJsonPretty,
  },
})
export default class Login extends Vue {
  resJson = {}
  fileList = [] // 上传文件
  $router!: VueRouter;
  $apollo!: any;
  @State((state) => state.app.token) token!: string;
  @someModule.Action("setTokenAction") setTokenAction!: (t: string) => any;

  created() {}
  mounted() {}
  // csrf token
  async getToken(){
    const res: any = await getCsrfToken()
    this.resJson = res
    Cookies.set('csrftoken', res.token)
    console.log(res)
  }
  // restful api 接口测试
  async login() {
    try {
      const res= await djLogin({
        username: 'admin',
        password: '123456',
      })
      this.resJson = res
      console.log('dj-login:', res.data)
      Cookies.set('access', res.data.access)
      Cookies.set('refreshToken', res.data.refresh)

    // this.$router.push("/");
    } catch (err) {
      console.error(err)
    }
    
  }
  async loginError (){
  try {
        const res= await djLogin({
          username: 'admin',
          password: '1',
        })
        this.resJson = res
        console.log('dj-login:', res.data)
        Cookies.set('access', res.data.access)
        Cookies.set('refreshToken', res.data.refresh)

      // this.$router.push("/");
      } catch (err) {
        console.error(err)
      }
  }
  // 刷新token
  async rereshToken(){
    const res= await refreshAuthToken({refresh: Cookies.get('refreshToken') || ''})
    this.resJson = res
    console.log('rereshToken:', res.data)
      Cookies.set('access', res.data.access)

  }
  // 验证token
  async verifyToken() {
    const res: any = await verifyAuthToken({token: Cookies.get('access')})
    this.resJson = res
    console.log('verifyToken:', res)
  }

  // gifs
  async getGifsList() {
    const res = await getGifs()
    this.resJson = res
    console.log(res)
  }
  // videos
  async getVideosList() {
    const res = await getVideos()
    this.resJson = res
    console.log(res)
  }
  async handleUploadVideo(options: any){
    let params = new FormData();
    params.append("url", options.file);
    params.append("name", `test-${Math.random()}`);
    const res = await uploadFile(params)
    this.resJson = res
  }
  async handleChange (info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  }

async handleUploadGif(options: any){
    let params = new FormData();
    params.append("url", options.file);
    params.append("name", `test-${Math.random()}`);
    const res = await uploadGif(params)
    this.resJson = res
  }
  @Watch("token")
  onToken(newVal: string) {
    console.log(newVal);
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/styles/flex.less";

.login-container {
  padding: 30px;
}

.json-pretty-wrap{
  padding: 10px;
    background-color: rgba(0,0,0,0.6);
    margin: 10px;
    overflow: scroll;
}
</style>