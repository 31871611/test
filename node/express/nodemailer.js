/**

 nodemailer是nodejs中的邮件发送模块
 npm install nodemailer --save

 https://nodemailer.com/smtp/
 http://blog.csdn.net/zzwwjjdj1/article/details/51878392



*/

var nodemailer = require('nodemailer');

console.log('创建中...');
var transporter = nodemailer.createTransport({
    //secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    service : '163',          // 设置为知名服务的名称，因此您不必输入端口、主机和安全选项（请参阅知名服务）
    auth : {
        user : 'btname@163.com',
        pass : '123abc999'
    }
});

var mailOptions = {
    from: 'btname@163.com', // 发送者
    to: '31871611@qq.com', // 接受者,可以同时发送多个,以逗号隔开
    subject: 'nodemailer2.5.0邮件发送', // 标题
    //text: 'Hello world', // 文本
    html: `<h2>nodemailer基本使用:</h2><h3>
    <a href="http://blog.csdn.net/zzwwjjdj1/article/details/51878392">
    http://blog.csdn.net/zzwwjjdj1/article/details/51878392</a></h3>`
};

transporter.sendMail(mailOptions, function(error, info){
    console.log('发送中...');
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});