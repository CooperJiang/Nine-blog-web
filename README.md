项目说明

### 显示预览

前台对外显示地址 [https://jiangly.com](https://jiangly.com)

后台管理系统地址 [https://admin.jiangly.com/](https://admin.jiangly.com/)

后端接口文档地址[https://api.jiangly.com/docs/](https://api.jiangly.com/docs/)

### 项目说明

项目采用前后端分离开发，并且前端分为两部分开发，一共分为，对外展示博客页、后台管理系统、后端服务三部分组成，三个独立的项目。



### 项目基础技术栈

* 前台展示：[ Vue2](https://cn.vuejs.org/)、 [NuxtJs](https://nuxtjs.org/) 、[socket.io](https://socket.io/)
* 后台管理：[vue3](https://v3.cn.vuejs.org/)、[fantastic-admin](https://fantastic-admin.netlify.app/)、[vite](https://vitejs.cn/)、[Echars](https://echarts.baidu.com/)
* 后端服务：[NodeJs](https://nodejs.org/zh-cn/)(版本:14.14.6) 、[NestJs](https://docs.nestjs.cn/)、[Typeorm](https://typeorm.biunav.com/)、[socket.io](https://socket.io/)、[Mysql]()、

 上面是用到的一些基础技术栈，注意后端的包管理器为**pnpm**，其包管理器可能导致依赖安装失败、因为项目很多技术栈我也是为了练手也是第一次使用，很多地方可能已经有些落后了，遇到分歧请参考官方文档



### 迁移准备

如果你想完整的迁移我得博客并进行二次开发，你需要准备如下

* 基本的云服务器
* Mysql数据库
* 存储目前使用的是腾讯云对象存储cos
* Redis[可选]

目前项目里面已经内置了一个测试数据库，和一个免费的资源存储接口，资源上传接口的服务器大概八月份就到期了，建议提前使用自己服务存储，内置的数据库可以直接运行项目就可以启动，只有少部分依赖于cos的对象存储可能无法使用，上传图片类的东西。测试数据库是共享的，希望大家不要天天删库。。。



### 项目运行

* 前台项目【Nine-blog-web】
  * cnpm install
  * npm run dev
* 后端项目【Nine-blog-api】
  * pnpm install
  * npm run start:dev
* 后台管理【Nine-blog-admin】
  * cnpm install
  * npm run dev



### 项目配置

大多数的配置都写在了配置文件，部分可能不常用的遗漏掉了，全局搜索**jiangly**包含这个域名的大概率是您你需要替换的东西，其他的随意。



### 二次开发

项目支持你随意二次开发，有问题可以issue或者添加我的**vx**、拉你进讨论群大家一起交流。



### 博客页面展示



##### 博客首页

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652779109683image.png)



##### 文章详情页

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652780451187image.png)



##### 工具使用页

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652780609473image.png)



##### 博客工具箱页面 

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652779257607image.png)



##### 博客作品页

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652779231586image.png)



##### 博客公共音乐聊天室

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652779472688image.png)



##### 后台管理首页

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652780039693image.png)



##### 后台博客管理

![](https://public-1300678944.cos.ap-shanghai.myqcloud.com/blog/1652780093194image.png)



* 更多细节等你来提......



* B站视频分享： [查看视频，期待三连](https://www.bilibili.com/video/BV1ZS4y1B7SH/)

