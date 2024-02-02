import Vue from 'vue'
import Vuex from 'vuex'

import fileModule from './file'
import locationModule from './location'
import userModule from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    file: fileModule,
    location: locationModule,
    user: userModule
  }
})
