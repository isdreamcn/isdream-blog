<template>
  <div class="m-comment">
    <div class="m-comment-statistics">
      <span class="statistics-title">评论</span>
      <span class="statistics-total">{{ commentCount }}</span>
      <span
        :class="[
          'statistics-type',
          { 'statistics-type-checked': params.sort === 1 }
        ]"
        @click="setParamsSort(1)"
        >最热</span
      >
      <span
        :class="[
          'statistics-type',
          { 'statistics-type-checked': params.sort === 2 }
        ]"
        @click="setParamsSort(2)"
        >最新</span
      >
    </div>
    <div class="m-textarea">
      <MCommentTextarea :article="props.article"></MCommentTextarea>
    </div>

    <div class="m-comment-list" ref="domRef">
      <MCommentItem
        v-for="item in commentList"
        :key="item.id"
        :data="item"
        :replyerId="replyerId"
        :userId="userId"
        :article="props.article"
        :sort="params.sort"
        @reply="replyHandler"
      ></MCommentItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeUnmount } from 'vue'
import { commentProps } from './comment'
import MCommentItem from './comment-item.vue'
import MCommentTextarea from './comment-textarea.vue'
import { useAppLayoutEl } from '@/store'
import { getCommentList, Comment } from '@/api/blog/comment'
import { useUser } from './hooks/useUser'

defineOptions({
  name: 'MComment'
})

const { userId } = useUser()

// 点击回复按钮
const replyerId = ref<number>()
const replyHandler = (id: number) => {
  replyerId.value = replyerId.value === id ? undefined : id
}

const props = defineProps(commentProps)

// 一级评论
const commentList = ref<Comment[]>([])
const commentCount = ref(0)

const params = reactive({
  page: 1,
  pageSize: 2,
  sort: 1
})

let getCommentLoading = false
const _getCommentList = () => {
  if (getCommentLoading) {
    return
  }
  getCommentLoading = true
  return getCommentList({
    ...params,
    article: props.article
  })
    .then((res) => {
      commentCount.value = res.count
      commentList.value = commentList.value.concat(res.data)
      return res
    })
    .finally(() => {
      getCommentLoading = false
    })
}

_getCommentList()

const setParamsSort = (sort: 1 | 2) => {
  if (params.sort === sort) {
    return
  }
  params.sort = sort
  params.page = 1
  commentList.value = []
  _getCommentList()?.then(() => {
    params.page++
  })
}

// 滚动加载
params.page++
const appLayoutEl = useAppLayoutEl()
const scrollFn = () => {
  if (!appLayoutEl.value) {
    return
  }
  const el = appLayoutEl.value
  // 滚动条触底
  if (el.scrollHeight - el.clientHeight - el.scrollTop <= 1) {
    _getCommentList()?.then((res) => {
      params.page++
      if (!res.data.length) {
        appLayoutEl.value?.removeEventListener('scroll', scrollFn)
      }
    })
  }
}

watch(
  () => [appLayoutEl.value, params.sort],
  () => {
    appLayoutEl.value?.addEventListener('scroll', scrollFn, {
      passive: true
    })
  },
  {
    immediate: true
  }
)

// 移除滚动加载
onBeforeUnmount(() =>
  appLayoutEl.value?.removeEventListener('scroll', scrollFn)
)
</script>

<style lang="scss" scoped>
.m-comment {
  margin-top: 0.5rem;
  .m-comment-statistics {
    margin-bottom: 0.32rem;
    display: flex;
    align-items: center;
    span {
      margin-right: 0.16rem;
    }
    .statistics-title {
      font-size: 0.24rem;
      font-weight: bold;
    }
    .statistics-total {
      margin-right: 0.32rem;
      color: var(--m-font-color);
    }
    .statistics-type {
      cursor: pointer;
      color: var(--m-font-color);
      &:hover {
        color: unset;
      }
      &-checked {
        color: unset;
      }
    }
  }
  .m-comment-list {
  }

  .m-textarea {
    margin-bottom: 0.32rem;
  }
}
</style>
