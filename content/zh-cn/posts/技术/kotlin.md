---
title: "记录一些kotlin的用法"
date: 2017-07-18T20:00:22+08:00
draft: false
---

# 操作符

### Elvis 操作符 ?: 

```
val a = b?.length ?: -1
```
### 安全转换 as？
- 转型不成功返回 null

### null safety

```
var a : String? = null
a?.length //a 为null 则pass，不为null 则调用
a!!.length// 抛异常

```
### 类型判断符 is
### 范围操作符 : in 

```
for(i in 1..5 step 1){}
for (i in 5 downTo 1 step 2){}

```
### 多行输入符  """
- 三个双引号之间的内容将被原样保留

# 扩展函数
---
## run
- 调用函数块，块内 this指代调用对象
- 返回值为最后一行

```
val result = "haha".run{
	println(this)
	"I'm result"
}
println(result)
```

## apply
- 同run，函数块内this 指代该对象
- 返回值为对象自己

## let
- 函数块内 it 指代该对象
- 返回值最后一行

## also
- 函数块内it 指代该对象
- 返回值为对象自己

## with
- 将该对象作为函数参数
- this 指代该对象
- 返回值为最后一行

```
val result = with（"haha"）{
	println(this)
	"result"
}
println(result)
```

## 修饰符
- private 只能被自己所在的文件可见，不能在定义这个类之外的文件中使用
- protected 可以被成员自己和继承它的成员可见（比如，类和它的子类）
- internal 对所在的整个module可见
- public 最没有限制的修饰符。这是默认的修饰符

## 委托属性
- 一个属性具有一些相同的行为，使用lazy或者observable可以被很有趣地实现重用。而不是一次又一次地去声明那些相同的代码
- https://wangjiegulu.gitbooks.io/kotlin-for-android-developers-zh/content/biao_zhun_wei_tuo.html
- 标准委托
		
		by lazy
		by observable
		by Delegates.notNull()
		by map 
- 自定义委托 ： 

			继承ReadWriteProperty
		by DelegatesExt.notNullSingleValue()
- 操作符
- 密封类 sealed
	- 类似枚举，不同之处在于枚举的实例是唯一的，而密封类可以有很多实例，它们可以有不同的状态。

			sealed class Option<out T> {
			    class Some<out T> : Option<T>()
			    object None : Option<Nothing>()
			}		


参考：
- https://wangjiegulu.gitbooks.io/kotlin-for-android-developers-zh/content/biao_zhun_wei_tuo.html
