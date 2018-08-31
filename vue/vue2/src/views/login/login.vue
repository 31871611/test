<template>
  <div class="login">
    <div class="item">
      <label for="">帐号：</label>
      <input type="text" placeholder="请输入帐号" v-model="form.name">
    </div>
    <div class="item">
      <label for="">密码：</label>
      <input type="password" placeholder="请输入密码" v-model="form.password">
    </div>

    <div class="btn">
      <a href="javascript:;" :class="{'select':form.name != '' && form.password != ''}" @click="login()">登录</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'login',
  data () {
    return {
      form: {
        name:'',
        password:''
      }
    }
  },
  mounted: function () {

  },
  methods: {
    login(){
      if(this.form.name == '' && this.form.password == ''){
        return false
      }

      alert('登录');
    }
  }
}
</script>
<style lang="scss" src="../../assets/scss/login.scss"></style>

