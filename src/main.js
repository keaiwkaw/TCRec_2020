import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import './assets/css/style.css'
import './assets/css/glide.core.min.css'
import './assets/css/glide.theme.min.css'
import {get, post} from './request/request.js'
import {debounce} from './debounce/debounce.js'
import {
  Form,
  Button,
  FormItem,
  Message,
  MessageBox,
  Input,
  Card,
  Pagination,
  Dialog,
  Table,
  TableColumn,
  Steps,
  Step,
  Select,
  Option,
  Cascader,
  Tag,
  Row
} from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Form)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Tag)
Vue.use(Row)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$debounce = debounce
// console.log(Vue.prototype.$debounce);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
