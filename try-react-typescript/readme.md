## Typescript
 yarn add webpack webpack-cli webpack-dev-server -D
 yarn global add react react-dom
 yarn global add @types/react @types/react-dom -D
 yarn add babel-core babel-cli babel-preset-env -D
 yarn add global html-webpack-plugin awesome-typescript-loader -D
 yarn add typescript -D
 yarn react react-dom
 yarn add mini-css-extract-plugin -D
 yarn add css-loader style-loader -D
 yarn add bootstrap

- typescript 将js 弱类型变成强类型
    类型 声明 文件 @types/react

- webpack-dev-server 不会刷新浏览器
webpack-dev-server --inline 刷 新浏览器
webpack-dev-server --hot  刷 新浏览器需要更新的局部  热更新

- typescript 是 js 超集 js 是在ts 里可以完全 运行的
    跟 java一样 静态类型 语言， 先编译 一下
- 强制类型声明