---
title: "python基础"
date: 2019-08-08T20:00:22+08:00
draft: false
---

[TOC]

## 基础

继承： “定义子类时，必须在括号内指定父类的名称。”
	class ElectricCar(Car):

“类名应采用驼峰命名法 ，即将类名中的每个单词的首字母都大写，而不使用下划线。实例名和模块名都采用小写格式，并在单词之间加上下划线。”

### 输出输入
- print()
- input()

###数据类型
- 整数
- 浮点数
- 字符串
- 布尔值
- 空值 None
- 变量
- 常量

###字符编码
-  UTF-8编码把一个Unicode字符根据不同的数字大小编码成1-6个字节，常用的英文字母被编码成1个字节，汉字通常是3个字节，只有很生僻的字符才会被编码成4-6个字节。如果你要传输的文本包含大量英文字符，用UTF-8编码就能节省空间
-  ord() 获取整数表示
-  chr() 编码转化为字符
-  encode('ascii') str编码为指定的byte作为网络传输
-  decode('utf-8')  byte变为str读取网络字节流
-  len()
-  格式化 %d %f %s %x

### list 和tuple
- list  [1,3,2]
    - len()
    - append()
    - insert()
    - pop()
    

- tuple 另一种有序列表，一经初始化不能修改
    - (1,)
    - 和list的区别就是不可变

###条件判断
- if : ...elif:... else:....
###循环
- for..in..
- for x in ...循环就是把每个元素代入变量x，然后执行缩进块的语句。
- range()
- while x>0:...
- break 退出循环
- continue  跳过

### dict和set
- dict  {'Michael': 95, 'Bob': 75, 'Tracy': 85}
  - 类似map，键值对
  - 判断key是否存在
        - ’a‘ in dict 通过in
        - d.get('Thomas', -1)
  - pop(key) 删除指定键值对
  
- set 只包含key的集合{1,2，3}
  -  add()
  - remove()
  - 两个set 可以做& |

###函数
- abs()
- max()
- 数据类型转换
  -  int('123')
  - float()
  - str()
  - bool()  
- 定义函数 def my_function(x):...
- 导入函数 from demo1 import my_function
- pass 什么都不做
- isinstance(x,(int, float))
- 参数
  - 位置参数
  - 默认参数 def power(x, n=2):..
  - 可变参数 def calc(*number):...return sum 在函数调用时自动组装为一个tuple
  - 关键字参数 def person(name,age,**kw):...传入任意dict
  -  命名关键字参数 def person(name,age,*,city,job):... 调用时必须写key参数名
  
- 递归函数
     - 尾递归优化（没做优化，也没啥用，依然可能栈溢出）   
 
            def fact(n):
              return fact_iter(n,1)

            def fact_iter(num,product):
              if num == 1:
                  retutn 1
              return fact_iter(num-1,num*product)

###特性
- 切片
    - L[0:10] 取0-9，0可以省略，指取10个
    - L[-10:] 取倒数10个元素
    - L[::5] 所有数每5个取一个
    - list、tuple、str 都可以用切片操作

- 迭代
    - list、tuple 直接for...in..
    - dict
        - for key in d
        - for value in d.values()
        - for k,v in d.items()
    - 字符串 for ch in 'ABC':
    - list 使用下标循环 for i,value in enumerate(['A','B','C']):
- 列表生成式 
    - 创建list的生成式
    - [x*x for x in range(1,11) if x % 2 ==0]
    - 还可以两层循环 [m + n for m in 'ABC for n in 'XYZ']
    - 也可以使用两个变量 [k +'='+v for k,v in d.items()]
    
- 生成器
    - generator 一边循环一边计算的机制
    - 创建方法：    
        - g = (x * x for x in range(10)) 把一个列表生成式的[]改成()
        - next（g) 获得下一个返回值
        - for n in g:... 可以迭代循环generator
        - 推算的算法比较复杂，用类似列表生成式的for循环无法实现的时候，还可以用函数来实现
            
                def fib(max) :
                    n,a,b = 0,0,1
                    while n< max:
                        yield b
                        a,b = b,a+b
                        n = n + 1
                    return 'done'
        - yield 使函数变成一个generator
        - for 循环调用generator时想拿到返回值必须捕获StopIteration
