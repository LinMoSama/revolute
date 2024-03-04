import { fileURLToPath, URL } from 'node:url'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.2.177:7786',
        // 192.168.1.16
        // http://192.168.2.177:7786
        changeOrigin: true,
      },
    },
  },

  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 375 / 10, // （设计稿/10）1rem的大小
          propList: ['*'],
          /* 
          rootValue：根元素字体大小，用于将像素转换为rem的基准值。
          unitPrecision：rem的小数位数。
          propList：需要转换的属性列表，['*']表示所有属性都会被转换。
          selectorBlackList：需要忽略的选择器，可以是正则表达式或字符串。
          replace：是否替换原始值。
          mediaQuery：是否在媒体查询中转换px。
          minPixelValue：小于或等于该值的像素单位不被转换
          */
        }),
      ],
    },
  },
})
