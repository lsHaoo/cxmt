<template>
  <div class="skill-edit-container">
    <!-- 返回按钮 -->
    <div class="breadcrumb">
      <button class="back-link" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13L5 8L10 3" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回技能详情
      </button>
    </div>

    <div class="edit-content">
      <!-- 左侧导航 -->
      <aside class="sidebar">
        <!-- 技能信息卡片 -->
        <div class="skill-card">
          <img :src="skill?.avatar" :alt="skill?.name" class="skill-avatar" />
          <div class="skill-info">
            <h3 class="skill-name">{{ skill?.name }}</h3>
            <div class="skill-meta">
              <span class="skill-version">v{{ skill?.version }}</span>
              <span class="skill-category">{{ skill?.category }}</span>
            </div>
          </div>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav-menu">
          <div
            v-for="item in menuItems"
            :key="item.key"
            class="nav-item"
            :class="{ active: activeMenu === item.key }"
            @click="activeMenu = item.key"
          >
            <component :is="item.icon" class="nav-icon" />
            <span class="nav-text">{{ item.label }}</span>
            <span v-if="activeMenu === item.key" class="nav-indicator"></span>
          </div>
        </nav>
      </aside>

      <!-- 右侧内容 -->
      <main class="main-content">
        <!-- 基础信息 -->
        <div v-if="activeMenu === 'basic'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">基础信息</h2>
            <p class="section-desc">编辑技能的基本信息，包括名称、分类、标签等</p>
          </div>

          <div class="content-card">
            <!-- 头像上传 -->
            <div class="form-section">
              <label class="section-label">技能头像</label>
              <div class="avatar-upload-area">
                <div class="avatar-preview-container">
                  <img v-if="formData.avatar" :src="formData.avatar" class="avatar-preview" />
                  <div v-else class="avatar-empty">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 44C34.6274 44 43.4274 35.2132 43.4274 24C43.4274 12.6726 34.6274 4 24 4C13.3726 4 4.57258 12.6726 4.57258 24C4.57258 35.2132 13.3726 43.4274 24 44Z" stroke="#d9d9d9" stroke-width="2"/>
                      <path d="M24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18Z" fill="#d9d9d9"/>
                      <path d="M24 32C18.4772 32 14 36.4772 14 42C14 43.1046 14.4477 43.5523 15 44C24.5523 44.4477 25.1046 44 26 44C33.5523 44 34 43.5523 34 42C34 36.4772 29.5228 32 24 32Z" fill="#d9d9d9"/>
                    </svg>
                    <span>上传头像</span>
                  </div>
                </div>
                <input
                  type="file"
                  ref="avatarInput"
                  accept="image/*"
                  class="avatar-input"
                  @change="handleAvatarChange"
                />
                <button class="upload-btn" @click="triggerAvatarUpload">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 13V3M8 13L5 10M8 13L11 10M3 13H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  更换
                </button>
              </div>
            </div>

            <!-- 表单字段 -->
            <div class="form-grid">
              <div class="form-field">
                <label class="field-label">技能名称 <span class="required">*</span></label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="field-input"
                  placeholder="请输入技能名称"
                  maxlength="50"
                />
                <span class="field-hint">{{ formData.name.length }}/50</span>
              </div>

              <div class="form-field">
                <label class="field-label">版本号</label>
                <input
                  v-model="formData.version"
                  type="text"
                  class="field-input disabled"
                  disabled
                />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">技能分类 <span class="required">*</span></label>
              <div class="category-pills">
                <span
                  v-for="category in skillCategories"
                  :key="category"
                  class="category-pill"
                  :class="{ active: formData.category === category }"
                  @click="formData.category = category"
                >
                  {{ category }}
                </span>
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">技能标签 <span class="required">*</span></label>
              <div class="tags-input-container">
                <input
                  v-model="tagInput"
                  type="text"
                  class="field-input"
                  placeholder="输入标签后按回车添加"
                  @keyup.enter="addTag"
                />
                <button class="add-tag-btn" @click="addTag">添加</button>
              </div>
              <div v-if="formData.tags.length > 0" class="tags-container">
                <span
                  v-for="(tag, index) in formData.tags"
                  :key="index"
                  class="tag-chip"
                >
                  {{ tag }}
                  <button class="tag-remove" @click="removeTag(index)">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L3 9M3 3L9 9" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </button>
                </span>
              </div>
            </div>

            <div class="form-field full-width">
              <label class="field-label">技能说明 <span class="required">*</span></label>
              <textarea
                v-model="formData.description"
                class="field-textarea"
                placeholder="请输入技能说明（简短描述，100字以内）"
                maxlength="100"
                rows="3"
              ></textarea>
              <span class="field-hint">{{ formData.description.length }}/100</span>
            </div>

            <div class="form-field full-width">
              <label class="field-label">技能详情</label>
              <textarea
                v-model="formData.detail"
                class="field-textarea tall"
                placeholder="请输入技能详细介绍（支持Markdown格式）"
                rows="10"
              ></textarea>
            </div>

            <!-- 操作按钮 -->
            <div class="form-actions">
              <button class="btn btn-primary" @click="saveChanges">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3333 5.33337L5.99996 12.6667L2.66663 9.33337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                保存修改
              </button>
              <button class="btn btn-default" @click="cancelEdit">
                取消
              </button>
            </div>
          </div>
        </div>

        <!-- 权限设置 -->
        <div v-if="activeMenu === 'permission'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">权限设置</h2>
            <p class="section-desc">配置技能的访问权限和使用规则</p>
          </div>

          <div class="content-card">
            <div class="setting-item">
              <div class="setting-content">
                <div class="setting-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2C6.68629 2 4 4.68629 4 8C4 11.3137 6.68629 14 10 14C13.3137 14 16 11.3137 16 8C16 4.68629 13.3137 2 10 2Z" stroke="#1890FF" stroke-width="2"/>
                    <path d="M10 6V10M7 10H13" stroke="#1890FF" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="setting-text">
                  <h3 class="setting-title">公开访问</h3>
                  <p class="setting-desc">技能可以被所有用户查看和使用</p>
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="permissionSettings.publicAccess" />
                <span class="switch-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-content">
                <div class="setting-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4H16M10 8H16M10 12H16M4 5H16" stroke="#52c41a" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="setting-text">
                  <h3 class="setting-title">允许评论</h3>
                  <p class="setting-desc">用户可以对技能进行评论和反馈</p>
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="permissionSettings.allowComments" />
                <span class="switch-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-content">
                <div class="setting-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9L6 13L4 11M10 9L10 15M6 13L10 13" stroke="#ff4d4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="12" y="6" width="4" height="4" rx="1" stroke="#ff4d4f" stroke-width="2"/>
                  </svg>
                </div>
                <div class="setting-text">
                  <h3 class="setting-title">允许复制</h3>
                  <p class="setting-desc">用户可以复制技能内容</p>
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="permissionSettings.allowCopy" />
                <span class="switch-slider"></span>
              </label>
            </div>

            <div class="form-actions">
              <button class="btn btn-primary" @click="savePermission">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3333 5.33337L5.99996 12.6667L2.66663 9.33337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                保存设置
              </button>
            </div>
          </div>
        </div>

        <!-- 数据监测 -->
        <div v-if="activeMenu === 'monitor'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">数据监测</h2>
            <p class="section-desc">查看技能的使用数据统计和分析</p>
          </div>

          <div class="content-card">
            <div class="stats-container">
              <div class="stat-box">
                <div class="stat-header">
                  <div class="stat-icon-wrapper views">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4C8.5 4 5.5 7 5.5 10C5.5 12 7 13.5 8.5 13.5L12 15L13.5 13.5C15 13 16.5 12 16.5 10C16.5 7 15 4 12 4Z" stroke="#1890FF" stroke-width="2"/>
                      <circle cx="12" cy="10" r="2" fill="#1890FF"/>
                    </svg>
                  </div>
                </div>
                <div class="stat-body">
                  <div class="stat-number">{{ skill?.views || 0 }}</div>
                  <div class="stat-label">访问次数</div>
                </div>
              </div>

              <div class="stat-box">
                <div class="stat-header">
                  <div class="stat-icon-wrapper favorites">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L6 9C4.5 7.5 4.5 5 6 3.5C7.5 2 10 2 10 2.5L11 3L11.5 2.5C13 1.5 15.5 1.5 17 3C18.5 4.5 18.5 7 17 9L12 15Z" stroke="#ff4d4f" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
                <div class="stat-body">
                  <div class="stat-number">{{ skill?.favorites || 0 }}</div>
                  <div class="stat-label">收藏次数</div>
                </div>
              </div>

              <div class="stat-box">
                <div class="stat-header">
                  <div class="stat-icon-wrapper likes">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L7 10C5.5 8.5 5.5 6 7 4.5C8.5 3 11 3 11 4L12 4.5L11.5 4C13 3 15 3 16 4.5C17.5 6 17.5 8.5 16 10L12 15Z" stroke="#52c41a" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
                <div class="stat-body">
                  <div class="stat-number">{{ skill?.likes || 0 }}</div>
                  <div class="stat-label">点赞次数</div>
                </div>
              </div>
            </div>

            <div class="chart-section">
              <h3 class="subsection-heading">使用趋势</h3>
              <div class="chart-wrapper">
                <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#1890FF" stop-opacity="0.2"/>
                      <stop offset="100%" stop-color="#1890FF" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <rect x="0" y="40" width="60" height="120" fill="url(#chartGradient)" rx="4"/>
                  <rect x="80" y="60" width="60" height="100" fill="url(#chartGradient)" rx="4"/>
                  <rect x="160" y="30" width="60" height="130" fill="url(#chartGradient)" rx="4"/>
                  <rect x="240" y="80" width="60" height="80" fill="url(#chartGradient)" rx="4"/>
                  <rect x="320" y="50" width="60" height="110" fill="url(#chartGradient)" rx="4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 日志标注 -->
        <div v-if="activeMenu === 'logs'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">日志标注</h2>
            <p class="section-desc">查看技能的操作历史和变更记录</p>
          </div>

          <div class="content-card">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot published"></div>
                <div class="timeline-content">
                  <div class="timeline-time">2024-02-28 14:30</div>
                  <div class="timeline-type published">发布</div>
                  <div class="timeline-text">技能发布成功，版本 1.0</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot approved"></div>
                <div class="timeline-content">
                  <div class="timeline-time">2024-02-28 14:25</div>
                  <div class="timeline-type approved">审核</div>
                  <div class="timeline-text">审核通过，可以发布</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot pending"></div>
                <div class="timeline-content">
                  <div class="timeline-time">2024-02-28 10:15</div>
                  <div class="timeline-type pending">提交</div>
                  <div class="timeline-text">提交审核申请</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot created"></div>
                <div class="timeline-content">
                  <div class="timeline-time">2024-02-28 09:30</div>
                  <div class="timeline-type created">创建</div>
                  <div class="timeline-text">创建技能</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 案列创建 -->
        <div v-if="activeMenu === 'cases'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">案列创建</h2>
            <p class="section-desc">创建和管理技能的示例案列</p>
          </div>

          <div class="content-card">
            <div class="case-form">
              <div class="form-field">
                <label class="field-label">案列名称 <span class="required">*</span></label>
                <input
                  v-model="caseForm.name"
                  type="text"
                  class="field-input"
                  placeholder="请输入案列名称"
                />
              </div>

              <div class="form-field">
                <label class="field-label">案列描述 <span class="required">*</span></label>
                <textarea
                  v-model="caseForm.description"
                  class="field-textarea"
                  placeholder="请输入案列描述"
                  rows="3"
                ></textarea>
              </div>

              <div class="form-field">
                <label class="field-label">示例输入</label>
                <div class="code-editor">
                  <textarea
                    v-model="caseForm.input"
                    class="code-textarea"
                    placeholder="// 请输入示例输入"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div class="form-field">
                <label class="field-label">示例输出</label>
                <div class="code-editor">
                  <textarea
                    v-model="caseForm.output"
                    class="code-textarea"
                    placeholder="// 请输入示例输出"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div class="form-actions">
                <button class="btn btn-primary" @click="addCase">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V14M2 8H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  添加案列
                </button>
              </div>
            </div>

            <div v-if="cases.length > 0" class="cases-list">
              <h3 class="subsection-heading">已有案列 ({{ cases.length }})</h3>
              <div class="case-cards">
                <div v-for="(item, index) in cases" :key="index" class="case-card">
                  <div class="case-card-header">
                    <h4 class="case-card-title">{{ item.name }}</h4>
                    <button class="delete-case-btn" @click="deleteCase(index)">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L12 12M4 12L12 4" stroke="#ff4d4f" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <div class="case-card-body">
                    <div class="case-field-row">
                      <span class="case-field-label">描述</span>
                      <span class="case-field-value">{{ item.description }}</span>
                    </div>
                    <div class="case-field-row">
                      <span class="case-field-label">输入</span>
                      <code class="case-code">{{ item.input }}</code>
                    </div>
                    <div class="case-field-row">
                      <span class="case-field-label">输出</span>
                      <code class="case-code">{{ item.output }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useModelStore } from '../stores/models'

