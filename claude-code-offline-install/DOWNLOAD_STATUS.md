# Claude Code 离线安装包 - 下载状态

## ✅ 已下载完成

所有必需的安装包已成功下载！现在可以在完全离线的环境中安装 Claude Code。

## 📦 文件清单

### packages/windows/ (Claude Code 安装包)
| 文件 | 大小 | SHA256 |
|------|------|--------|
| install.ps1 | 512K | `fb581f42c18464152f3c32198f3182205733939fb702d2fda1f4d6fb2e0cc043` |
| claude.exe | 224M | `d42d0254c652b7cd6031635ed56d9cba87df205e159051af28e75f9e20ff389a` |

### dependencies/windows/ (系统依赖)
| 文件 | 大小 | SHA256 |
|------|------|--------|
| Git-2.47.1-64-bit.exe | 66M | `25527923debc06515b3016f2d6bca0820656e8281a23be2f43bfb658bd5dda70` |
| node-v20.14.0-x64.msi | 26M | `4235f05b99ae5dabadb5c10c124a0f7f7d4223e52df0857e4c4462b13f19c40e` |
| ripgrep-14.1.0-x86_64-pc-windows-msvc.zip | 2.0M | `fe4f75edfaa50f0d4fecbf47696b7629f3449c9c2c5a4da828753139e5a2e203` |

### 文档和脚本
| 文件 | 大小 | 说明 |
|------|------|------|
| README.md | - | 完整安装指南 |
| QUICKSTART.md | - | 快速开始指南 |
| download-list.txt | - | 下载清单 |
| DIRECTORY-STRUCTURE.txt | - | 目录结构说明 |
| download-windows.ps1 | - | 自动下载脚本 |
| install-offline.ps1 | - | 离线安装脚本 |
| checksums.txt | - | 文件校验和 |

## 📊 总计大小

- **总大小**: ~317MB
- **必需文件**: ~296MB (Git + Claude Code + install.ps1)
- **可选文件**: ~21MB (Node.js + ripgrep)

## 🔐 文件完整性验证

所有下载的文件 SHA256 校验和：

```
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 *./checksums.txt
25527923debc06515b3016f2d6bca0820656e8281a23be2f43bfb658bd5dda70 *./dependencies/windows/Git-2.47.1-64-bit.exe
4235f05b99ae5dabadb5c10c124a0f7f7d4223e52df0857e4c4462b13f19c40e *./dependencies/windows/node-v20.14.0-x64.msi
fe4f75edfaa50f0d4fecbf47696b7629f3449c9c2c5a4da828753139e5a2e203 *./dependencies/windows/ripgrep-14.1.0-x86_64-pc-windows-msvc.zip
7f82c175589e27b80ba3c117e219470435760e6b9ae7eaa84c06036e038a4269 *./DIRECTORY-STRUCTURE.txt
acacc4b2be8b50696e62f94fa4cdf6d035d6bcb89cc7b75001bc441620842425 *./download-list.txt
e1bd19980a59a3779d2d4a1e41a6090807c0649469ce2983522dbbcec312bb4a *./download-windows.ps1
ef169c20c0c840753b5aaf115303ded5a8beb10dd9a93e9c847317e7d577d117 *./install-offline.ps1
d42d0254c652b7cd6031635ed56d9cba87df205e159051af28e75f9e20ff389a *./packages/windows/claude.exe
fb581f42c18464152f3c32198f3182205733939fb702d2fda1f4d6fb2e0cc043 *./packages/windows/install.ps1
c04eda941453babba51ab640ee02a7ce2e906ccb91d30509eb653aa5e6b4d978 *./QUICKSTART.md
709a6dc74adc000d81114cd29dea4438cc88a88eb05c0c9a1fde39ee752601ed *./README.md
```

## 🚀 离线安装步骤

1. **打包整个文件夹**
```powershell
Compress-Archive -Path claude-code-offline-install\* -DestinationPath claude-code-offline-install.zip
```

2. **传输到离线机器**
   - 使用 USB、移动硬盘或其他方式
   - 解压到目标机器

3. **运行安装脚本**
```powershell
# 以管理员身份运行 PowerShell
cd D:\claude-code-offline-install
.\install-offline.ps1
```

4. **验证安装**
```powershell
claude --version
```

## 📋 版本信息

- **Claude Code**: v2.1.50 (Windows x64)
- **Git**: v2.47.1 (Windows)
- **Node.js**: v20.14.0 LTS
- **ripgrep**: v14.1.0

## ⚠️ 重要提示

1. 此安装包包含所有必需的文件，可以在完全离线的环境中安装
2. 安装需要管理员权限
3. 安装后需要配置 API 密钥才能使用
4. 系统要求：Windows 10 (2004+/Build 19041+) 或 Windows 11

## 🆘 技术支持

- 详细安装说明：README.md
- 快速开始：QUICKSTART.md
- 官方文档：https://docs.anthropic.com/claude-code

---

**下载完成时间**: 2026-03-06
**状态**: ✅ 所有文件已下载完成
