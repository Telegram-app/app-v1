import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  plugins: [
      vue(),
      Components({
        dirs: ['documentation', 'src/components', 'src/components/app', 'src/layouts'],
        extensions: ['vue', 'md'],
        dts: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_tg-variables.scss";`
      }
    }
  },
})
