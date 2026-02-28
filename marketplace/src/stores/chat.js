import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const conversations = ref([
    {
      id: 1,
      title: '关于GPT-4的使用',
      messages: [
        { role: 'user', content: 'GPT-4的主要特点是什么？' },
        { role: 'assistant', content: 'GPT-4是OpenAI在2023年3月发布的最新大型语言模型，主要特点包括：\n\n1. 更强的理解能力\n2. 多模态支持（文本和图像）\n3. 更长的上下文（32K/128K）\n4. 更准确的输出\n5. 安全性提升' }
      ]
    }
  ])

  const currentConversationId = ref(null)
  const showChat = ref(false)
  const showHistory = ref(false)

  const currentConversation = computed(() => {
    return conversations.value.find(c => c.id === currentConversationId.value)
  })

  const createNewConversation = () => {
    const newId = Math.max(...conversations.value.map(c => c.id), 0) + 1
    const newConversation = {
      id: newId,
      title: '新对话',
      messages: []
    }
    conversations.value.unshift(newConversation)
    currentConversationId.value = newId
    return newConversation
  }

  const switchConversation = (id) => {
    currentConversationId.value = id
  }

  const addMessage = (role, content) => {
    if (!currentConversationId.value) {
      createNewConversation()
    }
    const conversation = currentConversation.value
    if (conversation) {
      conversation.messages.push({ role, content })
      // 更新标题
      if (conversation.messages.length === 1 && role === 'user') {
        conversation.title = content.slice(0, 20) + (content.length > 20 ? '...' : '')
      }
    }
  }

  const deleteConversation = (id) => {
    const index = conversations.value.findIndex(c => c.id === id)
    if (index > -1) {
      conversations.value.splice(index, 1)
      if (currentConversationId.value === id) {
        currentConversationId.value = conversations.value.length > 0 ? conversations.value[0].id : null
      }
    }
  }

  return {
    conversations,
    currentConversationId,
    currentConversation,
    showChat,
    showHistory,
    createNewConversation,
    switchConversation,
    addMessage,
    deleteConversation
  }
})
