-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 08 月 03 日 01:36
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `bick`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` char(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`) VALUES
(1, '编辑', 'e10adc3949ba59abbe56e057f20f883e'),
(2, '第二', '123456'),
(3, '提交', 'e10adc3949ba59abbe56e057f20f883e'),
(6, 'admin1', 'e10adc3949ba59abbe56e057f20f883e'),
(7, '1', '58495450da8054b87a282e161067df3a'),
(8, '11111111111', '2b97cb3305e4b85ba2ba904cecff5601'),
(9, '222222222', 'e10adc3949ba59abbe56e057f20f883e'),
(10, '栏目添加员', 'e10adc3949ba59abbe56e057f20f883e');

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL COMMENT '文章标题',
  `keyword` varchar(100) NOT NULL COMMENT '关键字',
  `desc` varchar(255) NOT NULL COMMENT '描述',
  `thumb` varchar(160) NOT NULL COMMENT '缩略图',
  `author` varchar(30) NOT NULL COMMENT '作者',
  `content` text NOT NULL COMMENT '内容',
  `click` mediumint(9) NOT NULL DEFAULT '0' COMMENT '点击次数',
  `zan` mediumint(9) NOT NULL DEFAULT '0' COMMENT '点赞数',
  `time` int(10) NOT NULL COMMENT '发布时间',
  `cateid` mediumint(9) NOT NULL COMMENT '所属栏目',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `keyword`, `desc`, `thumb`, `author`, `content`, `click`, `zan`, `time`, `cateid`) VALUES
(1, '标题', '关键字', '描述', '', '作者', '<p><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; padding-right: 0px !important;">文章内容</label></p><p>自定义标题</p><p>段落格式</p><p>字体</p><p>字号</p><p><iframe style="box-sizing: border-box; display: block; width: 20px; height: 20px; overflow: hidden; border-width: 0px; border-style: initial; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; opacity: 0; cursor: pointer;"></iframe></p><p>代码语言</p><p><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; padding-right: 0px !important;">文章内容</label></p><p>自定义标题</p><p>段落格式</p><p>字体</p><p>字号</p><p><iframe style="box-sizing: border-box; display: block; width: 20px; height: 20px; overflow: hidden; border-width: 0px; border-style: initial; margin: 0px; padding: 0px; position: absolute; top: 0px; left: 0px; opacity: 0; cursor: pointer;"></iframe></p><p>代码语言</p><p><br/></p>', 0, 0, 0, 1),
(2, '标题2', '关键字', '描述', '', '作者', '<p><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; white-space: normal; background-color: rgb(251, 251, 251); padding-right: 0px !important;">描述</label><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; white-space: normal; background-color: rgb(251, 251, 251); padding-right: 0px !important;">描述</label></p>', 0, 0, 1531201320, 15),
(3, '标题23', '安全', '描述', '\\uploads/20180710\\5dfc328358ea0b046d536b22276a787f.jpg', '作者', '<p><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; white-space: normal; background-color: rgb(251, 251, 251); padding-right: 0px !important;">描述</label><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">栏目</span><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">栏目</span><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">栏目</span></p>', 0, 0, 1531203134, 1),
(4, '标题', '安全', '描述', '\\uploads/20180710\\4f55ed5e6cd67e678985ba4f235d4003.jpg', '作者', '<p><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">描述</span><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">描述</span><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">描述</span><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">描述</span></p>', 0, 0, 1531203284, 1),
(5, '111', '安全', '描述', '\\uploads/20180710\\b9da94f3b2281852dff7f8e65dc27a4d.jpg', '作者', '<p><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; white-space: normal; background-color: rgb(251, 251, 251); padding-right: 0px !important;">描述</label><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; white-space: normal; background-color: rgb(251, 251, 251); padding-right: 0px !important;">描述</label><label class="col-sm-2 control-label no-padding-right" style="box-sizing: border-box; display: inline-block; max-width: 100%; margin-bottom: 0px; font-size: 13px; vertical-align: middle; position: relative; min-height: 1px; padding-left: 15px; float: left; width: 274.156px; padding-top: 7px; text-align: right; color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; white-space: normal; background-color: rgb(251, 251, 251); padding-right: 0px !important;">描述</label></p>', 0, 0, 1531203520, 13),
(8, '标题', '关键字', '', '\\uploads/20180710\\0b9d536ee8e88b493f2519e54da585ab.jpg', '作者', '<p><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">关键字</span><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">关键字</span><span style="color: rgb(68, 68, 68); font-family: &quot;Open Sans&quot;, &quot;Segoe UI&quot;; font-size: 13px; text-align: right; background-color: rgb(251, 251, 251);">关键字</span></p>', 0, 0, 1531226709, 14);