const router = useRouter()
const route = useRoute()
const modelStore = useModelStore()

const skillCategories = ['综合', '服务', '研发', '制造']
const tagInput = ref('')

// 菜单状态
const activeMenu = ref('basic')

const menuItems = [
  { key: 'basic', label: '基础信息', icon: 'BasicIcon' },
  { key: 'permission', label: '权限设置', icon: 'PermissionIcon' },
  { key: 'monitor', label: '数据监测', icon: 'MonitorIcon' },
  { key: 'logs', label: '日志标注', icon: 'LogsIcon' },
  { key: 'cases', label: '案列创建', icon: 'CasesIcon' }
]

// 技能数据
const skill = computed(() => {
  return modelStore.getSkillById(route.params.id)
})

// 表单数据
const formData = ref({
  name: '',
  version: '',
  avatar: '',
  category: '综合',
  tags: [],
  description: '',
  detail: ''
})

// 权限设置
const permissionSettings = ref({
  publicAccess: true,
  allowComments: true,
  allowCopy: false
})

// 案列表单
const caseForm = ref({
  name: '',
  description: '',
  input: '',
  output: ''
})

const cases = ref([])

// 图标组件
const BasicIcon = {
  template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 18 9 18C12.866 18 18 12.866 18 9C18 5.13401 12.866 2 9 2Z" stroke="#666" stroke-width="1.5"/>
    <path d="M9 6V12M6 9H12" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`
}

const PermissionIcon = {
  template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2L3 6.5V13.5H15V6.5L9 2Z" stroke="#666" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M9 2V13.5M3 6.5H15" stroke="#666" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`
}

