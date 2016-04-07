
<template>

    <div class="wrap">
        <header>

        </header>
        <article class="main">
            {{msg}}
            <p>{{tpnd}}</p>
            <p>{{area}}</p>
            <p>{{circumference}}</p>
        </article>

        <footer>
            <appnav></appnav>
        </footer>
    </div>

</template>

<script>
    import appnav from './footer/appnav.vue';
    import {tpnd,area,circumference} from '../profile';


    export default{
        data(){
            return {
                msg:"品类",
                tpnd:tpnd(),
                area:area(4),
                circumference:circumference(14)
            }
        },
        components:{
            appnav
        }
    }

</script>