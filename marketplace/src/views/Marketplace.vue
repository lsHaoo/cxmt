<template>
  <div class="marketplace-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">Marketplace</h1>
      <p class="subtitle">丰富的模型与插件 让AI应用更有价值</p>
    </header>

    <!-- 选项卡 -->
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 模型集市 - 详细页面 -->
      <div v-if="activeTab === 'model'" class="model-marketplace">
        <!-- 筛选器 -->
        <div class="filters">
          <div class="filter-item">
            <label class="filter-label">模型类型</label>
            <div class="filter-options">
              <span
                v-for="type in modelTypes"
                :key="type"
                class="filter-option"
                :class="{ active: filterType === type }"
                @click="filterType = type"
              >
                {{ type }}
              </span>
            </div>
          </div>

          <div class="filter-item">
            <label class="filter-label">上下文长度</label>
            <div class="filter-options">
              <span
                v-for="length in contextLengths"
                :key="length"
                class="filter-option"
                :class="{ active: filterLength === length }"
                @click="filterLength = length"
              >
                {{ length }}
              </span>
            </div>
          </div>

          <div class="filter-item">
            <label class="filter-label">模型厂商</label>
            <div class="filter-options">
              <span
                v-for="vendor in vendors"
                :key="vendor"
                class="filter-option"
                :class="{ active: filterVendor === vendor }"
                @click="filterVendor = vendor"
              >
                {{ vendor }}
              </span>
            </div>
          </div>
        </div>

        <!-- 搜索栏 -->
        <div class="search-bar">
          <div class="search-input-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z" stroke="#999" stroke-width="2"/>
              <path d="M14 14L18 18" stroke="#999" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input
              v-model="searchKeyword"
              type="text"
              class="search-input"
              placeholder="输入模型名称搜索"
            />
          </div>
          <button
            class="favorites-btn"
            :class="{ active: showFavoritesOnly }"
            @click="toggleFavorites"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                :fill="showFavoritesOnly ? '#1890FF' : 'none'"
                :stroke="showFavoritesOnly ? '#1890FF' : '#666'"
                stroke-width="1.5"
              />
            </svg>
            我的收藏
          </button>
        </div>

        <!-- 收藏视图返回按钮 -->
        <div v-if="showFavoritesOnly" class="back-btn-wrapper">
          <button class="back-btn" @click="showFavoritesOnly = false">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13L5 8L10 3" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            返回全部
          </button>
        </div>

        <!-- 模型卡片网格 -->
        <div class="card-grid">
          <div
            v-for="model in filteredModels"
            :key="model.id"
            class="card"
            @click="goToDetail(model.id)"
          >
            <!-- Header -->
            <div class="card-header">
              <img :src="model.avatar" :alt="model.name" class="avatar" />
              <div class="header-info">
                <h3 class="card-title">{{ model.name }}</h3>
                <div class="tags">
                  <span
                    v-for="tag in model.tags"
                    :key="tag"
                    class="tag"
                  >{{ tag }}</span>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="card-body">
              <p class="description">{{ model.description }}</p>
            </div>

            <!-- Footer -->
            <div class="card-footer">
              <div class="stat-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3C5.5 3 3.5 5 3.5 7.5C3.5 9.5 5 11 6.5 11.5L8 13L9.5 11.5C11 11 12.5 9.5 12.5 7.5C12.5 5 10.5 3 8 3Z" stroke="#666" stroke-width="1.5"/>
                  <circle cx="8" cy="7.5" r="1.5" fill="#666"/>
                </svg>
                <span>{{ model.views }}</span>
              </div>
              <div class="stat-item" @click.stop="toggleFavorite(model)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ favorited: model.isFavorited }"
                >
                  <path
                    d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                    :fill="model.isFavorited ? '#1890FF' : 'none'"
                    :stroke="model.isFavorited ? '#1890FF' : '#666'"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ model.favorites }}</span>
              </div>
              <div class="stat-item" @click.stop="toggleLike(model)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ liked: model.isLiked }"
                >
                  <path
                    d="M8 13.5L3 8.5C1.5 7 1.5 4.5 3 3C4.5 1.5 7 1.5 8.5 3L8 3.5L7.5 3C9 1.5 11.5 1.5 13 3C14.5 4.5 14.5 7 13 8.5L8 13.5Z"
                    :fill="model.isLiked ? '#1890FF' : 'none'"
                    :stroke="model.isLiked ? '#1890FF' : '#666'"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ model.likes }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果提示 -->
        <div v-if="filteredModels.length === 0" class="no-results">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="#ddd" stroke-width="4"/>
            <path d="M44 44L52 52" stroke="#ddd" stroke-width="4" stroke-linecap="round"/>
          </svg>
          <p>暂无匹配的模型</p>
        </div>
      </div>

      <!-- 全部页面 -->
      <div v-if="activeTab === 'all'" class="section">
        <h2 class="section-title">模型集市</h2>
        <div class="card-grid">
          <div
            v-for="model in displayModels"
            :key="model.id"
            class="card"
            @click="goToDetail(model.id)"
          >
            <!-- Header -->
            <div class="card-header">
              <img :src="model.avatar" :alt="model.name" class="avatar" />
              <div class="header-info">
                <h3 class="card-title">{{ model.name }}</h3>
                <div class="tags">
                  <span
                    v-for="tag in model.tags"
                    :key="tag"
                    class="tag"
                  >{{ tag }}</span>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="card-body">
              <p class="description">{{ model.description }}</p>
            </div>

            <!-- Footer -->
            <div class="card-footer">
              <div class="stat-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3C5.5 3 3.5 5 3.5 7.5C3.5 9.5 5 11 6.5 11.5L8 13L9.5 11.5C11 11 12.5 9.5 12.5 7.5C12.5 5 10.5 3 8 3Z" stroke="#666" stroke-width="1.5"/>
                  <circle cx="8" cy="7.5" r="1.5" fill="#666"/>
                </svg>
                <span>{{ model.views }}</span>
              </div>
              <div class="stat-item" @click.stop="toggleFavorite(model)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ favorited: model.isFavorited }"
                >
                  <path
                    d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                    :fill="model.isFavorited ? '#1890FF' : 'none'"
                    :stroke="model.isFavorited ? '#1890FF' : '#666'"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ model.favorites }}</span>
              </div>
              <div class="stat-item" @click.stop="toggleLike(model)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ liked: model.isLiked }"
                >
                  <path
                    d="M8 13.5L3 8.5C1.5 7 1.5 4.5 3 3C4.5 1.5 7 1.5 8.5 3L8 3.5L7.5 3C9 1.5 11.5 1.5 13 3C14.5 4.5 14.5 7 13 8.5L8 13.5Z"
                    :fill="model.isLiked ? '#1890FF' : 'none'"
                    :stroke="model.isLiked ? '#1890FF' : '#666'"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ model.likes }}</span>
              </div>
            </div>
          </div>
        </div>

        <h2 class="section-title">技能广场</h2>
        <div class="card-grid">
          <div
            v-for="skill in displaySkills"
            :key="skill.id"
            class="card"
          >
            <!-- Header -->
            <div class="card-header">
              <img :src="skill.avatar" :alt="skill.name" class="avatar" />
              <div class="header-info">
                <h3 class="card-title">{{ skill.name }}</h3>
                <div class="tags">
                  <span
                    v-for="tag in skill.tags"
                    :key="tag"
                    class="tag"
                  >{{ tag }}</span>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="card-body">
              <p class="description">{{ skill.description }}</p>
            </div>

            <!-- Footer -->
            <div class="card-footer">
              <div class="stat-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3C5.5 3 3.5 5 3.5 7.5C3.5 9.5 5 11 6.5 11.5L8 13L9.5 11.5C11 11 12.5 9.5 12.5 7.5C12.5 5 10.5 3 8 3Z" stroke="#666" stroke-width="1.5"/>
                  <circle cx="8" cy="7.5" r="1.5" fill="#666"/>
                </svg>
                <span>{{ skill.views }}</span>
              </div>
              <div class="stat-item" @click="toggleFavorite(skill)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ favorited: skill.isFavorited }"
                >
                  <path
                    d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                    :fill="skill.isFavorited ? '#1890FF' : 'none'"
                    :stroke="skill.isFavorited ? '#1890FF' : '#666'"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ skill.favorites }}</span>
              </div>
              <div class="stat-item" @click="toggleLike(skill)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ liked: skill.isLiked }"
                >
                  <path
                    d="M8 13.5L3 8.5C1.5 7 1.5 4.5 3 3C4.5 1.5 7 1.5 8.5 3L8 3.5L7.5 3C9 1.5 11.5 1.5 13 3C14.5 4.5 14.5 7 13 8.5L8 13.5Z"
                    :fill="skill.isLiked ? '#1890FF' : 'none'"
                    :stroke="skill.isLiked ? '#1890FF' : '#666'"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ skill.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 技能广场 -->
      <div v-if="activeTab === 'skill'" class="skill-marketplace">
        <!-- 类别筛选 -->
        <div class="skill-filters">
          <div class="filter-options">
            <span
              v-for="category in skillCategories"
              :key="category"
              class="filter-option"
              :class="{ active: skillCategory === category }"
              @click="skillCategory = category"
            >
              {{ category }}
            </span>
          </div>
        </div>

        <!-- 搜索和按钮栏 -->
        <div class="skill-actions">
          <div class="skill-search-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z" stroke="#999" stroke-width="2"/>
              <path d="M14 14L18 18" stroke="#999" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input
              v-model="skillSearchKeyword"
              type="text"
              class="skill-search-input"
              placeholder="输入技能名称搜索"
            />
          </div>
          <div class="skill-buttons">
            <button
              class="skill-btn"
              :class="{ active: showMySkillsOnly }"
              @click="toggleMySkills"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                  :fill="showMySkillsOnly ? '#1890FF' : 'none'"
                  :stroke="showMySkillsOnly ? '#1890FF' : '#666'"
                  stroke-width="1.5"
                />
              </svg>
              我的技能
            </button>
            <button class="skill-btn add-skill-btn" @click="addNewSkill">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3V13M3 8H13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              新增技能
            </button>
          </div>
        </div>

        <!-- 返回全部按钮 -->
        <div v-if="showMySkillsOnly" class="back-btn-wrapper">
          <button class="back-btn" @click="showMySkillsOnly = false">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13L5 8L10 3" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            返回全部
          </button>
        </div>

        <!-- 默认技能 -->
        <div class="default-skills-section">
          <h3 class="subsection-title">默认技能</h3>
          <div class="card-grid">
            <div
              v-for="skill in defaultSkills"
              :key="skill.id"
              class="card"
              @click="goToSkillDetail(skill.id)"
            >
              <!-- Header -->
              <div class="card-header">
                <img :src="skill.avatar" :alt="skill.name" class="avatar" />
                <div class="header-info">
                  <h3 class="card-title">{{ skill.name }}</h3>
                  <div class="tags">
                    <span
                      v-for="tag in skill.tags"
                      :key="tag"
                      class="tag"
                    >{{ tag }}</span>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <div class="card-body">
                <p class="description">{{ skill.description }}</p>
              </div>

              <!-- Footer -->
              <div class="card-footer">
                <div class="stat-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3C5.5 3 3.5 5 3.5 7.5C3.5 9.5 5 11 6.5 11.5L8 13L9.5 11.5C11 11 12.5 9.5 12.5 7.5C12.5 5 10.5 3 8 3Z" stroke="#666" stroke-width="1.5"/>
                    <circle cx="8" cy="7.5" r="1.5" fill="#666"/>
                  </svg>
                  <span>{{ skill.views }}</span>
                </div>
                <div class="stat-item" @click.stop="toggleFavorite(skill)">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ favorited: skill.isFavorited }"
                  >
                    <path
                      d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                      :fill="skill.isFavorited ? '#1890FF' : 'none'"
                      :stroke="skill.isFavorited ? '#1890FF' : '#666'"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span>{{ skill.favorites }}</span>
                </div>
                <div class="stat-item" @click.stop="toggleLike(skill)">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ liked: skill.isLiked }"
                  >
                    <path
                      d="M8 13.5L3 8.5C1.5 7 1.5 4.5 3 3C4.5 1.5 7 1.5 8.5 3L8 3.5L7.5 3C9 1.5 11.5 1.5 13 3C14.5 4.5 14.5 7 13 8.5L8 13.5Z"
                      :fill="skill.isLiked ? '#1890FF' : 'none'"
                      :stroke="skill.isLiked ? '#1890FF' : '#666'"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span>{{ skill.likes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门技能 -->
        <div class="popular-skills-section">
          <h3 class="subsection-title">热门技能</h3>
          <div class="card-grid">
            <div
              v-for="skill in filteredPopularSkills"
              :key="skill.id"
              class="card"
              @click="goToSkillDetail(skill.id)"
            >
              <!-- Header -->
              <div class="card-header">
                <img :src="skill.avatar" :alt="skill.name" class="avatar" />
                <div class="header-info">
                  <h3 class="card-title">{{ skill.name }}</h3>
                  <div class="tags">
                    <span
                      v-for="tag in skill.tags"
                      :key="tag"
                      class="tag"
                    >{{ tag }}</span>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <div class="card-body">
                <p class="description">{{ skill.description }}</p>
              </div>

              <!-- Footer -->
              <div class="card-footer">
                <div class="stat-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3C5.5 3 3.5 5 3.5 7.5C3.5 9.5 5 11 6.5 11.5L8 13L9.5 11.5C11 11 12.5 9.5 12.5 7.5C12.5 5 10.5 3 8 3Z" stroke="#666" stroke-width="1.5"/>
                    <circle cx="8" cy="7.5" r="1.5" fill="#666"/>
                  </svg>
                  <span>{{ skill.views }}</span>
                </div>
                <div class="stat-item" @click.stop="toggleFavorite(skill)">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ favorited: skill.isFavorited }"
                  >
                    <path
                      d="M8 13.5L2 7.5C0.5 6 0.5 3.5 2 2C3.5 0.5 6 0.5 7.5 2L8 2.5L8.5 2C10 0.5 12.5 0.5 14 2C15.5 3.5 15.5 6 14 7.5L8 13.5Z"
                      :fill="skill.isFavorited ? '#1890FF' : 'none'"
                      :stroke="skill.isFavorited ? '#1890FF' : '#666'"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span>{{ skill.favorites }}</span>
                </div>
                <div class="stat-item" @click.stop="toggleLike(skill)">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ liked: skill.isLiked }"
                  >
                    <path
                      d="M8 13.5L3 8.5C1.5 7 1.5 4.5 3 3C4.5 1.5 7 1.5 8.5 3L8 3.5L7.5 3C9 1.5 11.5 1.5 13 3C14.5 4.5 14.5 7 13 8.5L8 13.5Z"
                      :fill="skill.isLiked ? '#1890FF' : 'none'"
                      :stroke="skill.isLiked ? '#1890FF' : '#666'"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span>{{ skill.likes }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 无结果提示 -->
          <div v-if="filteredPopularSkills.length === 0" class="no-results">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" stroke="#ddd" stroke-width="4"/>
              <path d="M44 44L52 52" stroke="#ddd" stroke-width="4" stroke-linecap="round"/>
            </svg>
            <p>暂无匹配的技能</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModelStore } from '../stores/models'

