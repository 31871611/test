
<template>
    <div class="wrap">
        <header>

        </header>
        <article class="main">
            {{msg}}
        </article>

        <footer>
            <appnav></appnav>
        </footer>
    </div>
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