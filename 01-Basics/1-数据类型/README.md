##### 数据类型

- 基本类型

  ```javascript
  String; Number; Boolean; Null; undefined; BigInt; Symbol
  ```

- 引用类型

  ```
  Object[Array; Date; Math; Funtion; RegExp]
  ```

- ![](F:\SELFWORK\web-study\01-Basics\1-数据类型\JS-数据类型.png)

- 类型存储

  - 基础类型存储在栈内存中, 被引用和拷贝时, 会创建一个完全相等的变量
  - 引用类型存储在堆内存中, 存储的是地址, 多个引用指向同一个地址

##### 类型检测

- ```javascript
  typeof 
  instanceof
  Object.prototype.toString.call() // [Object Xxxx]
  ```

- instanceof 可以准确判断复杂引用数据类型, 但是不能正确判断基础数据类型

- typeof 可以判断基础数据类型(null除外), 但是引用类型中, 除了function类型外, 其他的也无法判断

- Object.prototype.toString.call() 可以更好地解决数据类型检测问题

##### 类型转换

- 强制类型转换
  - Number()
  - parseInt()
- 隐式类型转换