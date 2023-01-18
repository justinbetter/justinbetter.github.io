---
title: "Kafka机制一览"
date: 2019-06-05T20:00:22+08:00
draft: false
---

Kafka：
topic、producer、consumer、broker

topic本质就是一个目录,由一些Partition Logs(分区日志)组成（便于集群拓展、提高并发）
Kafka需要维持的元数据只有一个–消费消息在Partition中的offset值，Consumer每消费一个消息，offset就会加1。
其实消息的状态完全是由Consumer控制的，Consumer可以跟踪和重设这个offset值，这样的话Consumer就可以读取任意位置的消息

允许用户为每个topic设置副本数量，副本数量决定了有几个broker来存放写入的数据；副本都是以partition为单位的，不过只有一个partition的副本会被选举成leader作为读写用

从Producer端看：Kafka是这么处理的，当一个消息被发送后，Producer会等待broker成功接收到消息的反馈（可通过参数控制等待时间），如果消息在途中丢失或是其中一个broker挂掉，Producer会重新发送（我们知道Kafka有备份机制，可以通过参数控制是否等待所有备份节点都收到消息）。
从Consumer端看：前面讲到过partition，broker端记录了partition中的一个offset值，这个值指向Consumer下一个即将消费message。当Consumer收到了消息，但却在处理过程中挂掉，此时Consumer可以通过这个offset值重新找到上一个消息再进行处理。Consumer还有权限控制这个offset值，对持久化到broker端的消息做任意处理。

为什么快？
顺序读写、分区、零拷贝、批量发送、数据压缩；
如何提高？生产端调整 batch.size、linger.ms（最多等待时间） 参数，以及主题分区数合理分配等。

存储？
在Kafka文件存储中，同一个topic下有多个不同partition，每个partition为一个目录，partiton命名规则为topic名称+有序序号
partition目录下Segment file组成：由2大部分组成，分别为index file和data file，此2个文件一一对应，成对出现，后缀”.index”和“.log”分别表示为segment索引文件、数据文件。

生产者机制？
生产的流程主要就是一个producer线程和一个sender线程，它们之间通过BatchQueue来获取数据，它们的关系是一一对应的，所以kafka的生产过程都是异步过程，
数据最终是放在BatchQueue，像是将水流入了一个蓄水池的场景，这就是蓄水池机制
每条消息先从MetaData里面获取分区信息，再申请一段buffer空间形成一个批接收空间，RecordAccumulator 会将收到的每条消息append到这个buffer中，最后将每个批次压入到队列当中，等待Sender线程来获取发送。
buffer空间 ：
    BufferPool（缓冲池）对象，整个KafkaProducer实例中只有一个BufferPool对象。内存池总大小，它是已使用空间和可使用空间的总和，内存缓冲池的设计，让整个发送过程中的存储空间循环利用，有效减少JVM GC造成的影响
Sender 是一个发送线程，负责读取记录收集器中缓存的批量消息，经过一些中间转换操作，将要发送的数据准备好，然后交由 Selector 进行网络传输。
https://zhuanlan.zhihu.com/p/137811719


消息是kafka中最基本的数据单元，一条消息由key,value组成，producer往broker中的指定topic中发送一条消息，producer会根据这条消息的key的hashcode值%分区数取模，来确定这个消息分配到那个Partition分区；
acks参数指定了必须要有多少个分区副本收到消息，生产者才认为该消息是写入成功的
acks=0，表示生产者在成功写入消息之前不会等待任何来自服务器的响应. 
acks=1，表示只要集群的leader分区副本接收到了消息，就会向生产者发送一个成功响应的ack，
acks =all,表示只有所有参与复制的节点(ISR列表的副本)全部收到消息时，生产者才会接收到来自服务器的响应；延迟高

消费者机制？
Kafka有两种模式消费数据：队列 和发布订阅 ；在队列模式下，一条数据只会发 送给 customer group中的一个 customer 进行消费；在发布订阅模式下，一条数据会发送给多个 customer进行消费。
消费者组，那自然是由消费者组成的，组内可以有一个或多个消费者实例，而这些消费者实例共享一个id，称为group id
一个消费者组中，每一个分区只能由组内的一消费者订阅；消费者组大于分区数多的会空闲
重平衡（Rebalance）其实就是一个协议，它规定了如何让消费者组下的所有消费者来分配topic中的每一个分区；kafka基本处于不可用状态
Kafka的数据是按照分区进行排序(插入的顺序 )，也就是每个分区中的数据有序的，但是多个分区之间做不到全局有序

