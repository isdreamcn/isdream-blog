<template>
  <div :class="['m-comment-textarea', appMedia]">
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
            placeholder="邮箱*"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { commentTextAreaProps, commentTextAreaEmits } from './comment-textarea'
import { useAppSetting } from '@/store'
import { useUser } from './hooks/useUser'
import { comment } from '@/api/blog/comment'

defineOptions({
  name: 'MCommentTextarea'
})

const props = defineProps(commentTextAreaProps)
const emit = defineEmits(commentTextAreaEmits)

const textareaFocus = ref(false)
const focusHandler = (focus: boolean) => {
  textareaFocus.value = focus
}

const { appMedia } = useAppSetting()
const { userInfo, getUserInfoByEmail, login } = useUser()

// 回复
const content = ref('')
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
    margin-bottom: 0.5rem;
    div {
      display: flex;
      input {
        margin-left: 1rem;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    input {
      flex: 1;
      width: 100%;
      border: var(--m-border);
      border-radius: 0.3rem;
      box-sizing: border-box;
      padding: 0.3rem 0.55rem;
      outline: none;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
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
  &.phone {
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