const router = useRouter()
const modelStore = useModelStore()

const activeTab = ref('all')

const tabs = [
  { label: '全部', value: 'all' },
  { label: '模型集市', value: 'model' },
  { label: '技能广场', value: 'skill' }
]

// 筛选器选项
const modelTypes = ['全部', '文本生成', '图像生成', '视频生成', '图像理解']
const contextLengths = ['全部', '512K', '8K', '16K', '128K']
const vendors = ['全部', '阿里巴巴', '深度求索', 'GLM', 'MinMax']

// 筛选状态
const filterType = ref('全部')
const filterLength = ref('全部')
const filterVendor = ref('全部')
const searchKeyword = ref('')
const showFavoritesOnly = ref(false)

// 技能广场状态
const skillCategories = ['全部', '综合', '服务', '研发', '制造']
const skillCategory = ref('全部')
const skillSearchKeyword = ref('')
const showMySkillsOnly = ref(false)

// 筛选后的模型列表

// 筛选后的模型列表
const filteredModels = computed(() => {
  let result = modelStore.models

  // 收藏筛选
  if (showFavoritesOnly.value) {
    result = result.filter(m => m.isFavorited)
  }

  // 类型筛选
  if (filterType.value !== '全部') {
    result = result.filter(m => m.type === filterType.value)
  }

  // 上下文长度筛选
  if (filterLength.value !== '全部') {
    result = result.filter(m => m.contextLength === filterLength.value)
  }

  // 厂商筛选
  if (filterVendor.value !== '全部') {
    result = result.filter(m => m.vendor === filterVendor.value)
  }

  // 关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(m =>
      m.name.toLowerCase().includes(keyword) ||
      m.description.toLowerCase().includes(keyword)
    )
  }

  return result
})

