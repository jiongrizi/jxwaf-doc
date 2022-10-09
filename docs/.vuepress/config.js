
module.exports = {
  title: 'JXWAF', // 网站的标题
  description: 'JXWAF——下一代web应用防火墙', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }] // 需要被注入到当前页面的 HTML <head> 中的标签
    ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }, 
      // 支持嵌套,形成下拉式的导航菜单
      {
        text: '文档',
        ariaLabel: 'Menu',
        items: [
            { text: '了解', link: '/about/' },
            { text: '部署', link: '/start/' },
            { text: '使用', link: '/use/' },
            { text: '经验分享', link: '/share/' },
            { text: '开发者文档', link: '/docs/' },
        ]
      },
      // 可指定链接跳转模式：默认target: '_blank'新窗口打开，_self当前窗口打开
      { text: 'Github', link: 'https://github.com/jx-sec/jxwaf' },
    ],
    sidebar: ["/", "/about","/start","/use","/share","/docs"]
  },

}