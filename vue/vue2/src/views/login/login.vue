<template>
  <div class="login">
    <div class="item">
      <label for="">帐号：</label>
      <input type="text" placeholder="请输入帐号" v-model="form.username">
    </div>
    <div class="item">
      <label for="">密码：</label>
      <input type="password" placeholder="请输入密码" v-model="form.password">
    </div>

    <div class="btn">
      <a href="javascript:;" :class="{'select':form.username != '' && form.password != ''}" @click="login()">登录</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {login} from '../../api/api';
export default {
  name: 'login',
  data () {
    return {
      form: {
        username:'',
        password:''
      }
    }
  },
  mounted: function () {



  },
  methods: {
    login(){
      if(this.form.username == '' && this.form.password == ''){
        return false
      }

      let para = this.form;
      login(para).then((res) => {
        //console.log(res);
        if (res.code === -1) {
          this.$toast({
            message: res.msg,
            duration: 2000
          });
        }else{
          this.$toast({
            message: res.msg,
            duration: 2000
          });
          // 跳转
        }
      })
    }
  }
}
</script>
<style lang="scss" src="../../assets/scss/login.scss"></style>

