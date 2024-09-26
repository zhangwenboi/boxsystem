#!/bin/bash

# 设置 Git 仓库地址和本地路径
GIT_REPO="https://gitee.com/wen_wen_okok/downanyfiles.git"
LOCAL_PATH="/root/project"

# 设置 Node.js 应用的入口文件
NODE_APP="/root/project"

# 设置node路径
NODE_PATH="/root/node/bin/node"


# 检查本地路径是否存在，如果不存在则创建
if [ ! -d "$LOCAL_PATH" ]; then
    mkdir -p "$LOCAL_PATH"
fi

# 切换到本地目录
cd "$LOCAL_PATH"

# 如果目录为空，则进行 git clone；如果不为空，则执行 git pull
if [ -z "$(ls -A $LOCAL_PATH)" ]; then
    git clone "$GIT_REPO" .
else
    git pull origin master
fi
# 遍历目录下的所有 JavaScript 文件
for file in $NODE_APP/*.js; do
    if [ -f "$file" ]; then
        echo "运行文件: $file"
        NODE_PATH "$file"
    fi
done


# 检查是否是第一次执行
if [ ! -f /tmp/start_sh_executed ]; then
    # 第一次执行的任务
    touch /tmp/start_sh_executed
    echo "第一次执行 start.sh，设置开机启动和定时执行"

    # 设置开机启动
    (crontab -l ; echo "@reboot /root/start.sh") | crontab -

    # 设置每天早上8点定时执行
    (crontab -l ; echo "0 8 * * * /root/start.sh") | crontab -
fi

 