const MonitorIcon = {
  template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3.5H16C16.8284 3.5 17.5 4.17157 17.5 5V11C17.5 11.8284 16.8284 12.5 16 12.5H2C1.17157 12.5 0.5 11.8284 0.5 11V5C0.5 4.17157 1.17157 3.5 2 3.5Z" stroke="#666" stroke-width="1.5"/>
    <path d="M9 11.5V13.5M6 13.5H12" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`
}

const LogsIcon = {
  template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5H15M3 9H15M3 13.5H9" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`
}

const CasesIcon = {
  template: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2H4C3.44772 2 3 2.44772 3 3V14C3 14.5523 3.44772 15 4 15H14C14.5523 15 15 14.5523 15 14V8L9 2Z" stroke="#666" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M9 2V8H15" stroke="#666" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`
}

// 头像上传
const avatarInput = ref(null)

const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      formData.value.avatar = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 标签管理
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  formData.value.tags.splice(index, 1)
}

// 保存修改
const saveChanges = () => {
  if (skill.value) {
    Object.assign(skill.value, formData.value)
    alert('保存成功')
  }
}

// 取消编辑
const cancelEdit = () => {
  router.push(`/skill/${route.params.id}`)
}

// 保存权限
const savePermission = () => {
  alert('权限设置已保存')
}

