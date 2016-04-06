
<template>
    {{msg}}
    <appnav></appnav>
</template>

<script>
    import appnav from './footer/appnav.vue';

    export default{
        data(){
            return {
                msg:"购物车"
            }
        },
        components:{
            appnav
        }
    }

</script>