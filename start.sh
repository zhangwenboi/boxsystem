#!/bin/bash

# 设置 Git 仓库地址和本地路径
GIT_REPO="https://gitee.com/wen_wen_okok/downanyfiles.git"
LOCAL_PATH="/root/project"

# 设置 Node.js 应用的入口文件
NODE_APP="/root/project"

# 设置node路径
NODE_PATH="/root/node/bin/node"

LOG_FILE="/var/log/start_script.log"

# 定义git操作超时时间（秒）
GIT_OPERATION_TIMEOUT=30

run_all_js() {
   # 遍历目录下的所有 JavaScript 文件
    for file in $NODE_APP/*.js; do
        if [ -f "$file" ]; then
            log "运行文件: $file"
            $NODE_PATH "$file" &  
        fi
    done
   wait
} 

# 函数：记录日志
log() {
    local log_message=$1
    echo "$(date +'%Y-%m-%d %H:%M:%S') $log_message" >> $LOG_FILE
}

# 检查本地路径是否存在，如果不存在则创建
if [ ! -d "$LOCAL_PATH" ]; then
    mkdir -p "$LOCAL_PATH"
fi

# 切换到本地目录
cd "$LOCAL_PATH"

log "切换到目录: $LOCAL_PATH"

pkill node 

# 如果目录为空，则进行 git clone；如果不为空，则执行 git pull
if [ -z "$(ls -A $LOCAL_PATH)" ]; then
    timeout $GIT_OPERATION_TIMEOUT git clone "$GIT_REPO" .
    systemctl restart  StartScriptService
else
# 在每次执行时运行 JavaScript 文件
    run_all_js
# 检查是否需要拉取最新版本
    timeout $GIT_OPERATION_TIMEOUT git fetch origin
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse @{u})
    if [ $LOCAL != $REMOTE ]; then
        log "检测到新版本，拉取最新代码"
        git pull origin master
        systemctl restart  StartScriptService
    fi
fi

 


# 检查是否是第一次执行
if [ ! -f /tmp/start_sh_executed ]; then
    # 第一次执行的任务
    touch /tmp/start_sh_executed
    log "第一次执行 start.sh，设置为 systemd 服务"

    # 创建 systemd 服务单元文件
    cat <<EOF > /etc/systemd/system/StartScriptService.service
[Unit]
Description=Start Script Service
After=network.target

[Service]
Type=simple
ExecStart=/root/start.sh
Restart=always
RestartSec=10
TimeoutStartSec=5m

[Install]
WantedBy=multi-user.target
EOF
    # 重新加载 systemd 配置
    systemctl daemon-reload
    # 启动服务并设置开机自启
    systemctl start  StartScriptService
    systemctl enable  StartScriptService
    # 检查是否已经存在指定的定时任务
    crontab -r
    (crontab -l ; echo "0 8 * * * /root/start.sh") | crontab -
fi


# 在每次执行时运行 JavaScript 文件
run_all_js