import axios from './axios';


let baseUrl = '';
if(process.env.NODE_ENV == "development"){
  baseUrl = '';
}else{
  baseUrl = 'http://39.109.3.43:8080';
}
//export const sendReward = params => { return axios.post(`${baseUrl}/admin/sendReward`, qs.stringify(params)).then(res => res.data); };
export const user = params => { return axios.post(`${baseUrl}/api/user`, params).then(res => res.data); };
export const login = params => { return axios.post(`${baseUrl}/api/login`, params).then(res => res.data); };
export const phpIndex = params => { return axios.post(`http://localhost/thinkphp/public/index.php/index/index/index`, params).then(res => res.data); };


