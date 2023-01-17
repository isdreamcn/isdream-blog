<template>
  <div class="about">
    <div class="blogLayout-header">
      <MImgDefault>
        <h1 class="blogLayout-header-title">关于</h1>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <h2>个人简介</h2>
      <div class="blogger-info">
        <MImg :src="blogger" :lazy="false"></MImg>
        <div class="blogger-info-desc">
          <h3>isdream</h3>
          <p>1.《英雄联盟》大乱斗爱好者 {{ '< (￣︶￣)>' }}</p>
          <p>2.轻度懒癌患者 (￣o￣)</p>
        </div>
      </div>

      <h2>交流相关</h2>
      <ul>
        <li>
          <a href="https://space.bilibili.com/34011178" target="_blank"
            >bilibili</a
          >
        </li>
        <li><a href="https://gitee.com/mtm2233" target="_blank">gitee</a></li>
        <li><a href="https://github.com/mtm2233" target="_blank">github</a></li>
        <li><a href="mailto:2541817610@qq.com" target="_blank">email</a></li>
      </ul>

      <h2>关于本站</h2>
      <ol>
        <li>
          前端模版：
          <a href="https://vue3.isdream.cn/" target="_blank"
            >isdream-vue-admin</a
          >
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import blogger from '@/assets/img/blogger.png'

defineOptions({
  name: 'About'
})
</script>

<style lang="scss" scoped>
.about {
  .blogLayout-card {
    .blogger-info {
      display: flex;
      .m-img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        overflow: hidden;
      }
      .blogger-info-desc {
        margin-left: 2rem;
        h3 {
          margin-top: 0;
        }
      }
    }
    ul,
    ol {
      padding-left: 3rem;
      li {
        margin-bottom: 0.5rem;
        a {
          cursor: pointer;
          text-decoration: none;
          color: var(--el-font-color);
          transition: var(--animate-duration);
          color: var(--el-color-primary);
          font-size: 1.2rem;
          &:hover {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
