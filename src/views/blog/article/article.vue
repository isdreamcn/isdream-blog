<template>
  <div v-if="articleInfo" :class="`article ${appMedia}`">
    <div class="blogLayout-header article__header">
      <MImgDefault>
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
      <!-- 内容 -->
      <article class="article__content">
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
            <template v-if="appMedia === 'pc'"
              >知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</template
            >
            <template v-else>
              <abbr
                title="知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议"
                >CC BY-NC-SA 4.0</abbr
              >
            </template>
          </a>
        </div>
        <div class="article-actions">
          <div class="article-actions__tags m-flex hc">
            <MIcon name="icon-PriceTag"></MIcon>
            <a v-for="tag in articleInfo.tags" :key="tag.id">{{ tag.title }}</a>
            <a>TEST</a>
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
        <div v-if="preArticleInfo" class="article-pre">
          <MImgDefault
            :src="preArticleInfo.cover?.url"
            :thumb="preArticleInfo.cover?.thumbUrl"
          >
            <div class="article-pre-next__articleInfo">
              <div>上一篇</div>
              <div class="m-ellipsis">{{ preArticleInfo.title }}</div>
            </div>
          </MImgDefault>
        </div>
        <div v-if="nextArticleInfo" class="article-next">
          <MImgDefault
            :src="nextArticleInfo.cover?.url"
            :thumb="nextArticleInfo.cover?.thumbUrl"
          >
            <div class="article-pre-next__articleInfo">
              <div>下一篇</div>
              <div class="m-ellipsis">{{ nextArticleInfo.title }}</div>
            </div>
          </MImgDefault>
        </div>
      </div>
      <MComment :article="articleInfo.id"></MComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppSetting } from '@/store'
import blogger from '@/assets/img/blogger.png'
import { useArticle } from './hooks/useArticle'

defineOptions({
  name: 'Article'
})

const { appMedia } = useAppSetting()

const route = useRoute()
const id = Number(route.params.id)

const { articleInfo, preArticleInfo, nextArticleInfo, commend } = useArticle(id)
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
    :deep(img) {
      max-width: 100% !important;
    }
  }

  .article-footer {
    margin: 3.5rem 0;
    padding: 1rem 0;
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
        margin-right: 0.5rem;
      }
    }

    .article-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      &__tags {
        a {
          margin-left: 0.5rem;
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
          margin-left: 1rem;
          .m-icon {
            margin-right: 0.25rem;
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
      height: 10rem;
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
          margin-bottom: 0.5rem;
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

  &.phone {
    .article-pre-next {
      display: block;
      .article-pre-next__articleInfo {
        text-align: left;
      }
    }
  }
}
</style>
