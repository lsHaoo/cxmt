import "./paths-B4BZAPZh.js";
import { B as theme } from "./utils-BKDT474X.js";
import "./thinking-BB3zi8pq.js";
import "./agent-scope-DCKfYrWF.js";
import { f as defaultRuntime } from "./subsystem-DypCPrmP.js";
import "./openclaw-root-CFLIucxC.js";
import "./exec-DNET3cHX.js";
import "./model-selection-D5bdsDNY.js";
import "./github-copilot-token-nncItI8D.js";
import "./boolean-CE7i9tBR.js";
import "./env-CCK0T6mv.js";
import "./host-env-security-CJMD0__Z.js";
import "./env-vars-gp4sxqr7.js";
import "./manifest-registry-D39cxiPQ.js";
import "./dock-DZksOMxK.js";
import "./message-channel-_kxdCJ2B.js";
import "./pi-embedded-helpers-Owo_MP-M.js";
import "./sandbox-SkCatvNh.js";
import "./tool-catalog-BNWFbKiv.js";
import "./chrome-DCsRzCx4.js";
import "./tailscale-H3XFAlm6.js";
import "./tailnet-CwqDa0sm.js";
import "./ws-Cab5F8X5.js";
import "./auth-DjnTkV-X.js";
import "./server-context-BRbfI2_u.js";
import "./frontmatter-Dn_0bQcK.js";
import "./skills-v5QA6O0B.js";
import "./path-alias-guards-DQp98Rah.js";
import "./paths-Dei-dB1U.js";
import "./redact-DKstN8W8.js";
import "./errors-CHThjNy0.js";
import "./fs-safe-DBwFyJPg.js";
import "./ssrf-b8x-ZZ5W.js";
import "./image-ops-BstIV9Yi.js";
import "./store-zbVUnYIR.js";
import "./ports-CqAQp7mK.js";
import "./trash-BgNG7SI6.js";
import "./server-middleware-nJMjtRlR.js";
import "./sessions-CZ0UmHMC.js";
import "./plugins-ca2fC-bv.js";
import "./accounts-BCPiwTlf.js";
import "./accounts-BC4fvRT_.js";
import "./accounts-ClU97yHE.js";
import "./bindings-b_7t7dr3.js";
import "./logging-w5jq5901.js";
import "./paths-D6oKH7El.js";
import "./chat-envelope-BZKQmhVe.js";
import "./tool-images-gM5beWVR.js";
import "./tool-display-B99otER_.js";
import "./commands-CXL-JSJY.js";
import "./commands-registry-D3cKveD9.js";
import "./client-cdKRFWvq.js";
import "./call-DmViE-7l.js";
import "./pairing-token-CFZD9EYj.js";
import { t as formatDocsLink } from "./links-CYhRQ-mf.js";
import { t as parseTimeoutMs } from "./parse-timeout-Qn1Iz-V-.js";
import { t as runTui } from "./tui-CefbKgXA.js";

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