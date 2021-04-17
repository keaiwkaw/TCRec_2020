import axios from 'axios' // 引入axios
import QS from 'qs'
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.baseURL = "http:****";
// axios.defaults.baseURL = "http://192.168.1.198:8080/";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config=>{

  return config
})
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    // console.log(QS.stringify(params));
    
    axios
      .post(url, QS.stringify(params))
      
      .then(res => {
        console.log(QS.stringify(params));
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