// 显示的模型（全部页面默认4个）
const displayModels = computed(() => {
  return activeTab.value === 'all' ? modelStore.models.slice(0, 4) : modelStore.models
})

// 显示的技能（全部页面默认4个）
const displaySkills = computed(() => {
  return activeTab.value === 'all' ? modelStore.skills.slice(0, 4) : modelStore.skills
})

// 默认技能（前3个）
const defaultSkills = computed(() => {
  return modelStore.skills.slice(0, 3)
})

// 筛选后的热门技能
const filteredPopularSkills = computed(() => {
  let result = modelStore.skills.slice(3) // 排除默认技能

  // 我的技能筛选（筛选用户创建的技能）
  if (showMySkillsOnly.value) {
    result = result.filter(s => s.isMine)
  }

  // 类别筛选
  if (skillCategory.value !== '全部') {
    result = result.filter(s => s.category === skillCategory.value)
  }

  // 关键词搜索
  if (skillSearchKeyword.value.trim()) {
    const keyword = skillSearchKeyword.value.toLowerCase()
    result = result.filter(s =>
      s.name.toLowerCase().includes(keyword) ||
      s.description.toLowerCase().includes(keyword)
    )
  }

  return result
})

// 跳转到详情页
const goToDetail = (id) => {
  router.push(`/model/${id}`)
}

