<template>
  <div v-if="articleInfo" class="article">
    <div class="blogLayout-header article__header">
      <MImgDefault
        :src="filePathQuery(articleInfo.cover?.url, { w: 2560, f: 'webp' })"
        :thumb="filePathQuery(articleInfo.cover?.url, { w: 100, f: 'webp' })"
      >
        <div class="blogLayout-card">
          <h1 class="article-title">{{ articleInfo.title }}</h1>
          <div class="article-statistics m-flex hc">
            <div class="article-blogger">
              <MImg :src="blogger" :lazy="false"></MImg>
            </div>
            <span>isdream</span>
            <span v-dateFormat>{{ articleInfo.createdAt }}</span>
            <span>{{ articleInfo.views }}次阅读</span>
          </div>
        </div>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <MMenu :containerEl="containerElRef"></MMenu>
      <!-- 内容 -->
      <article class="article__content" ref="containerElRef">
        <MMarkdownView
          v-if="articleInfo.render === 1"
          :value="articleInfo.content"
        ></MMarkdownView>
        <div v-if="articleInfo.render === 2" v-html="articleInfo.content"></div>
      </article>
      <!-- 协议、标签、操作 -->
      <div class="article-footer">
        <div class="license">
          <a
            class="m-flex hc"
            rel="license"
            target="_blank"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            <img
              alt="知识共享许可协议"
              style="border-width: 0"
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"
            />
            <div class="media-pc">
              知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
            </div>
            <div class="media-phone">
              <abbr
                title="知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议"
                >CC BY-NC-SA 4.0</abbr
              >
            </div>
          </a>
        </div>
        <div class="article-actions">
          <div class="article-actions__tags m-flex hc">
            <MIcon v-if="articleInfo.tags.length" name="icon-PriceTag"></MIcon>
            <a
              v-for="tag in articleInfo.tags"
              :key="tag.id"
              @click="goSearch(tag.id, tag.title)"
              >{{ tag.title }}</a
            >
          </div>
          <div class="article-actions__btns">
            <div class="btns-item" @click="commend">
              <MIcon name="icon-star"></MIcon>{{ articleInfo.commends }}
            </div>
          </div>
        </div>
      </div>
      <!-- 上一篇/下一篇 -->
      <div class="article-pre-next">
        <div
          v-if="preArticleInfo"
          class="article-pre"
          @click="showArticle(preArticleInfo!.id)"
        >
          <MImgDefault
            :src="
              filePathQuery(preArticleInfo.cover?.url, { w: 750, f: 'webp' })
            "
            :thumb="
              filePathQuery(preArticleInfo.cover?.url, { w: 100, f: 'webp' })
            "
          >
            <div class="article-pre-next__articleInfo">
              <div>上一篇</div>
              <div class="m-ellipsis">{{ preArticleInfo.title }}</div>
            </div>
          </MImgDefault>
        </div>
        <div
          v-if="nextArticleInfo"
          class="article-next"
          @click="showArticle(nextArticleInfo!.id)"
        >
          <MImgDefault
            :src="
              filePathQuery(nextArticleInfo.cover?.url, { w: 750, f: 'webp' })
            "
            :thumb="
              filePathQuery(nextArticleInfo.cover?.url, { w: 100, f: 'webp' })
            "
          >
            <div class="article-pre-next__articleInfo">
              <div>下一篇</div>
              <div class="m-ellipsis">{{ nextArticleInfo.title }}</div>
            </div>
          </MImgDefault>
        </div>
      </div>
      <MComment
        v-if="articleInfo.isCommented"
        :article="articleInfo.id"
      ></MComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filePathQuery } from '@/utils'
import blogger from '@/assets/img/blogger.webp'
import { useArticle } from './hooks/useArticle'

defineOptions({
  name: 'Article'
})

const containerElRef = ref<HTMLElement>()

const route = useRoute()
const id = Number(route.params.id)

const { articleInfo, preArticleInfo, nextArticleInfo, commend } = useArticle(id)

// 查看相同标签的文章
const router = useRouter()
const goSearch = (id: number, name: string) => {
  router.push({
    name: 'search',
    query: {
      tag: id,
      tagName: name
    }
  })
}

const showArticle = (id: number) => {
  router.push({
    name: 'article',
    params: {
      id
    }
  })
}
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
      z-index: 5;
      .article-title {
        font-size: 0.32rem;
      }
      .article-statistics {
        margin-top: 0.16rem;
        .article-blogger {
          height: 0.4rem;
          width: 0.4rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.08rem;
        }
        span {
          margin-right: 0.04rem;
          display: flex;
          align-items: center;
          &::after {
            content: '·';
            padding-left: 0.04rem;
            font-size: 0.32rem;
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
    .m-markdown-view {
      font-size: 0.16rem;
      overflow: visible;
    }
    :deep(*) {
      max-width: 100% !important;
    }
    :deep(.hljs) {
      max-height: unset !important;
    }
  }

  .article-footer {
    margin: 0.56rem 0;
    padding: 0.16rem 0;
    color: var(--m-font-color);
    border-top: var(--m-border);
    border-bottom: var(--m-border);
    .license {
      display: flex;
      justify-content: center;
      a {
        color: var(--m-font-color);
        text-decoration-line: none;
      }
      img {
        margin-right: 0.08rem;
      }
    }

    .article-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.16rem;
      &__tags {
        a {
          margin-left: 0.08rem;
          cursor: pointer;
          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
      &__btns {
        display: flex;
        .btns-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: var(--el-color-primary);
          margin-left: 0.16rem;
          .m-icon {
            margin-right: 0.04rem;
            transition: var(--animate-duration);
          }
          &:hover {
            .m-icon {
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }

  .article-pre-next {
    display: flex;
    .article-pre,
    .article-next {
      height: 1.6rem;
      flex: 1;
      cursor: pointer;
      .m-img {
        &::after {
          content: '';
          transition: var(--animate-duration);
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      &:hover {
        .m-img {
          &::after {
            background-color: rgba(0, 0, 0, 0.3);
          }
        }
      }
    }

    .article-pre-next__articleInfo {
      position: absolute;
      z-index: 5;
      color: #ffffff;
      left: 10%;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      div {
        &:first-child {
          margin-bottom: 0.08rem;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }

    .article-next {
      .article-pre-next__articleInfo {
        text-align: right;
      }
    }
  }

  @media (max-width: 768px) {
    .article-pre-next {
      display: block;
      .article-pre-next__articleInfo {
        text-align: left;
      }
    }
  }
}
</style>
