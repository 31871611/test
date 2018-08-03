<?php
namespace app\admin\controller;

//use think\Controller;
use think\Request;
use think\Db;

use app\admin\model\Cate as CateModel;
use app\admin\model\Article as ArticleModel;
use app\admin\controller\Common;

class Article extends Common
{

    // 读取列表
    public function lists()
    {
        $admin = new ArticleModel();
        $list = $admin->getArticl(10);
        return $this->fetch('list', [
            'list' => $list
        ]);
    }

    public function add()
    {
        if(Request()->isPost()){

            $data = input('post.');
            //	获取表单上传文件	例如上传了001.jpg
            $file =	request()->file('thumb');
            //	移动到框架应用根目录/public/uploads/	目录下
            if($file){
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
                if($info){
                    //	成功上传后	获取上传信息
                    $data['thumb'] = DS . 'uploads/' . $info->getSaveName();
                    // C:/phpStudy/PHPTutorial/WWW/bick/public/uploads/20180710/5dfc328358ea0b046d536b22276a787f.jpg
                }else{
                    //	上传失败获取错误信息
                    $this->error($file->getError());
                }
            }
            $data['time'] = time();
            $articleModel = new ArticleModel();
            if($articleModel->save($data)){
                $this->success('添加文章成功！',url('article/lists'));
            }else{
                $this->error('添加文章失败！');
            }
            return;
        }

        $cate = new CateModel();
        return view('',[
            'pidList' => $cate->catetree()           // 读取栏目
        ]);
    }

    public function edit()
    {
        // 获取一条数据
        $article = Db::name("article")->where([
            'id' => input('id')
        ])->find();

        // 是否编辑的提交
        if(request()->isPost()){
            $article = new ArticleModel();
            if($article->editarticle(input('post.'))){
                $this->success('编辑文章成功！',url('article/lists'));
            }else{
                $this->error('编辑文章失败！');
            }
            return false;
        }

        $cate = new CateModel();
        return view('',[
            'article' => $article,
            'pidList' => $cate->catetree()           // 读取栏目
        ]);
    }

    public function del(){
        // 获取用户名
        $article = Db::name("article")->where([
            'id' => input('id')
        ])->find();
        if(!$article){
            $this->error('该文章不存在！',url('article/lists'));
        }

        // 是否删除
        if(request()->isGet()){
            // 删除缩略图
            $thumbpath = ROOT_PATH . 'public' . DS . $article['thumb'];
            if(file_exists($thumbpath)){
                @unlink($thumbpath);
            }

            $article = new ArticleModel();
            if($article->delarticle(input('id'))){
                $this->success('删除文章成功！',url('article/lists'));
            }else{
                $this->error('删除文章失败！');
            }
        }

    }

}
