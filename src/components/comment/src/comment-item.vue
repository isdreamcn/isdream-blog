<template>
  <div class="m-comment-item reply-item">
    <div class="reply-avatar root-reply-avatar">
      <MImgAvatar
        :src="
          (userId === data.user.id && data.user.tempAvatar) || data.user.avatar
        "
        :username="data.user.username"
      ></MImgAvatar>
    </div>
    <div class="reply-container root-reply-container">
      <div class="user-info">
        <div class="user-info-name">{{ data.user.username }}</div>
        <!-- <div class="user-info-level">
          <MIcon name="iconfont-ic_userlevel_5"></MIcon>
        </div> -->
      </div>
      <div
        class="user-content"
        v-html="emojiHandler(data.content, data.emojis)"
      ></div>
      <div class="user-footer">
        <time v-dateFormat>{{ data.createdAt }}</time>
        <span :class="{ 'is-checked': data.liked }"
          ><MIcon name="iconfont-like" @click="like(data)"></MIcon>
          <span>{{ data.likedCount || '' }}</span>
        </span>
        <span :class="{ 'is-checked': data.disliked }"
          ><MIcon name="iconfont-dislike" @click="disLike(data)"> </MIcon
        ></span>
        <span class="user-footer-btn" @click="replyHandler(data.user)"
          >回复</span
        >
      </div>

      <!-- child -->
      <div class="reply-child">
        <div
          v-for="item in data.replys.data"
          :key="item.id"
          class="m-comment-item"
        >
          <div class="reply-avatar">
            <MImgAvatar
              :src="item.user.avatar"
              :username="item.user.username"
            ></MImgAvatar>
          </div>
          <div class="reply-container">
            <div class="user-container">
              <div class="user-info">
                <div class="user-info-name">{{ item.user.username }}</div>
                <!-- <div class="user-info-level">
                  <MIcon name="iconfont-ic_userlevel_5"></MIcon>
                </div> -->
              </div>
              <span class="user-content">
                <span v-if="item.replyUser" class="reply-user">
                  回复
                  <span>@{{ item.replyUser.username }}</span
                  >:
                </span>
                <span v-html="emojiHandler(item.content, item.emojis)"></span
              ></span>
            </div>
            <div class="user-footer">
              <time v-dateFormat>{{ item.createdAt }}</time>
              <span :class="{ 'is-checked': item.liked }"
                ><MIcon name="iconfont-like" @click="like(item)"></MIcon>
                <span>{{ item.likedCount || '' }}</span>
              </span>
              <span :class="{ 'is-checked': item.disliked }"
                ><MIcon name="iconfont-dislike" @click="disLike(item)"></MIcon
              ></span>
              <span class="user-footer-btn" @click="replyHandler(item.user)"
                >回复</span
              >
            </div>
          </div>
        </div>
        <div v-if="data.replys.count > 2 && !showMoreReply" class="reply-count">
          共{{ data.replys.count }}条回复,
          <span @click="showMore">点击查看</span>
        </div>
        <div v-if="data.replys.count > 2 && showMoreReply" class="pagination">
          <span class="pagination-total">共{{ totalPage }}页</span>
          <span
            class="pagination-btn"
            v-show="params.page > 1"
            @click="setParamsPage(params.page - 1)"
            >上一页</span
          >
          <span
            v-for="page in totalPage"
            :key="page"
            :class="{
              'pagination-page': true,
              'pagination-page-selected': params.page === page
            }"
            @click="setParamsPage(page)"
            >{{ page }}</span
          >
          <span
            class="pagination-btn"
            v-show="params.page < totalPage"
            @click="setParamsPage(params.page + 1)"
            >下一页</span
          >
        </div>
        <MCommentTextarea
          v-if="showCommentTextarea"
          :article="props.article"
          :reply-comment="data.id"
          :reply-user="replyUser?.id"
          :placeholder="`回复 @${replyUser?.username}: `"
        ></MCommentTextarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  commentItemProps,
  commentItemEmits,
  emojiHandler
} from './comment-item'
import { cloneDeep } from '@/utils'
import MCommentTextarea from './comment-textarea.vue'
import { useUserStore } from '@/store'
import {
  User,
  ReplyComment,
  getReplyCommentList,
  likeComment,
  dislikeComment
} from '@/api/blog/comment'

