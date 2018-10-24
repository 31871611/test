import Mock from 'mockjs';
import qs from 'qs';

const userData = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  login:config => {
    let data = null
    try {
      data = qs.parse(config.body)
    } catch (error) {
      console.log(error)
    }
    if (data.username === 'admin' && data.password === '123') {
      return Mock.mock({
        code: 0,
        msg: '登录成功',
        data:userData['admin']
      })
    } else if (data.username === 'guest' && data.password === '123') {
      return Mock.mock({
        code: 0,
        role: 'guest',
        msg: '登录成功'
      })
    } else {
      return Mock.mock({
        code: -1,
        msg: '帐号或密码错误'
      })
    }
  },
  getUserInfo: config => {
    console.log(config);
  },
  logout: () => {

  }
}
