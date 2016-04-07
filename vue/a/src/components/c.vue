<style scoped>
/**
scoped的使用，它表示在该style中定义的样式只会在当前的组件中起到效果，而不会去影响全局的css样式
**/
    .c{
        background:#f00;
    }
</style>

<template>
    <div>
        <h1>I am a Counter Component. Edit me in dev mode.</h1>
        <p>Current count: {{count}}</p>
    </div>
</template>

<script>
    export default {
        data () {
            return { count: 0 }
        },
        ready () {
            this.handle = setInterval(() => {
                        this.count++
            }, 1000)
        },
        destroyed () {
            clearInterval(this.handle)
        }
    }
</script>