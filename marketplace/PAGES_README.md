# Marketplace 页面组件使用说明

## 项目简介

这是一个基于 Vue 3 + Vite 构建的 AI 模型和技能市场平台，采用现代化前端设计风格。

## 页面结构

```
src/
├── views/
│   ├── Marketplace.vue      # 主市场页面（模型集市 + 技能广场）
│   ├── ModelDetail.vue     # 模型详情页
│   ├── SkillDetail.vue      # 技能详情页
│   ├── AddSkill.vue        # 新增技能页
│   └── SkillEdit.vue       # 技能编辑页
├── stores/
│   └── models.js           # 数据存储（Pinia）
├── router/
│   └── index.js           # 路由配置
└── styles/
    └── design-system.css   # 设计系统（可复用样式）
```

## 技术栈

- Vue 3.4.0
- Vite 5.4.21
- Vue Router 4.6.4
- Pinia 3.0.4
- Marked.js（Markdown渲染）

## 设计系统

### 色彩规范

```css
--color-primary: #1890FF;      /* 主色调 - 蓝色 */
--color-success: #52c41a;       /* 成功色 - 绿色 */
--color-warning: #faad14;       /* 警告色 - 橙色 */
--color-error: #ff4d4f;         /* 错误色 - 红色 */
--color-text-primary: #1a1a1a;  /* 主文本色 */
--color-text-secondary: #333;   /* 次要文本色 */
--color-border: #d9d9d9;       /* 边框色 */
--color-bg-page: #f5f7fa;         /* 页面背景色 */
```

### 圆角规范

```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
```

### 间距规范

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
```

### 字体规范

```css
--font-size-sm: 12px;   /* 小字体 */
--font-size-base: 14px;  /* 正常字体 */
--font-size-lg: 16px;   /* 大字体 */
--font-size-xl: 18px;   /* 超大字体 */
--font-size-2xl: 20px;  /* 标题字体 */
```

## 页面功能说明

### 1. Marketplace.vue（主市场页面）

**功能：**
- 显示所有模型和技能
- 三个标签页：全部 / 模型集市 / 技能广场
- 模型集市：筛选、搜索、收藏功能
- 技能广场：分类筛选、我的技能、新增技能
- 卡片展示：点击进入详情页
- 收藏/点赞交互

**关键交互：**
- 点击标签页切换
- 点击筛选条件过滤
- 点击卡片跳转详情
- 点击收藏/点赞（阻止冒泡）
- 搜索框实时搜索

### 2. ModelDetail.vue（模型详情页）

**功能：**
- 模型基本信息展示
- 模型参数表格
- 介绍/API Key 两个标签页
- 右上角体验试用按钮
- 弹出 30% 宽度的聊天对话框
- 历史对话面板

**关键交互：**
- 体验试用按钮 → 弹出对话框
- 历史按钮 → 滑出历史面板
- 对话输入和发送
- 点击历史记录切换对话

### 3. SkillDetail.vue（技能详情页）

**功能：**
- 技能基本信息展示（头像 | 信息 | 按钮）
- 技能介绍（Markdown 渲染）
- 编辑/下载按钮
- 收藏/点赞交互
- 复制介绍内容

**关键交互：**
- 收藏/点赞切换状态
- 复制按钮 → 剪贴板
- 编辑按钮 → 跳转编辑页

### 4. AddSkill.vue（新增技能页）

**功能：**
- 完整的技能创建表单
  - 头像上传
  - 名称、版本号（自动计算）
  - 分类选择
  - 标签输入
  - 技能说明
  - 技能详情
  - 技能包上传
- 状态流转：
  - 草稿：显示"提交申请"按钮
  - 审核中：显示"审核中..."和"编辑"按钮
  - 已审核：显示"发布"和"编辑"按钮
  - 已发布：显示"已发布"和"创建新版本"按钮

**版本号规则：**
- 新增：取"我的技能"中最大版本号+0.1，无则默认1.0
- 已发布编辑：版本号+0.1
- 未发布编辑：版本号不变

### 5. SkillEdit.vue（技能编辑页）

**功能：**
- 左侧导航：技能信息 + 五个菜单项
  - 基础信息
  - 权限设置
  - 数据监测
  - 日志标注
  - 案列创建

**各菜单功能：**

**基础信息**
- 编辑所有基础信息
- 保存/取消操作

**权限设置**
- 公开访问开关
- 允许评论开关
- 允许复制开关

**数据监测**
- 访问次数统计
- 收藏次数统计
- 点赞次数统计
- 使用趋势图表

**日志标注**
- 时间轴展示操作日志
- 类型：创建 / 提交 / 审核 / 发布

**案列创建**
- 添加新案列（名称、描述、输入、输出）
- 查看已有案列
- 删除案列

## 数据存储

### Store 结构（Pinia）

```javascript
{
  models: [...],     // 模型数据
  skills: [...],     // 技能数据
}

