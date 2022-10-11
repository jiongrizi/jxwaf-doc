<template>
    <main :aria-labelledby="data.heroText !== null ? 'main-title' : null" id="myhome">
        <header class="hero">
          <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'">
        
          <h1 v-if="data.heroText !== null" id="main-title">
            {{ data.heroText || $title || 'Hello' }}
          </h1>
        
          <p v-if="data.tagline !== null" class="description">
            {{ data.tagline || $description || 'Welcome to your VuePress site' }}
          </p>
        
          <p v-if="data.actionText && data.actionLink" class="action">
            <NavLink class="action-button" :item="actionLink" />
          </p>
        </header>

        <div class="my-container">
          <div class="my-content">
            <div class="my-item">
              <div class="my-col">
                <div class="my-title"><span>了解</span></div>
                <div class="my-text">
                  <ul>
                    <li><a href="../../../about.html#jxwaf-介绍" title="JXWAF介绍" target="_self">JXWAF介绍</a></li>
                    <li><a href="../../../about.html#核心优势" title="核心优势" target="_self">核心优势</a></li>
                    <li><a href="../../../about.html#防护功能介绍" title="防护功能介绍" target="_self">防护功能介绍</a></li>
                    <li><a href="../../../about.html#服务中心介绍" title="服务中心介绍" target="_self">服务中心介绍</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="my-item">
              <div class="my-col">
                <div class="my-title"><span>部署</span></div>
                <div class="my-text">
                  <ul>
                    <li>
                      <a href="../../../start.html#waf-部署方式" title="WAF部署方式" target="_self">WAF部署方式</a>
                    </li>
                    <li><a href="../../../start.html#测试环境部署-源代码部署" title="测试环境部署" target="_self">测试环境部署</a></li>
                    <li><a href="../../../start.html#线上环境部署-源代码部署" title="线上环境部署" target="_self">线上环境部署</a></li>
                    <li><a href="../../../start.html#日志采集-报表配置" title="日志采集部署" target="_self">日志采集部署</a></li>
                    <li><a href="../../../start.html#部署效果验证" title="部署效果验证" target="_self">部署效果验证</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="my-item">
              <div class="my-col">
                <div class="my-title"><span>使用</span></div>
                <div class="my-text">
                  <ul>
                    <li><a href="../../../use.html#防护管理" title="防护管理" target="_self">防护管理</a></li>
                    <li><a href="../../../use.html#日志报表" title="日志报表" target="_self">日志报表</a></li>
                    <li><a href="../../../use.html#节点管理" title="节点管理" target="_self">节点管理</a></li>
                    <li><a href="../../../use.html#系统管理" title="系统管理" target="_self">系统管理</a></li>
                    <li><a href="../../../use.html#服务中心" title="服务中心" target="_self">服务中心</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="my-item">
              <div class="my-col">
                <div class="my-title odd"><span>经验分享</span></div>
                <div class="my-text">
                  <ul>
                    <li>TODO</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="my-item">
              <div class="my-col">
                <div class="my-title odd"><span>开发者文档</span></div>
                <div class="my-text">
                  <ul>
                    <li>TODO</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Content class="theme-default-content custom" />

        <div v-if="data.footer" class="footer">
            {{ data.footer }}
        </div>

        <Content v-else slot-key="footer" class="footer" />
    </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
    name: 'Home',

    components: { NavLink },

    computed: {
        data() {
            return this.$page.frontmatter
        },

        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText
            }
        }
    }
}
</script>

<style lang="stylus">
#myhome
  padding $navbarHeight 0
  margin 0px auto
  display block
  
  .hero
    background-color: #159957;
    background-image: linear-gradient(120deg, #155799, #159957);
    text-align center
    img
      max-width: 100%
      max-height 180px
      display block
      margin: 0 auto;
      padding-top: 3rem;
    h1
      font-size: 60px;
      font-weight: bold;
      color: #fff;
      padding-top: 5rem;
    h1, .description, .action
      margin 0 auto
      line-height: 1.8;
    .description
      width: 80%;
      max-width 77rem
      font-size 1.2rem
      color: #fff;
      padding-bottom: 5rem;
      padding-top: 1.2rem;
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.5rem 1.2rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
  .my-container
    padding 0 1.5rem 
    
  .my-content 
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
  .my-item 
    position: relative;
  .my-item:last-child:before
    height: 0;
    width: 0;
  .my-item:before 
    content: "";
    width: 1px;
    height: 100%;
    background-color: #e3e8ed;
    position: absolute;
    left: 15px;
    top: 60px;
    z-index: 1;
  .my-col
    display: flex
  .my-title
    width: 150px;
    margin-top: 48px;
    span 
      position: relative;
      z-index: 2;
      background: #fff;
      font-size: 18px;
      color: #181818;
      font-weight: 500;
      
  .my-title.odd 
    margin-top: 30px;    
  .my-text 
    width: 100%;
    ul 
      display: flex;
      padding: 15px 0;
      border: 1px solid hsla(0,0%,88.2%,.6);
      border-radius: 3px;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding-left: 60px;
    ul:hover
      cursor: pointer
      -webkit-box-shadow: 0 4px 15px #0000001a;
      box-shadow: 0 4px 15px #0000001a;
    li
      list-style: none;
      margin: 0;
      padding: 0;
      width: 33%;
      font-size: 14px;
      height: auto;
      line-height: 20px;
      margin: 6px 0;
    a
      font-weight: 500;
      color: #666;
      text-decoration: none;
    a:hover
      color: #3eaf7c;

@media (max-width: $MQMobile)
  #myhome
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  #myhome
    padding-left 0
    padding-right 0
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
@media (max-width: 900px)
  #myhome
    .my-text
      li
        width: 50%
    
@media (max-width: 600px)
  #myhome
    .my-text
      li
        width: 100%
      
</style>
