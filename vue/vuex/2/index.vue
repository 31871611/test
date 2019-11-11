<template>
  <div class="index">

    <div>{{userData}}</div>

  </div>
</template>

<script type="text/ecmascript-6">
import {CLOUDLINKUSER} from '../../store/modules/user/types'

export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed:{
    userData(){
      return this.$store.state.user.user
    }
  },
  mounted: function () {

  },
  methods:{
    getUser(){
        let cloudLinkCode = this.$route.query.cloudLinkCode;
        this.$store.dispatch('user/' + CLOUDLINKUSER, cloudLinkCode);
    }
  }
}
</script>
<style lang="scss" scoped src="../../assets/scss/index.scss"></style>
