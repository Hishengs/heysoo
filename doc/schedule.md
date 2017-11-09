<p class="tip">
  优化中，暂不可用。
</p>

<p class="tip">
  定时任务功能默认不开启，你必须显式地在配置文件中开启它。
</p>

## 说明
默认地，`/app/schedule` 目录下的每一个文件都视为一个计划任务。

## 配置
在配置文件中启用：
```js
module.exports = {
	schedule: {
		enabled: true,
	},
}
```

## 使用
在 `/app/schedule` 目录下创建一个计划任务文件，如 `analysis.js`：
```js

```