require.config({
    //开发时防止缓存
    urlArgs: "bust=" + (new Date()).getTime(),
    paths : {
        "vue" : ["../public/js/vue"],
        "VueRouter" : ["../public/js/vue-router"]
    }
});
require(["js/test"]);
//require(["js/testRouter"]);