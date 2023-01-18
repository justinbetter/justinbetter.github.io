---
title: "写python脚本常用的函数"
date: 2019-08-09T20:00:22+08:00
draft: false
---

@[toc]
#python 脚本常用函数

这里记录一些脚本常用的函数

##文件操作
- 路径相关
```
os.chdir(dst_dir)							#改变当前目录
os.listdir()								#遍历文件夹
for root, dirs, files in os.walk(rootDir):  #遍历文件夹
os.path.basename()  						#去掉目录路径, 返回文件名 
os.path.splitext()  						#返回 (filename, extension) 元组 
os.path.exists()							#文件存在	
shutil.rmtree(zip_comoress_dir) 			#删除目录
shutil.copy(source_dir, dst_dir)			#复制文件
os.path.dirname(os.path.realpath(__file__)) #获取当前目录
```

- 文件信息
```
json.dumps(mock_config, indent=5)	 	#获取json数据
os.path.getsize()  						#获取文件大小
with open(zip_url,'rb') as f_zip:  		#解压zip
     zip_file = zipfile.ZipFile(f_zip)
     zip_file.extractall('./zip')
----------------------------------------
def get_file_md5(f): 					#获取MD5
    m = hashlib.md5()

    while True:
        data = f.read(10240)
        if not data:
            break

        m.update(data)
    return m.hexdigest()


with open(YOUR_FILE, 'rb')as f:
    file_md5 = get_file_md5(f)
--------------------------------------

```
##字符串操作
- 命令行
```
    p = subprocess.Popen(COMMAND, stdout=subprocess.PIPE, stderr=None, shell=True)
    p_communicate = p.communicate()   #返回命令行输出
-----------
apk_old = raw_input('old_path: ') 	  #获取命令
os.system("cd test")

    
```
- 字符串包含
```
if "123"  in "da123dfd":

s = "This be a string"
if s.find("is") == -1:
    print "No 'is' here!"
else:
    print "Found 'is' in the string."
```
- 正则匹配
```
 pattern = re.compile(r'package: name=\'(\S+)\'')
 search  = pattern.search(data)
 result  = search.group(1)  
```


##列表操作
```
map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])		#循环操作每一个元素



```  

##ps
- json.dumps输出中文指定ensure_ascii参数为False

##转化为exe执行
- pip install pyinstaller
- pyinstaller -F demo.py
- cx_freeze: http://www.cnblogs.com/renzo/archive/2012/01/01/2309260.html
