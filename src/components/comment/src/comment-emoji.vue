<template>
  <div class="m-comment-emoji">
    <div class="emoji-btn" @click="showEmojis">
      <MIcon name="iconfont-emoji_line"></MIcon>
    </div>
    <div v-show="props.visible && viewEmojis" class="emoji-container">
      <template v-for="item in emojiType" :key="`emojis_${item.id}`">
        <div
          class="emoji-container__content"
          v-if="item.render"
          v-show="item.id === currEmojiType"
        >
          <div class="emoji-container__content-title">{{ item.title }}</div>
          <ul>
            <li
              v-for="emoji in item.emojis"
              :key="emoji.id"
              :title="emoji.description"
              @click="selectEmoji(emoji.placeholder)"
            >
              <MImg
                v-if="emoji.file"
                :alt="emoji.placeholder"
                :src="joinBaseUrlFile(emoji.file.url)"
                :style="{
                  width: item.width,
                  height: item.height
                }"
              ></MImg>
              <template v-else>
                {{ emoji.placeholder }}
              </template>
            </li>
          </ul>
        </div>
      </template>

      <ul class="emoji-container__type">
        <li
          v-for="item in emojiType"
          :key="item.id"
          :title="item.title"
          :class="{ selected: item.id === currEmojiType }"
          @click="selectEmojiType(item.id)"
        >
          <MImg v-if="item.imgUrl" :src="joinBaseUrlFile(item.imgUrl)"></MImg>
          <template v-else>
            {{ item.typeTitle }}
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { commentEmojiEmits, commentEmojiProps } from './comment-emoji'
import { getEmojiType, EmojiType } from '@/api/blog/emoji'
import { joinBaseUrlFile } from '@/utils'

defineOptions({
  name: 'CommentEmoji'
})

const emit = defineEmits(commentEmojiEmits)
const props = defineProps(commentEmojiProps)

// 显示/隐藏
const viewEmojis = ref(false)
const showEmojis = () => {
  viewEmojis.value = true
}

watch(
  () => props.visible,
  () => {
    viewEmojis.value = false
  }
)

const selectEmoji = (placeholder: string) => {
  emit('select', placeholder)
}

interface CommentEmojiType extends EmojiType {
  render: boolean
  typeTitle: string
  imgUrl?: string
}

const currEmojiType = ref(0)
const emojiType = ref<CommentEmojiType[]>([])
getEmojiType().then((res) => {
  emojiType.value = res.data.map((item) => ({
    ...item,
    render: false,
    typeTitle: item.emojis[0]?.placeholder ?? item.title,
    imgUrl: item.emojis.find((emoji) => emoji.file)?.file?.url
  }))

  if (res.data.length) {
    emojiType.value[0].render = true
    currEmojiType.value = res.data[0].id
  }
})

const selectEmojiType = (id: number) => {
  currEmojiType.value = id
  emojiType.value.find((item) => item.id === id)!.render = true
}
</script>

<style lang="scss" scoped>
.m-comment-emoji {
  position: relative;
  z-index: 99;
  width: 100%;
  max-width: 3.2rem;
  .emoji-btn {
    display: inline-flex;
    cursor: pointer;
    margin-top: 0.03rem;
    padding: 0.04rem 0.05rem;
    border: var(--m-border);
    border-radius: 0.05rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      transition: var(--animate-duration);
      display: inline-block;
    }
  }
  .emoji-container {
    position: absolute;
    margin-top: 0.03rem;
    width: 100%;
    border: var(--m-border);
    background-color: var(--m-card-bg-color);
    border-radius: 0.03rem;
    &__content {
      box-sizing: border-box;
      padding: 0.08rem;
      &-title {
        margin-bottom: 0.08rem;
      }
      ul {
        height: 1.6rem;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        li {
          flex-shrink: 0;
          padding: 0.08rem;
          border-radius: 0.05rem;
          cursor: pointer;
          &:hover {
            background-color: var(--el-border-color);
          }
        }
      }
    }
    &__type {
      display: flex;
      background-color: var(--el-border-color);
      li {
        cursor: pointer;
        padding: 0.06rem 0.1rem;
        .m-img {
          width: 0.22rem;
          height: 0.22rem;
        }
        &.selected {
          background-color: var(--m-card-bg-color);
        }
        &:hover {
          background-color: var(--m-card-bg-color);
        }
      }
    }
  }
}
</style>
