---
title: "常用的设计模式"
date: 2017-05-28T20:00:22+08:00
draft: false
---

@[toc]
#设计模式



##单例模式

- Double Check Lock

```java
public static Singleton getInstance(){
  if(mInstance == null){
    synchronized(Singleton.class){
      if(mInstance == null){
        mInstance = new Singleton();
      }
    }
  }
  retuen mInstance;
}
```

- 静态内部类


```java
  public static Singleton getInstance(){
    retuen SingletonHolder.sInstance;
  }

  private static class SingletonHolder{
    private static final Singleton sInstance = new Singleton();
  }
```

  ​



![Paste_Image.png](https://imgconvert.csdnimg.cn/aHR0cDovL3VwbG9hZC1pbWFnZXMuamlhbnNodS5pby91cGxvYWRfaW1hZ2VzLzI3ODA5ODctNjBjYmI1YjliZjk1Y2YxOS5wbmc?x-oss-process=image/format,png)

##Builder模式

1. 存储参数
2. 设置参数，return this
3. new 对象，传递参数
4. 返回



##原型模式

- 使用
  - 重写clone()
  - 浅拷贝：拷贝对象无法修改原型对象的字段，保证了安全性（除了引用型字段，多以也要拷贝引用性字段）
  - 深拷贝： 对拷贝对象的引用型字段也要拷贝

## 工厂方法模式

```
//抽象产品类
public abstract class Dialog(){
  public abstract void show();
}

public class DialogA extends Dialog{
  @Override
  public void show(){
    //showA
  }
}

```

```java
//抽象工厂
public abstract class Factory{
  public abstract <T extends Dialog>T createDialog(Class<T> clazz);
}

public class DialogAFactory extends Factory{
  public <T extends Dialog>T createDialog(Class<T> clazz){
    Dialog dialog = null;
    try{
      dialog = (Dialog)Class.forName(clazz.getName()).newInstance();
    }catch(Exception e){
      ...
    }
    return (T)dialog;
    
  }
} 

//使用
public static void main(String[] args){
  Factory factory = new DialogFactory();
  DialogA a = factory.createDialog(DialogA.class);
  a.show();
}

```



## 抽象工厂模式

- 角色
  - 抽身产品接口
  - 具体产品类
  - 抽象工厂类
  - 具体工厂类：每一个产品不同组成不同具体工厂
- 面向接口编程，但是工厂类过多，不易拓展


## 策略模式

- 角色
  - 策略的抽象
  - 具体的策略实现
  - 操作策略的具体实现
- 代码

```java
//策略抽象接口
public interface CalculateStrategy{
  int calculatePrice(int km);
}
//具体策略
public class BusStrategy implements CalculateStrategy{
  
  @Override
  public int calculatePrice(int km){
    //...
    return busPrice;
  }
  
}

//Context角色
public class Context{
 	private CalculateStrategy cs;
  	public void seCalculateStrategy(CalculateStrategy cs){
      this.cs = cs;
  	}
  
  	public int calculatePrice(int km){
      return cs.calculatePrice(km);
  	}
  	
  	public static void main(String[] args){
      Context context = new Context();
      context.setCalculateStrategy(new BusStrategy());
      context.calculatePrice(15);
  	}
  
}

```



## 状态模式

- 角色
  - 抽象状态类或接口：设置状态下的行为
  - 具体状态类或接口：不同状态不同行为
  - Context环境类
- 代码:

```java
//抽象状态：定义行为
public interface UserState{
	public void forward();
  	
  	public void comment();
}

//具体状态：已登录
public class LoginedState implements UserState{
  @Override
  public void forward(){
    //转发
  }
  public void comment(){
    //评论
  }
}

//具体状态：未登录
public class LogoutState implements UserState{
  @Override
  public void forward(){
    //去登陆
  }
  public void comment(){
    //去登陆
  }
}
//使用
public class LoginContext{
  private UserState mUserState = new LogoutState();
  private LoginContext(){}
  
  private static LoginContext mLoginContext = new LoginContext();
  public static LoginContext getInstance(){
    return mLoginContext();
  }
  
  public void setState(UserState userState){
    mUserState = userState;
  }
  
  public void forward(){
    mUserState.forward();
  }
  public void comment(){
    mUserState.comment();
  }
  
}


```



## 责任链模式

- 角色
  - 抽象处理者
  - 抽象请求者
  - 具体处理者
  - 具体请求者
- 代码

```java
//抽象处理者
public abstract class AbstractHandler{
  protect AbstractHandler nextHandler;
  
  public final void handleRequest(AbstractRequest request){
    if(getHandlerLevel() == request.getRequestLevel()){
    	handleRequest(request);
    }else{
      if(nextHandler != null){
        nextHandler.handleRequest(request);
      }else{
        System.out.println("All of handler can not handle the request");
      }
    }
    
  }
  
  protected abstract int getHandlerLevel();
  protected abstract void handleRequest(AbstractRequest request);
  
}

//抽象请求者
public abstract class AbstractRequest{
  private Object obj;
  public AbstractRequest (Object obj){
    this.obj = obj;
  }
  
  public Object getContent(){
    return obj;
  }
  public abstract int getRequestLevel();
  
}

//具体处理者
public class Handler1 extends AbstractHandler{
  @Override
  protected int getHandleLevel(){
    return 1;
  }
  
  @Override
  protected void handleRequest(AbstractRequest request){
    System.out.println("handler1 handle the request!"+request.getRequestLevel);
  }
  
}

//具体请求者
public class Request1 extends AbstractRequest{
  public Request1(Object obj){
    super(obj);
  }
  
  @Override
  public int getReqestLevel(){
    return 1;
  }
}

//使用
public static void main(String[] args){
  AbstractHandler handler1 = new Handler1();
  AbstractHandler handler2 = new Handler2();

  handler1.nextHandler = handler2;
  handler1.handlerRequest(new Request1("Request1"));
}

```

## 解释器模式

- 角色
  - 抽象表达式，抽象的解释方法
  - 终结符表达式
  - 非终结符表达式
  - 环境类Context
  - 客户类Client
- 一般很少用

## 命令模式

- 角色
  - 接收者，具体逻辑
  - 命令抽象接口
  - 具体命令
  - 请求者
  - 客户端
- 将请求封装成一个对象，从而使用不同请求把客户端参数化：取消、日志、事务

## 观察者模式

- 角色
  - 抽象主题，被观察者Observable
  - 具体主题，Concrete Observable
  - 抽象观察者，Obsever
  - 具体观察者
- 对象间一种一对多的依赖关系，每当一个对象改变状态，则所有依赖于它的对象都会通知并被自动更新
- 代码：

```java
//具体主题
public class Website extends Observable{
  public void postNewPublication(String content){
    setChanged();
    notifyObserver(content);
  }
}

//具体观察者
public class Subscriber extends Observer{
  @Override
	public void update(observable 0,Object content){
      System.out.println("更新的内容是："+content);
	}
}

//使用
main：
  	Website web = new Website();
	Subscriber sub = new Subscriber();
	web.addObserver(sub);
	web.postNewPublication("内容更新了！");
	

```






