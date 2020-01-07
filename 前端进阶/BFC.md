# BFC

## BFC定义

属于上述定位方案的普通流。

具有BFC特性的元素可以看做是隔离了的独立容器，容器里面的元素不会在布局上影响外面的元素，也就是BFC产生之后，里面的box就是封闭的大箱子，无论什么操作都不影响外面；

## BFC布局规划

- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算

## 触发BFC

- body根元素
- 浮动元素：float除none以外的值
- 绝对定位元素：position（absolute、fixed）
- display为inline-block、table-cells、flex
- overflow除了visible以外的值（hidden、auto、scroll）



## 解决

一般利用BFC解决margin的叠加问题或者浮动问题



一般就是在一个diiv内，如果使用了float会导致外层无法包住它，那这时候可以在定义一个元素，去clear-float就好