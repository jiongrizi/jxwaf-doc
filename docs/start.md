# 部署

---

## WAF 部署方式

![图片描述](/image/1.png)
JXWAF 的部署方式为反向代理，支持源代码编译部署和容器化部署，适配集群架构、Kubernetes 等多种使用场景，可以轻松实现快速部署，弹性扩展。

## 测试环境部署(源代码部署)

### 环境准备

- 服务器版本 Centos 7.x
- python 版本 python2.7
- openresty 版本 openresty-1.21.4.1
- django 版本 1.9.2

备注：如果使用不同的版本，需自行解决环境依赖等问题，官方不提供技术支持

### 控制台部署

1. \# cd /opt
2. \# yum install -y git
3. \# git clone https://github.com/jx-sec/jxwaf-mini-server.git
4. \# cd jxwaf-mini-server/
5. \# sh install.sh
6. \# pip install -r requirements.txt
7. \# python manage.py makemigrations
8. \# python manage.py migrate
9. \# nohup python manage.py runserver 0.0.0.0:80 &amp;
10. 假设管理中心 IP 为 10.0.0.1,则打开网址 [http://10.0.0.1](http://10.0.0.1/) 进行注册并登陆,登陆成功后系统会自动进行初使化。

### 节点部署

1. \# cd /tmp
2. \# yum install -y git
3. \# git clone https://github.com/jx-sec/jxwaf.git
4. \# cd jxwaf
5. \# sh install_waf.sh
6. \# 运行后显示类似信息即安装成功:

```
nginx: the configuration file /opt/jxwaf/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /opt/jxwaf/nginx/conf/nginx.conf test is successful
```

1. 假设管理中心 IP 为 10.0.0.1,则打开网址 [http://10.0.0.1](http://10.0.0.1/) 进行注册,注册完后登录账号,在 系统管理 -&gt; 基础配置 页面获取"API_KEY"和"API_PASSWORD"
2. \# cd tools
3. \# python jxwaf_init.py --api_key=84ceb8f8-c052-4d60-9b43-b6007ba67ba7 --api_password=e5546411-4d82-48ad-a3f7-3daf0de94d19 --waf_server=[http://10.0.0.1](http://10.0.0.1/)
4. 运行完成后，显示类似信息即安装成功

```
config file:  /opt/jxwaf/nginx/conf/jxwaf/jxwaf_config.json
config result:
api_key is 84ceb8f8-c052-4d60-9b43-b6007ba67ba7,access_secret is e5546411-4d82-48ad-a3f7-3daf0de94d19
waf_update_website is http://10.0.0.1/waf_update
auth result:
try to connect jxwaf server auth api_key and api_password,result is True
```

5. \# /opt/jxwaf/nginx/sbin/nginx
6. 启动 openresty,openresty 会在启动或者 reload 的时候自动到 jxwaf 管理中心拉取用户配置的最新规则,之后会定期同步配置。

## 线上环境部署(源代码部署)

### 环境准备

- 服务器版本 Centos 7.x
- python 版本 python2.7
- openresty 版本 openresty-1.21.4.1
- django 版本 1.9.2
- Mysql/Mariadb 版本 >= 5.6

备注：如果使用不同的版本，需自行解决环境依赖等问题，官方不提供技术支持

### 控制台部署

需要先部署好数据库，假设数据库地址为 192.168.1.1，端口为 3306，账号为 root，密码为 123456，数据库为 jxwaf

1. \# cd /opt
2. \# yum install git -y
3. \# git clone https://github.com/jx-sec/jxwaf-mini-server.git
4. \# cd jxwaf-mini-server/
5. \# sh install.sh
6. \# pip install -r requirements.txt
7. \# vim jxwaf_min_server/settings.py

```
#DEBUG = True
DEBUG = False
#ALLOWED_HOSTS = []
ALLOWED_HOSTS = ['*']
# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#    }
#}

DATABASES = {
 'default': {
     'ENGINE': 'django.db.backends.mysql',
     'NAME': 'jxwaf',
     'USER': 'root',
     'PASSWORD': '123456',
     'HOST': '192.168.1.1',
     'PORT': '3306',
 }
}
```

8. \# python manage.py makemigrations
9. \# python manage.py migrate
10. \# sh install_jxwaf_server.sh
11. \# uwsgi --ini uwsgi.ini
12. \# /opt/server/nginx/sbin/nginx -t

```
nginx: the configuration file /opt/server/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /opt/server/nginx/conf/nginx.conf test is successful
```

13. \# /opt/server/nginx/sbin/nginx
14. 假设管理中心 IP 为 10.0.0.1,则打开网址 [http://10.0.0.1](http://10.0.0.1/) 进行注册并登陆,登陆成功后系统会自动进行初使化。

### 节点部署

1. \# cd /tmp
2. \# yum install -y git
3. \# git clone https://github.com/jx-sec/jxwaf.git
4. \# cd jxwaf
5. \# sh install_waf.sh
6. \# 运行后显示类似信息即安装成功:

```
nginx: the configuration file /opt/jxwaf/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /opt/jxwaf/nginx/conf/nginx.conf test is successful
```

1. 假设管理中心 IP 为 10.0.0.1,则打开网址 [http://10.0.0.1](http://10.0.0.1/) 进行注册,注册完后登录账号,在 系统管理 -&gt; 基础配置 页面获取"API_KEY"和"API_PASSWORD"
2. \# cd tools
3. \# python jxwaf_init.py --api_key=84ceb8f8-c052-4d60-9b43-b6007ba67ba7 --api_password=e5546411-4d82-48ad-a3f7-3daf0de94d19 --waf_server=[http://10.0.0.1](http://10.0.0.1/)
4. 运行完成后，显示类似信息即安装成功

```
config file:  /opt/jxwaf/nginx/conf/jxwaf/jxwaf_config.json
config result:
api_key is 84ceb8f8-c052-4d60-9b43-b6007ba67ba7,access_secret is e5546411-4d82-48ad-a3f7-3daf0de94d19
waf_update_website is http://10.0.0.1/waf_update
auth result:
try to connect jxwaf server auth api_key and api_password,result is True
```

5. \# /opt/jxwaf/nginx/sbin/nginx
6. 启动 openresty,openresty 会在启动或者 reload 的时候自动到 jxwaf 管理中心拉取用户配置的最新规则,之后会定期同步配置。

## 日志采集&报表配置

### JXLOG 日志采集(推荐)

#### JXLOG 介绍

JXLOG 为 JXWAF 官方提供的轻量级日志报表解决方案，适合大部分中小企业。
JXLOG 由 JXLOG 客户端和 ClickHouse 数据库组成，部署架构如下:
![图片描述](/image/2.png)

#### 环境准备

- 服务器版本 Centos 7.x

备注：如果使用不同的版本，需自行解决环境依赖等问题，官方不提供技术支持

#### JXLOG 部署

1.安装 docker 和 docker-compose，详情可以参考 docker 官方文档：
https://docs.docker.com/engine/install/centos/

```
# yum install -y yum-utils

#  yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

# yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
# systemctl start docker
```

2.docker-compose 部署 jxlog

```
# cd /opt
# yum install -y git
# git clone https://github.com/jx-sec/jxwaf-docker-file.git
# cd jxwaf-docker-file/jxlog/
# docker compose  up -d
```

默认的 docker-compose.yml 文件中，clickhouse 的配置为:
数据库: jxwaf
账号: jxlog
密码: jxlog
**线上环境部署需要修改 docker-compose.yml 文件中的默认密码为复杂密码**
运行命令 netstat -anp|grep 9000，显示如下则运行正常

```
tcp        0      0 0.0.0.0:9000            0.0.0.0:*               LISTEN      26628/docker-proxy
tcp6       0      0 :::9000                 :::*                    LISTEN      26634/docker-proxy

```

#### JXWAF 控制台报表配置

### 阿里云日志采集

1.  登陆阿里云控制台，进入 日志服务 SLS
2.  创建 Project
    ![图片描述](/image/3.png)

3.创建 Logstore
![图片描述](/image/4.png)

4.安装 logtail
![图片描述](/image/5.png)
选择 自定义数据插件
![图片描述](/6.png)
按照说明完成安装到第四步 **数据源设置** ，以下提供的配置为开启 5555 端口的 tcp 接收，可自行修改端口配置 如 改为 "tcp://0.0.0.0:6666" 即开启 6666 端口
![图片描述](/image/7.png)

```
{
    "inputs": [
        {
            "detail": {
                "ParseProtocol": "auto",
                "Address": "tcp://0.0.0.0:5555"
            },
            "type": "service_syslog"
        }
    ],
    "processors": [
        {
            "detail": {
                "DropKeys": [
                    "_facility_",
                    "_hostname_",
                    "_ip_",
                    "_priority_",
                    "_program_",
                    "_severity_",
                    "_unixtimestamp_"
                ]
            },
            "type": "processor_drop"
        },
        {
            "detail": {
                "KeepSource": false,
                "ExpandDepth": 0,
                "ExpandConnector": "",
                "SourceKey": "_content_",
                "NoKeyError": true
            },
            "type": "processor_json"
        }
    ]
}
```

开启全局索引
![图片描述](/image/8.png)

5.配置索引
进行 JXWAF 的控制台 系统管理 -> 日志配置
![图片描述](/image/9.png)
配置完成后，对控制台配置的防护网站进行访问，当 SLS 接收到日志后，点击
![图片描述](/image/10.png)
选择 自动生成索引，保存索引即可
![图片描述](/image/11.png)

### 腾讯云日志采集

注意: 腾讯云日志服务提供的 API 接口不稳定，导致报表功能容易发生异常，请谨慎选择该方案。（2022 年 9 月份测试）

1.  登陆腾讯云控制台，进入 日志服务
2.  日志服务 -> 日志主题，创建日志主题
    ![图片描述](/image/12.png) 3.新增 LogListener 采集
    ![图片描述](/image/13.png)
    ![图片描述](/image/14.png)
    ![图片描述](/image/15.png)
    ![图片描述](/image/16.png)
    设置完成后，下载并安装 logstash，详情可以查询 logstash 的官方文档:
    [Logstash Reference [7.17] | Elastic](https://www.elastic.co/guide/en/logstash/7.17/index.html)
    详情配置文件如下，仅供参考，详情请参考腾讯云官方文档说明:

```
input {
  tcp {
    host => "127.0.0.1"
    port => 5555
    codec => json
    ecs_compatibility => disabled
  }
}

filter {
        mutate {
        remove_field => ["@version"]
        remove_field => ["@timestamp"]
        remove_field => ["port"]
}

   json {
        source => "message"
      }

}
output {
        kafka {
          topic_id => "fb88a4e9-1da4-4104-9142-b29858cb36c9"
          bootstrap_servers => "gz-producer.cls.tencentcs.com:9096"
          sasl_mechanism => "PLAIN"
          security_protocol => "SASL_PLAINTEXT"
          compression_type => "gzip"
          sasl_jaas_config => "org.apache.kafka.common.security.plain.PlainLoginModule required username='bdc9bca2-4f21-4c5f-8b57-4f13c887bc14' password='AKIDaVv80mFSQ7lnlUxA8rlZXGkyxg9NL42l#VvkUCnAII4dy86qNgkdIyb1CAwVrvrWy';"
        }
    }
```

当前配置为开启 5555 端口的 tcp 接收，可自行修改端口配置。 3.配置索引
进行 JXWAF 的控制台 系统管理 -> 日志配置
![图片描述](/image/17.png)
配置完成后，对控制台配置的防护网站进行访问，当腾讯云日志接收到日志后，点击
![图片描述](/image/18.png)
![图片描述](/image/19.png)
自动生成索引后点击确认即可

## 部署效果验证
