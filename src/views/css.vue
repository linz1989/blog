<template>
<div class="page">
  <ul class="article-list">
     <router-link tag="li" :to="{ name : 'learning-css-secrects-1' }">
      <h3>《CSS 揭秘》笔记之一：前言</h3>
      <div>由W3C CSS工作组特邀专家、CSS语言设计者之一的Lea Verou撰写。被百姓网前段架构师誉之为"十年来最重要的CSS图书，没有之一"的一本进阶书。前言中主要是编程理念，特性检测与CSS编码技巧。</div>
      <div>【读书笔记】2016/10/30</div>
    </router-link>
    <router-link tag="li" :to="{ name : 'learning-css-secrects-2' }">
      <h3>《CSS 揭秘》笔记之二：背景与边框</h3>
      <div>此书第二章的内容。分别描述了半透明边框、多重边框、背景定位、边框内圆角以及多种多样的条纹背景效果实现技巧。</div>
      <div>【读书笔记】2016/11/03</div>
    </router-link>
  </ul>
</div>
</template>
