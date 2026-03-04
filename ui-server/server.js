import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9090;
const UI_DIST_PATH = path.join(__dirname, "../dist/control-ui");
const GATEWAY_URL = process.env.GATEWAY_URL || "ws://localhost:8081";

// CORS 配置 - 允许跨域请求
app.use(cors({
  origin: "*", // 允许所有源
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 设置响应头，允许 WebSocket 升级
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// 提供静态文件
app.use(express.static(UI_DIST_PATH));

// 所有其他请求都返回 index.html（支持 SPA 路由）
app.get("*", (req, res) => {
  res.sendFile(path.join(UI_DIST_PATH, "index.html"));
});

// WebSocket 代理信息端点
app.get("/gateway-config", (req, res) => {
  res.json({
    gatewayUrl: GATEWAY_URL,
    wsUrl: GATEWAY_URL.replace(/^http/, "ws"),
  });
});

app.listen(PORT, () => {
  console.log(`OpenClaw UI Server running at:`);
  console.log(`  - http://localhost:${PORT}`);
  console.log(`\nServing files from: ${UI_DIST_PATH}`);
  console.log(`Gateway URL: ${GATEWAY_URL}`);
  console.log(`\nNote: Make sure to build the UI first with: cd ui && npm run build`);
});
