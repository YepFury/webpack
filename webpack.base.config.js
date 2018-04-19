const path = require('path');
module.exports = {
    // entry表示入口，webpack构建开始的地方，类型可以是string，array，Object
    entry: './app/entry',   // 只有一个入口，入口只有一个文件
    entry: ['./app/entry1', './app/entry2'],    // 只有一个入口，入口有两个文件
    entry: {            // 有两个入口
        a: './app/entry1',
        b: './app/entry2'
    },

    // 在webpack处理之后输出结果
    output: {
        // 输出文件存放的目录，必须是string类型的绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',       // 完整的名称
        filename: '[name].js',       // 在配置了多个entry时，通过名称模版为不同的entry生成不同的文件名称
        filename: '[chunkhash].js',       // 根据文件内容的hash值生成文件的名称，用于浏览器长时间缓存文件
        // 发布到线上的所有资源的URL前缀，为string类型
        publicPath: '/assets/',     // 放到指定目录下
        publicPath: '',              // 放到根目录下
        publicPath: 'https://cdn.example.com/',              // 放到cdn上
        // 导出库的名称，为string类型。不填它时，默认的输出格式是匿名的立即执行函数。
        library: 'MyLibrary',
        // 导出库的类型，为枚举类型，默认为var。可以是umd,umd2,commonjs2,commonjs,amd,this,var,window,assign,global,jsonp
        libraryTarget: 'umd',
        // 是否包含有用的文件路径信息到生成的代码里，为boolean类型
        pathinfo: true,
        // 附加chunk的文件名称
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',
        // JSONP异步加载资源时的回调函数名称，需要和服务端搭配使用
        jsonpFunction: 'myWebpackJsonp',
        // 生成的SourceMap文件的名称
        sourceMapFilename: '[file].map',
        // 浏览器开发者工具里显示的源码模块名称
        crossOriginLoading: 'use-credentials',
        crossOriginLoading: 'anonymous',
        crossOriginLoading: false,
    },

    // 配置模块相关
    module: {
        // 配置loader
        rules: [
            {
                // 正则匹配使用loader的文件
                test: /\.less?$/,
                // 只会匹配这里的文件
                include: [
                    path.resolve(__dirname, 'app')
                ],
                // 忽略匹配这里的文件
                exclude: [
                    path.resolve(__dirname, 'app/demo')
                ],
                // 使用到的loader，默认从右到左
                use: [
                    // 使用到的loader名称
                    'style-loader',
                    {
                        loader: 'css-loader',
                        // 向loader传递的参数
                        option: {}
                    },
                    'less-loader'
                ]
            }
        ],
        // 不用解析和处理的模块
        noParse: [
            // 使用正则匹配
            /special-lib\.js$/
        ]
    },

    // 配置插件
    plugins: [],

    // 配置寻找模块的规则
    resolve: {
        // 寻找模块的根目录，为array类型，默认以node-modules为根目录
        modules: [
            'node_modules',
            path.resolve(__dirname, 'app')
        ],
        // 模块的后缀名
        extensions: ['.js', '.json', '.jsx', '.css'],
        // 模块别名配置，用于映射模块
        alias: {
            // 将module及其所有子模块映射到new-module
            'module': 'new-module',
            // 以结尾符号$结尾，只会将only-module映射成new-only-module，而不会影响子模块
            'only-module$': 'new-only-module'
        },
        // alias支持使用数组来详细的配置
        alias: [
            {
                name: 'module',         // 老模块
                alias: 'new-module',    // 新模块
                onluModule: true        // 是否只映射模块，true：只有module会被映射，false：子模块也会被映射
            }
        ],
        // 是否跟随文件的软链接去搜寻模块的路径
        symlinks: true,
        // 模块的描述文件
        descriptionFiles: ['package.json'],
        // 模块描述文件里描述入口的文件的字段名
        mainFields: ['main'],
        // 是否强制导入语句写明文件后缀
        enforceExtension: false
    },

    // 输出文件的性能检查配置
    performance: {
        hints: false,           // 关闭性能检查，'warning'：有性能问题时输出警告，'error'：有性能问题时输出错误
        maxAssetSize: 200 * 1024,       // 最大文件的大小（单位bytes）
        maxEntrypointSize: 400 * 1024,      // 最大入口文件的大小（单位bytes）
        assetFilter: assetFilename => {         // 过滤要检查的文件
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    // 配置source-map类型
    devtool: 'source-map',

    // webpack使用的根目录，为string类型，必须是绝对路径
    context: __dirname,

    // 配置输出代码的运行环境， 默认浏览器
    target: 'web',

    // 使用来自JavaScript运行环境提供的全局变量
    externals: {
        jquery: 'jQuery'
    },

    // 控制台输出日志
    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    },

    // DevServer相关配置
    devServer: {
        proxy: {            // 代理到后端服务接口
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'),        // 配置DevServer HTTP服务器的文件根目录
        compress: true,         // 是否开启Gzip压缩
        historyApiFallback: true,       // 是否开发HTML5 History API网页
        hot: true,      // 是否开启模块热替换功能
        https: false        // 时候开启HTTPS模式
    },

    // 是否捕捉webpack构建的性能信息，用于分析是什么原因导致构建性能不佳
    profile: true,

    // 是否启用缓存来提升构建速度
    cache: true,

    // 是否启用监听
    watch: true,
    // 监听模式配置
    watchOptions: {
        ignored: /node-modules/,        // 不监听的文件或文件夹，支持正则匹配，默认为空。
        aggregateTimeout: 300,          // 监听到变化后，等300ms再执行动作，截流，防止文件更新太快导致重新编译频率太快，默认为300ms
        poll: 1000          // 不停的询问系统指定的文件有没有发生变化，默认每秒询问1000次
    }

}