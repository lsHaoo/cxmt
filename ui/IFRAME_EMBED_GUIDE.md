# OpenClaw UI Iframe 嵌入指南

## 功能特性

### 1. 简洁设计
- **隐藏导航**：完全隐藏顶部栏和左侧导航栏
- **默认页面**：默认展示对话 (Chat) 页面
- **全屏内容**：内容区域占据全部空间

### 2. 悬浮菜单
- **位置**：右下角固定悬浮按钮
- **交互**：点击展开菜单面板，点击外部或 ESC 关闭
- **动画**：平滑的展开/收起动画
- **主题色**：按钮使用 #1677ff 系统主题色

### 3. 菜单分组
```
┌─────────────────────────┐
│ ☰ (悬浮按钮)         │
├─────────────────────────┤
│ 主要                   │
│ ├─ 对话              │
├─────────────────────────┤
│ 控制                   │
│ ├─ 概览              │
│ ├─ 通道              │
│ ├─ 会话              │
│ ├─ 使用统计           │
├─────────────────────────┤
│ 代理                   │
│ ├─ 代理              │
│ ├─ 技能              │
├─────────────────────────┤
│ 设置                   │
│ ├─ 配置              │
│ └─ 日志              │
└─────────────────────────┘
```

### 4. 自定义主题色
- 主色调：`#1677ff`（蓝色）
- 悬停色：`#4096ff`
- 适配深色和浅色主题
- 自动应用到所有交互元素

## 使用方法

### 基本嵌入

```html
<iframe
  src="http://localhost:5173/chat?embed=true"
  width="100%"
  height="700px"
  title="OpenClaw AI Assistant"
  allow="clipboard-read; clipboard-write"
></iframe>
```

### 参数说明

| 参数 | 说明 | 可选值 | 默认 |
|------|------|--------|------|
| `embed` | 启用 iframe 模式 | `true`, `false` | - |
| `theme` | 指定主题 | `dark`, `light` | 系统 |

### 示例 URL

```html
<!-- 默认对话页面 + iframe 模式 -->
<iframe src="http://localhost:5173/chat?embed=true"></iframe>

<!-- 概览页面 + iframe 模式 -->
<iframe src="http://localhost:5173/overview?embed=true"></iframe>

<!-- 代理页面 + iframe 模式 -->
<iframe src="http://localhost:5173/agents?embed=true"></iframe>
```

## 导航页面列表

### 主要
- `/chat` - 对话

### 控制
- `/overview` - 概览
- `/channels` - 通道
- `/sessions` - 会话
- `/usage` - 使用统计

### 代理
- `/agents` - 代理
- `/skills` - 技能

### 设置
- `/config` - 配置
- `/logs` - 日志

## 悬浮菜单交互

### 打开菜单
1. 点击右下角悬浮按钮 (☰)
2. 菜单面板从右下角展开
3. 按钮旋转 45° 并变为激活状态

### 关闭菜单
以下任意操作都会关闭菜单：
- 点击菜单外部区域（覆盖层）
- 按 ESC 键
- 再次点击悬浮按钮
- 点击菜单项进行导航

### 当前页面指示
- 当前页面在菜单中高亮显示
- 使用主题色背景标记

## 主题自定义

### CSS 变量

```css
.iframe-mode {
  --accent: #1677ff;
  --accent-hover: #4096ff;
  --accent-subtle: rgba(22, 119, 255, 0.15);
  --primary: #1677ff;
}
```

### 修改主题色

要使用自定义主题色，在 `iframe-theme.css` 中覆盖：

```css
:root.iframe-mode {
  --accent: #your-color;
  --accent-hover: #your-hover-color;
  --primary: #your-color;
}
```

## 响应式设计

### 大屏幕 (> 600px)
- 悬浮按钮：56x56px
- 菜单宽度：280px
- 正常图标尺寸

### 中等屏幕 (400px - 600px)
- 悬浮按钮：48x48px
- 菜单宽度：240px
- 略小的图标尺寸

