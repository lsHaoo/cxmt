<template>
  <div class="chat-dialog-overlay" @click.self="closeChat">
    <div class="chat-dialog">
      <!-- Header -->
      <div class="chat-header">
        <div class="header-left">
          <h3 class="chat-title">体验使用 - {{ model?.name }}</h3>
        </div>
        <div class="header-right">
          <button class="history-btn" @click="openHistory">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.5C12.866 16.5 16 12.866 16 8.5C16 4.13401 12.866 0.5 9 0.5C5.13401 0.5 2 4.13401 2 8.5" stroke="#666" stroke-width="1.5"/>
              <path d="M2 8.5H6M2 8.5L4 6.5" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            历史对话
          </button>
          <button class="close-btn" @click="closeChat">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="chat-body">
        <!-- 欢迎提示 -->
        <div v-if="!chatStore.currentConversation?.messages.length" class="welcome-section">
          <div class="welcome-text">
            <h4>欢迎体验 {{ model?.name }}</h4>
            <p>您可以尝试以下问题，或直接输入您想问的内容</p>
          </div>
          <div class="examples">
            <div
              v-for="(example, index) in examples"
              :key="index"
              class="example-item"
              @click="useExample(example)"
            >
              {{ example }}
            </div>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-else class="messages-container">
          <div
            v-for="(message, index) in chatStore.currentConversation?.messages"
            :key="index"
            class="message"
            :class="message.role"
          >
            <div class="message-avatar">
              <img v-if="message.role === 'assistant'" :src="model?.avatar" :alt="model?.name" />
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#1890FF"/>
                <path d="M12 8V16M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="message-content">
              <div class="message-text">{{ message.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="chat-footer">
        <button class="new-chat-btn" @click="startNewChat">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M3 8H13" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          新对话
        </button>
        <div class="input-wrapper">
          <textarea
            v-model="inputMessage"
            class="chat-input"
            placeholder="输入您的问题..."
            rows="1"
            @keydown.enter.prevent="sendMessage"
            ref="inputRef"
          ></textarea>
          <button class="send-btn" @click="sendMessage" :disabled="!inputMessage.trim()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 10L17 10M10 3L17 10L10 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 历史记录弹窗 -->
      <HistoryPanel v-if="chatStore.showHistory" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '../stores/chat'
import HistoryPanel from './HistoryPanel.vue'

const props = defineProps({
  model: {
    type: Object,
    default: null
  }
})

const chatStore = useChatStore()
const inputMessage = ref('')
const inputRef = ref(null)

const examples = [
  '这个模型的主要特点是什么？',
  '如何在Python中使用这个模型？',
  '这个模型与其他模型有什么区别？'
]

const closeChat = () => {
  chatStore.showChat = false
}

const openHistory = () => {
  chatStore.showHistory = true
}

const useExample = (example) => {
  inputMessage.value = example
  sendMessage()
}

const startNewChat = () => {
  chatStore.createNewConversation()
  inputMessage.value = ''
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const sendMessage = () => {
  const message = inputMessage.value.trim()
  if (!message) return

  // 添加用户消息
  chatStore.addMessage('user', message)
  inputMessage.value = ''

  // 模拟AI回复
  setTimeout(() => {
    const responses = [
      `感谢您体验${props.model?.name}！这是一个非常优秀的人工智能模型。`,
      `关于您的问题，${props.model?.name}具有以下特点：强大的理解能力、多模态支持、长上下文处理能力等。`,
      `${props.model?.name}在多个方面都表现出色，特别是在文本理解、推理和生成方面。`
    ]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    chatStore.addMessage('assistant', randomResponse)
  }, 1000)
}

// 自动滚动到底部
watch(() => chatStore.currentConversation?.messages?.length, () => {
  nextTick(() => {
    const container = document.querySelector('.chat-body')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
})
</script>

<style scoped>
.chat-dialog-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.chat-dialog {
  width: 30%;
  min-width: 400px;
  max-width: 600px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}

/* Header */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.header-left h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.header-right {
  display: flex;
  gap: 12px;
}

.history-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.history-btn:hover {
  background: #e6f7ff;
  color: #1890FF;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #ff4d4f;
}

.close-btn:hover svg {
  stroke: white;
}

/* Body */
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  justify-content: center;
}

.welcome-text h4 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.welcome-text p {
  font-size: 14px;
  color: #666;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-item {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.example-item:hover {
  background: #e6f7ff;
  border-color: #1890FF;
  color: #1890FF;
}

/* 消息列表 */
.messages-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message {
  display: flex;
  gap: 12px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  flex-shrink: 0;
  overflow: hidden;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  max-width: 80%;
}

.message.assistant .message-content {
  background: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px 8px 8px 0;
}

.message.user .message-content {
  background: #1890FF;
  padding: 12px 16px;
  border-radius: 8px 8px 0 8px;
}

.message-text {
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.message.assistant .message-text {
  color: #333;
}

.message.user .message-text {
  color: white;
}

/* Footer */
.chat-footer {
  padding: 20px;
  border-top: 1px solid #e8e8e8;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
}

.new-chat-btn:hover {
  background: #e6f7ff;
  color: #1890FF;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-family: inherit;
}

.chat-input:focus {
  outline: none;
  border-color: #1890FF;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.chat-input::placeholder {
  color: #999;
}

.send-btn {
  width: 44px;
  height: 44px;
  background: #1890FF;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #40a9ff;
}

.send-btn:disabled {
  background: #d9d9d9;
  cursor: not-allowed;
}

/* 响应式 */
@media (max-width: 768px) {
  .chat-dialog {
    width: 100%;
    min-width: auto;
    max-width: none;
  }
}
</style>
