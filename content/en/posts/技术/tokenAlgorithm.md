---
title: "限流算法"
date: 2020-09-06T20:00:22+08:00
draft: true
---

[TOC]

#### 关键字

    令牌桶限流算法

#### 概念
漏桶算法把请求比作是水，水来了都先放进桶里，并以限定的速度出水，当水来得过猛而出水不够快时就会导致水直接溢出，即拒绝服务

令牌桶算法的原理是系统以恒定的速率产生令牌，然后把令牌放到令牌桶中，  
令牌桶有一个容量，当令牌桶满了的时候，再向其中放令牌，那么多余的令牌会被丢弃；  
当想要处理一个请求的时候，需要从令牌桶中取出一个令牌，如果此时令牌桶中没有令牌，那么则拒绝该请求。
    
令牌桶这种控制机制基于令牌桶中是否存在令牌来指示什么时候可以发送流量。  
令牌桶中的每一个令牌都代表一个字节。如果令牌桶中存在令牌，则允许发送流量；而如果令牌桶中不存在令牌，则不允许发送流量
    
#### 代码
实际项目中可以直接使用RateLimiter工具类

```java
public class BucketRateLimiter {

    long capacity;                      // 桶的容量
    long rate;                          // 令牌速率
    long currentTokenNum;               // 当前桶中令牌数量
    long lastAddTokenTime;              // 上次补充令牌时间

    public BucketRateLimiter(long capacity, long rate) {
        this.capacity = capacity;
        this.rate = rate;
        currentTokenNum = capacity;
        lastAddTokenTime = System.currentTimeMillis();
    }

    public boolean acquire(int permits) {
        if (permits > currentTokenNum) {
            long accessTime = System.currentTimeMillis();
            long durationMs = accessTime - lastAddTokenTime;
            long newTokenNum = (long) (durationMs * rate * 1.0 / 1000);
            if (newTokenNum > 0) {
                currentTokenNum = Math.min(currentTokenNum + newTokenNum, capacity);
                this.lastAddTokenTime = accessTime;
            }
            if (permits > currentTokenNum) return false;
        }
        this.currentTokenNum -= permits;
        return true;
    }

}

```    

     