// 跳转到技能详情页
const goToSkillDetail = (id) => {
  router.push(`/skill/${id}`)
}

// 切换收藏
const toggleFavorite = (item) => {
  item.isFavorited = !item.isFavorited
  item.favorites += item.isFavorited ? 1 : -1
}

// 切换点赞
const toggleLike = (item) => {
  item.isLiked = !item.isLiked
  item.likes += item.isLiked ? 1 : -1
}

// 切换收藏视图
const toggleFavorites = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value
}

// 切换我的技能
const toggleMySkills = () => {
  showMySkillsOnly.value = !showMySkillsOnly.value
}

// 新增技能
const addNewSkill = () => {
  router.push('/skill/add')
}
</script>

<style scoped>
.marketplace-container {
  min-height: 100vh;
}

/* 头部 */
.header {
  background: linear-gradient(135deg, #1890FF 0%, #0050B3 100%);
  padding: 40px 20px;
  text-align: center;
  color: white;
}

.title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 18px;
  opacity: 0.9;
  font-weight: 300;
}

/* 选项卡 */
.tabs {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 30px 20px;
  background: white;
  border-bottom: 1px solid #e8e8e8;
}

.tab-item {
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  border-radius: 8px;
  transition: all 0.3s;
}

.tab-item:hover {
  background: #f0f0f0;
}

