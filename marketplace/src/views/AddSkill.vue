<template>
  <div class="add-skill-container">
    <!-- 顶部操作栏 -->
    <div class="top-actions">
      <button class="back-btn" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13L5 8L10 3" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回
      </button>
    </div>

    <div class="form-content">
      <h2 class="page-title">{{ isEdit ? '编辑技能' : '新增技能' }}</h2>

      <div class="form-card">
        <!-- 基本信息 -->
        <div class="form-section">
          <h3 class="section-title">基本信息</h3>

          <div class="form-item">
            <label class="form-label">技能头像</label>
            <div class="avatar-upload">
              <img v-if="formData.avatar" :src="formData.avatar" class="avatar-preview" />
              <div v-else class="avatar-placeholder">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36Z" stroke="#d9d9d9" stroke-width="2"/>
                  <path d="M20 14C17.7909 14 16 15.7909 16 18C16 20.2091 17.7909 22 20 22C22.2091 22 24 20.2091 24 18C24 15.7909 22.2091 14 20 14Z" fill="#d9d9d9"/>
                  <path d="M20 24C16.134 24 13 26.134 13 29.5H27C27 26.134 16.134 24 20 24Z" fill="#d9d9d9"/>
                </svg>
              </div>
              <input
                type="file"
                ref="avatarInput"
                accept="image/*"
                class="avatar-input"
                @change="handleAvatarChange"
              />
              <button class="upload-btn" @click="triggerAvatarUpload">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 13V3M8 13L5 10M8 13L11 10M3 13H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                上传头像
              </button>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">技能名称 <span class="required">*</span></label>
            <input
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="请输入技能名称"
              maxlength="50"
            />
          </div>

          <div class="form-item">
            <label class="form-label">版本号 <span class="required">*</span></label>
            <input
              v-model="formData.version"
              type="text"
              class="form-input"
              placeholder="自动计算版本号"
              disabled
            />
          </div>

          <div class="form-item">
            <label class="form-label">技能分类 <span class="required">*</span></label>
            <div class="category-options">
              <span
                v-for="category in skillCategories"
                :key="category"
                class="category-option"
                :class="{ active: formData.category === category }"
                @click="formData.category = category"
              >
                {{ category }}
              </span>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">技能标签 <span class="required">*</span></label>
            <div class="tags-input-wrapper">
              <input
                v-model="tagInput"
                type="text"
                class="form-input"
                placeholder="输入标签后按回车添加"
                @keyup.enter="addTag"
              />
              <button class="add-tag-btn" @click="addTag">添加</button>
            </div>
            <div class="tags-list" v-if="formData.tags.length > 0">
              <span
                v-for="(tag, index) in formData.tags"
                :key="index"
                class="tag-item"
              >
                {{ tag }}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="removeTag(index)"
                >
                  <path d="M9 3L3 9M3 3L9 9" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- 详细信息 -->
        <div class="form-section">
          <h3 class="section-title">详细信息</h3>

          <div class="form-item">
            <label class="form-label">技能说明 <span class="required">*</span></label>
            <textarea
              v-model="formData.description"
              class="form-textarea"
              placeholder="请输入技能说明（简短描述，100字以内）"
              maxlength="100"
              rows="3"
            ></textarea>
            <div class="char-count">{{ formData.description.length }}/100</div>
          </div>

          <div class="form-item">
            <label class="form-label">技能详情 <span class="required">*</span></label>
            <textarea
              v-model="formData.detail"
              class="form-textarea"
              placeholder="请输入技能详细介绍（支持Markdown格式）"
              rows="10"
            ></textarea>
          </div>
        </div>

        <!-- 文件上传 -->
        <div class="form-section">
          <h3 class="section-title">文件上传</h3>

          <div class="form-item">
            <label class="form-label">技能包 <span class="required">*</span></label>
            <div class="file-upload-wrapper">
              <input
                type="file"
                ref="packageInput"
                accept=".zip,.tar,.gz"
                class="file-input"
                @change="handlePackageChange"
              />
              <div v-if="formData.packageName" class="file-info">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z" fill="#52c41a"/>
                  <path d="M10 7.5V10.5M10 12.5H10.005" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>{{ formData.packageName }}</span>
                <button class="remove-file-btn" @click="removePackage">×</button>
              </div>
              <div v-else class="upload-placeholder" @click="triggerPackageUpload">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#d9d9d9" stroke-width="2"/>
                  <path d="M16 11V21M16 11L13 14M16 11L19 14" stroke="#1890FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>点击上传技能包（支持 .zip, .tar, .gz）</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <template v-if="skillStatus === 'draft'">
            <button class="btn btn-secondary" @click="submitForReview">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3V13M3 8H13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              提交申请
            </button>
          </template>
          <template v-else-if="skillStatus === 'reviewing'">
            <button class="btn btn-disabled" disabled>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" stroke="#d9d9d9" stroke-width="2"/>
                <path d="M8 5V8L10 10" stroke="#d9d9d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              审核中...
            </button>
            <button class="btn btn-outline" @click="editSkill">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66667 12.6667V10.6667L9.66667 3.66667C10.0349 3.29848 10.5345 3.09204 11.0593 3.09204C11.5841 3.09204 12.0837 3.29848 12.452 3.66667C12.8202 4.03486 13.0266 4.53446 13.0266 5.05933C13.0266 5.58421 12.8202 6.0838 12.452 6.452L5.452 13.452H3.452V11.452L10.452 4.452" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              编辑
            </button>
          </template>
          <template v-else-if="skillStatus === 'approved'">
            <button class="btn btn-primary" @click="publishSkill">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2.5L4 7.5H7V12.5H9V7.5H12L8 2.5Z" fill="white"/>
                <path d="M4 13.5H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              发布
            </button>
            <button class="btn btn-outline" @click="editSkill">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66667 12.6667V10.6667L9.66667 3.66667C10.0349 3.29848 10.5345 3.09204 11.0593 3.09204C11.5841 3.09204 12.0837 3.29848 12.452 3.66667C12.8202 4.03486 13.0266 4.53446 13.0266 5.05933C13.0266 5.58421 12.8202 6.0838 12.452 6.452L5.452 13.452H3.452V11.452L10.452 4.452" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              编辑
            </button>
          </template>
          <template v-else-if="skillStatus === 'published'">
            <button class="btn btn-disabled" disabled>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" stroke="#52c41a" stroke-width="2"/>
                <path d="M5 8L7 10L11 6" stroke="#52c41a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              已发布
            </button>
            <button class="btn btn-secondary" @click="createNewVersion">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V14M2 8H14" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              创建新版本
            </button>
          </template>
        </div>
      </div>
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

