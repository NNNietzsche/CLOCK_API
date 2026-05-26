# 实时代码时钟

启动本地网页和 API：

```bash
node server.js
```

打开网页：

```text
http://localhost:3000
```

调用 API：

```text
http://localhost:3000/api/time
```

在别的网页里嵌入整套时钟 UI：

```html
<div id="my-clock"></div>

<script src="http://localhost:3000/clock-widget.js"></script>
<script>
  CodeClock.mount("#my-clock");
</script>
```

也可以直接打开示例：

```text
http://localhost:3000/embed-demo.html
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

