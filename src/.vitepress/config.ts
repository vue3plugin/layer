import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { resolve } from 'path';
import { defineConfig } from 'vitepress'
import { name as pkgName } from "../../package.json"
import nav from './configs/nav';
import sidebar from './configs/sidebar';

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  title: pkgName,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview)
      md.use(containerPreview)
    }
  },
  themeConfig:{
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vue3plugin/layer' }
    ],
  },
  vue: {
    script: {
      defineModel: true
    }
  },
  vite: {
    resolve: {
      alias: {
        [pkgName]: pathResolve(".."),
      }
    }
  }
})
