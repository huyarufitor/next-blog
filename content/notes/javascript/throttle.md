---
title: "节流"
summary: "记录基于时间戳和定时器实现 JavaScript 节流函数的基础思路。"
section: "JavaScript"
tags:
  - "JavaScript"
  - "性能优化"
updated: "2023-01-09"
---

```javascript

// 函数节流
function throttle(fn, interval) {
  // 记录上一次执行的时间
  let lastTime = 0;
  // 定时器
  let timer = null;
  // 闭包函数
  return function() {
    // 获取当前时间
    let nowTime = +new Date();
    // 判断上次执行的时间和当前时间差是否大于设置的时间间隔
    if (nowTime - lastTime > interval) {
      // 将当前时间设置为上次执行时间
      lastTime = nowTime;
      // 执行函数
      fn.apply(this, arguments);
    } else {
      // 如果时间间隔小于我们设定的时间间隔，则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(() => {
        // 将上次执行时间设置为本次执行时间
        lastTime = nowTime;
        fn.apply(this, arguments);
      }, interval);
    }
  };
}
```