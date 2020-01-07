# 1.webpack优化

Webpack在启动后会根据Entry配置的入口出发，递归地解析所依赖的文件。这个过程分为搜索文件和把匹配的文件进行分析、转化的两个过程，因此可以从这两个角度来进行优化配置。

## 1.1缩小文件搜索范围

1. **resolve字段告诉webpack怎么去搜索文件，所以首先要重视resolve字段的配置**
   1. 设置`resolve.modules:[path.resolve(__dirname, 'node_modules')]`避免层层查找。
   2. 设置`resolve.mainFields:['main']`，设置尽量少的值可以减少入口文件的搜索步骤。第三方模块为了适应不同的使用环境，会定义多个入口文件，mainFields定义使用第三方模块的哪个入口文件，由于大多数第三方模块都使用main字段描述入口文件的位置，所以可以设置单独一个main值，减少搜索。
   3. 对庞大的第三方模块设置`resolve.alias`, 使webpack直接使用库的min文件，避免库内解析。
   4. 合理配置`resolve.extensions`，减少文件查找。
2. **module.noParse字段告诉Webpack不必解析哪些文件，可以用来排除对非模块化库文件的解析**
3. **配置loader时，通过test、exclude、include缩小搜索范围**

## 1.2使用DllPlugin减少基础模块编译次数

DllPlugin动态链接库插件，**其原理是**把网页依赖的基础模块抽离出来打包到dll文件中，当需要导入的模块存在于某个dll中时，这个模块不再被打包，而是去dll中获取。

## 1.3使用HappyPack开启多进程Loader转换

在整个构建流程中，最耗时的就是Loader对文件的转换操作了，而运行在Node.js之上的Webpack是单线程模型的，也就是只能一个一个文件进行处理，不能并行处理。HappyPack可以将任务分解给多个子进程，最后将结果发给主进程。JS是单线程模型，只能通过这种多进程的方式提高性能。

```javascript

npm i -D happypack
// webpack.config.json
const path = require('path');
const HappyPack = require('happypack');
 
module.exports = {
    //...
    module:{
        rules:[{
                test:/\.js$/，
                use:['happypack/loader?id=babel']
                exclude:path.resolve(__dirname, 'node_modules')
            },{
                test:/\.css/,
                use:['happypack/loader?id=css']
            }],
        plugins:[
            new HappyPack({
                id:'babel',
                loaders:['babel-loader?cacheDirectory']
            }),
            new HappyPack({
                id:'css',
                loaders:['css-loader']
            })
        ]
    }
}
```

## 1.4使用ParallelUglifyPlugin开启多进程压缩JS文件

使用UglifyJS插件压缩JS代码时，需要先将代码解析成Object表示的AST（抽象语法树），再去应用各种规则去分析和处理AST，所以这个过程计算量大耗时较多。ParallelUglifyPlugin可以开启多个子进程，每个子进程使用UglifyJS压缩代码，可以并行执行，能显著缩短压缩时间。

```javascript

npm i -D webpack-parallel-uglify-plugin
 
// webpack.config.json
const ParallelUglifyPlugin = require('wbepack-parallel-uglify-plugin');
//...
plugins: [
    new ParallelUglifyPlugin({
        uglifyJS:{
            //...这里放uglifyJS的参数
        },
        //...其他ParallelUglifyPlugin的参数，设置cacheDir可以开启缓存，加快构建速度
    })
]
```

# 2. webpack详解

webpack配置中需要理解几个核心的概念`Entry` 、`Output`、`Loaders` 、`Plugins`、 `Chunk`

- Entry：指定webpack开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库
- Output：告诉webpack如何命名输出的文件以及输出的目录
- Loaders：由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件
- Plugins：`Loaders`将各类型的文件处理成webpack能够处理的模块，`plugins`有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对js文件进行压缩优化的`UglifyJsPlugin`插件
- Chunk：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用`CommonsChunkPlugin`将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中`CommonsChunkPlugin`被废弃，使用`SplitChunksPlugin`

webpack的本质就是事件流机制，他的工作流程就是将各个插件串联起来，而实现这一切的核心就是tabtable，webpack最核心的编辑的Compiler和负责创建bundles的Compilcation都是tabtable实例。

- `plugin(name:string, handler:function)`注册插件到Tapable对象中
- `apply(…pluginInstances: (AnyPlugin|function)[])`调用插件的定义，将事件监听器注册到Tapable实例注册表中
- `applyPlugins*(name:string, …)`多种策略细致地控制事件的触发，包括`applyPluginsAsync`、`applyPluginsParallel`等方法实现对事件触发的控制，.00220

