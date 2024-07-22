<template>
  <div class="m-comment-textarea">
    <div class="replyer-avatar">
      <MImgAvatar
        :src="userInfo.avatar"
        :username="userInfo.username"
      ></MImgAvatar>
    </div>
    <div class="replyer-container">
      <div class="basic-info">
        <div>
          <input type="text" placeholder="昵称*" v-model="userInfo.username" />
          <input
            type="text"
            placeholder="邮箱(输入后可快速填写)*"
            v-model="userInfo.email"
            @input="getUserInfoByEmail"
          />
          <input type="text" placeholder="网址" v-model="userInfo.website" />
        </div>
        <input
          type="text"
          placeholder="头像 https://"
          v-model="userInfo.avatar"
        />
      </div>

      <div :class="{ 'replyer-info': true, textareaFocus: textareaFocus }">
        <div class="replyer-info-content">
          <textarea
            ref="textareaRef"
            :placeholder="props.placeholder"
            v-model="content"
            @focus="focusHandler(true)"
            @blur="focusHandler(false)"
          ></textarea>
        </div>
        <button type="button" :disabled="replyLoading" @click="reply">
          发布
        </button>
      </div>
      <CommentEmoji
        v-show="textareaFocus"
        :visible="textareaFocus"
        @mousedown="focusHandler(true, false)"
        @mouseup="focusHandler(true, true)"
        @select="addEmoji"
      ></CommentEmoji>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { commentTextAreaProps, commentTextAreaEmits } from './comment-textarea'
import { useUser } from './hooks/useUser'
import { comment } from '@/api/blog/comment'
import CommentEmoji from './comment-emoji.vue'

defineOptions({
  name: 'MCommentTextarea'
})

const props = defineProps(commentTextAreaProps)
const emit = defineEmits(commentTextAreaEmits)

const textareaFocus = ref(false)
const textareaRef = ref<HTMLTextAreaElement>()
// textarea保持聚焦
let canBlur = true
const focusHandler = (focus: boolean, _canBlur?: boolean) => {
  if (_canBlur !== undefined) {
    canBlur = _canBlur
  }
  textareaFocus.value = focus
  if (!canBlur || focus) {
    textareaRef.value?.focus()
  }
}

const { userInfo, getUserInfoByEmail, login } = useUser()

// 回复
const content = ref('')
// 选择表情
const addEmoji = (placeholder: string) => {
  const start = textareaRef.value?.selectionStart || 0
  content.value =
    content.value.substring(0, start) +
    placeholder +
    content.value.substring(start)

  nextTick(() => {
    if (textareaRef.value) {
      const index = start + placeholder.length
      textareaRef.value.selectionStart = index
      textareaRef.value.selectionEnd = index
    }
  })
}

const replyLoading = ref(false)
const reply = () => {
  replyLoading.value = true
  login()
    .then(() => {
      if (!content.value) {
        return ElMessage.warning('请填写评论内容')
      }
      comment({
        article: props.article,
        content: content.value,
        parentComment: props.replyComment,
        replyUser: props.replyUser
      }).then(() => {
        content.value = ''
        emit('reply')
        ElMessage.success('评论发布成功< (￣︶￣)>')
      })
    })
    .catch((message?: string) => {
      if (message) {
        ElMessage.warning(message)
      }
    })
    .finally(() => {
      replyLoading.value = false
    })
}
</script>

<style lang="scss" scoped>
.m-comment-textarea {
  display: flex;
  .replyer-avatar {
    .m-img-avatar {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .replyer-container {
    margin-left: 0.16rem;
    flex: 1;
  }
  .basic-info {
    margin-bottom: 0.08rem;
    div {
      display: flex;
      input {
        margin-left: 0.16rem;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    input {
      flex: 1;
      width: 100%;
      border: var(--m-border);
      border-radius: 0.05rem;
      box-sizing: border-box;
      padding: 0.05rem 0.09rem;
      outline: none;
      font-size: 0.13rem;
      margin-bottom: 0.08rem;
    }
  }
  .replyer-info {
    display: flex;
    justify-content: space-between;
    height: 0.5rem;
    transition: var(--animate-duration);
    &.textareaFocus {
      height: 0.8rem;
      .replyer-info-content {
        textarea {
          background-color: var(--m-card-bg-color);
        }
      }
    }
    &-content {
      flex: 1;
      margin-right: 0.16rem;
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        outline: none;
        box-sizing: border-box;
        padding: 0.08rem 0.13rem;
        font-size: 0.13rem;
        border-radius: 0.05rem;
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
      border-radius: 0.05rem;
      padding-left: 0.16rem;
      padding-right: 0.16rem;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    .basic-info {
      div {
        display: block;
        input {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
