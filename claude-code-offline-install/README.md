# Claude Code 离线安装包

本文档提供了 Claude Code 在离线环境下的完整安装指南。

## 📦 离线安装包内容

```
claude-code-offline-install/
├── README.md                 # 本文档
├── download-list.txt        # 必需下载的文件清单
├── download-windows.ps1     # Windows 自动下载脚本
├── install-offline.ps1      # Windows 离线安装脚本
├── packages/                # 安装包存放目录
│   └── windows/             # Windows 安装包
│       ├── install.ps1      # Claude Code 安装脚本
│       └── claude-code-windows-x64.zip  # Claude Code 二进制文件
└── dependencies/            # 系统依赖
    └── windows/             # Windows 依赖
        ├── Git-x.x.x.x-64-bit.exe      # Git 安装包
        ├── node-v20.x.x-x64.msi         # Node.js 安装包（可选）
        └── ripgrep-x.x.x.zip            # ripgrep 工具
```

## 🎯 系统要求

### Windows
- **操作系统**: Windows 10 (版本 2004+/Build 19041+) 或 Windows 11
- **内存**: 最低 4GB，推荐 8GB-16GB+
- **磁盘空间**: 最低 500MB，推荐 10-20GB+
- **权限**: 管理员权限（安装时需要）

## 📥 准备阶段（在联网机器上）

### 方法 1: 使用自动下载脚本（推荐）

在联网的 Windows 机器上，以管理员身份运行 PowerShell，然后执行：

```powershell
# 设置执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# 运行下载脚本
.\download-windows.ps1
```

脚本会自动下载所有必需的文件。

### 方法 2: 手动下载

#### 步骤 1: 下载 Claude Code 安装脚本

下载以下脚本文件并保存到 `packages/windows/` 目录：

```powershell
# 在联网机器上执行
Invoke-WebRequest -Uri "https://claude.ai/install.ps1" -OutFile "packages/windows/install.ps1"
```

#### 步骤 2: 下载系统依赖

1. **Git** (必需)
   - 下载地址: https://git-scm.com/download/win
   - 保存到: `dependencies/windows/Git-x.x.x.x-64-bit.exe`
   - 版本: 最新稳定版

2. **Node.js 20.x LTS** (可选 - 如使用 npm 安装方式)
   - 下载地址: https://nodejs.org/dist/latest-v20.x/
   - 保存到: `dependencies/windows/node-v20.x.x-x64.msi`

3. **ripgrep** (文本搜索工具)
   - 下载地址: https://github.com/BurntSushi/ripgrep/releases
   - 保存到: `dependencies/windows/ripgrep-x.x.x-x86_64-pc-windows-msvc.zip`

#### 步骤 3: 下载 Claude Code 二进制文件（可选）

如需完全离线安装，需要下载 Claude Code 的二进制文件：

```powershell
# 从 GitHub Releases 下载
# 下载地址: https://github.com/anthropics/claude-code/releases/latest
# 保存到: packages/windows/claude-code-windows-x64.zip
```

## 🔧 离线安装阶段（在目标机器上）

### 方法 1: 使用自动安装脚本（推荐）

1. **将整个 `claude-code-offline-install` 文件夹复制到目标机器**

2. **以管理员身份打开 PowerShell**

3. **导航到安装包目录**
```powershell
cd D:\claude-code-offline-install
```

4. **执行安装脚本**
```powershell
# 设置执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# 运行安装脚本
.\install-offline.ps1
```

5. **验证安装**
```powershell
claude --version
claude --help
```

### 方法 2: 手动安装（完全离线）

#### 步骤 1: 安装 Git

```powershell
cd D:\claude-code-offline-install\dependencies\windows
.\Git-x.x.x.x-64-bit.exe /SILENT
```

#### 步骤 2: 安装 Node.js（可选）

```powershell
.\node-v20.x.x-x64.msi /quiet
```

#### 步骤 3: 安装 ripgrep（文本搜索工具）

```powershell
# 解压 ripgrep
Expand-Archive -Path ripgrep-x.x.x-x86_64-pc-windows-msvc.zip -DestinationPath C:\Program Files\ripgrep

# 添加到 PATH
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\ripgrep", "Machine")
```

#### 步骤 4: 解压 Claude Code 二进制文件

```powershell
cd D:\claude-code-offline-install\packages\windows
Expand-Archive -Path claude-code-windows-x64.zip -DestinationPath C:\Program Files\claude-code
```

#### 步骤 5: 添加到 PATH

```powershell
# 以管理员身份执行
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\claude-code\bin", "Machine")
```

#### 步骤 6: 刷新环境变量

```powershell
# 重启 PowerShell 或执行
refreshenv
```

#### 步骤 7: 验证安装

```powershell
claude --version
```

## ✅ 安装后验证

安装完成后，请执行以下验证：

```powershell
# 检查版本
claude --version

# 查看帮助信息
claude --help

# 测试基本功能
claude "你好"
```

## 🔑 配置 Claude Code

安装完成后，需要配置 API 密钥：

```powershell
# 设置 Anthropic API Key
claude config set api-key YOUR_API_KEY_HERE

# 或使用环境变量
$env:ANTHROPIC_API_KEY="YOUR_API_KEY_HERE"

# 永久设置环境变量（需要管理员权限）
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "YOUR_API_KEY_HERE", "User")
```

## 📝 下载清单文件

详细的可下载文件清单请参考 [download-list.txt](./download-list.txt)

## ⚠️ 常见问题

### 问题 1: 找不到 claude 命令

**解决方案**:
```powershell
# 重新启动 PowerShell 或命令提示符

# 或手动刷新 PATH
refreshenv

# 或手动添加到 PATH
# 控制面板 -> 系统 -> 高级系统设置 -> 环境变量 -> 系统变量 -> Path -> 新建
```

### 问题 2: 权限不足

**解决方案**:
```powershell
# 以管理员身份运行 PowerShell
# 右键点击 PowerShell -> 以管理员身份运行
```

### 问题 3: 安装脚本执行被阻止

**解决方案**:
```powershell
# 临时设置执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

### 问题 4: Git 或 Node.js 安装失败

**解决方案**:
```powershell
# 检查安装包是否完整
# 重新下载安装包
# 手动运行安装程序
.\Git-x.x.x.x-64-bit.exe
.\node-v20.x.x-x64.msi
```

## 📚 参考资源

- Claude Code 官方文档: https://docs.anthropic.com/claude-code
- GitHub 仓库: https://github.com/anthropics/claude-code
- API 密钥获取: https://console.anthropic.com/
- Git for Windows: https://git-scm.com/download/win
- Node.js: https://nodejs.org/
- ripgrep: https://github.com/BurntSushi/ripgrep

## 🆘 技术支持

如遇到问题，请：
1. 检查系统要求是否满足
2. 查看上述常见问题
3. 访问官方文档或 GitHub Issues

---

**最后更新**: 2026-03-06
**Claude Code 版本**: 最新稳定版
