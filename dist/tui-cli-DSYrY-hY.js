import "./paths-B9jPXz5d.js";
import { f as defaultRuntime } from "./subsystem-CDGdCagb.js";
import { z as theme } from "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import "./auth-profiles-BxNoHpB2.js";
import "./agent-scope-n30bsiQh.js";
import "./openclaw-root-ZH0m1QmV.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-B3qz5BZQ.js";
import "./dock-DWhZAhpT.js";
import "./frontmatter-Cqa5i1Xb.js";
import "./skills-DL7EcGrF.js";
import "./path-alias-guards-CQlXQvHj.js";
import "./message-channel--ZQegy69.js";
import "./sessions-82afn4Xg.js";
import "./plugins-DSUGhzuH.js";
import "./accounts-x0oZK_GU.js";
import "./accounts-cxEUMdfm.js";
import "./accounts-nu2ApxKu.js";
import "./bindings-BPKoJ-K1.js";
import "./logging-BvdokaVt.js";
import "./paths-CFZJ4dSy.js";
import "./chat-envelope-DMwAJAv3.js";
import "./client-BNUDbnZe.js";
import "./call-Bf-5ddnB.js";
import "./pairing-token-C_35MNZC.js";
import "./net-CHRmVd5x.js";
import "./tailnet-c5dztY9y.js";
import "./image-ops-D6beOpsg.js";
import "./pi-embedded-helpers-BDueSHfe.js";
import "./sandbox-5ScJDoqv.js";
import "./tool-catalog-B4gxY3Jd.js";
import "./chrome-BhWgdWIu.js";
import "./tailscale-RsI6sScm.js";
import "./auth-Bv2H7QYs.js";
import "./server-context-CHISKPA4.js";
import "./paths-DBpUBZFi.js";
import "./redact-Bdn22hWn.js";
import "./errors-DQoYsN9P.js";
import "./fs-safe-CBQuUWQM.js";
import "./ssrf-DICpRYXQ.js";
import "./store-wGCCtm6d.js";
import "./ports-CF8KDGWC.js";
import "./trash-WJ5rbxj0.js";
import "./server-middleware-CvQkgbyI.js";
import "./tool-images-DsHt1x_L.js";
import "./thinking-lfnd6MLT.js";
import "./commands-DiIcbyJ4.js";
import "./commands-registry-Bd9xjgvj.js";
import "./tool-display-B-Kg-QB2.js";
import { t as parseTimeoutMs } from "./parse-timeout-DmEcHIsV.js";
import { t as formatDocsLink } from "./links-DMmQqqmC.js";
import { t as runTui } from "./tui-CH8a73at.js";

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