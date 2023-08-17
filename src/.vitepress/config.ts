import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { resolve } from 'path';
import { defineConfig } from 'vitepress'
import { name as pkgName } from "../../package.json"

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}
console.log(pathResolve(".."))
export default defineConfig({
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
