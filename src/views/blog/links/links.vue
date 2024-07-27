<template>
  <div class="links">
    <div class="blogLayout-header">
      <MImgDefault>
        <h1 class="blogLayout-header-title">友链</h1>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <div class="links-explain">
        <p>欢迎交换友链 ꉂ(ˊᗜˋ)</p>
        <div>
          <p>友链要求：</p>
          <ol>
            <li>原创文章数目大于10篇</li>
            <li>博客拥有独立的域名</li>
            <li>博客内无违法违规内容</li>
          </ol>
          <p>如果您的网站满足上述要求，请留言告诉我。</p>
        </div>
        <div>
          <p>格式(本站信息)：</p>
          <ul>
            <li>名称：isdream</li>
            <li>简介：你总是一副不开心的样子(#`O′)</li>
            <li>链接：https://isdream.cn/</li>
            <li>头像：https://isdream.cn/favicon.ico/</li>
          </ul>
        </div>
        <p class="links-explain__tip">
          ※
          原则上过去已添加友链不会轻易删除，如遇死链、改变网站用途（友链主要针对的是同类的博客），将单独移至“阵亡将士”分类中，下次清理时未整改的将移除；如遇盗版、破解、网页植入挖矿脚本、极低质量内容、单方面移除本站链接，将直接移除，恕不另行通知。
        </p>
      </div>

      <div v-for="(item, index) in links" :key="item.id" class="links-box">
        <h4 class="links-box__title">{{ index + 1 }}. {{ item.title }}</h4>
        <div class="links-box__desc">
          {{ item.description }}
        </div>
        <ul class="links-box__content">
          <li v-for="link in item.links" :key="link.id" class="link-item">
            <a :href="link.link" target="_blank" :title="link.title">
              <div class="link-item__info">
                <div class="link-item__name">{{ link.title }}</div>
                <div class="m-ellipsis link-item__descript">
                  {{ link.description }}
                </div>
              </div>
              <div class="link-item__avatar">
                <MImgAvatar
                  :src="link.icon"
                  :username="link.title"
                ></MImgAvatar>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <MComment
        v-if="articleInfo?.isCommented"
        :article="articleInfo.id"
      ></MComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getLinks, LinkType } from '@/api/blog/links'
import { useArticle, ArticleId } from '@/views/blog/article/hooks/useArticle'

defineOptions({
  name: 'Links'
})

const { articleInfo } = useArticle(ArticleId.Link)

const links = ref<LinkType[]>([])
getLinks().then((res) => {
  links.value = res.data
})
</script>

<style lang="scss" scoped>
.links {
  .links-explain {
    &__tip {
      font-size: 0.13rem;
    }

    div {
      p {
        &:first-child {
          font-weight: bold;
        }
      }
      ol,
      ul {
        padding-left: 0.48rem;
        li {
          margin-bottom: 0.08rem;
        }
      }
    }
  }

  .links-box {
    margin-top: 0.4rem;
    &__title {
      margin-bottom: 0.16rem;
      padding: 0.03rem 0 0.03rem 0.16rem;
      border-left: 0.03rem solid var(--el-color-primary);
    }
    &__desc {
      margin-bottom: 0.08rem;
    }
    &__content {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(max(260px, calc(100% / 3 - 0.06rem)), 1fr)
      );
      grid-row-gap: 0.1rem;
      grid-column-gap: 0.1rem;
      padding: 0;
      .link-item {
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
        padding: 0.16rem 0.24rem;
        border: var(--m-border);
        border-radius: 0.08rem;
        overflow: hidden;
        a {
          position: relative;
          display: flex;
          align-items: center;
          text-decoration: none;
        }
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
          font-size: 0.2rem;
          margin-bottom: 0.08rem;
          padding-bottom: 0.08rem;
          border-bottom: var(--m-border);
          border-bottom-style: dashed;
        }
        &__descript {
          flex: 0;
          color: var(--m-font-color);
        }
        &__avatar {
          position: relative;
          flex-shrink: 0;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          overflow: hidden;
          border: var(--m-border);
          border-width: 0.03rem;
        }
      }
    }
  }
}
</style>