- 迭代器
    - Iterable 可直接作用for循环的对象 list、tuple、dict、set、str、generator
    - Iterator 迭代器，可以被next()函数调用并不断返回下一个值的对象
    - isinstance
    - from collections import Iterator

### 函数式编程

- 高阶函数 一个函数可以接受另一个函数作为参数 

        def add(a,b,f):
            return  f(a) +ｆ（ｂ）
 
    - **map()** 接收函数和Iterable，返回Iterator
            
             list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
    - **reduce()**接受函数和序列，函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算
        
            reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)

    - **filter()** 过滤序列

            list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))
    - **sorted()** 可以对list排序，可以接收一个key函数来实现自定义的排序
        
             sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True)

- 返回函数
    - 高阶函数除了可以接收函数作为参数还可以将函数作为结果值返回
     
            def lazy_sum(*args):
                def sum():
                    ax = 0
                    for n in args:
                        ax = ax + n
                    return ax
                return sum
            f #返回函数
            f() #调用函数
    - 返回函数中不要引用任何可能会变化的变量。
- 匿名函数 lambda x ： x*x
- 装饰器 decorator
    - 函数也是一个对象 也有属性 f._name_  拿到f函数的名字
    - decorator就是一个返回函数的高阶函数

            import functools

            def log(func):
                #把原始函数的__name__等属性复制到wrapper()函数
                @functools.wrap(func) 

                def wrapper(*args, **kw):
                    print('call %s():' % func.__name__)
                    return func(*args, **kw)
                return wrapper
    
            @log
            def now():
                    print('2015-3-25')
        
            把@log放到now()函数的定义处，相当于执行了语句：now = log(now)
- 偏函数 
            
            import functools
            int2 = functools.partial(int ,base = 2)
            int2('1010101')  #85

###模块

        #!/usr/bin/env python3
        # -*- coding: utf-8 -*-
        
        ' a test module '
        
        __author__ = 'Michael Liao'
        
        import sys
        
        def test():
            args = sys.argv
            if len(args)==1:
                    print('Hello, world!')
            elif len(args)==2:
                print('Hello, %s!' % args[1])
            else:
                print('Too many arguments!')
        
        if __name__=='__main__':
            test()
- import sys 导入模块
- sys模块有一个argv变量，用list存储了命令行的所有参数
- 命令行运行hello模块文件时，Python解释器把一个特殊变量__name__置为__main__，而如果在其他地方导入该hello模块时，if判断将失败，一般用于测试

- 作用域 
    - 正常函数变量名可以直接引用
    - _xxx_特殊变量名
    - _xxx和__xxx非公开的函数private
    
- 安装模块 pip install Pillow
- 模块搜索路径 存放在sys模块的path变量中
    - 一是直接修改sys.path，添加要搜索的目录： sys.path.append('/Users/michael/my_py_scripts')
    - 第二种方法是设置环境变量PYTHONPATH

    

### 面向对象编程

     class Student(object):
    
        def __init__(self, name, score):
            self.name = name
            self.score = score
    
        def print_score(self):
            print('%s: %s' % (self.name, self.score))

- 创建实例直接 bart = Student()
- \_\_name 双下划线 变成了私有变量，实质是Python解释器对外改成了_Student__name
- 继承 

         class Dog（Animal）:
            def run(self):
                print(Dog is running...)
            def eat(self):
                print(Dog is eating...)

- 获取对象信息 
    - type()
    - isinstance('a',str)
    - dir() 获得对象的所有属性和方法
    - 操作状态 getattr() 、setattr()、hasattr()
- 类属性 相当于成员变量

###面向对象高级编程

- 限制实例的变量
    
        class Student(object):
            __slot__ = ('name','age') # 用元组定义只允许绑定的属性

- 为了检查参数使用 

        class Student(Object):
                
            @property
            def score(self):
                return self._score

            @score.setter
            def score(self,value):
                if not isinstance(value,int):
                    raise ValueError('must be integer')
                if value < 0 or value > 100:
                    raise ValueError('more than..')
                self._score = value                

    - @property      把getter方法变成了属性
    - @score.setter        @property本身又创建了另一个装饰器@score.setter，负责把一个setter方法变成属性赋值
    - 只定义getter方法@property，不定义setter方法就是一个只读属性：

