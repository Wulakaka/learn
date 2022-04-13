# [Sass-loader 说明文档](https://www.npmjs.com/package/sass-loader)

### 安装
`npm install sass-loader sass --save-dev`

`sass-loader` 需要手动安装 Dart Sass/Node Sass 或 Sass Embedded。

这允许你控制所有依赖的版本，并且选择哪种Sass的实现方式。

_强烈建议使用Dart Sass_

_Node Sass 与 Yarn PnP 不兼容，而且不支持 @use 规则_

_Sass Embedded 还在试验阶段，所以有些特性无法使用_

链接 `sass-loader` 在 css-loader 和 style-loader 之后来立即导出所有的DOM样式或者mini-css-extract-plugin到单独的文件。

然后添加loader到Webpack的配置中。

### 在 webpack.config.js 中配置 sass-loader
#### webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```

### 解析 `import` @规则
Webpack 提供一种更高级的文件解析机制。

`sass-loader` 使用了Sass的自定义的导入特性来传递所有参数给Webpack的解析引擎。所以可以导入 `node_modules`的Sass 模块。

```scss
@import "bootstrap";
```

使用 `~` 是过时的并且可以从代码中移除了。但是出于历史原因仍然支持这种方式。
为什么可以删除？loader首先会尝试解析 `@import` 为相对路径。如果无法解析，loader会尝试在 `node_module` 中解析。

前置 `~` 到模块路径中告诉webpack 在 `node_module` 中搜索路径。
```scss
@import "~bootstrap";
```
很重要的一点是只使用 `~`，因为 `~/`会解析根路径。Webpack需要分辨 `bootstrap` 和 `~bootstrap`，因为CSS 和 Sass 文件没有特殊的导入相对路径的语法。
`@import "style.scss"` 和 `@import “./style.scss”`是相同的。
