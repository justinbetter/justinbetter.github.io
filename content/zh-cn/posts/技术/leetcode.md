---
title: "算法题目汇总"
date: 2020-08-15T20:00:22+08:00
draft: false
---

## 归并排序
```java
public class MergeSort {

    public static void merge(int[] a, int low, int mid, int high) {
        int[] temp = new int[high - low + 1];
        int i = low;// 左指针
        int j = mid + 1;// 右指针
        int k = 0;
        // 把较小的数先移到新数组中
        while (i <= mid && j <= high) {
            if (a[i] < a[j]) {
                temp[k++] = a[i++];
            } else {
                temp[k++] = a[j++];
            }
        }
        // 把左边剩余的数移入数组
        while (i <= mid) {
            temp[k++] = a[i++];
        }
        // 把右边边剩余的数移入数组
        while (j <= high) {
            temp[k++] = a[j++];
        }
        // 把新数组中的数覆盖nums数组
        for (int k2 = 0; k2 < temp.length; k2++) {
            a[k2 + low] = temp[k2];
        }
    }

    public static void mergeSort(int[] a, int low, int high) {
        int mid = (low + high) / 2;
        if (low < high) {
            // 左边
            mergeSort(a, low, mid);
            // 右边
            mergeSort(a, mid + 1, high);
            // 左右归并
            merge(a, low, mid, high);
            System.out.println(Arrays.toString(a));
        }

    }

    public static void main(String[] args) {
        int a[] = { 51, 46, 20, 18, 65, 97, 82, 30, 77, 50 };
        mergeSort(a, 0, a.length - 1);
        System.out.println("排序结果：" + Arrays.toString(a));
    }
}
```

## 快速排序

```java
public class QuickSort {
	
	/**
	 * 将数组的某一段元素进行划分，小的在左边，大的在右边
	 * @param a
	 * @param start
	 * @param end
	 * @return
	 */
	public static int divide(int[] a, int start, int end){
		//每次都以最右边的元素作为基准值
		int base = a[end];
		//start一旦等于end，就说明左右两个指针合并到了同一位置，可以结束此轮循环。
		while(start < end){
			while(start < end && a[start] <= base)
				//从左边开始遍历，如果比基准值小，就继续向右走
				start++;
			//上面的while循环结束时，就说明当前的a[start]的值比基准值大，应与基准值进行交换
			if(start < end){
				//交换
				int temp = a[start];
				a[start] = a[end];
				a[end] = temp;
				//交换后，此时的那个被调换的值也同时调到了正确的位置(基准值右边)，因此右边也要同时向前移动一位
				end--;
			}	
			while(start < end && a[end] >= base)
				//从右边开始遍历，如果比基准值大，就继续向左走
				end--;
			//上面的while循环结束时，就说明当前的a[end]的值比基准值小，应与基准值进行交换
			if(start < end){
				//交换
				int temp = a[start];
				a[start] = a[end];
				a[end] = temp;
				//交换后，此时的那个被调换的值也同时调到了正确的位置(基准值左边)，因此左边也要同时向后移动一位
				start++;
			}	
			
		}
		//这里返回start或者end皆可，此时的start和end都为基准值所在的位置
		return end;
	}
 
	/**
	 * 排序
	 * @param a
	 * @param start
	 * @param end
	 */
	public static void sort(int[] a, int start, int end){
		if(start > end){
			//如果只有一个元素，就不用再排下去了
			return;
		} 
		else{
			//如果不止一个元素，继续划分两边递归排序下去
			int partition = divide(a, start, end);
			sort(a, start, partition-1);
			sort(a, partition+1, end);
		}
			
	}
}
```


## 链表排序

```java
public ListNode sortList(ListNode head) {
        if(head == null || head.next == null) {
            return head;
        }
        //递归归并排序
        //找到中点，递归中点分割，归并合并
        ListNode slow = head;
        ListNode fast = head.next;
        //fast走完 slow就是中点
        while(fast != null  &&  fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode center=  slow.next;
        slow.next = null;
        ListNode left = sortList(head);
        ListNode right = sortList(center);
        ListNode tmp = new ListNode(0);
        ListNode res = tmp;
        while(left != null && right != null) {
            if (left.val < right.val) {
                tmp.next = left;
                left = left.next;
            }else {
                tmp.next = right;
                right = right.next;
            }
            tmp = tmp.next;
        }
        //添加尾点
        tmp.next = left == null ? right : left;
        //返回头部
        return res.next;
        //-----
        //从底至顶 归并排序
        //获取链表长度，根据每一步，循环断链合并，最后合并的链表超越链表长度即返回结果
    }

```


## 两数相加

```java
 public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        //思路：
        //新建两个辅助node，保存倒序排列的l1 l2，不需要；因为题目本身就是逆序的
        //循环两个node 直到最后一个节点
        ListNode left = l1;
        ListNode right = l2;
        int carry = 0;
        ListNode tmp = new ListNode(0);
        ListNode res = tmp;
        while(left != null || right != null) {
            int x = (left == null) ? 0 : left.val;
            int y = (right == null) ? 0 : right.val;
            int sum = x + y +carry;
            carry = sum / 10;
            ListNode now = new ListNode(sum%10);
            res.next = now;
            res = res.next;
            if (left != null) {left = left.next;}
            if (right != null) {right = right.next;}
        }
        if (carry > 0) {
            res.next = new ListNode(carry);
        }
        return tmp.next;
    }
```
