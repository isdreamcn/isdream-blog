<template>
  <div class="links">
    <div class="blogLayout-header">
      <MImgDefault>
        <div class="blogLayout-header-title">友链</div>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <div class="links-explain">
        <p>欢迎交换友链 ꉂ(ˊᗜˋ)</p>
        <div>
          <p>友链要求：</p>
          <p>1、原创文章数目大于10篇</p>
          <p>2、博客拥有独立的域名</p>
          <p>3、博客内无违法违规内容</p>
          <p>如果您的网站满足上述要求，请留言告诉我。</p>
        </div>
        <div>
          <p>格式(本站信息)：</p>
          <p>名称：isdream</p>
          <p>简介：你总是一副不开心的样子(#`O′)</p>
          <p>链接：https://isdream.cn/</p>
          <p>头像：https://api.isdream.cn/img/favicon.ico/</p>
        </div>
        <p class="links-explain__tip">
          ※
          原则上过去已添加友链不会轻易删除，如遇死链、改变网站用途（友链主要针对的是同类的博客），将单独移至“阵亡将士”分类中，下次清理时未整改的将移除；如遇盗版、破解、网页植入挖矿脚本、极低质量内容、单方面移除本站链接，将直接移除，恕不另行通知。
        </p>
      </div>

      <div class="links-box">
        <div class="links-box__title">1. 个人项目</div>
        <div class="links-box__desc">
          充分说明这家伙是条咸鱼 {{ `< (￣︶￣)>` }}
        </div>
        <div class="links-box__content">
          <div v-for="i in 4" :key="i" class="link-item">
            <div class="link-item__info">
              <div class="link-item__name">testName</div>
              <div class="m-ellipsis link-item__descript">
                测测试描测试描述述试描述测试描述测试描述
              </div>
            </div>
            <div class="link-item__avatar">
              <MImg :src="avatar"></MImg>
            </div>
          </div>
        </div>
      </div>

      <div class="links-box">
        <div class="links-box__title">2. 私人服务</div>
        <div class="links-box__desc">稳定性？不存在的 ∠( ᐛ 」∠)＿</div>
        <div class="links-box__content">
          <div v-for="i in 1" :key="i" class="link-item">
            <div class="link-item__info">
              <div class="link-item__name">testName</div>
              <div class="m-ellipsis link-item__descript">
                测测试描测试描述述试描述测试描述测试描述
              </div>
            </div>
            <div class="link-item__avatar">
              <MImg :src="avatar"></MImg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import avatar from '@/assets/img/1.jpg'

defineOptions({
  name: 'Links'
})

type Link = {
  name: string
  avatar: string
  url?: string
  descript?: string
}

const links = ref<
  {
    type: string
    links: Link[]
  }[]
>([])
</script>

<style lang="scss" scoped>
.links {
  .links-explain {
    &__tip {
      font-size: 0.8rem;
    }

    div {
      p {
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }

  .links-box {
    margin-top: 2.5rem;
    &__title {
      margin-bottom: 1rem;
      padding: 0.2rem 0 0.2rem 1rem;
      border-left: 0.2rem solid var(--el-color-primary);
    }
    &__desc {
      margin-bottom: 0.5rem;
    }
    &__content {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(max(260px, calc(100% / 3 - 0.4rem)), 1fr)
      );
      grid-row-gap: 0.6rem;
      grid-column-gap: 0.6rem;
      .link-item {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        padding: 1rem 1.5rem;
        border: var(--m-border);
        border-radius: 0.5rem;
        overflow: hidden;
        &::before {
          content: '';
          position: absolute;
          display: block;
          top: 0;
          bottom: 0;
          left: -25%;
          width: 0;
          transition: var(--animate-duration);
          background-color: var(--el-color-primary);
          opacity: 0.2;
          transform: skew(45deg, 0);
        }
        &:hover {
          &::before {
            width: 150%;
          }
        }
        &__info {
          flex: 1;
          width: 0;
        }
        &__name {
          color: var(--el-color-primary);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: var(--m-border);
          border-bottom-style: dashed;
        }
        &__descript {
          flex: 0;
          color: var(--m-font-color);
        }
        &__avatar {
          flex-shrink: 0;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          overflow: hidden;
          border: var(--m-border);
          border-width: 0.2rem;
        }
      }
    }
  }
}
</style>
