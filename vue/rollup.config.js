import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/index.js', // 已那个文件为入口进行打包
    output: {
        file: 'dist/umd/vue.js', // 出口路径
        name: 'Vue', // 指定打包后全局变量的名字
        format: 'umd', // 统一模块规范
        sourcemap: true // es6-es5 开启源码调试 可以找到源码的报错位置
    },
    plugins: [
        babel({
            exclude: 'node_module/**'  // 不打包的目录
        }),
        process.env.ENV === 'development'? serve({
            open: true,
            openPage: '/pulic/index.html',
            port: 3000,
            contentBase: '' //当前指定路径
        }): null
    ]
}