# OpenClaw UI Server

静态文件服务器，用于托管打包后的 OpenClaw UI，并解决跨域问题。

## 安装依赖

```bash
cd ui-server
npm install
```

## 构建前端

```bash
cd ../ui
npm run build
```

## 启动服务

```bash
cd ../ui-server
npm start
```

服务将在 http://localhost:8080 启动。

## 环境变量

- `GATEWAY_URL`: Gateway 服务地址（默认: ws://localhost:8081）

示例：
```bash
GATEWAY_URL=ws://localhost:8081 npm start
```

## 开发模式（带热重载）

```bash
npm run dev
```
