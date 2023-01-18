---
title: "git常用规范"
date: 2019-07-15T20:00:22+08:00
draft: false
---
# 分支规范

    - 分支规范
        1. 分支命名规范：
            - master: 主线分支
            - feature/xxxx: 功能需求开发分支
            - hotfix/xxxx: bug 修复分支
            - refactor/xxxx: 重构分支
        2. 默认从主线分支 checkout 出功能需求 or bug 修复分支
        3. 分支合并需要写清本次开发的内容点
    - Commit Message 规范
        1. 命名规则：func[(main)]: done something
            - 其中 `[ ]` 中的内容可以省略
        2. func 规则：
            1. feat: 新功能开发
            2. fix: bug 修复
            3. refactor: 不影响现有功能的重构
            4. test: 添加测试
            5. chore: 构建工具改动
            6. style: 格式改动
        3. 冒号（英文冒号，并空一格）后面写上这次 commit 提交的内容，最好一个小功能点一次提交
        4. 禁止类似 `update` 这样无意义的提交！


    查看当前url
    git remote -v
    git remote set-url origin [url]
    
    git remote rm origin
    git remote add origin [url]
    
    
    
    
    git config user.name "xxx"
    
    git push origin --tags 推送tag
    
    回退版本
    git reset --hard 版本号  
    git push -f -u origin master
    
    查看项目的分支们(包括本地和远程) 
    命令行 : $ git branch -a     例如，$ git branch -a 
    
    删除本地分支 
    命令行 : $ git branch -d <BranchName>
    
    ssh
    ssh-keygen -t rsa -C "xxx@xxx.com" 
