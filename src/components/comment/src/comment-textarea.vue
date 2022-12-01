<template>
  <div class="m-comment-textarea">
    <div class="replyer-avatar">
      <MImg :src="avatar" />
    </div>
    <div class="replyer-container">
      <div class="basic-info">
        <input type="text" placeholder="昵称*" />
        <input type="text" placeholder="邮箱*" />
        <input type="text" placeholder="网址" />
      </div>
      <div :class="{ 'replyer-info': true, textareaFocus: textareaFocus }">
        <div class="replyer-info-content">
          <textarea
            :placeholder="props.placeholder"
            @focus="focusHandler(true)"
            @blur="focusHandler(false)"
          ></textarea>
        </div>
        <button type="button">发布</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { commentTextAreaProps } from './comment-textarea'
import avatar from '@/assets/img/1.jpg'

defineOptions({
  name: 'MCommentTextarea'
})

const props = defineProps(commentTextAreaProps)

const textareaFocus = ref(false)
const focusHandler = (focus: boolean) => {
  textareaFocus.value = focus
}
</script>

<style lang="scss" scoped>
.m-comment-textarea {
  display: flex;
  .replyer-avatar {
    .m-img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }
  .replyer-container {
    margin-left: 1rem;
    flex: 1;
  }
  .basic-info {
    display: flex;
    margin-bottom: 1rem;
    input {
      flex: 1;
      width: 100%;
      margin-left: 1rem;
      border: var(--m-border);
      border-radius: 0.3rem;
      box-sizing: border-box;
      padding: 0.3rem 0.55rem;
      outline: none;
      font-size: 0.8rem;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .replyer-info {
    display: flex;
    justify-content: space-between;
    height: 3rem;
    transition: var(--animate-duration);
    &.textareaFocus {
      height: 5rem;
      .replyer-info-content {
        textarea {
          background-color: var(--m-card-bg-color);
        }
      }
    }
    &-content {
      flex: 1;
      margin-right: 1rem;
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        outline: none;
        box-sizing: border-box;
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
        border-radius: 0.3rem;
        border: var(--m-border);
        background-color: var(--el-border-color);
        transition: var(--animate-duration);
        &::-webkit-input-placeholder {
          color: var(--m-font-color);
        }
        &:hover {
          background-color: var(--m-card-bg-color);
        }
      }
    }
    button {
      cursor: pointer;
      transition: var(--animate-duration);
      background-color: var(--el-color-primary);
      color: #ffffff;
      border: none;
      border-radius: 0.3rem;
      padding-left: 1rem;
      padding-right: 1rem;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
