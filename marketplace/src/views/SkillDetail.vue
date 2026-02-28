<template>
  <div class="skill-detail-container">
    <!-- 顶部操作栏 -->
    <div class="top-actions">
      <button class="back-btn" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13L5 8L10 3" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回
      </button>
    </div>

    <div class="detail-content">
      <!-- 第一行：头像 | 信息 | 按钮 -->
      <div class="detail-header">
        <!-- 左侧：头像 -->
        <img :src="skill?.avatar" :alt="skill?.name" class="skill-avatar" />

        <!-- 中间：信息区域 -->
        <div class="header-info">
          <div class="skill-name">{{ skill?.name }}</div>
          <div class="skill-description">{{ skill?.description }}</div>
          <div class="skill-meta">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3C5.5 3 3.5 5 3.5 7.5C3.5 9.5 5 11 6.5 11.5L8 13L9.5 11.5C11 11 12.5 9.5 12.5 7.5C12.5 5 10.5 3 8 3Z" stroke="#666" stroke-width="1.5"/>
                <circle cx="8" cy="7.5" r="1.5" fill="#666"/>
              </svg>
              <span>{{ skill?.views }} 人使用</span>
            </div>
            <div class="meta-item" @click="toggleFavorite">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="{ favorited: skill?.isFavorited }"
              >
                <path
                  d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                  :fill="skill?.isFavorited ? '#1890FF' : 'none'"
                  :stroke="skill?.isFavorited ? '#1890FF' : '#666'"
                  stroke-width="1.5"
                />
              </svg>
              <span>{{ skill?.favorites }} 收藏</span>
            </div>
            <div class="meta-item" @click="toggleLike">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="{ liked: skill?.isLiked }"
              >
                <path
                  d="M8 13.5L3 8.5C1.5 7 1.5 4.5 3 3C4.5 1.5 7 1.5 8.5 3L8 3.5L7.5 3C9 1.5 11.5 1.5 13 3C14.5 4.5 14.5 7 13 8.5L8 13.5Z"
                  :fill="skill?.isLiked ? '#1890FF' : 'none'"
                  :stroke="skill?.isLiked ? '#1890FF' : '#666'"
                  stroke-width="1.5"
                />
              </svg>
              <span>{{ skill?.likes }} 点赞</span>
            </div>
            <div class="meta-item creator">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#666"/>
                <path d="M8 9.5C4.13401 9.5 1 12.134 1 15.5H15C15 12.134 4.13401 9.5 8 9.5Z" fill="#666"/>
              </svg>
              <span>{{ skill?.creator || '系统默认' }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧：按钮 -->
        <div class="header-buttons">
          <button class="action-btn edit-btn" @click="editSkill">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.66667 12.6667V10.6667L9.66667 3.66667C10.0349 3.29848 10.5345 3.09204 11.0593 3.09204C11.5841 3.09204 12.0837 3.29848 12.452 3.66667C12.8202 4.03486 13.0266 4.53446 13.0266 5.05933C13.0266 5.58421 12.8202 6.0838 12.452 6.452L5.452 13.452H3.452V11.452L10.452 4.452" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            编辑
          </button>
          <button class="action-btn download-btn" @click="downloadSkill">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10.6667V3M8 10.6667L5.33333 8M8 10.6667L10.6667 8M13.3333 13.3333H2.66667" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            下载
          </button>
        </div>
      </div>

      <!-- 技能介绍 -->
      <div class="skill-intro">
        <div class="intro-header">
          <h3>技能介绍</h3>
          <button class="copy-btn" @click="copyIntro">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6667 1.33337H5.33333C4.59695 1.33337 4.1.93033 4.2.66671V12.0001H10.6667C11.403 12.0001 12 11.403 1.33337 10.6667 1.33337Z" stroke="#1890FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.33333 14.6667H4C3.26362 14.6667 4 12.7305 14 4 12.26362 14.0698 14 12 14.0698 14C11.7305 14 12.26362 14 14 13.7305 14.6667 14.6667C12.6667 14 12 14 13.7305 14.6667Z" stroke="#1890FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            复制
          </button>
        </div>
        <div class="intro-content" v-html="renderedIntro"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useModelStore } from '../stores/models'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const modelStore = useModelStore()

const skill = computed(() => {
  return modelStore.getSkillById(route.params.id)
})

// 渲染Markdown内容
const renderedIntro = computed(() => {
  const intro = skill.value?.intro || defaultIntro
  return marked(intro)
})

