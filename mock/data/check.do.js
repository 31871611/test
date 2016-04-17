//访问地址check.do
/***
 *
 * @type {{params: {id: number}, response: string}}
//版本1
module.exports = {
    params: {id: 123},
    response: './check_one.json'
};

*/

//与mock.js结合
var Mock = require('mockjs');

module.exports = [{
    params: {id: 123},
    response: './check_one.json'
}, {
    params: {id: 456},
    response: './check_two.json'
}, {
    params: {id: 789},
    //response: {
    //    name: "three"
    //}
    response:Mock.mock({
        "msg":"成功",
        "Data|10":[{
            "orderNum|1-10000":1,
            "type|1":["正在审核","待送件","正在评估","待定价","待退件","退件中","完成送件","送件失败"],
            "url":"sendinfo.html",
            "images":"images/order_list.jpg",
            "title|1":[
                "A859 郭懋介残荷听雨系列套件章",
                "BV103061 林文举作水洞高山石禅字之祖薄意方章",
                "BV103062 古月作高山石笛弄晚风薄意方章",
                "BV103063 荔枝洞石薄意方章",
                "BV103064 芙蓉石三脚兽钮章",
                "BV103065 王龙龙作芙蓉石马钮章",
                "BV103068 芙蓉石合欢方章",
                "BV103083 都成坑石/高山石金鱼套件",
                "BV103084 芙蓉石夔凤博古纹龙形水盂",
                "BV103085 林云曦作汶洋石饲鹤图臂搁",
                "BV103086 芙蓉石古兽把玩件",
                "BV103087 山秀园石衔芝吉羊把玩件",
                "BV103088 郑则金作芙蓉石灵兔献寿把件"
            ],
            "size":"4.2x3.4x2.6 cm",
            "weight|1-10000":1,
            "price|1-10000":1,
            "time":new Date()
        }]
    })
}];