# 3.webpack3到webpack4的变化

1. mode。webpack4中通过内置的mode使用相应模式的内置优化。

2. CommonChunksPlugin & SplitChunksPlugin。CommonChunksPlugin已经从webpack4中移除。提取公用代码可以利用SplitChunksPlugin。

   这种图形很难理解 chunks 的分割。例如在使用 CommonChunkPlugin 的时候，从一个或多个 chunks 删除模块并放入一个新模块，这个新模块需要连接到块图中。但是应该怎么定位这个新模块？作为之前 chunk 的父母？作为孩子？ 在 CommonChunkPlugin 中将其添加为父母，但是从技术角度上这是错误的，也会造成对优化产生很多负作用。

   CommonsChunkPlugin的缺点：

   - 可能会导致下载很多我们不用的代码
   - 在异步chunk中是低效的
   - 配置繁琐难以使用

   **SplitChunksPlugin**就是对CommonChunksPlugin的改进，使用模块重复计数和模块类别(如 node_modules )，通过 heuristics 自动识别应该被分块的模块，并分割 chunks。

   具有的特点：

   - 不会下载我们不需要的代码
   - 对异步chunk也很高效
   - 被默认用于异步chunks
   - 可以通过多个vendor chunks来进行vender的分割

3. 代码分割。使用动态import，而不是用system.import或者require.ensure。

4. vue-loader。使用vue-loader插件为.vue文件中的各部分使用相对应的loader，比如css-loader等。

   


# 4.gulp详解

gulp提供了四个接口

- gulp.src
- gulp.dest
- gulp.task
- gulp.watch



```javascript
const babel = require('gulp-babel');

gulp.task('task1',function(){
    console.log('hello world');
});

gulp.task('minify-js', function () {
    gulp.src('algorithm/*.js') // 要压缩的js文件
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-html', function () {
    gulp.src('algorithm/*.html') // 要压缩的html文件
    .pipe(minifyHtml()) //压缩
    .pipe(gulp.dest('dist/html'));
});

gulp.task('minify-css', function () {
    gulp.src('algorithm/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    .pipe(gulp.dest('dist/css'));
});
```

## **gulp.src(globs[,options])**

该方法就是使用匹配模式获取到相关的文件，例如js，css，image等，然后连接(pipe)输送到相关的插件去做自动化处理。

## **gulp.dest(path[,options])**

可以被连接处理，并执行写入文件，它会重新发出来所有发送给他的数据，所以它连接到复杂的文件夹。如果文件夹不存在，它也会自动创建！

## **gulp.task(name[,deps,fn])**

基于Orchestrator，用于定义一个任务。

name：任务的名称

deps：任务的依赖，只有执行完这些依赖，才会执行你的任务fn。默认这是一个同步的执行方案。当然也有异步的解决方案（asynchronous）

fn：该任务的具体执行。如果你要异步该执行，那么你需要指定改任务执行完成的信息

## **gulp.watch(glob[,opts,cb(task)])**

glob匹配被监听的文件

opts，基于gaze的监听方案

包括：interval：监听的时间间隔

​     debounceDelay：延迟监听成功的执行

​     mode:监听模式：auto,watch,poll

​     cwd:监听文件的工作文件夹，默认是process.cwd()

task 是监听到变化后执行的任务列表，数组格式

cb  是监听到变化后执行进程：cb(event) 

​    event.type : `added`, `changed` 或者`deleted`.

​      event.path: 触发该监听事件的文件路径

# 5.webpack与gulp的区别

gulp能对js、css、html、img的进行压缩打包，是自动构建工具，可以将多个文件打包压缩成一个文件，以此减少文件体积和请求数量，并且gulp有task定义处理事务，从而构建整体流程，它是基于流的自动化构建工具。而且上手更快，也可以针对性更强。

webpack是前端构建工具，实现模块化开发和文件处理。他的思想就是“万物皆是模块”，它能够将各模块按需进行打包加载构建，不会导致加载了无用或冗余的代码。

webpack一般是针对项目性的，会有入口文件，输出文件，一般是对整体进行模块化分割然后构建，而gulp虽然也可以这样子，但是更多的理解是针对单个文件的流程，最后再进行整个，其实就是一种一种文件进行整个，wenpack一般是整个项目。	