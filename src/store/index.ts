import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
import app from './modules/app'
const store = new Vuex.Store({
  modules: {app},
  getters
})

export default store
