<template>
  <div :class="`article ${appMedia}`">
    <div class="blogLayout-header article__header">
      <MImgDefault>
        <div class="blogLayout-card">
          <h1 class="article-title">这是一个测试标题</h1>
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
      <!-- 内容 -->
      <article class="article__content">123</article>
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
            <a>TEST</a>
            <a>TEST</a>
          </div>
          <div class="article-actions__btns">
            <div class="btns-item"><MIcon name="icon-star"></MIcon>66</div>
          </div>
        </div>
      </div>
      <!-- 上一篇/下一篇 -->
      <div class="article-pre-next">
        <div class="article-pre">
          <MImg :src="img1">
            <div class="article-pre-next__info">
              <div>上一篇</div>
              <div class="m-ellipsis">test标题</div>
            </div>
          </MImg>
        </div>
        <div class="article-next">
          <MImg :src="img2">
            <div class="article-pre-next__info">
              <div>下一篇</div>
              <div class="m-ellipsis">test标题</div>
            </div>
          </MImg>
        </div>
      </div>
      <MComment></MComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppSetting } from '@/store'
import blogger from '@/assets/img/blogger.png'
import img1 from '@/assets/img/1.jpg'
import img2 from '@/assets/img/2.jpg'

defineOptions({
  name: 'Article'
})

const { appMedia } = useAppSetting()
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

    .article-pre-next__info {
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
      .article-pre-next__info {
        text-align: right;
      }
    }
  }

  &.phone {
    .article-pre-next {
      display: block;
      .article-pre-next__info {
        text-align: left;
      }
    }
  }
}
</style>
