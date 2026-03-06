# Claude Code 离线安装脚本 (Windows)
#
# 使用说明：
# 1. 将整个 claude-code-offline-install 文件夹复制到目标机器
# 2. 以管理员身份运行 PowerShell
# 3. 执行此脚本: .\install-offline.ps1

param(
    [string]$InstallDir = "$env:ProgramFiles\claude-code",
    [switch]$SkipGit,
    [switch]$SkipNode
)

# 检查管理员权限
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "错误: 此脚本需要管理员权限" -ForegroundColor Red
    Write-Host "请以管理员身份运行 PowerShell" -ForegroundColor Red
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Claude Code 离线安装程序" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 获取脚本所在目录
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$packagesDir = Join-Path $scriptDir "packages"
$depsDir = Join-Path $scriptDir "dependencies"

Write-Host "安装目录: $InstallDir" -ForegroundColor Yellow
Write-Host "脚本目录: $scriptDir" -ForegroundColor Yellow
Write-Host ""

# 检查必要文件
Write-Host "检查安装包..." -ForegroundColor Cyan

$requiredFiles = @(
    "$packagesDir\windows\install.ps1"
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "错误: 缺少必要文件 $file" -ForegroundColor Red
        Write-Host "请确保所有下载的文件都在正确的位置" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✓ 必要文件检查通过" -ForegroundColor Green
Write-Host ""

# 安装 Git
if (-not $SkipGit) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "安装 Git" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    # 检查 Git 是否已安装
    $gitInstalled = $false
    try {
        $gitVersion = git --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Git 已安装: $gitVersion" -ForegroundColor Green
            $response = Read-Host "是否跳过 Git 安装? (Y/N)"
            if ($response -eq "Y" -or $response -eq "y") {
                $gitInstalled = $true
            }
        }
    } catch {
        # Git 未安装
    }

    if (-not $gitInstalled) {
        $gitInstaller = Get-ChildItem -Path "$depsDir\windows" -Filter "Git-*-64-bit.exe" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

        if ($gitInstaller) {
            Write-Host "找到 Git 安装包: $($gitInstaller.Name)" -ForegroundColor Yellow
            Write-Host "正在安装 Git..." -ForegroundColor Yellow

            # 静默安装 Git
            $installArgs = @(
                "/SILENT",
                "/DIR=C:\Program Files\Git",
                "/NORESTART",
                "/NOCANCEL",
                "/SUPPRESSMSGBOXES",
                "/CLOSEAPPLICATIONS",
                "/RESTARTAPPLICATIONS"
            )

            Start-Process -FilePath $gitInstaller.FullName -ArgumentList $installArgs -Wait -NoNewWindow

            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Git 安装成功" -ForegroundColor Green

                # 刷新环境变量
                $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
                refreshenv

                # 验证安装
                try {
                    $gitVersion = git --version 2>&1
                    Write-Host "✓ Git 版本: $gitVersion" -ForegroundColor Green
                } catch {
                    Write-Host "! Git 安装完成，但需要重启终端才能使用" -ForegroundColor Yellow
                }
            } else {
                Write-Host "✗ Git 安装失败" -ForegroundColor Red
                Write-Host "请手动运行: $($gitInstaller.FullName)" -ForegroundColor Yellow
            }
        } else {
            Write-Host "未找到 Git 安装包" -ForegroundColor Yellow
            Write-Host "请下载 Git for Windows 并保存到: $depsDir\windows" -ForegroundColor Gray
        }
    }
    Write-Host ""
}