.tab-item.active {
  background: #1890FF;
  color: white;
}

/* 内容区域 */
.content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* 模型集市页面 */
.model-marketplace {
  width: 100%;
}

/* 筛选器 */
.filters {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-item {
  display: flex;
  align-items: center;
}

.filter-label {
  width: 100px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex-shrink: 0;
}

.filter-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-option {
  padding: 8px 16px;
  background: #f5f5f5;
  color: #666;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.filter-option:hover {
  background: #e6f7ff;
  color: #1890FF;
}

.filter-option.active {
  background: #1890FF;
  color: white;
}

/* 搜索栏 */
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-input-wrapper svg {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.favorites-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.favorites-btn:hover {
  border-color: #1890FF;
  color: #1890FF;
}

.favorites-btn.active {
  background: #1890FF;
  border-color: #1890FF;
  color: white;
}

/* 返回按钮 */
.back-btn-wrapper {
  margin-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  border-color: #1890FF;
  color: #1890FF;
}

/* 卡片 */
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* 卡片 Header */
.card-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
  background: #f0f0f0;
}

.header-info {
  flex: 1;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 4px 10px;
  background: #f0f7ff;
  color: #1890FF;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

/* 卡片 Body */
.card-body {
  flex: 1;
  margin-bottom: 16px;
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 卡片 Footer */
.card-footer {
  display: flex;
  gap: 20px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.stat-item:nth-child(2),
.stat-item:nth-child(3) {
  cursor: pointer;
}

.stat-item:nth-child(2):hover,
.stat-item:nth-child(3):hover {
  color: #1890FF;
}

.stat-item svg {
  transition: all 0.2s;
}

.stat-item.favorited svg,
.stat-item.liked svg {
  fill: #1890FF;
  stroke: #1890FF;
}

.stat-item.favorited,
.stat-item.liked {
  color: #1890FF;
}

/* 无结果提示 */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
}

.no-results p {
  margin-top: 20px;
  font-size: 16px;
}

/* 技能广场页面 */
.skill-marketplace {
  width: 100%;
}

/* 技能筛选 */
.skill-filters {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.skill-filters .filter-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.skill-filters .filter-option {
  padding: 8px 20px;
  background: #f5f5f5;
  color: #666;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.skill-filters .filter-option:hover {
  background: #e6f7ff;
  color: #1890FF;
}

.skill-filters .filter-option.active {
  background: #1890FF;
  color: white;
}

/* 技能操作栏 */
.skill-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
}

.skill-search-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.skill-search-wrapper svg {
  flex-shrink: 0;
}

.skill-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

.skill-search-input::placeholder {
  color: #999;
}

.skill-buttons {
  display: flex;
  gap: 12px;
}

.skill-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.skill-btn:hover {
  border-color: #1890FF;
  color: #1890FF;
}

.skill-btn.active {
  background: #1890FF;
  border-color: #1890FF;
  color: white;
}

.add-skill-btn {
  background: #1890FF;
  border-color: #1890FF;
  color: white;
}

.add-skill-btn:hover {
  background: #40a9ff;
  border-color: #40a9ff;
  color: white;
}

/* 子标题 */
.subsection-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a1a1a;
}

/* 技能分组 */
.default-skills-section,
.popular-skills-section {
  margin-bottom: 40px;
}
</style>
