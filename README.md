# 实时代码时钟

一个可以嵌入网页的实时代码风格时钟。

## 在线预览

```text
https://nnnietzsche.github.io/CLOCK_API/
```

## 在网页中嵌入时钟

把下面代码放进你的 HTML 页面：

```html
<div id="my-clock"></div>

<script src="https://nnnietzsche.github.io/CLOCK_API/clock-widget.js"></script>
<script>
  CodeClock.mount("#my-clock");
</script>
```


## 本地启动网页和 API

```bash
node server.js
```

本地网页：

```text
http://localhost:3000
```

本地数据 API：

```text
http://localhost:3000/api/time
```

API 返回示例：

```json
{
  "year": 2026,
  "month": "05",
  "day": "26",
  "dayOfWeek": "Tuesday",
  "hour": "22",
  "minute": "37",
  "second": "56",
  "dayProgress": 94.3,
  "iso": "2026-05-26T14:37:56.000Z",
  "timestamp": 1780007876000
}
```
<img width="659" height="383" alt="image" src="https://github.com/user-attachments/assets/a2728448-c069-4385-8c15-e3c1a32b047a" />


## 说明

GitHub Pages 可以使用时钟 UI 和 `clock-widget.js`，但不能运行 `server.js`，所以 `/api/time` 只支持本地 Node 服务。