defineOptions({
  name: 'MCommentItem'
})

const props = defineProps(commentItemProps)
const emit = defineEmits(commentItemEmits)

const data = reactive(cloneDeep(props.data))
const params = reactive({
  page: 1,
  pageSize: 10
})
const totalPage = computed(() => Math.ceil(data.replys.count / params.pageSize))

// 获取更多回复
const _getReplyCommentList = () => {
  return getReplyCommentList({
    ...params,
    parentComment: data.id,
    sort: props.sort
  }).then((res) => {
    data.replys.data = res.data
  })
}

// 搜索
const setParamsPage = (page: number) => {
  params.page = page
  _getReplyCommentList()
}

// 点击查看更多回复
const showMoreReply = ref(false)
const showMore = () => {
  _getReplyCommentList().then(() => {
    showMoreReply.value = true
  })
}

// footer 赞、踩
const userStore = useUserStore()
const like = (comment: ReplyComment) => {
  if (!userStore.token) {
    ElMessage.warning('请先发一条友善的评论')
    return
  }
  likeComment(comment.id).then(() => {
    comment.liked = !comment.liked
    comment.likedCount += comment.liked ? 1 : -1
  })
}

const disLike = (comment: ReplyComment) => {
  if (!userStore.token) {
    ElMessage.warning('请先发一条友善的评论')
    return
  }
  dislikeComment(comment.id).then(() => {
    comment.disliked = !comment.disliked
  })
}

// 回复
const showCommentTextarea = computed(() => {
  return data.id === props.replyerId
})
const replyUser = ref<User>()
const replyHandler = (item: User) => {
  replyUser.value = item
  emit('reply', data.id)
}
</script>

<style lang="scss" scoped>
.m-comment-item {
  display: flex;
  padding-top: 0.16rem;
  .m-comment-textarea {
    margin-top: 0.16rem;
  }
  .reply-avatar {
    flex-shrink: 0;
    margin-right: 0.16rem;
    .m-img-avatar {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .reply-container {
    flex: 1;
    padding-bottom: 0.16rem;
    border-bottom: var(--m-border);
    .user-info {
      display: inline-flex;
      align-items: center;
      &-name {
        cursor: pointer;
        color: var(--el-color-primary);
      }
      &-level {
        margin: 0 0.08rem;
        .m-icon {
          font-size: 0.24rem;
        }
      }
    }
    .user-content {
      margin: 0.1rem 0 0.08rem 0;
      line-height: 0.24rem;
    }
    .user-footer {
      color: var(--m-font-color);
      font-size: 0.13rem;
      &-btn,
      .m-icon {
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
        }
      }
      span {
        margin-left: 0.24rem;
        span {
          margin-left: 0.05rem;
        }
        &.is-checked {
          .m-icon {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }

  // 下级评论
  .reply-child {
    .m-comment-item {
      &:last-child {
        .reply-container {
          padding-bottom: 0;
        }
      }
    }
    .reply-avatar {
      margin-right: 0.08rem;
      .m-img-avatar {
        width: 0.32rem;
        height: 0.32rem;
      }
    }
    .reply-container {
      border-bottom: none;
      padding-bottom: 0;
      .user-container {
        margin-bottom: 0.08rem;
        .user-content {
          margin-left: 0.08rem;
          .reply-user {
            span {
              color: var(--el-color-primary);
            }
          }
        }
      }
    }
    // 点击查看
    .reply-count {
      font-size: 0.13rem;
      color: var(--m-font-color);
      margin-top: 0.16rem;
      span {
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
    // 分页
    .pagination {
      font-size: 0.13rem;
      margin-top: 0.16rem;
      &-total {
        margin-right: 0.1rem;
      }
      &-btn,
      &-page {
        cursor: pointer;
        margin-left: 0.08rem;
        &:hover {
          color: var(--el-color-primary);
        }
      }
      &-page-selected {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
