let path = require("path");
const webpack = require("webpack");
const ThemeColorReplacer = require("webpack-theme-color-replacer");
const { getThemeColors, modifyVars } = require("./src/utils/themeUtil");
const { resolveCss } = require("./src/utils/theme-color-replacer-extend");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const timeStamp = new Date().getTime();

const productionGzipExtensions = ["js", "css"];
const isProd = process.env.NODE_ENV === "production";

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios",
    nprogress: "NProgress",
    clipboard: "ClipboardJS",
    "@antv/data-set": "DataSet",
    "js-cookie": "Cookies"
  },
  css: [],
  js: [
    "//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    "//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js",
    "//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js",
    "//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js",
    "//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js",
    "//cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js",
    "//cdn.jsdelivr.net/npm/@antv/data-set@0.11.4/build/data-set.min.js",
    "//cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js"
  ]
};

module.exports = {
  lintOnSave:false,
  devServer: {
    proxy: {
      "/rps": {
        target: "http://ntm.ydidc.com/rps",
        changeOrigin: true,
        pathRewrite: {
          "^/rps": ""
        }
      },
      "/fs": {
        target: "http://site.ydidc.com/fs",
        changeOrigin: true,
        pathRewrite: {
          "^/fs": ""
        }
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")]
    }
  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];
    config.performance = {
      hints: false
    };
    // 输出重构 打包编译后的js文件名称,添加时间戳.
    config.output.filename = `js/[name].${timeStamp}.js`;
    config.output.chunkFilename = `js/chunk.[id].${timeStamp}.js`;
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: "css/theme-colors-[contenthash:8].css",
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    );
    // Ignore all locale files of moment.js
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    // if prod, add externals
    if (isProd) {
      config.externals = assetsCDN.externals;
    }
  },
  chainWebpack: config => {
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (isProd) {
      config.plugin("optimize-css").tap(args => {
        args[0].cssnanoOptions.preset[1].colormin = false;
        return args;
      });
    }
    // 生产环境下使用CDN
    if (isProd) {
      config.plugin("html").tap(args => {
        args[0].cdn = assetsCDN;
        return args;
      });
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    },
    // 打包后css文件名称添加时间戳
    extract: {
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/chunk.[id].${timeStamp}.css`
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  // 打包的时候不使用hash值.因为我们有时间戳来确定项目的唯一性了.
  filenameHashing: false
};
