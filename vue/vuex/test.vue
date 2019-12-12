<template>
    <div class="test-wrap">
        <v-state-test v-if="isShow"></v-state-test>
        <ul v-if="allList.length">
            <li :key="index" v-for="(item, index) in allList">
                编号：{{item.id}} ----
                姓名：{{item.name}} ----
                性别：{{item.sex}}
            </li>
        </ul>
        <p>
            <button class="hide" @click="hide">隐藏</button>
            <button class="show" @click="show">展示</button>
            <button class="addList" @click="invokePushItems(items)">异步提交数据</button>
            <button class="addList2" @click="pushCollects(items)">同步提交数据</button>
        </p>
    </div>
</template>
<script>
import StateTest from "@views/StateTest.vue"
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    name: "test",
    data() {
        return {
            items:{
                id: 0,
                name: "ljw",
                sex: "man"
            }
        }
    },
    components: {
        "v-state-test": StateTest,
    },
    computed: {
        ...mapState({ // 这里的footerStatus是指模块的名字 name
           isShow: state => state.footerStatus.showFooter, // 获取isShow
           allList: state => state.collection.collects, // 获取 collects
        }),
        // 你也可以使用下面的方式来获取 isShow 的值
        // footerStatus指的是modules文件夹下的footerStatus.js模块
        // 第一个isShow是我自定义的只要对应template里v-if="isShow"就行，
        // 第二个isShow是对应的footerStatus.js里的getters里的isShow
        ...mapGetters('footerStatus', {
            isShow: 'isShow',
        }),
        ...mapGetters('collection', {
            allList: 'renderCollects'
        })
    },
    methods: {
        hide() {
            this.$store.dispatch("footerStatus/hideFooter")
        },
        show() {
            this.$store.dispatch("footerStatus/showFooter")
        },
        // 异步提交数据
        ...mapActions('collection',[
            "invokePushItems"
        ]),
        // 同步提交数据
        ...mapMutations('collection', [
            "pushCollects"
        ])
    }
}
/*
 https://zhuanlan.zhihu.com/p/80373603?utm_medium=social&utm_source=wechat_session
 */
</script>