<template>
<div>
  <a-row  :gutter="10">
    <a-col :span="12">
      <a-input v-model="apiUrl">
      <template #addonAfter>
        <a-select v-model="methods" style="width: 80px">
          <a-select-option value="post">post</a-select-option>
          <a-select-option value="get">get</a-select-option>
        </a-select>
      </template>
    </a-input>
    </a-col>
    <a-col :span="4">
      <a-button type="primary" @click="doRequest">send</a-button>
    </a-col>

  </a-row>
  <a-row :gutter="10" class="mt-10">
    <a-col :span="4">
      <a-button size="small" type="primary" @click="getToken">csrf token</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="small" type="primary" @click="login">Login django</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="small" type="primary" @click="loginError">Login error</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="small" type="primary" @click="rereshToken">reresh token</a-button>
    </a-col>
    <a-col :span="4">
      <a-button size="small" type="primary" @click="verifyToken">verify token</a-button>
    </a-col>
    
  </a-row>
    <a-row :gutter="10" class="mt-10">
      <a-col :span="4">

        <a-upload
            :file-list="fileList"
            name="file"
            :customRequest="uploadGif"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              add gif
            </a-button>
          </a-upload>
    </a-col>
        <a-col :span="4">
          <a-upload
            :file-list="fileList"
            name="file"
            :customRequest="uploadVideo"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              Upload Video
            </a-button>
          </a-upload>
        </a-col>
    </a-row>
    
  <a-row class="json-pretty-wrap" :gutter="10">
    <a-col :span="12">
          <vue-json-editor v-model="params" ></vue-json-editor>
    </a-col>
    <a-col :span="12">
      <vue-json-pretty :path="'res'" :data="resJson"> </vue-json-pretty>
      <img :src="imgUrl">
    </a-col>
  </a-row>
</div>
 
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VueJsonPretty from 'vue-json-pretty';
import VueJsonEditor from 'vue-json-editor';
import 'vue-json-pretty/lib/styles.css';
import { message } from 'ant-design-vue';

/* eslint-disable */
import VueRouter from "vue-router";
import { State, namespace } from "vuex-class";
import {djLogin, getCsrfToken, refreshAuthToken, verifyAuthToken} from '@/apis/dj-api/common'
import { addVideo, gifAdd, apiRequest} from '@/apis/dj-api/video2gif'
import Cookies from 'js-cookie'

const someModule = namespace("app");


@Component({
  components: {
    VueJsonPretty,
    VueJsonEditor
  },
})
export default class Login extends Vue {
  apiUrl='video2gif/videos/'
  methods = 'post'
  params = {}
  resJson = {}
  imgUrl = ''
  fileList = [] // 上传文件
  $router!: VueRouter;
  $apollo!: any;
  @State((state) => state.app.token) token!: string;
  @someModule.Action("setTokenAction") setTokenAction!: (t: string) => any;

  created() {}
  mounted() {}

  // 发送请求
  async doRequest(){
    this.imgUrl = ''
    const res = await apiRequest(this.apiUrl, this.methods, this.params)
    this.resJson = res
    if (res.data.type === 'img_url') {
      this.imgUrl = res.data.url
    }

  }
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

 
  async uploadGif(options: any){
    let params = new FormData();
    params.append("url", options.file);
    params.append("name", `test-${Math.random()}`);
    const res = await gifAdd(params)
    this.resJson = res
  }
 
  async uploadVideo(options: any){
    let params = new FormData();
    params.append("url", options.file);
    params.append("name", `test-${Math.random()}`);
    const res = await addVideo(params)
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
  min-height: 300px;
  padding: 10px;
    background-color: rgba(255,255,255,0.6);
    margin: 10px;
    overflow: scroll;
}
</style>