### 小屏幕 (< 400px)
- 悬浮按钮：44x44px
- 菜单全宽
- 贴顶设计

## 权限配置

### 推荐权限

```html
<iframe
  allow="
    clipboard-read;
    clipboard-write;
    microphone;
    camera;
    geolocation;
  "
></iframe>
```

### 权限说明

| 权限 | 说明 |
|------|------|
| `clipboard-read` | 读取剪贴板 |
| `clipboard-write` | 写入剪贴板 |
| `microphone` | 麦克风访问 |
| `camera` | 摄像头访问 |
| `geolocation` | 地理位置 |

## 跨域通信

### 从父窗口发送消息

```javascript
const iframe = document.getElementById('openclaw-iframe');

// 切换页面
iframe.contentWindow.postMessage({
  type: 'NAVIGATE',
  path: '/overview'
}, '*');
```

### 在 iframe 中接收消息

```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'NAVIGATE') {
    window.location.href = event.data.path;
  }
});
```

## 开发说明

### 文件结构

```
ui/src/
├── styles/
│   ├── iframe.css              # iframe 模式布局
│   └── iframe-theme.css        # 自定义主题
├── ui/
│   ├── iframe-floating-menu.ts  # 悬浮菜单组件
│   └── app-lifecycle.ts       # 生命周期（已修改）
└── main.ts                   # 入口文件
```

### 启用 Iframe 模式

1. 在 URL 中添加 `?embed=true`
2. 导航栏和顶部栏自动隐藏
3. 悬浮菜单自动初始化

### 测试

```bash
# 启动 Vite 开发服务器
cd openclaw/ui
node ../node_modules/vite/bin/vite.js

# 访问 iframe 模式
http://localhost:5173/chat?embed=true

# 或打开示例页面
open ui/iframe-embed-example.html
```

## 示例页面

打开 `ui/iframe-embed-example.html` 查看完整的嵌入示例，包括：
- 功能特性展示
- 快捷导航按钮
- 响应式设计
- 代码示例

## 注意事项

### 安全
1. **HTTPS/localhost**: 确保 HTTPS 环境或 localhost
2. **CORS 配置**: 后端需要配置 CORS
3. **权限最小化**: 只授予必要的权限

### 性能
1. **延迟加载**: 使用 `loading="lazy"` 属性
2. **预连接**: 添加 `<link rel="preconnect">`
3. **资源优化**: 压缩和缓存静态资源

### 用户体验
1. **高度设置**: 建议最小 700px
2. **加载状态**: 显示加载指示器
3. **错误处理**: 处理连接失败情况

## 故障排除

### 菜单不显示
```javascript
// 检查是否在 iframe 模式
console.log(new URLSearchParams(window.location.search).get('embed'));

// 手动初始化菜单
import { initFloatingMenu } from './iframe-floating-menu.js';
initFloatingMenu();
```

### 样式未应用
```javascript
// 检查 iframe-mode 类
console.log(document.documentElement.classList.contains('iframe-mode'));

// 强制刷新样式
location.reload(true);
```

## 设计理念

1. **极简主义**: 去除所有不必要的装饰
2. **聚焦内容**: 用户注意力集中在对话上
3. **按需导航**: 功能菜单只在需要时出现
4. **品牌一致**: 主题色与主系统保持一致

## 更新日志

### v2.0
- ✨ 新增悬浮菜单（右下角）
- ✨ 隐藏所有导航元素
- ✨ 默认展示对话页面
- ✨ 主题色自定义 (#1677ff)
- 🎨 优化动画和过渡效果

### v1.0
- ✨ 初始 iframe 模式支持
- 🎨 二级菜单设计
- 🎨 自定义主题色

## 技术支持

如有问题，请参考：
- [iframe.css](ui/src/styles/iframe.css) - 样式文件
- [iframe-floating-menu.ts](ui/src/ui/iframe-floating-menu.ts) - 菜单组件
- [iframe-embed-example.html](ui/iframe-embed-example.html) - 完整示例
