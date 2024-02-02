# Vendisc文盘
> 简单好看的在线文件存储系统

# 部署流程

## 1、拉取项目

第一次部署

```shell
git clone git@github.com:vendisc/vendisc-server.git
```

更新

```shell
git pull origin main
```

## 2、安装依赖

```shell
npm install
```

## 3、配置constant.json

第一次部署，需要安装mysql和node环境，在`src/config`中`constant.json`，内容如下替换:

```json
{
  "MAIL_USER": "<POP3发信邮箱>",
  "MAIL_PASSWORD": "<POP3发信邮箱密码>",
  "MAIL_SERVICE": "<POP3发信服务器>",
  "MAIL_PORT": 465,
  "DB_NAME": "<数据库名>", // 与mysql中的数据库对应
  "DB_USERNAME": "<数据库用户名>",
  "DB_PASSWORD": "<数据库密码>",
  "DB_HOST": "<数据库主机地址>",
  "DB_PORT": 3306
}
```

## 4、启动项目

```shell
npm run serve
```

> 建议使用pm2启动并管理项目进程


