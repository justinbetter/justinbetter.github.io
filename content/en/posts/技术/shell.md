---
title: "学会写shell脚本"
date: 2018-03-01T20:00:22+08:00
draft: false
---

##shell是什么
	
		Shell 是一个用C语言编写的程序，它是用户使用Linux的桥梁。
		Shell既是一种命令语言，又是一种程序设计语言，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

##shell脚本是什么

- shell是为shell编写的脚本程序。
	
- Bash是大多数Linux系统默认的Shell。
			
		#! 告诉系统其后路径所指定的程序即是解释此脚本文件的Shell程序。
		如： #!/bin/bash

- 运行方法

		第一种： 
		chmod +x ./test.sh  #使脚本具有执行
		./test.sh  #执行脚本
		第二种：
		/bin/sh test.sh #运行解释器
		
##变量
- 使用变量 

		your_name="qinjx"
		echo $your_name
		echo ${your_name} #花括号可加可不加

- 设置只读变量

		myUrl="http://www.w3cschool.cc"
		readonly myUrl
- 删除变量 unset

##字符串

- 获取长度 

		string="abcd"
		echo ${#string} #输出 长度4
- 提取字符串
	
		echo ${string:1:4}
- 查找index

		string="runoob is a great company"
		echo `expr index "$string" is`  # 输出 8

##数组
- 定义
		
		array_name=(value0 value1 value2 value3)

- 读取

		valuen=${array_name[n]}
		echo ${array_name[@]} #获取所有元素
- 获取长度

		length=${#array_name[@]}	
		lengthn=${#array_name[n]}
	
##脚本参数
- 获取参数
	
		脚本内获取参数的格式为：$n

		$#	传递到脚本的参数个数
		
		$*	以一个单字符串显示所有向脚本传递的参数。
		
		如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。
		

		如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。

## 运算符

- 原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。
expr 是一款表达式计算工具，使用它能完成表达式的求值。例如，两个数相加(注意使用的是反引号 ` 而不是单引号 ')：

		#!/bin/bash
		
		val=`expr 2 + 2`
		echo "两数之和为 : $val"

##echo
。。。没啥说的，就是显示
##printf

	printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234 
##if
	if condition1
	then
	    command1
	elif condition2 
	then 
	    command2
	else
	    commandN
	fi

##for
	for var in item1 item2 ... itemN
	do
	    command1
	    command2
	    ...
	    commandN
	done
##while
	while condition
	do
	    command
	done

##函数
- 使用
- 
	funWithReturn(){
	    echo "这个函数会对输入的两个数字进行相加运算..."
	    echo "输入第一个数字: "
	    read aNum
	    echo "输入第二个数字: "
	    read anotherNum
	    echo "两个数字分别为 $aNum 和 $anotherNum !"
	    return $(($aNum+$anotherNum))
	}
	funWithReturn
	echo "输入的两个数字之和为 $? !"
	#函数返回值在调用该函数后通过 $? 来获得

- 函数参数
- 
	funWithParam(){
	    echo "第一个参数为 $1 !"
	    echo "第二个参数为 $2 !"
	    echo "第十个参数为 $10 !"
	    echo "第十个参数为 ${10} !"
	    echo "第十一个参数为 ${11} !"
	    echo "参数总数有 $# 个!"
	    echo "作为一个字符串输出所有参数 $* !"
	}
	funWithParam 1 2 3 4 5 6 7 8 9 34 73

##包含外部脚本，以便独立使用
- source 或者 .

		#使用 . 号来引用test1.sh 文件
		. ./test1.sh
		
		# 或者使用以下包含文件代码
		# source ./test1.sh
