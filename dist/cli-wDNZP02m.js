import "./paths-B9jPXz5d.js";
import { t as createSubsystemLogger } from "./subsystem-CDGdCagb.js";
import "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import { j as loadConfig } from "./auth-profiles-B3i22awe.js";
import { d as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-CkjEOGci.js";
import "./openclaw-root-CB7tjNbo.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-JXmwWO7X.js";
import "./dock-Tl4rkwup.js";
import "./model-C0CParr6.js";
import "./pi-model-discovery-jX3zZFqH.js";
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
import "./send-ChLreaxT.js";
import "./send-DJlUYVwQ.js";
import { _ as loadOpenClawPlugins } from "./subagent-registry-hrLXtP6-.js";
import "./paths-CFZJ4dSy.js";
import "./chat-envelope-DMwAJAv3.js";
import "./client-DL0PWwAo.js";
import "./call-lt0YOsXc.js";
import "./pairing-token-DR7_a9gi.js";
import "./net-CJdMuDsJ.js";
import "./tailnet-10d39wOc.js";
import "./tokens-CdWFvf3y.js";
import "./with-timeout-w3m995Od.js";
import "./deliver-MUqOSzoe.js";
import "./diagnostic-Dx0T78zC.js";
import "./diagnostic-session-state-I4x9gPY4.js";
import "./send-DaBWu3GS.js";
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
import "./models-config-Dcr-ldc7.js";
import "./exec-approvals-allowlist-DwCEITwA.js";
import "./exec-safe-bin-runtime-policy-mpLSTNFx.js";
import "./reply-prefix-B2UgX8_Z.js";
import "./memory-cli-C7H9no1W.js";
import "./manager-DVruPGvi.js";
import "./gemini-auth-wo4sIx9w.js";
import "./fetch-guard-CbkQ1FjU.js";
import "./query-expansion-B20mBC1K.js";
import "./retry-BZsXTDB8.js";
import "./target-errors-F2irv5nD.js";
import "./local-roots-DIhPdLAF.js";
import "./chunk-BbQbIg_E.js";
import "./markdown-tables-BVxIYKBn.js";
import "./ir-8bVGK0g5.js";
import "./render-CUAKPmvZ.js";
import "./commands-DKySoJ6f.js";
import "./commands-registry-D1rvbpVY.js";
import "./image-qvNrpi4e.js";
import "./tool-display-B-Kg-QB2.js";
import "./runner-DrfYWRpe.js";
import "./model-catalog-DouetniK.js";
import "./fetch-CEocu0FI.js";
import "./pairing-store-DuAGcZUi.js";
import "./exec-approvals-CW5vbjsH.js";
import "./nodes-screen-_Ub7A-AZ.js";
import "./system-run-command-GxDyXzco.js";
import "./session-utils-FGDBjjq8.js";
import "./session-cost-usage-y2VpZJN5.js";
import "./skill-commands-B5g8fH1u.js";
import "./workspace-dirs-BIlumfko.js";
import "./channel-activity-CEdJpKzf.js";
import "./tables-BYf9FaEG.js";
import "./server-lifecycle-CfpxyF4q.js";
import "./stagger-D34qqlHi.js";
import "./channel-selection-BB8b_l9h.js";
import "./plugin-auto-enable-DoexUoE2.js";
import "./send-TumqMWIH.js";
import "./outbound-attachment-5WPyvDDH.js";
import "./delivery-queue-CeyVwX36.js";
import "./send-DK_QVoSo.js";
import "./resolve-route-DKCOLR5c.js";
import "./pi-tools.policy-B5RIKzy7.js";
import "./proxy-R5TjOIFS.js";
import "./links-DMmQqqmC.js";
import "./cli-utils-Dp61QuRB.js";
import "./help-format-Mg63VRVq.js";
import "./progress-C1ycUGtl.js";
import "./replies-DizmfmeD.js";
import "./onboard-helpers-DNJKInQI.js";
import "./prompt-style-BBtxOcmy.js";
import "./pairing-labels-lPYEjOCr.js";

//#region src/plugins/cli.ts
const log = createSubsystemLogger("plugins");
function registerPluginCliCommands(program, cfg) {
	const config = cfg ?? loadConfig();
	const workspaceDir = resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config));
	const logger = {
		info: (msg) => log.info(msg),
		warn: (msg) => log.warn(msg),
		error: (msg) => log.error(msg),
		debug: (msg) => log.debug(msg)
	};
	const registry = loadOpenClawPlugins({
		config,
		workspaceDir,
		logger
	});
	const existingCommands = new Set(program.commands.map((cmd) => cmd.name()));
	for (const entry of registry.cliRegistrars) {
		if (entry.commands.length > 0) {
			const overlaps = entry.commands.filter((command) => existingCommands.has(command));
			if (overlaps.length > 0) {
				log.debug(`plugin CLI register skipped (${entry.pluginId}): command already registered (${overlaps.join(", ")})`);
				continue;
			}
		}
		try {
			const result = entry.register({
				program,
				config,
				workspaceDir,
				logger
			});
			if (result && typeof result.then === "function") result.catch((err) => {
				log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
			});
			for (const command of entry.commands) existingCommands.add(command);
		} catch (err) {
			log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
		}
	}
}

//#endregion
export { registerPluginCliCommands };