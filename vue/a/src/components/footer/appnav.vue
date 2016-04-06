
<template>
    <nav class="appnav">
        <a v-link="{path:'/pinlei',activeClass:'select'}" href="" class="classify_ico">
            <i class=""></i>
            <b>分类</b>
        </a>
        <a v-link="{path:'/newpreview',activeClass:'select'}" href="" class="newpreview_ico">
            <i class=""></i>
            <b>新品预览</b>
        </a>
        <a v-link="{path:'/',activeClass:'select'}" href="" class="home_ico">
            <i class="select"></i>
            <b>首页</b>
        </a>
        <a v-link="{path:'/shopping',activeClass:'select'}" href="" class="shopping_ico">
            <i></i>
            <b>购物车</b>
            <em>1</em>
        </a>
        <a href="javascript:;" v-on:click="help" class="user_ico">
            <i></i>
            <b>我的帮助</b>
        </a>
    </nav>
</template>

<script>

    export default{
        methods:{
            help:function(){
                alert("帮助");
            }
        }
    }

</script>