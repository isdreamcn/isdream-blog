<template>
  <div class="article">
    <div class="blogLayout-header article__header">
      <MImgDefault>
        <div class="blogLayout-card">
          <div class="article-title">这是一个测试标题</div>
          <div class="article-statistics m-flex hc">
            <div class="article-blogger">
              <MImg :src="blogger" :lazy="false"></MImg>
            </div>
            <span>isdream</span>
            <span>2022-11-17</span>
            <span>100次阅读</span>
          </div>
        </div>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <div class="article__content">123</div>
      <div class="article-footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blogger from '@/assets/img/blogger.png'

defineOptions({
  name: 'Article'
})
</script>

<style lang="scss" scoped>
.article {
  .article__header {
    height: 40vh;
    .blogLayout-card {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-bottom: 0;
      transform: translateX(-50%);
      animation: none;
      color: #ffffff;
      background-color: transparent;
      box-shadow: none;
      .article-title {
        font-size: 2rem;
      }
      .article-statistics {
        margin-top: 1rem;
        .article-blogger {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.5rem;
        }
        span {
          margin-right: 0.25rem;
          display: flex;
          align-items: center;
          &::after {
            content: '·';
            padding-left: 0.25rem;
            font-size: 2rem;
          }
          &:last-child {
            &::after {
              content: '';
            }
          }
        }
      }
    }
  }

  .article__content {
  }

  .article-footer {
    border-top: var(--m-border);
    border-bottom: var(--m-border);
    padding: 1rem;
  }
}
</style>
