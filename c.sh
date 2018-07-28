#!/usr/bin/bash
git init
git config user.name 'zhlfm'
git config user.email '2926026692@qq.com'
git config credential.helper store
git remote rm origin
git remote add origin https://github.com/zhlfm/vue-admin.git
git pull origin master
git add .
git commit -m 's'
git push origin master