- 多重继承
    - class Dog（Mammal，Runnable）
    - 让某个类除了继承自Bird外，再同时继承Runnable。这种设计通常称之为MixIn

- 定制类

        __str__    #print 返回自定义字符串，直接敲变量本质调用__repr__
        __iter__ #返回一个迭代对象 
        __getitem__ # 像list一样可以按下标访问数列的任意一项
        __getattr__  #在没有找到属性的情况下，才调用__getattr__
        __call__     #可以对实例直接调用，callable()判断是否可调用

- 枚举类
        
        from enum import Enum
        Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
        
        for name,member in Month.__member__.items():
            print(name,'==>',member,',',member.value)

        #value属性则是自动赋给成员的int常量，默认从1开始计数。
***
        from enum import Enum, unique
        
        @unique                  #检查没有重复值
        class Weekday(Enum):    #从Enum派生出自定义类
            Sun = 0 # Sun的value被设定为0
            Mon = 1
            Tue = 2
            Wed = 3
            Thu = 4
            Fri = 5
            Sat = 6

- 元类 metaclass
    - type() 既可以返回对象的类型，又可以创建出新的类型
    
            def fn(self,name='world'):
                print('Hello,%s!'%name)
            
            Hello = type('Hello',(object,),dict(hello=fn)) # 创建Hello.class


### 错误处理

	
		try:
	    	10 / 0
		except ZeroDivisionError:
	    	raise ValueError('input error!')

- 断言 

		def foo(s):
		    n = int(s)
		    assert n != 0, 'n is zero!'
		    return 10 / n
		
		def main():
		    foo('0')	
	- 用-O参数来关闭assert:
	
			python3 -O err.py	

- logging
		
		import logging
		logging.basicConfig(level=logging.INFO)
		
		s = '0'
		n = int(s)
		logging.info('n = %d' % n)
		print(10 / n)

###读写文件

- 读

		with open('path','rb') as f :
			print(f.read())
			
		#二进制 编码 编码错误
		 f = open('/Users/michael/gbk.txt', 'r', encoding='gbk', errors='ignore')

- 写
> 
		with open('/Users/michael/test.txt', 'w') as f:
		    f.write('Hello, world!')		
				   
- IO流
	- StringIO
	- BytesIO
	- 


- 参考：
    http://www.liaoxuefeng.com/##基础

### 输出输入
- print()
- input()

###数据类型
- 整数
- 浮点数
- 字符串
- 布尔值
- 空值 None
- 变量
- 常量

###字符编码
-  UTF-8编码把一个Unicode字符根据不同的数字大小编码成1-6个字节，常用的英文字母被编码成1个字节，汉字通常是3个字节，只有很生僻的字符才会被编码成4-6个字节。如果你要传输的文本包含大量英文字符，用UTF-8编码就能节省空间
-  ord() 获取整数表示
-  chr() 编码转化为字符
-  encode('ascii') str编码为指定的byte作为网络传输
-  decode('utf-8')  byte变为str读取网络字节流
-  len()
-  格式化 %d %f %s %x

### list 和tuple
- list  [1,3,2]
    - len()
    - append()
    - insert()
    - pop()
    

- tuple 另一种有序列表，一经初始化不能修改
    - (1,)
    - 和list的区别就是不可变

###条件判断
- if : ...elif:... else:....
###循环
- for..in..
- for x in ...循环就是把每个元素代入变量x，然后执行缩进块的语句。
- range()
- while x>0:...
- break 退出循环
- continue  跳过

### dict和set
- dict  {'Michael': 95, 'Bob': 75, 'Tracy': 85}
  - 类似map，键值对
  - 判断key是否存在
        - ’a‘ in dict 通过in
        - d.get('Thomas', -1)
  - pop(key) 删除指定键值对
  
- set 只包含key的集合{1,2，3}
  -  add()
  - remove()
  - 两个set 可以做& |

###函数
- abs()
- max()
- 数据类型转换
  -  int('123')
  - float()
  - str()
  - bool()  
- 定义函数 def my_function(x):...
- 导入函数 from demo1 import my_function
- pass 什么都不做
- isinstance(x,(int, float))
- 参数
  - 位置参数
  - 默认参数 def power(x, n=2):..
  - 可变参数 def calc(*number):...return sum 在函数调用时自动组装为一个tuple
  - 关键字参数 def person(name,age,**kw):...传入任意dict
  -  命名关键字参数 def person(name,age,*,city,job):... 调用时必须写key参数名
  
