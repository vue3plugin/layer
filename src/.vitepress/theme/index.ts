import theme from 'vitepress/dist/client/theme-default/index'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import "../../assets/index.css"
import "./index.css"

export default {
  ...theme,
  title: "弹出元素",
  enhanceApp({app}) {
    app.component('demo-preview', AntDesignContainer)
  }
}
