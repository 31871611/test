

<template>

    <div class="wrap">
        <header>
            <div class="searchCon">
                <img v-bind:src="'src/assets/images/logo.png'"  class="logo" alt=""/>
                <!--搜索栏-->
                <div class="search">
                    <div class="searchInput">
                        <input class="text" type="text" id="search_input" placeholder="搜索藏品"/>
                        <a class="delete" id="search_delete" href="javascript:;" style="display: none;"></a>
                        <!--搜索历史列表-->
                        <div class="search_list" style="display: none;">
                            <h2>搜索历史</h2>
                            <ul>
                                <li><a href="http://www.baidu.com">田黄石价格暴涨的原因</a></li>
                                <li><a href="http://www.163.com">郭懋介作品最近报价</a></li>
                                <li><a href="http://www.qq.com">芙蓉石印章</a></li>
                            </ul>
                            <div class="history">
                                <a href="" class="empty"><i></i>清空历史记录</a>
                                <a href="javascript:;" class="exit">关闭</a>
                            </div>
                        </div>
                    </div>
                    <a class="search_link" href="javascript:;"></a>
                </div>
            </div>
        </header>

        <article class="main">
            <div>
                <!--抢购-->
                <div class="mw index_slider snapping">
                    <ul id="slider">
                        <li><a href="http://www.sina.com">
                            <img v-bind:src="'src/assets/images/2.jpg'"  alt=""/>
                            <div class="time">
                                <b>￥8,900</b>
                                <div id="time" class="time_count"><span>0<em></em></span><span>0<em></em></span>:<span>0<em></em></span><span>0<em></em></span>:<span>0<em></em></span><span>0<em></em></span></div>
                            </div>
                        </a></li>
                    </ul>
                    <div class="slider_tab" id="slider_tab">

                    </div>
                </div>

                <!--首页寿山石与珠宝切换-->
                <div class="mw showTab">
                    <a href="javascript:;" class="select">寿山石</a>
                    <a href="javascript:;">珠宝</a>
                </div>
                <!--商品列表-->
                <div id="goodsList">
                    <list></list>
                    <ul class="goods_list con" style="display: none;">
                        <li>1</li>
                    </ul>
                </div>

            </div>
        </article>

        <footer>
            <!--底部导航-->
            <appnav></appnav>
        </footer>
    </div>

</template>

<script>
    import list from './goodslist/list.vue';
    import appnav from './footer/appnav.vue';

    export default{
        ready:function(){

        },
        data(){
            return {
//                msg:"首页"
            }
        },
        components:{
            list,
            appnav
        }
    }

</script>