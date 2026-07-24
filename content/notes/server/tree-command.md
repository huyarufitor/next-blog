---
title: "tree 命令查看目录结构详情"
summary: "记录 tree 命令的安装、目录层级限制和常用过滤参数。"
section: "服务器与工具"
tags:
  - "Shell"
  - "开发工具"
updated: "2023-01-12"
---

```javascript

tree -L 3 -I "node_modules"

```

## zsh: command not found: tree

原因：
mac要单独安装一下tree,推荐用包管理工具brew
brew tree

## 一些参数的含义

上述命令得到结果
.
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── img
│   │   └── icons
│   ├── index.html
│   └── robots.txt
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── main.ts
│   ├── registerServiceWorker.ts
│   ├── router
│   │   └── index.ts
│   ├── shims-vue.d.ts
│   ├── store
│   │   └── index.ts
│   └── views
│       ├── About.vue
│       ├── Home.vue
│       ├── project.vue
│       └── station.vue
└── tsconfig.json

-L：level 限制目录显示层级,后面跟上 数字n,代表显示n个层级
3：展开几层
-I：我猜是ignore的意思，后面加上要忽略的文件夹/文件名称；
-I "node_modules" ：忽略node_modules的目录结构
-a：显示所有文件和目录，不加就不显示.开头的配置文件
-f：在每个文件或目录之前，显示完整的相对路径名称

## 其余参数说明

语法：```tree [-aACdDfFgilnNpqstux][-I <范本样式>][-P <范本样式>][目录...]```

-a 显示所有文件和目录。
-A 使用ASNI绘图字符显示树状图而非以ASCII字符组合。
-C 在文件和目录清单加上色彩，便于区分各种类型。
-d 显示目录名称而非内容。
-D 列出文件或目录的更改时间。
-f 在每个文件或目录之前，显示完整的相对路径名称。
-F 在执行文件，目录，Socket，符号连接，管道名称名称，各自加上"*","/","=","@","|"号。
-g 列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。
-i 不以阶梯状列出文件或目录名称。
-L level 限制目录显示层级。
-l 如遇到性质为符号连接的目录，直接列出该连接所指向的原始目录。
-n 不在文件和目录清单加上色彩。
-N 直接列出文件和目录名称，包括控制字符。
-p 列出权限标示。
`-P<范本样式>` 只显示符合范本样式的文件或目录名称。
-q 用"?"号取代控制字符，列出文件和目录名称。
-s 列出文件或目录大小。
-t 用文件和目录的更改时间排序。
-u 列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。
-x 将范围局限在现行的文件系统中，若指定目录下的某些子目录，其存放于另一个文件系统上，则将该子目录予以排除在寻找范围外。
