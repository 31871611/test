<style>

    .view{

    }

    /*进入*/
    /*.open-transition{*/
        /*transition: opacity 0.3s ease;*/
    /*}*/
    /*.open-enter, .open-leave {*/
        /*opacity: 0;*/
    /*}*/

    /*@keyframes slideIn {*/
        /*from {*/
            /*transform: translate3d(100%, 0, 0);*/
        /*}*/
        /*to {*/
            /*transform: translate3d(0, 0, 0);*/
        /*}*/
    /*}*/

    /*@keyframes slideOut {*/
        /*from {*/
            /*transform: translate3d(0, 0, 0);*/
        /*}*/
        /*to {*/
            /*transform: translate3d(100%, 0, 0);*/
        /*}*/
    /*}*/
    /*.page{*/
        /*transform: translate3d(0, 0, 0);*/
    /*}*/
    /*.page.slideIn {*/
        /*animation: slideIn .2s forwards;*/
    /*}*/
    /*.page.slideOut {*/
        /*animation: slideOut .2s forwards;*/
    /*}*/


    /*返回*/
    .slide-transition {
        transition: all 0.3s ease;
        width: 100%;
    }
    .slide-enter, .slide-leave {
        transform:translate3d(100%, 0, 0);
    }


</style>


<template>
    <router-view transition="slide"></router-view>
</template>


<script>

//    module.exports={
//        data:function(){
//            return{
//                msg:"hello"
//            }
//        }
//    };

//    import CompA from './components/a.vue';
//    import CompB from './components/b.vue';
//    import CompC from './components/c.vue';
//    import navapp from './components/navapp.vue';

//    export default{
//        data(){
//            return {
//                msg :"hello from vue-loader!"
//            }
//        },
//        components:{
//            navapp,
//            CompB,
//            CompC
//        }
//    }

</script>