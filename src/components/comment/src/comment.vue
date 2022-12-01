<template>
  <div class="m-comment">
    <div class="m-comment-statistics">
      <span class="statistics-title">评论</span>
      <span class="statistics-total">100</span>
      <span class="statistics-type statistics-type-checked">最新</span>
      <span class="statistics-type">最热</span>
    </div>
    <div class="m-textarea">
      <MCommentTextarea></MCommentTextarea>
    </div>

    <div class="m-comment-list">
      <MCommentItem
        v-for="item in commentList"
        :key="item.id"
        :data="item"
        :comment-child-http="props.commentChildHttp"
        :replyerId="replyerId"
        @reply="replyHandler"
      ></MCommentItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentItem } from './comment-item'
import { ref } from 'vue'
import { commentProps, commentEmits } from './comment'

import MCommentItem from './comment-item.vue'
import MCommentTextarea from './comment-textarea.vue'

defineOptions({
  name: 'MComment'
})

const props = defineProps(commentProps)
const emit = defineEmits(commentEmits)

const commentList = ref<CommentItem[]>([])
props.commentHttp().then((res) => {
  commentList.value = res.data
})

// 点击回复按钮
const replyerId = ref<number>()
const replyHandler = (id: number) => {
  replyerId.value = replyerId.value === id ? undefined : id
}
</script>

<style lang="scss" scoped>
.m-comment {
  margin-top: 3rem;
  .m-comment-statistics {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    span {
      margin-right: 1rem;
    }
    .statistics-title {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .statistics-total {
      margin-right: 2rem;
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
    margin-bottom: 2rem;
  }
}
</style>
