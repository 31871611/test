import * as types from './types'
import {getCloudLinkUser} from '../../../api/api'


const state = {
  user: {
    storeName:'',
    userName:'',
    fullName:''
  }
};

const actions = {
  [types.CLOUDLINKUSER](content, params) {
    let para = {};
    getCloudLinkUser(params).then((res) => {
      alert(res.accessToken)
      console.log(res);
      content.commit(types.CLOUDLINKUSER, res)
    })
  }
};

const mutations = {
  [types.CLOUDLINKUSER](state, data) {
    state.user = data;
    window.localStorage.setItem("accessToken",data.accessToken);
  },
  getId(state, id) {
    state.id = id
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
