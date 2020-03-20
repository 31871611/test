<?php
namespace app\index\controller;

use think\Config;
use think\Db;
use think\Request;
use think\Controller;

use app\index\model\CmsUser;
//use think\Loader;

class Index extends controller
{
/*
    public function __construct(){
        //动态配置
        config('before','before');
    }
*/
    public function index()
    {
        //return '<style type="text/css">*{ padding: 0; margin: 0; } .think_default_text{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p> ThinkPHP V5<br/><span style="font-size:30px">十年磨一剑 - 为API开发设计的高性能框架</span></p><span style="font-size:22px;">[ V5.0 版本由 <a href="http://www.qiniu.com" target="qiniu">七牛云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="https://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script><script type="text/javascript" src="https://e.topthink.com/Public/static/client.js"></script><think id="ad_bd568ce7058a1091"></think>';
        return 'index';
        // 动态配置
        //config('index','index');

        //dump(config());





    }

    // 使用model
    public function model(){
        // http://localhost/thinkphp/public/index.php/index/index/model

        // 查id为3的数据，如果没数据返回null
        //$res = CmsUser::get(3);

        // 方法二
        //$cmsUser = new CmsUser();
        //$res = $cmsUser::get(3);

        // 方法三，不用use app\index\model\CmsUser;
        // 使用use think\Loader;
        //$cmsUser = Loader::model("CmsUser");
        //$res = $cmsUser::get(3);

        // 方法四，不需要任何use
        $cmsUser = model("CmsUser");
        $res = $cmsUser::get(3);
        dump($res->toArray());

        // 推荐使用第一种方式

        /////////////////////////////////////

        // 查询方式
        //$res = CmsUser::get(3);
        //dump($res->user);         // 获取字段为user的数据
        //dump($res->toArray());      // 获取全部数据

        // 查询条件
        /*
        $res = CmsUser::get(function($query){
            $query->where('id','eq','4');
        });
        dump($res->toArray());
        */

        // 查询条件
        /*
        $res = CmsUser::where('id','4')
            ->field('id,user')
            ->find();
        dump($res->toArray());
        */

        $res = CmsUser::all("4,5,3");
        foreach($res as $val){
            dump($val->toArray());
        }

        /////////////////////////////////////

        // 添加数据
        /*
        $res = CmsUser::create([
            'user' => '测试添加数据',
            'pass' => md5('123456')
        ]);
        dump($res->id);
        dump($res);
        */


        /*
        // 第二种方法
        $cmsUser = new CmsUser();
        $cmsUser->user = '添加数据111';
        $cmsUser->pass = md5('123456');
        $cmsUser->save();
        dump($cmsUser->id);
        */

        /*
        // 第三种方法
        $cmsUser = new CmsUser();
        $res = $cmsUser->save([
            'user' => '第三种方法',
            'pass' => md5('123456')
        ]);
        dump($res);
        */

        /*
        // 添加多条数据
        $cmsUser = new CmsUser();
        $res = $cmsUser->saveAll([
            [
                'user' => '多条1',
                'pass' => md5('123456')
            ],
            [
                'user' => '多条2',
                'pass' => md5('123456')
            ]
        ]);
        dump($res);
        */

        //////////////////////////////////////////////////

        // 修改数据
        /*
        $res = CmsUser::update([
            'user' => '修改用户名'
        ],function($query){
            //$query->where('id','LT','17');
            $query->where([
                'id' => '17'
            ]);
        });
        dump($res);
        */


        // 方法二.推荐使用
        /*
        $res = CmsUser::where('id','=',17)->update([
            'user' => '修改用户名1'
        ]);
        dump($res);     // 返回1或0，只有更新成功才返回1
        */

        /*
        // 方法三
        $cmsUser = new CmsUser();
        $res = $cmsUser->save([
            'user' => '在次修改'
        ],['id' => '17']);
        dump($res);
        */


        /*
        // 批量更新数据
        $cmsUser = new CmsUser();
        $res = $cmsUser->saveAll([
            ['id' => 16,'user' => '批量修改16'],
            ['id' => 17,'user' => '批量修改17']
        ]);
        dump($res);
        */

        /////////////////////////////////////////////////////////////

        // 删除数据
        //$res = CmsUser::destroy(15);
        $res = CmsUser::destroy(['id' => 15]);
        dump($res);


        /*
        // 方法二
        //$res = CmsUser::where('id','=',17)->delete();
        $res = CmsUser::where([
            'id' => 16
        ])->delete();
        dump($res);     // 返回1或0，只有更新成功才返回1
        */

        /////////////////////////////////////////////////////////////


    }

