---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Heysoo"
  tagline: A Node Web Framework Based on Koa
  actions:
    - theme: brand
      text: Get Started
      link: /get-started

features:
  - title: 可配置，可拆卸
    details: Heysoo 最大的特点是所有的功能模块几乎都可以配置，可拆卸，是否使用可以完全由你自己决定，不需要的功能模块在应用启动时并不会加载。假设你将所有的功能模块禁用，那它就只是一个简单的增强版的 Koa，仅此而已。
  - title: 他山之石，可以攻玉
    details: Heysoo 并不是一个重新造轮子的 MVC 框架，其目标是尽可能地使用优秀的开源库来实现我们想要的功能。Heysoo 的基础功能是基于 Koa 实现的，在其基础上进行功能增强，而所有的这些功能都是可以拆卸的。
  - title: 插件化
    details: 你可以通过 Heysoo 提供的 app.hook 钩子功能来引入你自己实现的插件。例如如果你觉得 Heysoo 自带的数据库功能不是你想要的，你完全可以禁用它，之后引入你自己实现的数据库插件模块。
---

<template>
</template>

<style>
  .is-home .container {
    max-width: calc(var(--vp-layout-max-width) - 64px);
  }
</style>