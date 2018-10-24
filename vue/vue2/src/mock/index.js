import Mock from 'mockjs'
import loginAPI from './login'
import searchAPI from './search'

// 设置响应时间
Mock.setup({ timeout: '200-2000' });

// 登录相关
Mock.mock('/api/login', 'post' , loginAPI.login);
//Mock.mock('/login/logout', 'post', loginAPI.logout);

// 搜索
Mock.mock('/api/searchArtist', 'post' , searchAPI.artist);

export default Mock
