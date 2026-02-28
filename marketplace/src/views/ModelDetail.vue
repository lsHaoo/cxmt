<template>
  <div class="model-detail-container">
    <!-- 顶部操作栏 -->
    <div class="top-actions">
      <button class="back-btn" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13L5 8L10 3" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回
      </button>
      <button class="trial-btn" @click="openChat">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" stroke-width="1.5"/>
          <path d="M9 12V6M9 6L7 8M9 6L11 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        体验试用
      </button>
    </div>

    <div class="detail-content">
      <!-- 头部信息 -->
      <div class="detail-header">
        <img :src="model?.avatar" :alt="model?.name" class="model-avatar" />
        <div class="header-info">
          <h1 class="model-name">{{ model?.name }}</h1>
          <div class="tags">
            <span
              v-for="tag in model?.tags"
              :key="tag"
              class="tag"
            >{{ tag }}</span>
          </div>
        </div>
      </div>

      <!-- 模型简介（可收缩） -->
      <div class="summary-section">
        <div class="section-header" @click="toggleSummary">
          <h3>模型简介</h3>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-icon"
            :class="{ expanded: summaryExpanded }"
          >
            <path d="M6 8L10 12L14 8" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div v-show="summaryExpanded" class="summary-content">
          <p>{{ model?.summary }}</p>
        </div>
      </div>

      <!-- 模型参数 -->
      <div class="params-section">
        <h3>模型参数</h3>
        <div class="params-grid">
          <div class="param-item">
            <span class="param-label">参数大小</span>
            <span class="param-value">{{ model?.params }}</span>
          </div>
          <div class="param-item">
            <span class="param-label">发布日期</span>
            <span class="param-value">{{ model?.releaseDate }}</span>
          </div>
          <div class="param-item">
            <span class="param-label">模型分类</span>
            <span class="param-value">{{ model?.type }}</span>
          </div>
          <div class="param-item">
            <span class="param-label">输入类型</span>
            <span class="param-value">{{ model?.inputType }}</span>
          </div>
          <div class="param-item">
            <span class="param-label">是否支持推理</span>
            <span class="param-value">{{ model?.supportInference }}</span>
          </div>
          <div class="param-item">
            <span class="param-label">上下文长度</span>
            <span class="param-value">{{ model?.contextLength }}</span>
          </div>
        </div>
      </div>

      <!-- Tab选项 -->
      <div class="tabs-section">
        <div class="tabs">
          <div
            class="tab-item"
            :class="{ active: activeTab === 'detail' }"
            @click="activeTab = 'detail'"
          >
            模型详情
          </div>
          <div
            class="tab-item"
            :class="{ active: activeTab === 'api' }"
            @click="activeTab = 'api'"
          >
            API Key申请
          </div>
        </div>

        <!-- 模型详情内容 -->
        <div v-if="activeTab === 'detail'" class="tab-content">
          <h4 class="content-title">介绍</h4>
          <div class="detail-text">
            <p v-for="(paragraph, index) in detailParagraphs" :key="index">{{ paragraph }}</p>
          </div>
        </div>

        <!-- API Key申请表单 -->
        <div v-if="activeTab === 'api'" class="tab-content api-form">
          <div class="form-item">
            <label class="form-label">申请理由 <span class="required">*</span></label>
            <textarea
              v-model="form.reason"
              class="form-textarea"
              placeholder="请说明您的使用场景和需求..."
              rows="4"
            ></textarea>
          </div>

          <div class="form-item">
            <label class="form-label">企业名称</label>
            <input
              v-model="form.company"
              type="text"
              class="form-input"
              placeholder="请输入企业名称（个人用户可不填）"
            />
          </div>

          <div class="form-item">
            <label class="form-label">联系方式 <span class="required">*</span></label>
            <input
              v-model="form.contact"
              type="text"
              class="form-input"
              placeholder="请输入邮箱或手机号"
            />
          </div>

          <div class="form-item">
            <label class="form-label">预期调用量</label>
            <select v-model="form.usage" class="form-select">
              <option value="">请选择预期调用量</option>
              <option value="small">小规模（< 1万次/月）</option>
              <option value="medium">中等规模（1-10万次/月）</option>
              <option value="large">大规模（> 10万次/月）</option>
            </select>
          </div>

          <div class="form-item">
            <label class="form-label">使用场景</label>
            <div class="checkbox-group">
              <label v-for="scene in usageScenes" :key="scene.value" class="checkbox-item">
                <input
                  v-model="form.scenes"
                  type="checkbox"
                  :value="scene.value"
                />
                <span>{{ scene.label }}</span>
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button class="submit-btn" @click="submitForm">提交申请</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 对话弹窗 -->
    <ChatDialog v-if="chatStore.showChat" :model="model" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useModelStore } from '../stores/models'
