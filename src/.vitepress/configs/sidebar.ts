export default {
  '/guide/': getGuideSidebar()
}

function getGuideSidebar() {
  return [
    {
      text: '指南',
      items: [
        {
          text: '弹窗',
          link: '/guide/dialog/index'
        },
        {
          text: '文档2',
          link: '/guide/button'
        },
        {
          text: '文档3',
          link: '/guide/modal'
        }
      ]
    }
  ]
}