# 安装 Node.js（可选）
if (-not $SkipNode) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "安装 Node.js" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    # 检查 Node.js 是否已安装
    $nodeInstalled = $false
    try {
        $nodeVersion = node --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Node.js 已安装: $nodeVersion" -ForegroundColor Green
            $response = Read-Host "是否跳过 Node.js 安装? (Y/N)"
            if ($response -eq "Y" -or $response -eq "y") {
                $nodeInstalled = $true
            }
        }
    } catch {
        # Node.js 未安装
    }

    if (-not $nodeInstalled) {
        $nodeMsi = Get-ChildItem -Path "$depsDir\windows" -Filter "node-*-x64.msi" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

        if ($nodeMsi) {
            Write-Host "找到 Node.js 安装包: $($nodeMsi.Name)" -ForegroundColor Yellow
            Write-Host "正在安装 Node.js..." -ForegroundColor Yellow

            # 静默安装 Node.js
            $installArgs = @(
                "/i",
                "`"$($nodeMsi.FullName)`"",
                "/quiet",
                "/norestart"
            )

            Start-Process -FilePath "msiexec.exe" -ArgumentList $installArgs -Wait

            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Node.js 安装成功" -ForegroundColor Green

                # 刷新环境变量
                $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
                refreshenv

                # 验证安装
                try {
                    $nodeVersion = node --version 2>&1
                    Write-Host "✓ Node.js 版本: $nodeVersion" -ForegroundColor Green

                    $npmVersion = npm --version 2>&1
                    Write-Host "✓ npm 版本: $npmVersion" -ForegroundColor Green
                } catch {
                    Write-Host "! Node.js 安装完成，但需要重启终端才能使用" -ForegroundColor Yellow
                }
            } else {
                Write-Host "✗ Node.js 安装失败" -ForegroundColor Red
            }
        } else {
            Write-Host "未找到 Node.js 安装包" -ForegroundColor Yellow
            Write-Host "如果需要 npm 安装方式，请下载 Node.js MSI 安装包" -ForegroundColor Gray
        }
    }
    Write-Host ""
}

# 安装 Claude Code
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "安装 Claude Code" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan"

# 检查 Claude Code 安装脚本
$installScript = "$packagesDir\windows\install.ps1"

if (Test-Path $installScript) {
    Write-Host "找到 Claude Code 安装脚本" -ForegroundColor Green
    Write-Host ""
    Write-Host "注意: Claude Code 官方安装脚本可能会尝试从网络下载文件" -ForegroundColor Yellow
    Write-Host "如果需要完全离线安装，请下载二进制文件并手动安装" -ForegroundColor Yellow
    Write-Host ""

    $response = Read-Host "是否继续运行官方安装脚本? (Y/N)"
    if ($response -eq "Y" -or $response -eq "y") {
        Write-Host "正在运行 Claude Code 安装脚本..." -ForegroundColor Yellow

        # 执行安装脚本
        & $installScript

        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Claude Code 安装成功" -ForegroundColor Green
        } else {
            Write-Host "! Claude Code 安装脚本执行完成" -ForegroundColor Yellow
        }
    } else {
        Write-Host "跳过官方安装脚本" -ForegroundColor Yellow
    }
} else {
    Write-Host "未找到 Claude Code 安装脚本" -ForegroundColor Yellow
}

Write-Host ""

# 验证安装
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "验证安装" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan"

# 检查 claude 命令
try {
    $claudeVersion = claude --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Claude Code 已安装: $claudeVersion" -ForegroundColor Green
    } else {
        Write-Host "! Claude Code 命令找到，但可能未正确安装" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Claude Code 命令未找到" -ForegroundColor Red
    Write-Host "可能需要重启终端或手动添加到 PATH" -ForegroundColor Yellow
}

Write-Host ""

# 显示后续步骤
Write-Host "========================================" -ForegroundColor Green
Write-Host "安装完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green"
Write-Host ""

Write-Host "后续步骤:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 重启终端（或执行 refreshenv 刷新环境变量）" -ForegroundColor Gray
Write-Host "2. 验证安装: claude --version" -ForegroundColor Gray
Write-Host "3. 配置 API 密钥: claude config set api-key YOUR_API_KEY" -ForegroundColor Gray
Write-Host "4. 测试: claude '你好'" -ForegroundColor Gray"
Write-Host ""

Write-Host "获取 API 密钥: https://console.anthropic.com/" -ForegroundColor Cyan
Write-Host ""

exit 0
