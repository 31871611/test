require.config({
    //开发时防止缓存
    urlArgs: "bust=" + (new Date()).getTime(),
    paths : {
        "vue" : ["../public/js/vue"]
    }
});
require(["js/test"]);