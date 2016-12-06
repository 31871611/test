// http://www.imooc.com/video/8525/0

var EventEmitter = require('events').EventEmitter;


var life = new EventEmitter();

life.setMaxListeners(11);   // 添加后不报错



function water(who){
    console.log('给' + who + '倒水');
}



// 事件名.不推荐使用汉字
life.on('求安慰',water);


life.on('求溺爱',function(who){
    console.log('给' + who + '溺爱');
});

life.on('求安慰',function(who){
    console.log('给' + who + '做饭');
});

life.on('求安慰',function(who){
    console.log('给' + who + '洗衣服');
});

life.on('求安慰',function(who){
    console.log('给' + who + '1');
});
life.on('求安慰',function(who){
    console.log('给' + who + '2');
});
life.on('求安慰',function(who){
    console.log('给' + who + '3');
});
life.on('求安慰',function(who){
    console.log('给' + who + '4');
});
life.on('求安慰',function(who){
    console.log('给' + who + '5');
});
life.on('求安慰',function(who){
    console.log('给' + who + '6');
});
life.on('求安慰',function(who){
    console.log('给' + who + '7');
});
life.on('求安慰',function(who){
    console.log('给' + who + '8');
});
life.on('求安慰',function(who){
    console.log('给' + who + '9');
});
life.on('求安慰',function(who){
    console.log('给' + who + '10');
});

// 移除事件
life.removeListener('求安慰',water);
// 移除全部事件
life.removeAllListeners('求安慰');      //为空移除全部事件


//只会运行emit定义的.求安慰.事件
var hasConfortListener = life.emit('求安慰','汉子');         // 输出：给汉子倒水（上面定义内容）
var hasLovedListener = life.emit('求溺爱','妹子');
var hasPlayedListener = life.emit('求玩坏','汉子和妹子');


console.log(life.listeners('求安慰').length);              // 事件.求安慰，长度
console.log(EventEmitter.listenerCount(life,'求溺爱'));    // 事件.求安慰，长度


console.log(hasConfortListener);            //有监听事件过为true
console.log(hasLovedListener);
console.log(hasPlayedListener);             //没监听过为false

















