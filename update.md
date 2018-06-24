## Update Docs

### 0.0.6
#### features
- [x] add support for multi static server
```js
// single static server
{
  ...,
  static: {
    enabled: true,
    path: '/public',
  },
}
// multi static servers
{
  ...,
  static: {
    enabled: true,
    // url path => folder path
    map: {
      '/static1': 'static1',
      '/static2': 'static2',
    },
  },
}
```

#### improve
- [x] improve code quality, faster start up speed.


#### fix
- [x] app start failed if no config/router file spicified.