零拷贝原理：
传统拷贝涉及到用户空间和内核空间的切换，使用DMA可以直接存取内存，不需要CPU调度；
通过DMA直接网卡访问内存，实现零拷贝；
操作系统提供 了一个优化的代码路径，页缓存到socket，linux上是通过 sendfile 系统调用来
Kafka在文件传输的过程中正是使用了零拷贝技术对文件进行拷贝

选举？
quorum（法定人数）
quorum是一种在分布式系统中常用的算法，主要用来通过数据冗余来保证数据一致性的投票算法。在kafka中该算法的实现就是ISR，在ISR中就是可以被选举为leader的法定人数。
 ISR（in-sync replicas）列表。每个分区的 leader 会维护一个 ISR 列表，ISR 列表里面就是 follower 副本的 Borker 编号，只有跟得上 Leader 的 follower 副本才能加入到 ISR 里面
当 Leader 挂掉了，而且 unclean.leader.election.enable=false 的情况下，Kafka 会从 ISR 列表中选择第一个 follower 作为新的 Leader

如何保证数据一致性的？
一致性定义:若某条消息对Consumer可见,那么即使Leader宕机了,在新Leader上数据依然可以被读到
因为所有的 ISR 都同步了 Message2，只有 High Water Mark 以上的消息才支持 Consumer 读取，而 High Water Mark 取决于 ISR 列表里面偏移量最小的分区，对应于上图的副本2，这个很类似于木桶原理。
HighWaterMark简称HW: Partition的高水位，取一个partition对应的ISR中最小的LEO作为HW，消费者最多只能消费到HW所在的位置，另外每个replica都有highWatermark，leader和follower各自负责更新自己的highWatermark状态，highWatermark <= leader. LogEndOffset
对于Leader新写入的msg，Consumer不能立刻消费，Leader会等待该消息被所有ISR中的replica同步后,更新HW,此时该消息才能被Consumer消费，即Consumer最多只能消费到HW位置
这样就保证了如果Leader Broker失效,该消息仍然可以从新选举的Leader中获取。对于来自内部Broker的读取请求,没有HW的限制。同时,Follower也会维护一份自己的HW,Folloer.HW = min(Leader.HW, Follower.offset)

HW缺陷？
消息同步LEO不一致，follower日志截断，异步延迟，
leader 中保存的 remote LEO 值的更新总是需要额外一轮 fetch RPC 请求才能完成，这意味着在 leader 切换过程中，会存在数据丢失以及数据不一致的问题
为了解决 HW 更新时机是异步延迟，leader epoch 机制，在每个副本日志目录下都创建一个 leader-epoch-checkpoint 文件用于保存 leader 的 epoch 信息

副本机制？
在Kafka集群中，会有一个broker被选举出来作为controller，这个controller负责管理和协调Kafka集群中的所有节点
controller会在集群启动时为每个节点注册一个监听器，当节点发生改变时可以动态的管理节点，在管理副本时，Kafka通过ISR机制管理副本同步，还会选举出leader来管理整个集群的数据和同步配置信息

Kafka 分区数越多性能就越好吗？为什么？
每个分区数都对应一个 log 文件，log 文件是顺序写的，但如果有非常多分区同时刷盘，就会变相成乱序写了
客户端会为每个分区调用一条线程处理，多线程并发地处理分区消息，分区越多，意味着处理的线程数也就越多
一个 broker 挂掉后，如果此时分区特别多，Kafka 分区 leader 重新选举的时间大大增加
客户端在会为每个分区分配一定的缓冲区，如果分区过多，分配的内存也越大

有序？
卡夫卡是无法保证全局的消息顺序性的，只能保证主题的某个分区的消息顺序性
如何保证？需要有序的消息都发往同一个分区，这样就保证了局部有序；