// 添加案列
const addCase = () => {
  if (!caseForm.value.name || !caseForm.value.description) {
    alert('请填写案列名称和描述')
    return
  }
  cases.value.push({ ...caseForm.value })
  caseForm.value = { name: '', description: '', input: '', output: '' }
  alert('案列添加成功')
}

// 删除案列
const deleteCase = (index) => {
  cases.value.splice(index, 1)
}

// 返回
const goBack = () => {
  router.push(`/skill/${route.params.id}`)
}

onMounted(() => {
  if (skill.value) {
    formData.value = {
      name: skill.value.name,
      version: skill.value.version,
      avatar: skill.value.avatar,
      category: skill.value.category,
      tags: skill.value.tags || [],
      description: skill.value.description,
      detail: skill.value.detail || ''
    }
  }
})
</script>

<style scoped>
.skill-edit-container {
  min-height: 100vh;
  background: #f5f7fa;
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.back-link:hover {
  background: #1890FF;
  color: white;
}

/* 主内容区域 */
.edit-content {
  display: flex;
  min-height: calc(100vh - 57px);
}

/* 左侧边栏 */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #f0f0f0;
  padding: 24px 0;
}

.skill-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.skill-avatar {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 6px;
}

.skill-meta {
  display: flex;
  gap: 12px;
}

