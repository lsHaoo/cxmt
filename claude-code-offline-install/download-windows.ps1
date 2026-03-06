# Claude Code 离线安装包 - Windows 下载脚本
#
# 使用说明：
# 1. 在联网的 Windows 机器上以管理员身份运行 PowerShell
# 2. 执行此脚本: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
# 3. 然后运行: .\download-windows.ps1

param(
    [string]$TargetDir = "D:\claude-code-offline-install"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Claude Code 离线安装包下载工具 (Windows)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 创建目录结构
Write-Host "创建目录结构..." -ForegroundColor Yellow
$directories = @(
    "$TargetDir\packages\windows",
    "$TargetDir\dependencies\windows"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Write-Host "  ✓ 创建目录: $dir" -ForegroundColor Green
    } else {
        Write-Host "  ✓ 目录已存在: $dir" -ForegroundColor Gray
    }
}

Write-Host ""

# 下载函数
function Download-File {
    param(
        [string]$Url,
        [string]$Destination,
        [string]$Description
    )

    Write-Host "下载: $Description" -ForegroundColor Cyan

    try {
        # 检查文件是否已存在
        if (Test-Path $Destination) {
            $response = Read-Host "  文件已存在，是否重新下载? (Y/N)"
            if ($response -ne "Y" -and $response -ne "y") {
                Write-Host "  ✓ 跳过: $Destination" -ForegroundColor Gray
                return
            }
        }

        # 使用 Invoke-WebRequest 下载
        $ProgressPreference = 'SilentlyContinue'  # 提高下载速度
        Invoke-WebRequest -Uri $Url -OutFile $Destination -UseBasicParsing
        $ProgressPreference = 'Continue'

        if (Test-Path $Destination) {
            $fileSize = (Get-Item $Destination).Length / 1MB
            Write-Host "  ✓ 下载成功: $Destination ($([math]::Round($fileSize, 2)) MB)" -ForegroundColor Green
        } else {
            Write-Host "  ✗ 下载失败: $Destination" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "  ✗ 下载出错: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 下载 Claude Code 安装脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "下载 Claude Code 安装脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Download-File -Url "https://claude.ai/install.ps1" `
              -Destination "$TargetDir\packages\windows\install.ps1" `
              -Description "Claude Code Windows 安装脚本"

Write-Host ""

# 下载 Node.js
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "下载 Node.js 20.x LTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$nodeVersion = "v20.14.0"
Download-File -Url "https://nodejs.org/dist/latest-v20.x/node-$nodeVersion-x64.msi" `
              -Destination "$TargetDir\dependencies\windows\node-$nodeVersion-x64.msi" `
              -Description "Node.js $nodeVersion x64 MSI"

Download-File -Url "https://nodejs.org/dist/latest-v20.x/node-$nodeVersion-x64.zip" `
              -Destination "$TargetDir\dependencies\windows\node-$nodeVersion-x64.zip" `
              -Description "Node.js $nodeVersion x64 ZIP"

Write-Host ""

# 下载 ripgrep (文本搜索工具)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "下载 ripgrep (文本搜索工具)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$ripgrepVersion = "14.1.0"
Download-File -Url "https://github.com/BurntSushi/ripgrep/releases/download/$ripgrepVersion/ripgrep-$ripgrepVersion-x86_64-pc-windows-msvc.zip" `
              -Destination "$TargetDir\dependencies\windows\ripgrep-$ripgrepVersion-x86_64-pc-windows-msvc.zip" `
              -Description "ripgrep $ripgrepVersion Windows x64"

Write-Host ""

# 提示手动下载
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "需要手动下载的文件" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "以下文件需要手动下载，因为官方可能没有直接的下载链接：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Git for Windows (必需)" -ForegroundColor Cyan
Write-Host "   下载地址: https://git-scm.com/download/win" -ForegroundColor Gray
Write-Host "   保存位置: $TargetDir\dependencies\windows\Git-x.x.x.x-64-bit.exe" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Claude Code 二进制文件 (可选，用于完全离线安装)" -ForegroundColor Cyan
Write-Host "   下载地址: https://github.com/anthropics/claude-code/releases/latest" -ForegroundColor Gray
Write-Host "   保存位置: $TargetDir\packages\windows\claude-code-windows-x64.zip" -ForegroundColor Gray
Write-Host ""

# 显示下载统计
Write-Host "========================================" -ForegroundColor Green
Write-Host "下载统计" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$downloadedFiles = Get-ChildItem -Path $TargetDir -Recurse -File
$totalSize = ($downloadedFiles | Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host "已下载文件数: $($downloadedFiles.Count)" -ForegroundColor Green
Write-Host "总大小: $([math]::Round($totalSize, 2)) MB" -ForegroundColor Green
Write-Host ""

# 生成校验和
Write-Host "生成文件校验和..." -ForegroundColor Yellow
$hashFile = "$TargetDir\checksums.txt"
if (Test-Path $hashFile) {
    Remove-Item $hashFile -Force
}

foreach ($file in $downloadedFiles) {
    $hash = Get-FileHash -Path $file.FullName -Algorithm SHA256 | Select-Object -ExpandProperty Hash
    $relativePath = $file.FullName.Substring($TargetDir.Length + 1)
    Add-Content -Path $hashFile -Value "$hash  $relativePath"
}

Write-Host "  ✓ 校验和已保存到: $hashFile" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "下载完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "下一步：" -ForegroundColor Yellow
Write-Host "1. 下载上述需要手动下载的文件" -ForegroundColor Gray
Write-Host "2. 验证所有文件完整性" -ForegroundColor Gray
Write-Host "3. 将整个文件夹打包传输到离线环境" -ForegroundColor Gray
Write-Host "   打包命令: Compress-Archive -Path .\claude-code-offline-install\* -DestinationPath claude-code-offline-install.zip" -ForegroundColor Gray
Write-Host "4. 参考README.md进行离线安装" -ForegroundColor Gray
Write-Host ""
