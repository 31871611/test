
<template>
    <div class="wrap page" transition="open">
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

    export var data={
        msg:"新品"
    };

    export default{
        data(){
            return data;
        },
        components:{
            appnav
        }
    }

</script>