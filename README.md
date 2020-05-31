# redux-localstorage-sync

**描述：** 此项目是redux的一个enhancer，在[redux-localstorage](https://github.com/elgerlambert/redux-localstorage)的基础上开发，用于将redux中的状态同步到localstorage中，相比于`redux-localstorage`功能有以下增强：

1. 对redux的状态写入到localstorage添加了函数节流（debounce），默认为100ms。
2. 添加了初始化时localstorage同步到redux状态的选择，默认情况下syncLocalstorageToRedux为true，自动开启同步。
3. 增强对路径（path）访问的支持，当设置paths为 ['foo.bar.dhh']时，即将redux状态中的state.bar.dhh的值同步到localstorage中。

## 安装

```javascript
$ npm install redux-localstorage-sync
```

## 使用

```javascript
import {compose, createStore} from 'redux';
import persistState from 'redux-localstorage-sync'

const enhancer = compose(
  /* [middlewares] */,
  persistState(/*paths, config*/),
)

const store = createStore(/*reducer, [initialState]*/, enhancer)
```

## 参数

| 参数   | type                            | description                                                  | 默认值 |
| ------ | ------------------------------- | ------------------------------------------------------------ | ------ |
| Paths  | null \| String \| Array<String> | 默认情况下，将把redux中所有的状态同步到localstorage中，如果项目的状态庞大，建议配置具体的路径；当设置paths为 'foo.bar.dhh'（等效于['foo.bar.dhh']）时，将redux状态中的state.bar.dhh的值同步到localstorage中，当在数组指定多个值的时候，注意属性相互覆盖的问题 。 | Null   |
| config | Object                          | 见下面说明                                                   |        |



## config

主要的参数如下

| 参数                    | 类型               | 描述                                        | 默认值                    |
| ----------------------- | ------------------ | ------------------------------------------- | ------------------------- |
| namespace               | String             | 设置localstorage的值                         | 'redux-localstorage-sync' |
| debounceTime            | number             | 设置函数节流的时间                         | 100                                         | 
| syncLocalstorageToRedux | Boolean            | 是否将localstorage的值在初始化时同步到redux | true                      |







