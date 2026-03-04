import "./paths-B9jPXz5d.js";
import { t as createSubsystemLogger } from "./subsystem-CDGdCagb.js";
import "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import { j as loadConfig } from "./auth-profiles-BxNoHpB2.js";
import "./agent-scope-n30bsiQh.js";
import "./openclaw-root-ZH0m1QmV.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-B3qz5BZQ.js";
import "./path-alias-guards-CQlXQvHj.js";
import "./net-CHRmVd5x.js";
import "./tailnet-c5dztY9y.js";
import "./image-ops-D6beOpsg.js";
import "./chrome-BhWgdWIu.js";
import "./tailscale-RsI6sScm.js";
import "./auth-Bv2H7QYs.js";
import { c as resolveBrowserControlAuth, i as resolveBrowserConfig, r as registerBrowserRoutes, s as ensureBrowserControlAuth, t as createBrowserRouteContext } from "./server-context-CHISKPA4.js";
import "./paths-DBpUBZFi.js";
import "./redact-Bdn22hWn.js";
import "./errors-DQoYsN9P.js";
import "./fs-safe-CBQuUWQM.js";
import "./ssrf-DICpRYXQ.js";
import "./store-wGCCtm6d.js";
import "./ports-CF8KDGWC.js";
import "./trash-WJ5rbxj0.js";
import { n as installBrowserCommonMiddleware, t as installBrowserAuthMiddleware } from "./server-middleware-CvQkgbyI.js";
import { n as stopKnownBrowserProfiles, t as ensureExtensionRelayForProfiles } from "./server-lifecycle-Do--icNP.js";
import { t as isPwAiLoaded } from "./tool-loop-detection-CMuMZa4P.js";
import express from "express";

//#region src/browser/server.ts
let state = null;
const logServer = createSubsystemLogger("browser").child("server");
async function startBrowserControlServerFromConfig() {
	if (state) return state;
	const cfg = loadConfig();
	const resolved = resolveBrowserConfig(cfg.browser, cfg);
	if (!resolved.enabled) return null;
	let browserAuth = resolveBrowserControlAuth(cfg);
	let browserAuthBootstrapFailed = false;
	try {
		const ensured = await ensureBrowserControlAuth({ cfg });
		browserAuth = ensured.auth;
		if (ensured.generatedToken) logServer.info("No browser auth configured; generated gateway.auth.token automatically.");
	} catch (err) {
		logServer.warn(`failed to auto-configure browser auth: ${String(err)}`);
		browserAuthBootstrapFailed = true;
	}
	if (browserAuthBootstrapFailed && !browserAuth.token && !browserAuth.password) {
		logServer.error("browser control startup aborted: authentication bootstrap failed and no fallback auth is configured.");
		return null;
	}
	const app = express();
	installBrowserCommonMiddleware(app);
	installBrowserAuthMiddleware(app, browserAuth);
	registerBrowserRoutes(app, createBrowserRouteContext({
		getState: () => state,
		refreshConfigFromDisk: true
	}));
	const port = resolved.controlPort;
	const server = await new Promise((resolve, reject) => {
		const s = app.listen(port, "127.0.0.1", () => resolve(s));
		s.once("error", reject);
	}).catch((err) => {
		logServer.error(`openclaw browser server failed to bind 127.0.0.1:${port}: ${String(err)}`);
		return null;
	});
	if (!server) return null;
	state = {
		server,
		port,
		resolved,
		profiles: /* @__PURE__ */ new Map()
	};
	await ensureExtensionRelayForProfiles({
		resolved,
		onWarn: (message) => logServer.warn(message)
	});
	const authMode = browserAuth.token ? "token" : browserAuth.password ? "password" : "off";
	logServer.info(`Browser control listening on http://127.0.0.1:${port}/ (auth=${authMode})`);
	return state;
}
async function stopBrowserControlServer() {
	const current = state;
	if (!current) return;
	await stopKnownBrowserProfiles({
		getState: () => state,
		onWarn: (message) => logServer.warn(message)
	});
	if (current.server) await new Promise((resolve) => {
		current.server?.close(() => resolve());
	});
	state = null;
	if (isPwAiLoaded()) try {
		await (await import("./pw-ai-BX1fTZMH.js")).closePlaywrightBrowserConnection();
	} catch {}
}

//#endregion
export { startBrowserControlServerFromConfig, stopBrowserControlServer };