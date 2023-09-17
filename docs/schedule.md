# Schedule 定时任务

<p class="hs-tip">
  定时任务功能默认不开启，你必须显式地在配置文件中开启它。
</p>

默认地，`/app/schedule` 目录下的每一个文件都视为一个计划任务。

## 配置

首先安装 `node-schedule`：

```js
npm i --save node-schedule
```

在配置文件中启用：

```js
module.exports = {
  schedule: {
    enabled: true,
  },
};
```

## 使用

在 `/app/schedule` 目录下创建一个计划任务文件，如 `sc1.js`：

```js
module.exports = (schedule, app) => {
  return {
    run() {
      schedule.scheduleJob("*/5 * * * * *", () => {
        app.console.info(`I am ${app.name}`);
      });
    },
  };
};
```

注意，`schedule` 传递的是 `require('node-schedule');` 的值。
在需要运行计划任务的地方：

```js
app.schedule.sc1.run();
// 或者
this.ctx.schedule.sc1.run();
// 或者直接临时运行计划任务
const job = app.nodeSchedule.scheduleJob("5/* * * * * *", function () {
  console.log("hello, world.");
});
```