- 递归函数
     - 尾递归优化（没做优化，也没啥用，依然可能栈溢出）   
 
            def fact(n):
              return fact_iter(n,1)

            def fact_iter(num,product):
              if num == 1:
                  retutn 1
              return fact_iter(num-1,num*product)

###特性
- 切片
    - L[0:10] 取0-9，0可以省略，指取10个
    - L[-10:] 取倒数10个元素
    - L[::5] 所有数每5个取一个
    - list、tuple、str 都可以用切片操作

- 迭代
    - list、tuple 直接for...in..
    - dict
        - for key in d
        - for value in d.values()
        - for k,v in d.items()
    - 字符串 for ch in 'ABC':
    - list 使用下标循环 for i,value in enumerate(['A','B','C']):
- 列表生成式 
    - 创建list的生成式
    - [x*x for x in range(1,11) if x % 2 ==0]
    - 还可以两层循环 [m + n for m in 'ABC for n in 'XYZ']
    - 也可以使用两个变量 [k +'='+v for k,v in d.items()]
    
- 生成器
    - generator 一边循环一边计算的机制
    - 创建方法：    
        - g = (x * x for x in range(10)) 把一个列表生成式的[]改成()
        - next（g) 获得下一个返回值
        - for n in g:... 可以迭代循环generator
        - 推算的算法比较复杂，用类似列表生成式的for循环无法实现的时候，还可以用函数来实现
            
                def fib(max) :
                    n,a,b = 0,0,1
                    while n< max:
                        yield b
                        a,b = b,a+b
                        n = n + 1
                    return 'done'
        - yield 使函数变成一个generator
        - for 循环调用generator时想拿到返回值必须捕获StopIteration
- 迭代器
    - Iterable 可直接作用for循环的对象 list、tuple、dict、set、str、generator
    - Iterator 迭代器，可以被next()函数调用并不断返回下一个值的对象
    - isinstance
    - from collections import Iterator

### 函数式编程

- 高阶函数 一个函数可以接受另一个函数作为参数 

        def add(a,b,f):
            return  f(a) +ｆ（ｂ）
 
    - **map()** 接收函数和Iterable，返回Iterator
            
             list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
    - **reduce()**接受函数和序列，函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算
        
            reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)

    - **filter()** 过滤序列

            list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))
    - **sorted()** 可以对list排序，可以接收一个key函数来实现自定义的排序
        
             sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True)

- 返回函数
    - 高阶函数除了可以接收函数作为参数还可以将函数作为结果值返回
     
            def lazy_sum(*args):
                def sum():
                    ax = 0
                    for n in args:
                        ax = ax + n
                    return ax
                return sum
            f #返回函数
            f() #调用函数
    - 返回函数中不要引用任何可能会变化的变量。
- 匿名函数 lambda x ： x*x
- 装饰器 decorator
    - 函数也是一个对象 也有属性 f._name_  拿到f函数的名字
    - decorator就是一个返回函数的高阶函数

            import functools

            def log(func):
                #把原始函数的__name__等属性复制到wrapper()函数
                @functools.wrap(func) 

                def wrapper(*args, **kw):
                    print('call %s():' % func.__name__)
                    return func(*args, **kw)
                return wrapper
    
            @log
            def now():
                    print('2015-3-25')
        
            把@log放到now()函数的定义处，相当于执行了语句：now = log(now)
- 偏函数 
            
            import functools
            int2 = functools.partial(int ,base = 2)
            int2('1010101')  #85

###模块

        #!/usr/bin/env python3
        # -*- coding: utf-8 -*-
        
        ' a test module '
        
        __author__ = 'Michael Liao'
        
        import sys
        
        def test():
            args = sys.argv
            if len(args)==1:
                    print('Hello, world!')
            elif len(args)==2:
                print('Hello, %s!' % args[1])
            else:
                print('Too many arguments!')
        
        if __name__=='__main__':
            test()