.skill-version {
  padding: 4px 10px;
  background: #e6f7ff;
  color: #1890FF;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.skill-category {
  padding: 4px 10px;
  background: #f5f5f5;
  color: #666;
  border-radius: 4px;
  font-size: 12px;
}

/* 导航菜单 */
.nav-menu {
  padding: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #666;
  position: relative;
}

.nav-item:hover {
  background: #f5f5f5;
  color: #1890FF;
}

.nav-item.active {
  background: #e6f7ff;
  color: #1890FF;
  font-weight: 500;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
}

.nav-indicator {
  width: 6px;
  height: 6px;
  background: #1890FF;
  border-radius: 50%;
}

/* 右侧内容 */
.main-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  background: #fafafa;
}

/* 内容区域 */
.content-section {
  max-width: 900px;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.section-desc {
  font-size: 14px;
  color: #999;
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

/* 表单样式 */
.form-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.section-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.required {
  color: #ff4d4f;
  margin-left: 2px;
}

.avatar-upload-area {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-preview-container {
  flex-shrink: 0;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
}

.avatar-empty {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: #fafafa;
  border: 2px dashed #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #999;
  font-size: 12px;
  transition: all 0.2s;
}

.avatar-empty:hover {
  border-color: #1890FF;
  color: #1890FF;
}

.avatar-input {
  display: none;
}

.upload-btn {
  padding: 10px 20px;
  background: #1890FF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.upload-btn:hover {
  background: #40a9ff;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.form-field {
  margin-bottom: 20px;
}

.form-field.full-width {
  grid-column: span 2;
}

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.field-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
  box-sizing: border-box;
}

.field-input:focus {
  border-color: #1890FF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.08);
}

.field-input.disabled {
  background: #fafafa;
  color: #999;
  cursor: not-allowed;
}

.field-hint {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.field-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
}

.field-textarea:focus {
  border-color: #1890FF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.08);
}

.field-textarea.tall {
  min-height: 200px;
}

/* 分类选择 */
.category-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-pill {
  padding: 8px 18px;
  background: #fafafa;
  color: #666;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.category-pill:hover {
  background: #e6f7ff;
  border-color: #1890FF;
  color: #1890FF;
}

.category-pill.active {
  background: #1890FF;
  border-color: #1890FF;
  color: white;
}

/* 标签输入 */
.tags-input-container {
  display: flex;
  gap: 10px;
}

.add-tag-btn {
  padding: 10px 20px;
  background: #1890FF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.add-tag-btn:hover {
  background: #40a9ff;
}

.tags-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.tag-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f0f7ff;
  color: #1890FF;
  border-radius: 16px;
  font-size: 13px;
}

.tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
}

