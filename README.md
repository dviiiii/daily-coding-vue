<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo.svg">
    </a>
</p>

# iView Admin
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.2-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/iview-2.5.0-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)

## 当前版本：v1.1.2
[更新日志](https://github.com/iview/iview-admin/releases)

[使用教程](https://github.com/iview/iview-admin/wiki)

[在线访问](https://iview.github.io/iview-admin)

`注：在线版本会在开发版本新小版本发布后更新到相应版本，所以如果想体验最新版本iview-admin，请clone完整项目代码到本地运行。`

## Run

```
npm run dev
```

## 简介
&emsp;&emsp;基于iView admin和node的练手之作。

## 功能

- 2017/10/25
> 搭建基本架构
> 复习了一遍git的ssh设置和上传
> 学习了node和express入门
> 用到了cors跨域

- 2017/10/26
> 基本的登陆注册功能
> 学习了mongodb的连接，基于mongoose模块
> 学习了node基本的接口调用
> 实现了查找账号密码，即数据库的基础查询

- 2017/11/13
> 创建不如读书菜单，页面
> 实现新增图书功能
> 学习了mongodb的数据库备份导出
- 2017/11/14
> 新增今日已读功能
> 新增今日待复习功能
> 新增删除书籍功能
> 学习了mongodb基本的怎删改查


## 文件结构
```shell
.
├── dist
│   ├── langs    TinyMCE富文本编辑器语言包
│   ├── plugins    TinyMCE富文本编辑器组件
│   ├── skins    TinyMCE富文本编辑器皮肤
│   └── themes    TinyMCE富文本编辑器主题
└── src
    ├── config    项目配置
    ├── images    图片文件
    ├── libs    工具方法
    ├── styles    样式文件
    ├── template    ejs模板
    └── views    视图组件
        ├── access    权限管理
        ├── error_page    错误页面
        ├── form    表单
        │   ├── article-publish    文章发布
        │   └── work-flow    工作流
        ├── home    首页
        ├── main_components    主框架
        ├── message    消息中心
        ├── my_components    组件
        │   ├── count-to    数字渐变
        │   ├── draggable-list    可拖拽列表
        │   ├── file-upload    文件上传
        |   ├── image-editor    图片预览编辑
        │   ├── markdown-editor    markdown编辑器
        │   └── text-editer    富文本编辑器
        ├── own-space    个人中心
        ├── screen-shorts    锁屏
        └── tables    表格
```

## Links

- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)

## 效果展示

- 登录
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/home.gif)

- 标签导航
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/page-tags.gif)

- 权限管理
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/access.gif)

- 可拖拽列表
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/dragable-list.gif)

- 图片预览编辑
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/image-editor.gif)

- 文件上传
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/upload.gif)

- 数字渐变
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/count-to.gif)

- 文章发布
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/article-publish.gif)

- 工作流
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/workflow.gif)

- 可拖拽表格
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/dragable-table.gif)

- 可编辑表格
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/editable-table.gif)

- 表格导出数据
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/exportable-table.gif)

- 表格转图片
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/table2image.gif)

- 错误页面
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/error-page.gif)

- 锁屏
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/locking.gif)

- 可收缩侧边栏
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/sidebarmenu.gif)s

- 主题切换
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/theme.gif)

- 消息中心
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/message.gif)

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, iView