// 表单数据
const formData = ref({
  name: '',
  version: '1.0',
  avatar: '',
  category: '综合',
  tags: [],
  description: '',
  detail: '',
  packageName: '',
  file: null
})

// 技能状态
const skillStatus = ref('draft') // draft, reviewing, approved, published
const skillId = ref(null)

// 计算版本号
const calculateVersion = () => {
  if (skillId.value) {
    // 编辑模式：如果已发布，版本号+0.1；未发布则不变
    const skill = modelStore.skills.find(s => s.id === skillId.value)
    if (skill && skill.status === 'published') {
      const currentVersion = parseFloat(skill.version || '1.0')
      formData.value.version = (currentVersion + 0.1).toFixed(1)
    }
  } else {
    // 新增模式：查找我的技能中最大的版本号+0.1，否则默认1.0
    const mySkills = modelStore.skills.filter(s => s.isMine)
    if (mySkills.length > 0) {
      const maxVersion = mySkills.reduce((max, skill) => {
        const version = parseFloat(skill.version || '0.0')
        return version > max ? version : max
      }, 0)
      formData.value.version = (maxVersion + 0.1).toFixed(1)
    } else {
      formData.value.version = '1.0'
    }
  }
}

// 是否为编辑模式
const isEdit = computed(() => !!skillId.value)

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

// 技能包上传
const packageInput = ref(null)

const triggerPackageUpload = () => {
  packageInput.value?.click()
}

const handlePackageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.value.packageName = file.name
    formData.value.file = file
  }
}

