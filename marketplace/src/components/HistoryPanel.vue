<template>
  <div class="history-panel">
    <div class="history-header">
      <h3>历史对话</h3>
      <button class="close-btn" @click="closeHistory">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 4L4 14M4 4L14 14" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="history-list">
      <div
        v-for="conversation in chatStore.conversations"
        :key="conversation.id"
        class="history-item"
        :class="{ active: chatStore.currentConversationId === conversation.id }"
        @click="selectConversation(conversation.id)"
      >
        <div class="history-title">{{ conversation.title }}</div>
        <div class="history-meta">
          <span class="message-count">{{ conversation.messages.length }} 条消息</span>
          <button
            class="delete-btn"
            @click.stop="deleteConversation(conversation.id)"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.66667 12.3333H9.33333C9.68696 12.3333 10.0261 12.1928 10.2761 11.9428C10.5262 11.6927 10.6667 11.3536 10.6667 11V4.33333H3.33333V11C3.33333 11.3536 3.47381 11.6927 3.72386 11.9428C3.97391 12.1928 4.31304 12.3333 4.66667 12.3333Z" stroke="#999" stroke-width="1.2"/>
              <path d="M6 6.66667V10M8 6.66667V10M2.66667 4.33333H3.33333H10.6667H11.3333V2.66667H2.66667V4.33333Z" stroke="#999" stroke-width="1.2"/>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="chatStore.conversations.length === 0" class="empty-history">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#ddd" stroke-width="3"/>
          <path d="M16 24H32" stroke="#ddd" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <p>暂无历史对话</p>
      </div>
    </div>

    <div class="history-footer">
      <button class="new-conversation-btn" @click="createNew">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3V13M3 8H13" stroke="#1890FF" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        新建对话
      </button>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '../stores/chat'

const chatStore = useChatStore()

const closeHistory = () => {
  chatStore.showHistory = false
}

const selectConversation = (id) => {
  chatStore.switchConversation(id)
  closeHistory()
}

const deleteConversation = (id) => {
  if (confirm('确定要删除这个对话吗？')) {
    chatStore.deleteConversation(id)
  }
}

const createNew = () => {
  chatStore.createNewConversation()
  closeHistory()
}
</script>

<style scoped>
.history-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: white;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.history-header h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.close-btn {
  width: 28px;
  height: 28px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #ff4d4f;
}

.close-btn:hover svg {
  stroke: white;
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.history-item {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.history-item:hover {
  background: #f5f5f5;
}

.history-item.active {
  background: #e6f7ff;
}

.history-item.active .history-title {
  color: #1890FF;
}

.history-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-count {
  font-size: 12px;
  color: #999;
}

.delete-btn {
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.history-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover svg {
  stroke: #ff4d4f;
}

.empty-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #999;
}

.empty-history p {
  margin-top: 12px;
  font-size: 14px;
}

.history-footer {
  padding: 16px;
  border-top: 1px solid #e8e8e8;
}

.new-conversation-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: #1890FF;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.new-conversation-btn:hover {
  background: #40a9ff;
}
</style>