    // 连接数据库表
    public function table(){
        //dump(config('database'));

        //$res = Db::connect();
        //dump($res);

        // 查询数据
        //$res = Db::query("select * from cms_user");
        // 插入数据
        //$res = Db::execute("");

        // select 返回所有记录，结果是一个二维数组
        /*
        $res = Db::table('cms_user')->where([
            'id' => '6'
        ])->select();
        */

        // find返回一条数据，结果是一个一维数组
        // 如果数据不存在，返回null
        /*
        $res = Db::table('cms_user')->find();
        dump($res);
        */

        // value返回一条数据，是这条数据的某个字段
        /*
        $res = Db::table('cms_user')->value('user');
        dump($res);
        */

        // column返回全部数据的这个字段数据
        // 如果存在第二个参数，就返回这个数组并且用第二个参数的值作为key
        /*
        $res = Db::table('cms_user')->column('user','email');
        dump($res);
        */

        $res = Db::name('cms_user')->select();
        dump($res);


        /////////////////////////////////////

        $db = Db::name('cms_user');

        # insert
        /*
        $res = $db->insert([
            'user' => '测试111',
            'pass' => md5('111111')
        ]);
        */

        // 返回id值
        /*
        $res = $db->insertGetId([
            'user' => '测试GetId',
            'pass' => md5('111111')
        ]);
        */


        // 返回插入数据成功的行数
        /*
        $data = [];
        for($i = 1;$i < 5;$i++){
            $data[] = [
                'user' => "测试all{$i}",
                'pass' => md5("111111")
            ];
        }
        $res = $db->insertAll($data);
        */
        dump($res);


        /////////////////////////////////////////////

        $db = Db::name('cms_user');

        # update
        /*
        $res = $db->where([
            'id' => 12
        ])->update([
            'user' => '修改测试'
        ]);
        */

        /*
        $res = $db->where([
            'id' => 12
        ])->setField('user','修改测试2');
        */

        // 自增
        /*
        $res = $db->where([
            'id' => 12
        ])->setInc('state');
        */

        // 自减
        $res = $db->where([
            'id' => 12
        ])->setDec('state');

        dump($res);

        /////////////////////////////////////////////////

        # delete
        $db = Db::name('cms_user');
        $res = $db->where([
            'id' => 12
        ])->delete();

        dump($res);

        /////////////////////////////////////////////////

        $db = Db::name('cms_user');
        // 输出sql语句
        $res = $db->where([
            'id' => 13
        ])->buildSql();

        dump($res);

    }

    // 返回格式
    public function demo($type='json'){
        //dump(config());

        if(!in_array($type,['json','xml'])){
            $type = 'json';
        }

        // 响应对象
        $res = [
            'code' => 200,
            'data' => [
                'list' =>[1,2,3,4,5]
            ]
        ];

        //Config::set('default_return_type',$type);
        config('default_return_type','json');
        //config('default_return_type','xml');
        return $res;
    }

    // 参数
    public function info($id){
        //echo url('index/index/index',['id' => "{$id}"]) . "<br />";

        // 获取参数一：
        // index/index/info/id/111 转换为 news/5
        return "{$id}";


        // http://localhost/thinkphp/public/index.php/news/5?name=name
        //return "{$id}...{$name}";


        // 获取参数二：
        //dump(input('id'));

        // 获取参数三：
        //dump(request()->get());
    }

    // 请求对象
    public function req(Request $request){
        // 方法一
        //$request = request();

        //dump($request);

        // 获取浏览器输入框的值
        dump($request->domain());       // http://localhost
        dump($request->pathinfo());     // index/index/req/type/5.html
        dump($request->path());         // index/index/req/type/5

        // 请求类型
        dump($request->method());
        dump($request->isGet());        // 是否get请求
        dump($request->isPost());
        dump($request->isAjax());

        // 请求的参数
        dump($request->get());          // 只有?id=10的值
        dump($request->param());        // /5的值、?id=10的值，都有
        dump($request->param('type'));  // 只接收type的值
        dump($request->post('id',100));

        session('name','sessionName');
        dump($request->session());

        cookie('name','cookieName');
        dump($request->cookie('name'));

        // 获取模块、控制器、操作
        dump($request->module());           // index
        dump($request->controller());       // Index
        dump($request->action());           // req

        dump($request->url());              // /index/index/req/type/5.html?id=10
        dump($request->baseUrl());          // /index/index/req/type/5.html

        // 方法二
        // 助手函数input 可以获取 post、get、param、session、put，更多去helper.php中查看
        //$res = input('id');
        $res = input('get.id',100,'intval');         // get类型的id值，设置默认值100, 过滤转换成整形
        dump($res);
        dump(input('session.name'));
    }

    // view对象
    public function view(){
        //dump($_SERVER);

        // view对象
        $this->assign('name','name');
        $this->assign('time',time());
        $this->assign('title','标题');
        /*
        return view('',[
            'data' => "这是注入数据",
            'user' => '用户名'
        ]);
        //return view('upload');            // app/index/view/index/upload.html
        //return view('public/upload');    // app/index/view/public/upload.html
        */

        // __construct()会报错
        /**/
        // 需要use think\Controller;
        // 需要继承 use think\Controller; class Index extends Controller
        return $this->fetch('index', [
            'data' => "这是注入数据",
            'user' => '用户名',
            'list' => [1,2,3,4,5]
        ]);

        // 替换
        //return $this->display('这是一个字符串');
    }

    // 注入标题
    public function page1(){
        $this->assign('title','标题');
        return $this->fetch();
    }

}