-- --------------------------------------------------------

--
-- 表的结构 `auth_group`
--

CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` char(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `auth_group`
--

INSERT INTO `auth_group` (`id`, `title`, `status`, `rules`) VALUES
(5, '系统设置', 1, '2,4'),
(7, '文章管理员', 1, '15,18,17,16'),
(3, '超级管理员', 1, '19,22,21,20,2,4,1,3,23,5,15,18,17,16'),
(4, '管理员', 1, ''),
(6, '栏目添加员', 1, '1,5');

-- --------------------------------------------------------

--
-- 表的结构 `auth_group_access`
--

CREATE TABLE IF NOT EXISTS `auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `auth_group_access`
--

INSERT INTO `auth_group_access` (`uid`, `group_id`) VALUES
(1, 7),
(6, 3),
(9, 5),
(10, 6);

-- --------------------------------------------------------

--
-- 表的结构 `auth_rule`
--

CREATE TABLE IF NOT EXISTS `auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  `pid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `level` tinyint(1) NOT NULL DEFAULT '0',
  `sort` varchar(5) NOT NULL DEFAULT '50',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- 转存表中的数据 `auth_rule`
--

INSERT INTO `auth_rule` (`id`, `name`, `title`, `type`, `status`, `condition`, `pid`, `level`, `sort`) VALUES
(1, 'cate', '栏目设置', 1, 1, '', 0, 0, '3'),
(2, 'sys', '系统设置', 1, 1, '', 0, 0, '50'),
(3, 'cate/edit', '编辑栏目', 1, 1, '', 1, 1, '6'),
(4, 'conf/lists', '配置列表', 1, 1, '', 2, 1, '50'),
(5, 'cate/add', '添加栏目', 1, 1, '', 1, 1, '4'),
(19, 'admin', '管理员管理', 1, 1, '', 0, 0, '50'),
(15, 'article', '文章设置', 1, 1, '', 0, 0, '2'),
(16, 'article/add', '添加文章', 1, 1, '', 15, 1, '50'),
(17, 'article/edit', '编辑文章', 1, 1, '', 15, 1, '50'),
(18, 'article/del', '删除文章', 1, 1, '', 15, 1, '50'),
(20, 'admin/add', '添加管理员', 1, 1, '', 19, 1, '50'),
(21, 'admin/edit', '编辑管理员', 1, 1, '', 19, 1, '50'),
(22, 'admin/del', '删除管理员', 1, 1, '', 19, 1, '50'),
(23, 'cate/del', '删除栏目', 1, 1, '', 1, 1, '50');

-- --------------------------------------------------------

--
-- 表的结构 `cate`
--

CREATE TABLE IF NOT EXISTS `cate` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `catename` varchar(20) NOT NULL COMMENT '栏目名称',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '栏目类型;1:列表,2:单页',
  `pid` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '上级栏目id',
  `sort` mediumint(8) unsigned NOT NULL DEFAULT '50',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `cate`
--

INSERT INTO `cate` (`id`, `catename`, `type`, `pid`, `sort`) VALUES
(1, '第一', 1, 0, 1),
(2, '第二', 1, 0, 8),
(4, '第二的子导航', 1, 2, 9),
(13, '第三', 1, 0, 6),
(16, '第一的子子导航2', 1, 15, 3),
(15, '第一的子导航', 1, 1, 2),
(14, '第三的子导航22', 2, 13, 7);

-- --------------------------------------------------------

--
-- 表的结构 `conf`
--

CREATE TABLE IF NOT EXISTS `conf` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `cnname` varchar(50) NOT NULL COMMENT '配置中文名称',
  `enname` varchar(50) NOT NULL COMMENT '英文名称',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '配置类型1:单选文本；2：文本域；3：单选；4：复选；5：下拉',
  `value` varchar(250) NOT NULL COMMENT '配置值',
  `values` varchar(250) NOT NULL COMMENT '配置可选值',
  `sort` smallint(5) unsigned NOT NULL DEFAULT '50' COMMENT '索引',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
