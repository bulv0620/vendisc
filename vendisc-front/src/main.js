import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import VueClipboard from 'vue-clipboard2';
import 'vuesax/dist/vuesax.css' //Vuesax styles
import '@/assets/style/reset.css' // global reset css
import 'boxicons'

import WaveBall from '@/components/WaveBall/WaveBall.vue'
import ColDivider from '@/components/Divider/ColDivider.vue'
import ErrorAlert from '@/components/Alert/ErrorAlert.vue'
import MyInput from '@/components/MyInput/MyInput.vue'
import MyDialog from '@/components/MyDialog/MyDialog.vue'
import FileUploader from '@/components/FileUploader/FileUploader.vue'
import MyProgress from '@/components/MyProgress/MyProgress.vue'


Vue.config.productionTip = false

Vue.component('WaveBall', WaveBall)
Vue.component('ColDivider', ColDivider)
Vue.component('ErrorAlert', ErrorAlert)
Vue.component('MyInput', MyInput)
Vue.component('MyDialog', MyDialog)
Vue.component('MyProgress', MyProgress)
Vue.component('FileUploader', FileUploader)

Vue.use(Vuesax, {})
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
