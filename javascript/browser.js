var browser = {
    versions: function () {
        var t = window.navigator.userAgent.toLowerCase();
        var u = window.navigator.userAgent
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            trident: u.indexOf('Trident') > -1,         //IE内核
            presto: u.indexOf('Presto') > -1,           //opera内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核

            isIOS: /(iphone|ipod|ipad|ios)/i.test(t),
            isAndroid: /android/i.test(t),
            isWeiXin: -1 < t.indexOf("micromessenger"),
            isQQ: -1 < t.indexOf("qq/"),
            isBaidu: -1 < t.indexOf("baiduboxapp"),
            isBaiduBrowser: -1 < t.indexOf("baidubrowser"),
            isVivoBrowser: -1 < t.indexOf("vivobrowser"),
            isSogouBrower: -1 < t.indexOf("sogoumobilebrowser"),
            is2345Brower: -1 < t.indexOf("mb2345browser"),
            isChrome: -1 != t.indexOf("crios"),
            isSafari: -1 != t.indexOf("safari") && -1 != t.indexOf("version"),
            isUcBrowser: -1 < t.indexOf("ucbrowser"),
            isQQBrowser: -1 < t.indexOf("qqbrowser"),
            isDingTalk: -1 < t.indexOf("dingtalk"),
            is360Browser: -1 < t.indexOf("qhbrowser") || -1 < t.indexOf("qihoobrowser")
        };
    }()
};