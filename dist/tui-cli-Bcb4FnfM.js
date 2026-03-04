import "./paths-B9jPXz5d.js";
import { f as defaultRuntime } from "./subsystem-CDGdCagb.js";
import { z as theme } from "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import "./auth-profiles-B3i22awe.js";
import "./agent-scope-CkjEOGci.js";
import "./openclaw-root-CB7tjNbo.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-JXmwWO7X.js";
import "./dock-Tl4rkwup.js";
import "./frontmatter-Cqa5i1Xb.js";
import "./skills-yeQbeVI2.js";
import "./path-alias-guards-CLUFoulU.js";
import "./message-channel--ZQegy69.js";
import "./sessions-QsgnCkPz.js";
import "./plugins-DVEE9xtr.js";
import "./accounts-mSQfaYxT.js";
import "./accounts-Drxr268V.js";
import "./accounts-DzYPWfMe.js";
import "./bindings-D9TcP6QC.js";
import "./logging-BvdokaVt.js";
import "./paths-CFZJ4dSy.js";
import "./chat-envelope-DMwAJAv3.js";
import "./client-DL0PWwAo.js";
import "./call-lt0YOsXc.js";
import "./pairing-token-DR7_a9gi.js";
import "./net-CJdMuDsJ.js";
import "./tailnet-10d39wOc.js";
import "./image-ops-DVDevqu4.js";
import "./pi-embedded-helpers-DcH_Jvhl.js";
import "./sandbox-BbEuIAjH.js";
import "./tool-catalog-B4gxY3Jd.js";
import "./chrome-pqdAY6mh.js";
import "./tailscale-RsI6sScm.js";
import "./auth-DW_g7kiW.js";
import "./server-context-Jt07MuNc.js";
import "./paths-BMEYU0fu.js";
import "./redact-Bdn22hWn.js";
import "./errors-DQoYsN9P.js";
import "./fs-safe-DSbZ3X8f.js";
import "./ssrf-BsOvyTP0.js";
import "./store-DR1i3yWv.js";
import "./ports-SY8r1M1V.js";
import "./trash-WJ5rbxj0.js";
import "./server-middleware-cvDjxW5y.js";
import "./tool-images-CLwEsa9R.js";
import "./thinking-lfnd6MLT.js";
import "./commands-DKySoJ6f.js";
import "./commands-registry-D1rvbpVY.js";
import "./tool-display-B-Kg-QB2.js";
import { t as parseTimeoutMs } from "./parse-timeout-DmEcHIsV.js";
import { t as formatDocsLink } from "./links-DMmQqqmC.js";
import { t as runTui } from "./tui-CWyVYd98.js";

//#region src/cli/tui-cli.ts
function registerTuiCli(program) {
	program.command("tui").description("Open a terminal UI connected to the Gateway").option("--url <url>", "Gateway WebSocket URL (defaults to gateway.remote.url when configured)").option("--token <token>", "Gateway token (if required)").option("--password <password>", "Gateway password (if required)").option("--session <key>", "Session key (default: \"main\", or \"global\" when scope is global)").option("--deliver", "Deliver assistant replies", false).option("--thinking <level>", "Thinking level override").option("--message <text>", "Send an initial message after connecting").option("--timeout-ms <ms>", "Agent timeout in ms (defaults to agents.defaults.timeoutSeconds)").option("--history-limit <n>", "History entries to load", "200").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/tui", "docs.openclaw.ai/cli/tui")}\n`).action(async (opts) => {
		try {
			const timeoutMs = parseTimeoutMs(opts.timeoutMs);
			if (opts.timeoutMs !== void 0 && timeoutMs === void 0) defaultRuntime.error(`warning: invalid --timeout-ms "${String(opts.timeoutMs)}"; ignoring`);
			const historyLimit = Number.parseInt(String(opts.historyLimit ?? "200"), 10);
			await runTui({
				url: opts.url,
				token: opts.token,
				password: opts.password,
				session: opts.session,
				deliver: Boolean(opts.deliver),
				thinking: opts.thinking,
				message: opts.message,
				timeoutMs,
				historyLimit: Number.isNaN(historyLimit) ? void 0 : historyLimit
			});
		} catch (err) {
			defaultRuntime.error(String(err));
			defaultRuntime.exit(1);
		}
	});
}

//#endregion
export { registerTuiCli };