.tag-remove:hover {
  background: rgba(255, 77, 79, 0.1);
}

/* 操作按钮 */
.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
  margin-top: 24px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #1890FF;
  color: white;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-default {
  background: white;
  border: 1px solid #d9d9d9;
  color: #666;
}

.btn-default:hover {
  border-color: #1890FF;
  color: #1890FF;
}

/* 权限设置 */
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.setting-icon {
  flex-shrink: 0;
}

.setting-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.setting-desc {
  font-size: 14px;
  color: #666;
}

.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d9d9d9;
  transition: 0.3s;
  border-radius: 28px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

.switch input:checked + .switch-slider {
  background-color: #1890FF;
}

.switch input:checked + .switch-slider:before {
  transform: translateX(24px);
}

/* 数据监测 */
.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-box {
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.stat-header {
  margin-bottom: 16px;
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrapper.views {
  background: rgba(24, 144, 255, 0.1);
}

.stat-icon-wrapper.favorites {
  background: rgba(255, 77, 79, 0.1);
}

.stat-icon-wrapper.likes {
  background: rgba(82, 196, 26, 0.1);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #666;
}

.subsection-heading {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.chart-section {
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.chart-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
}

/* 日志标注 */
.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e8e8e8;
}

.timeline-item {
  position: relative;
  padding-bottom: 32px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -32px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid;
}

.timeline-dot.published {
  border-color: #52c41a;
}

.timeline-dot.approved {
  border-color: #1890FF;
}

.timeline-dot.pending {
  border-color: #faad14;
}

.timeline-dot.created {
  border-color: #666;
}

.timeline-content {
  padding-left: 8px;
}

.timeline-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.timeline-type {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
}

.timeline-type.published {
  background: #f6ffed;
  color: #52c41a;
}

.timeline-type.approved {
  background: #e6f7ff;
  color: #1890FF;
}

.timeline-type.pending {
  background: #fff7e6;
  color: #faad14;
}

.timeline-type.created {
  background: #f5f5f5;
  color: #666;
}

.timeline-text {
  font-size: 14px;
  color: #333;
}

/* 案列创建 */
.case-form {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #f0f0f0;
}

.code-editor {
  background: #fafafa;
  border-radius: 6px;
  overflow: hidden;
}

.code-textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: 'Courier New', 'Monaco', monospace;
  font-size: 13px;
  background: white;
  resize: vertical;
  line-height: 1.6;
}

.cases-list {
  padding-top: 24px;
}

.case-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.case-card {
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
}

.case-card:hover {
  border-color: #1890FF;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
}

.case-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #d9d9d9;
}

.case-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.delete-case-btn {
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-case-btn:hover {
  background: rgba(255, 77, 79, 0.1);
}

.case-card-body {
  padding: 16px;
}

.case-field-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
}

.case-field-row:last-child {
  margin-bottom: 0;
}

.case-field-label {
  font-weight: 500;
  color: #666;
  flex-shrink: 0;
  min-width: 60px;
}

.case-field-value {
  color: #333;
  flex: 1;
}

.case-code {
  font-family: 'Courier New', 'Monaco', monospace;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: inline-block;
}

/* 响应式 */
@media (max-width: 1024px) {
  .edit-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .case-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .skill-card {
    flex-direction: column;
    text-align: center;
  }

  .skill-meta {
    justify-content: center;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
