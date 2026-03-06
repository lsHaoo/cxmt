# Claude Code 离线安装 - 快速开始

## 📋 快速步骤

### 联网机器（准备阶段）

#### 步骤 1: 自动下载所有文件
```powershell
# 以管理员身份运行 PowerShell
cd D:\claude-code-offline-install
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\download-windows.ps1
```

#### 步骤 2: 手动下载 Git（必需）
- 访问: https://git-scm.com/download/win
- 下载最新的 64-bit 版本
- 保存到: `dependencies\windows\Git-x.x.x.x-64-bit.exe`

#### 步骤 3: 打包传输
```powershell
# 打包整个文件夹
Compress-Archive -Path .\* -DestinationPath claude-code-offline-install.zip
```

### 离线机器（安装阶段）

#### 步骤 1: 解压安装包
```powershell
# 解压 claude-code-offline-install.zip
Expand-Archive -Path claude-code-offline-install.zip -DestinationPath D:\
```

#### 步骤 2: 运行安装脚本
```powershell
# 以管理员身份运行 PowerShell
cd D:\claude-code-offline-install
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\install-offline.ps1
```

#### 步骤 3: 验证安装
```powershell
# 重新打开 PowerShell
claude --version
```

#### 步骤 4: 配置 API 密钥
```powershell
claude config set api-key YOUR_API_KEY_HERE
```

## 🔑 获取 API 密钥

访问: https://console.anthropic.com/

## ⚠️ 重要提醒

1. **必须以管理员身份运行 PowerShell**
2. **安装后需要重启终端才能使用 claude 命令**
3. **确保系统要求满足**:
   - Windows 10 (2004+/Build 19041+) 或 Windows 11
   - 至少 4GB RAM
   - 至少 500MB 磁盘空间

## 📚 详细文档

- 完整操作指南: [README.md](./README.md)
- 下载清单: [download-list.txt](./download-list.txt)

## ❓ 遇到问题?

查看 [README.md](./README.md) 中的"常见问题"部分，或访问:
- Claude Code 文档: https://docs.anthropic.com/claude-code
- GitHub Issues: https://github.com/anthropics/claude-code/issues

---

**最后更新**: 2026-03-06