const removePackage = () => {
  formData.value.packageName = ''
  formData.value.file = null
  if (packageInput.value) {
    packageInput.value.value = ''
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

// 提交申请
const submitForReview = () => {
  if (!validateForm()) return

  const newSkill = {
    id: Date.now(),
    ...formData.value,
    status: 'reviewing',
    creator: '我',
    isMine: true,
    views: 0,
    favorites: 0,
    likes: 0,
    isFavorited: false,
    isLiked: false
  }

  modelStore.skills.unshift(newSkill)
  skillId.value = newSkill.id
  skillStatus.value = 'reviewing'

  alert('已提交申请，等待审核')
}

// 编辑技能
const editSkill = () => {
  if (skillId.value) {
    router.push(`/skill/edit/${skillId.value}`)
  }
}

// 发布技能
const publishSkill = () => {
  const skill = modelStore.skills.find(s => s.id === skillId.value)
  if (skill) {
    skill.status = 'published'
    skillStatus.value = 'published'
    alert('技能发布成功')
  }
}

// 创建新版本
const createNewVersion = () => {
  calculateVersion()
  formData.value.name = formData.value.name + ' v' + formData.value.version
  formData.value.packageName = ''
  formData.value.file = null
  skillStatus.value = 'draft'
  alert('创建新版本成功')
}

// 表单验证
const validateForm = () => {
  if (!formData.value.name) {
    alert('请输入技能名称')
    return false
  }
  if (!formData.value.category) {
    alert('请选择技能分类')
    return false
  }
  if (formData.value.tags.length === 0) {
    alert('请至少添加一个标签')
    return false
  }
  if (!formData.value.description) {
    alert('请输入技能说明')
    return false
  }
  if (!formData.value.detail) {
    alert('请输入技能详情')
    return false
  }
  if (!formData.value.packageName) {
    alert('请上传技能包')
    return false
  }
  return true
}

// 返回
const goBack = () => {
  router.push('/?tab=skill')
}

onMounted(() => {
  calculateVersion()
})
</script>

<style scoped>
.add-skill-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 40px;
}

/* 顶部操作栏 */
.top-actions {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.back-btn:hover {
  border-color: #1890FF;
  color: #1890FF;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}

/* 内容区域 */
.form-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px;
  padding-top: 72px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #1a1a1a;
}

.form-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.form-item {
  margin-bottom: 24px;
}

.form-item:last-child {
  margin-bottom: 0;
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
  margin-left: 2px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890FF;
  outline: none;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.form-input:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.form-textarea {
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
}

.form-textarea:focus {
  border-color: #1890FF;
  outline: none;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

/* 头像上传 */
.avatar-upload {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-input {
  display: none;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background: #1890FF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-btn:hover {
  background: #40a9ff;
}

/* 分类选择 */
.category-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.category-option {
  padding: 8px 20px;
  background: #f5f5f5;
  color: #666;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.category-option:hover {
  background: #e6f7ff;
  color: #1890FF;
}

.category-option.active {
  background: #1890FF;
  color: white;
}

/* 标签输入 */
.tags-input-wrapper {
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

.tags-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f0f7ff;
  color: #1890FF;
  border-radius: 4px;
  font-size: 12px;
}

.tag-item svg {
  cursor: pointer;
  transition: all 0.2s;
}

.tag-item svg:hover {
  stroke: #ff4d4f;
}

/* 文件上传 */
.file-upload-wrapper {
  width: 100%;
}

.file-input {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-placeholder:hover {
  border-color: #1890FF;
  background: #f0f9ff;
}

.upload-placeholder p {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
}

.remove-file-btn {
  margin-left: auto;
  width: 20px;
  height: 20px;
  border: none;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  transition: all 0.2s;
}

.remove-file-btn:hover {
  background: #ff7875;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.btn {
  display: flex;
  align-items: center;
  gap: 6px;
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

.btn-secondary {
  background: #1890FF;
  color: white;
}

.btn-secondary:hover {
  background: #40a9ff;
}

.btn-outline {
  background: white;
  border: 1px solid #d9d9d9;
  color: #666;
}

.btn-outline:hover {
  border-color: #1890FF;
  color: #1890FF;
}

.btn-disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

/* 响应式 */
@media (max-width: 768px) {
  .form-card {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