- import sys 导入模块
- sys模块有一个argv变量，用list存储了命令行的所有参数
- 命令行运行hello模块文件时，Python解释器把一个特殊变量__name__置为__main__，而如果在其他地方导入该hello模块时，if判断将失败，一般用于测试

- 作用域 
    - 正常函数变量名可以直接引用
    - _xxx_特殊变量名
    - _xxx和__xxx非公开的函数private
    
- 安装模块 pip install Pillow
- 模块搜索路径 存放在sys模块的path变量中
    - 一是直接修改sys.path，添加要搜索的目录： sys.path.append('/Users/michael/my_py_scripts')
    - 第二种方法是设置环境变量PYTHONPATH

    

### 面向对象编程

     class Student(object):
    
        def __init__(self, name, score):
            self.name = name
            self.score = score
    
        def print_score(self):
            print('%s: %s' % (self.name, self.score))

- 创建实例直接 bart = Student()
- \_\_name 双下划线 变成了私有变量，实质是Python解释器对外改成了_Student__name
- 继承 

         class Dog（Animal）:
            def run(self):
                print(Dog is running...)
            def eat(self):
                print(Dog is eating...)

- 获取对象信息 
    - type()
    - isinstance('a',str)
    - dir() 获得对象的所有属性和方法
    - 操作状态 getattr() 、setattr()、hasattr()
- 类属性 相当于成员变量

###面向对象高级编程

- 限制实例的变量
    
        class Student(object):
            __slot__ = ('name','age') # 用元组定义只允许绑定的属性

- 为了检查参数使用 

        class Student(Object):
                
            @property
            def score(self):
                return self._score

            @score.setter
            def score(self,value):
                if not isinstance(value,int):
                    raise ValueError('must be integer')
                if value < 0 or value > 100:
                    raise ValueError('more than..')
                self._score = value                

    - @property      把getter方法变成了属性
    - @score.setter        @property本身又创建了另一个装饰器@score.setter，负责把一个setter方法变成属性赋值
    - 只定义getter方法@property，不定义setter方法就是一个只读属性：

- 多重继承
    - class Dog（Mammal，Runnable）
    - 让某个类除了继承自Bird外，再同时继承Runnable。这种设计通常称之为MixIn

- 定制类

        __str__    #print 返回自定义字符串，直接敲变量本质调用__repr__
        __iter__ #返回一个迭代对象 
        __getitem__ # 像list一样可以按下标访问数列的任意一项
        __getattr__  #在没有找到属性的情况下，才调用__getattr__
        __call__     #可以对实例直接调用，callable()判断是否可调用

- 枚举类
        
        from enum import Enum
        Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
        
        for name,member in Month.__member__.items():
            print(name,'==>',member,',',member.value)

        #value属性则是自动赋给成员的int常量，默认从1开始计数。
***
        from enum import Enum, unique
        
        @unique                  #检查没有重复值
        class Weekday(Enum):    #从Enum派生出自定义类
            Sun = 0 # Sun的value被设定为0
            Mon = 1
            Tue = 2
            Wed = 3
            Thu = 4
            Fri = 5
            Sat = 6

- 元类 metaclass
    - type() 既可以返回对象的类型，又可以创建出新的类型
    
            def fn(self,name='world'):
                print('Hello,%s!'%name)
            
            Hello = type('Hello',(object,),dict(hello=fn)) # 创建Hello.class


### 错误处理

	
		try:
	    	10 / 0
		except ZeroDivisionError:
	    	raise ValueError('input error!')

- 断言 

		def foo(s):
		    n = int(s)
		    assert n != 0, 'n is zero!'
		    return 10 / n
		
		def main():
		    foo('0')	
	- 用-O参数来关闭assert:
	
			python3 -O err.py	

- logging
		
		import logging
		logging.basicConfig(level=logging.INFO)
		
		s = '0'
		n = int(s)
		logging.info('n = %d' % n)
		print(10 / n)

###读写文件

- 读

		with open('path','rb') as f :
			print(f.read())
			
		#二进制 编码 编码错误
		 f = open('/Users/michael/gbk.txt', 'r', encoding='gbk', errors='ignore')

- 写
> 
		with open('/Users/michael/test.txt', 'w') as f:
		    f.write('Hello, world!')		
				   
- IO流
	- StringIO
	- BytesIO
	- 


- 参考：
    http://www.liaoxuefeng.com/
