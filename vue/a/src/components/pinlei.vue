
<template>
    {{msg}}
    <appnav></appnav>
</template>

<script>
    import appnav from './footer/appnav.vue';

    export default{
        data(){
            return {
                msg:"品类"
            }
        },
        components:{
            appnav
        }
    }

</script>