<template>
  <div class="page">
    <h2 class="title">《CSS 揭秘》笔记之二：背景与边框</h2>
    <div class="content">
      <p>"十年来最重要的CSS图书，没有之一"。</p>
    </div>
    <footer>2016年11月01日</footer>
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