// 默认技能介绍
const defaultIntro = `# ${skill.value?.name || '技能名称'}

## 功能介绍

${skill.value?.description || '暂无描述'}

## 使用场景

- 场景一：描述使用场景一
- 场景二：描述使用场景二
- 场景三：描述使用场景三

## 快速开始

\`\`\`bash
# 安装依赖
npm install skill-package

# 引入技能
import { Skill } from 'skill-package'

# 使用技能
const skill = new Skill()
skill.run()
\`\`\`

## 配置说明

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| param1 | string | 参数说明 | 'default' |
| param2 | number | 数值参数 | 100 |

## API文档

### 方法一

\`\`\`javascript
skill.method1(options)
\`\`\`

### 方法二

\`\`\`javascript
skill.method2(data, callback)
\`\`\`

## 常见问题

**Q: 如何使用这个技能？**

A: 请按照快速开始的步骤进行操作。

**Q: 支持哪些平台？**

A: 支持主流浏览器和Node.js环境。

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 支持基础功能

## 联系方式

- 邮箱：example@example.com
- 文档：https://docs.example.com
`

const goBack = () => {
  router.push('/?tab=skill')
}

const editSkill = () => {
  router.push(`/skill/edit/${route.params.id}`)
}

const downloadSkill = () => {
  alert('下载功能开发中...')
}

const toggleFavorite = () => {
  if (skill.value) {
    skill.value.isFavorited = !skill.value.isFavorited
    skill.value.favorites += skill.value.isFavorited ? 1 : -1
  }
}

const toggleLike = () => {
  if (skill.value) {
    skill.value.isLiked = !skill.value.isLiked
    skill.value.likes += skill.value.isLiked ? 1 : -1
  }
}

const copyIntro = () => {
  const introText = skill.value?.intro || defaultIntro
  navigator.clipboard.writeText(introText).then(() => {
    alert('已复制到剪贴板')
  }).catch(() => {
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = introText
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('已复制到剪贴板')
  })
}

onMounted(() => {
  if (!skill.value) {
    router.push('/')
  }
})
</script>

<style scoped>
.skill-detail-container {
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
.detail-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
  padding-top: 72px;
}

/* 第一行：头像 | 信息 | 按钮 */
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.skill-avatar {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  flex-shrink: 0;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
  line-height: 1.3;
}

.skill-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.meta-item:hover {
  color: #1890FF;
}

.meta-item.creator {
  cursor: default;
}

.meta-item svg {
  transition: all 0.2s;
  width: 14px;
  height: 14px;
}

.meta-item.favorited svg,
.meta-item.liked svg {
  fill: #1890FF;
  stroke: #1890FF;
}

.meta-item.favorited,
.meta-item.liked {
  color: #1890FF;
}

.header-buttons {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 9px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn {
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  color: #666;
}

.edit-btn:hover {
  background: #e6f7ff;
  border-color: #1890FF;
  color: #1890FF;
}

.download-btn {
  background: #1890FF;
  color: white;
}

.download-btn:hover {
  background: #40a9ff;
}

/* 技能介绍 */
.skill-intro {
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%);
  border-radius: 12px;
  padding: 24px;
}

.intro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(24, 144, 255, 0.15);
}

.intro-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  background: white;
  border: 1px solid #1890FF;
  border-radius: 5px;
  font-size: 13px;
  color: #1890FF;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #1890FF;
  color: white;
}

.intro-content {
  font-size: 14px;
  line-height: 1.7;
  color: #333;
}

/* Markdown样式覆盖 */
.intro-content :deep(h1) {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 14px;
  color: #1a1a1a;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(24, 144, 255, 0.25);
}

.intro-content :deep(h2) {
  font-size: 17px;
  font-weight: 600;
  margin: 16px 0 10px 0;
  color: #1a1a1a;
}

.intro-content :deep(h3) {
  font-size: 15px;
  font-weight: 600;
  margin: 14px 0 8px 0;
  color: #1a1a1a;
}

.intro-content :deep(p) {
  margin-bottom: 10px;
}

.intro-content :deep(ul),
.intro-content :deep(ol) {
  margin: 10px 0;
  padding-left: 18px;
}

.intro-content :deep(li) {
  margin-bottom: 5px;
}

.intro-content :deep(code) {
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.intro-content :deep(pre) {
  background: #282c34;
  color: #abb2bf;
  padding: 14px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 14px 0;
}

.intro-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: 12px;
}

.intro-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 14px 0;
}

.intro-content :deep(th),
.intro-content :deep(td) {
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px 12px;
  text-align: left;
  font-size: 12px;
}

.intro-content :deep(th) {
  background: rgba(24, 144, 255, 0.08);
  font-weight: 600;
}

.intro-content :deep(blockquote) {
  border-left: 3px solid #1890FF;
  padding: 8px 14px;
  margin: 12px 0;
  background: rgba(24, 144, 255, 0.04);
  color: #333;
}

.intro-content :deep(a) {
  color: #1890FF;
  text-decoration: none;
}

.intro-content :deep(a:hover) {
  text-decoration: underline;
}

/* 响应式 */
@media (max-width: 768px) {
  .detail-header {
    flex-wrap: wrap;
    gap: 16px;
  }

  .header-info {
    width: 100%;
    margin-top: 16px;
  }

  .skill-meta {
    justify-content: center;
    gap: 12px;
  }

  .header-buttons {
    width: 100%;
    justify-content: center;
  }

  .skill-intro {
    padding: 20px;
  }
}
</style>
