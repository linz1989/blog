<style scoped>
  div.exp{
    height:140px;
    margin:15px auto;
    padding:20px 0;
    background: #eee;
    border-radius: 6px;
  }
  div.exp>div{
    width:310px;
    height:100px;
    margin:0 auto;
    background: #fff;
    text-align: center;
    line-height: 60px;
  }
  div.transparent-border>div{
    border:20px dotted rgba(0,0,255,0.1);
  }
  div.transparent-border>div.act{
    background-clip: padding-box;
  }
  div.multiple-border-box-shadow>div{
    background-color: white;
    box-shadow: 0 0 0 5px #655, 0 0 0 10px deeppink, 0 2px 5px 10px rgba(0,0,0,0.6);
  }
  div.multiple-border-outline>div{
    background-color: white;
    border:5px solid #655;
    outline:5px solid deeppink;
  }
  div.bg{
    height:160px;
    background: url("../../../../assets/exp/css-secrects/1.jpg") no-repeat bottom right rgb(225,213,216);
  }
  div.bg-position{
    background-position: right 20px bottom 10px;
  }
  div.bg-origin{
    padding:10px 20px;
    background-origin: content-box;
  }
  div.bg-calc{
    background-position: calc(100% - 20px) calc(100% - 10px);
  }
  div.inner-border-radius>div{
    background: tan;
    border-radius: 0.8em;
    padding:1em;
    box-shadow: 0 0 0 0.4em #655;
    outline:0.6em solid #655;
  }
</style>
<template>
  <div class="page">
    <h2 class="title">《CSS 揭秘》笔记之二：背景与边框</h2>
    <div class="content">
      <h3 class="title">半透明边框</h3>
      <p>默认情况下，背景会延伸到边框所在区域的下层，此时即使设置边框为透明的颜色，也无法达到预期的效果。可以通过<strong>background-clip</strong>属性来调整。这个属性初始值默认为border-box，设置为padding-box可以用内边距的外沿将背景裁剪掉。</p>
      <div class="exp transparent-border"><div>未设置background-clip</div></div>
      <div class="exp transparent-border"><div class="act">设置background-clip</div></div>
      <pre><code>
        background: #fff;
        border:25px dotted rgba(0,0,255,0.1);
        background-clip: padding-box;
      </code></pre>
      <h3 class="title">多重边框</h3>
      <p><strong>box-shadow方案：</strong>利用box-shadow的第四个参数——扩张半径，加上为0的偏移量和模糊值，可以得到一道实线边框。由于box-shadow支持多个投影，因此可以实现多重边框。</p>
      <p>需要注意的是box-shadow是重重叠加的，需要按一定的规律调整扩张半径；投影不会影响布局，也不会受到box-sizing属性影响。此外投影生成的边框不会响应鼠标事件。</p>
      <div class="exp multiple-border-box-shadow"><div></div></div>
      <pre><code>
        background-color: white;
        box-shadow: 0 0 0 5px #655, 0 0 0 10px deeppink, 0 2px 5px 10px rgba(0,0,0,0.6);
      </code></pre>
      <p>可以给box-shadow属性加上<strong>inset</strong>关键字，使投影绘制在元素的内圈，此时的"边框"就能响应鼠标事件了。</p>
      <p><strong>outline方案：</strong>如果只需要两重边框的话，可以使用border产生常规边框，再使用outline产生外层边框。</p>
      <div class="exp multiple-border-outline"><div></div></div>
      <pre><code>
        background-color: white;
        border:5px solid #655;
        outline:5px solid deeppink;
      </code></pre>
      <p>outline并不支持设置多个，并且边框不会贴合border-radius产生的圆角，描边目前只能是直角效果。</p>
      <h3 class="title">灵活的背景定位</h3>
      <p><strong>background-position扩展语法：</strong>在CSS3中可以指定背景图片距离任意角的偏移量，只要我们在偏移量前面指定关键字。</p>
      <div class="exp bg bg-position"></div>
      <p>上面的背景图片定位在距容器右侧20px，底部10px的地方，即使改变窗口的宽度。</p>
      <pre><code>
        background: url("...") no-repeat bottom right rgb(225,213,216);
        background-position: right 20px bottom 10px;
      </code></pre>
      <p><strong>background-origin方案：</strong>每个元素都存在3个矩形框：border-box、padding-box、content-box，background-position默认以padding-box为准。CSS3中增加的background-origin可以改变这种行为。定义如下样式也能达到同样的效果：</p>
      <pre><code>
        background: url("...") no-repeat bottom right rgb(225,213,216);
        padding:10px 20px;
        background-origin: content-box;
      </code></pre>
      <div class="exp bg bg-origin"></div>
      <p><strong>calc()方案：</strong>calc()函数可以对位置执行动态计算。</p>
      <pre><code>
        background: url("...") no-repeat bottom right rgb(225,213,216);
        background-position: calc(100% - 20px) calc(100% - 10px);
      </code></pre>
      <div class="exp bg bg-calc"></div>
      <p>使用calc()函数需要注意的是操作符"+"、"-"两侧需要留有空白。</p>
      <h3 class="title">边框内圆角</h3>
      <p><strong>描边不会跟着元素的圆角走，而box-shadow确是会的。</strong>两者叠加到一起，box-shadow填充描边和容器圆角之间的空隙，可以达到此种效果。需要注意的是，box-shadow的扩张值大约是border-radius的一半。</p>
      <div class="exp inner-border-radius"><div></div></div>
      <pre><code>
        background: tan;
        border-radius: 0.8em;
        padding:1em;
        box-shadow: 0 0 0 0.4em #655;
        outline:0.6em solid #655;
      </code></pre>
      <h3 class="title">条纹背景</h3>
    </div>
    <footer>2016年11月03日</footer>
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
    }
  }
</script>
