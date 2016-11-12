<template>
  <div class="page">
    <h2 class="title">《CSS 揭秘》笔记之一：前言</h2>
    <div class="content">
      <p>"十年来最重要的CSS图书，没有之一"。</p>
      <p>这本书的作者是W3C CSS工作组特邀专家、CSS语言设计者之一：<em>Lea Verou</em>。令人惊叹的是，这本书完全由HTML5写成，布局与排版由CSS渲染。此书在<a
        href="https://book.douban.com/subject/26745943/">豆瓣</a>上的评分高达9.3，是一本诸多前端大师倾情推荐的好书。中文版由<a
        href="https://github.com/cssmagic/blog/issues/54">CSS 魔法</a>翻译。</p>
      <p>这并不是一本厚厚的权威指南，并不适合初学者，它的目标读者是正在由中级向高级进阶的CSS开发者。作者在书中揭示了47个鲜为人知的CSS技巧，为前端开发遇到的各种网页难题，探寻出了更优雅的解决方案。主要包括7大主题：</p>
      <p><strong>背景与边框、形状、视觉效果、字体排印、用户体验、结构与布局、过渡与动画</strong></p>
      <p>这本书不单单只介绍CSS的技巧，作者会深入分析背后的思路，循序渐进地找到解决问题的方法。<strong>"理解发现解决方案的过程比解决方案本身更有用"。</strong></p>
      <p>贯穿书中的编程理念是<em>DRY</em>（Don't Repeat
        Yourself：不应该重复你已经做过的事。在改动某个参数时，做到只改尽量少的地方）、<em>可维护</em>、<em>灵活性</em>、<em>轻量级</em>以及<em>要符合标准</em>。
      以下是首页到第一章的一些知识点。</p>
      <p><strong>标准语法应该写在最后；</strong></p>
      <p><strong>当使用渐变时，如果需要考虑兼容性，可以使用渐变色的平均值作为回退机制。</strong></p>
      <pre><code class="css">
        background: rgb(255, 128, 0); // 渐变色的平均值
        background: -moz-linear-gradient(0deg, yellow, red);
        background: -o-linear-gradient(0deg, yellow, red);
        background: -webkit-linear-gradient(0deg, yellow, red);
        background: linear-gradient(90deg, yellow, red); // 标准语法
      </code></pre>
      <p>关于浏览器对样式是否支持的判断，可以使用<strong>特性检测：Modernizr或者@supports</strong></p>
      <p>以下是小段JavaScript代码，实现特性检测并给根元素添加辅助类：</p>
      <pre><code class="javascript">
        function testProperty (property) {
          var root = document.documentElement
          if (property in root.style) {
            root.classList.add(property.toLowerCase())
            return true
          }
          root.classList.add('no' + property.toLowerCase())
          return false
        }
      </code></pre>
      <button @click="testProperty('textShadow')">检测浏览器是否支持textShadow</button>
      <p>如果需要检测某个具体的属性值是否支持，则需要把它赋值给相应的属性，然后再检查浏览器是否还保存这个值：</p>
      <pre><code>
        function testValue (value, property) {
          var dummy = document.createElement('p')
          dummy.style[property] = value

          if (dummy.style[property]) {
            return true
          }
          return false
        }
      </code></pre>
      <button @click="testValue('linear-gradient(red,tan)','backgroundImage')">检测浏览器是否支持linear-gradient(red,tan)</button>
      <p class="dot">浏览器可以解析某个CSS特性并不能表示它已经正确实现了这个特性。</p>
      <p><strong>W3C并不产生标准。</strong>CSS规范由CSS工作组的成员来编写，大部分成员来自W3C会员公司。每项规范从最初启动到最终成熟，都会经过多个阶段。</p>
      <p>CSS1规范发表于1996年，两年之后，CSS2规范发布了。<strong>尽管"CSS3"这个名词非常流行，但实际上并没有在任何规范中定义过。</strong>CSS3指的是一个非正式的集合，它包括CSS规范第三版及一些版本号还是1的新规范。</p>
      <h3 class="sub-title">CSS编码技巧：</h3>
      <p><strong>尽量减少重复的代码。</strong>当某些值相互依赖时，应该把它们的相互关系用代码表示出来。<strong>currentColor是一个特殊的颜色关键字，CSS中有史以来的第一个变量。</strong>减少重复多使用<strong>inherit关键字。</strong></p>
      <p><strong>相信你的眼睛，而不是数字。</strong></p>
      <p><strong>关于响应式布局，应尽最大努力实现弹性可伸缩的布局，并在各个断点区间内指定相应尺寸。</strong>当网页本身的设计足够灵活时，让它变成响应式应该只需要用到简短的媒体查询代码。</p>
      <p><strong>合理使用简写。</strong></p>
      <p><strong>合理使用预处理器。</strong></p>
    </div>
    <footer>2016年10月30日</footer>
  </div>
</template>
<script>
  module.exports = {
    mounted: function () {
      this.$nextTick(function () {
        var codes = document.querySelectorAll('code')
        if (codes.length > 0) {
          for (var k = 0; k < codes.length; k++) {
            hljs.highlightBlock(codes[k])
          }
        }
      })
    },
    methods: {
      testProperty: function (property) {
        var root = document.documentElement
        if (property in root.style) {
          alert('true')
          return
        }
        alert('false')
      },
      testValue: function (value, property) {
        var dummy = document.createElement('p')
        dummy.style[property] = value

        if (dummy.style[property]) {
          alert('true')
          return
        }
        alert('false')
      }
    }
  }
</script>