// 模型字段
{
  id,
  name,
  avatar,
  tags: [],
  description,
  type,          // 模型类型
  contextLength, // 上下文长度
  vendor,       // 厂商
  params,        // 参数量
  releaseDate,  // 发布日期
  inputType,    // 输入类型
  supportInference, // 是否支持推理
  summary,      // 简介
  detail,        // 详情
  views,         // 访问次数
  favorites,    // 收藏数
  likes,         // 点赞数
  isFavorited,  // 是否收藏
  isLiked        // 是否点赞
}

// 技能字段
{
  id,
  name,
  avatar,
  tags: [],
  category,     // 分类（综合/服务/研发/制造）
  creator,       // 创建者
  description,
  views,
  favorites,
  likes,
  isFavorited,
  isLiked,
  isMine,        // 是否我的技能
  status,        // 状态（draft/reviewing/approved/published）
  version,       // 版本号
  detail         // 详情
}
```

## 路由配置

```javascript
/                          → Marketplace（主市场）
/model/:id                 → ModelDetail（模型详情）
/skill/:id                 → SkillDetail（技能详情）
/skill/edit/:id            → SkillEdit（技能编辑）
/skill/add                 → AddSkill（新增技能）
```

## 复制使用指南

### 方式一：完整复制整个项目

1. 复制整个 `d:\code\marketplace` 文件夹
2. 复制 `package.json` 中的依赖
3. 运行 `npm install`
4. 运行 `npm run dev`
5. 访问 `http://localhost:3000`

### 方式二：只复制页面文件

1. 复制以下文件到新项目：
   ```
   src/
   ├── views/
   │   ├── Marketplace.vue
   │   ├── ModelDetail.vue
   │   ├── SkillDetail.vue
   │   ├── AddSkill.vue
   │   └── SkillEdit.vue
   └── stores/
       └── models.js
   ```

2. 复制以下依赖到 `package.json`：
   ```json
   "dependencies": {
     "vue": "^3.4.0",
     "vue-router": "^4.6.4",
     "pinia": "^3.0.4",
     "marked": "^12.0.0"
   }
   ```

3. 复制路由配置：
   ```
   src/router/index.js
   ```

### 方式三：使用设计系统

1. 复制 `src/styles/design-system.css` 到你的项目
2. 在 `main.js` 中引入：
   ```javascript
   import './styles/design-system.css'
   ```
3. 在组件中使用 CSS 变量：
   ```css
   background: var(--color-bg-page);
   color: var(--color-text-primary);
   border-radius: var(--radius-lg);
   padding: var(--spacing-xl);
   ```

### 方式四：自定义数据

1. 修改 `src/stores/models.js` 中的数据
2. 按照数据结构添加你自己的模型和技能
3. 所有字段都是必需的，可选字段可以不传

## 自定义开发

### 修改配色方案

编辑 `src/styles/design-system.css` 中的 CSS 变量：

```css
/* 修改主色调 */
--color-primary: #你的主色;

/* 修改背景色 */
--color-bg-page: #你的背景色;

/* 修改圆角 */
--radius-lg: 你的圆角值;
```

### 添加新页面

1. 创建新的 Vue 组件在 `src/views/` 下
2. 在 `src/router/index.js` 中添加路由
3. 在主页面添加导航链接

### 修改现有功能

每个页面的逻辑都很清晰，按需修改：
- Marketplace.vue：修改模型和技能数据
- ModelDetail.vue：修改聊天逻辑
- SkillDetail.vue：修改技能展示逻辑
- AddSkill.vue：修改表单验证和提交逻辑
- SkillEdit.vue：修改各个子功能的逻辑

## 注意事项

1. **路由参数**
   - 路由参数都是数字 ID（`/model/:id`）
   - 通过 `route.params.id` 获取

2. **数据流向**
   - 所有状态都通过 Pinia store 管理
   - 修改数据会直接更新 store
   - 计算属性会自动响应更新视图

3. **图片处理**
   - 头像使用 `FileReader` 转换为 base64
   - 支持预览显示

4. **Markdown 渲染**
   - 技能详情使用 `marked` 库渲染
   - 通过 `v-html` 指令渲染

5. **组件通信**
   - 页面之间通过路由跳转
   - 通过 `router.push()` 导航
   - 通过 `router.push('/?tab=xxx')` 带参数返回

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 开发建议

1. 先在 `AddSkill.vue` 中测试表单验证
2. 测试所有页面之间的导航
3. 测试收藏/点赞的状态更新
4. 测试文件上传功能
5. 确保响应式布局正常工作

## 常见问题

**Q: 如何添加新技能？**
A: 点击"技能广场" → "新增技能"，填写表单后点击"提交申请"。

**Q: 如何查看数据？**
A: 数据存储在 `src/stores/models.js` 中，可以直接修改数组内容。

**Q: 如何修改设计风格？**
A: 编辑 `src/styles/design-system.css` 中的 CSS 变量即可全局生效。

**Q: 如何添加新页面？**
A: 创建 `.vue` 文件 → 在 `router/index.js` 添加路由 → 在主页面添加入口。

**Q: 版本号如何计算？**
A: AddSkill.vue 中有自动计算逻辑，编辑时根据状态决定是否增加。

## 许可

MIT License - 可自由使用和修改

## 联系方式

如有问题或建议，欢迎反馈！