import { useChatStore } from '../stores/chat'
import ChatDialog from '../components/ChatDialog.vue'

const route = useRoute()
const router = useRouter()
const modelStore = useModelStore()
const chatStore = useChatStore()

const activeTab = ref('detail')
const summaryExpanded = ref(true)

const form = ref({
  reason: '',
  company: '',
  contact: '',
  usage: '',
  scenes: []
})

const usageScenes = [
  { label: '内容创作', value: 'content' },
  { label: '代码辅助', value: 'code' },
  { label: '数据分析', value: 'analysis' },
  { label: '智能客服', value: 'service' },
  { label: '教育辅导', value: 'education' },
  { label: '其他', value: 'other' }
]

const model = computed(() => {
  return modelStore.getModelById(route.params.id)
})

const detailParagraphs = computed(() => {
  return model.value?.detail?.split('\n\n') || []
})

const toggleSummary = () => {
  summaryExpanded.value = !summaryExpanded.value
}

const goBack = () => {
  router.push('/')
}

const openChat = () => {
  chatStore.showChat = true
  if (!chatStore.currentConversationId) {
    chatStore.createNewConversation()
  }
}

const submitForm = () => {
  // 这里可以添加提交逻辑
  alert('申请已提交！我们会尽快审核您的申请。')
  // 重置表单
  form.value = {
    reason: '',
    company: '',
    contact: '',
    usage: '',
    scenes: []
  }
}

onMounted(() => {
  if (!model.value) {
    router.push('/')
  }
})
</script>

<style scoped>
.model-detail-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 40px;
}

/* 顶部操作栏 */
.top-actions {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 12px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  border-color: #1890FF;
  color: #1890FF;
}

.trial-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: #1890FF;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.trial-btn:hover {
  background: #40a9ff;
}

/* 内容区域 */
.detail-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  padding-top: 80px;
}

/* 头部信息 */
.detail-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}

.model-avatar {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-info {
  flex: 1;
  padding-top: 10px;
}

.model-name {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 16px;
  background: #e6f7ff;
  color: #1890FF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}

/* 模型简介 */
.summary-section {
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
  user-select: none;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.arrow-icon {
  transition: transform 0.3s;
}

.arrow-icon.expanded {
  transform: rotate(180deg);
}

.summary-content p {
  font-size: 15px;
  color: #333;
  line-height: 1.8;
}

/* 模型参数 */
.params-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.params-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.param-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.param-label {
  font-size: 14px;
  color: #666;
}

.param-value {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

/* Tab选项 */
.tabs-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
}

.tab-item {
  padding: 16px 32px;
  font-size: 15px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab-item:hover {
  color: #1890FF;
}

.tab-item.active {
  color: #1890FF;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #1890FF;
}

/* Tab内容 */
.tab-content {
  padding: 32px;
}

.content-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.detail-text p {
  font-size: 15px;
  color: #333;
  line-height: 2;
  margin-bottom: 16px;
}

/* API表单 */
.api-form {
  max-width: 600px;
}

.form-item {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.required {
  color: #ff4d4f;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #1890FF;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #999;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.checkbox-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  padding: 12px 32px;
  background: #1890FF;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: #40a9ff;
}

/* 响应式 */
@media (max-width: 768px) {
  .params-grid {
    grid-template-columns: 1fr;
  }

  .detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .model-name {
    font-size: 24px;
  }

  .tabs {
    overflow-x: auto;
  }
}
</style>
