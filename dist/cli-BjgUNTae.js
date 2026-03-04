import "./paths-B4BZAPZh.js";
import "./utils-BKDT474X.js";
import "./thinking-BB3zi8pq.js";
import { lt as loadOpenClawPlugins } from "./reply-BDid6G6G.js";
import { d as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-DCKfYrWF.js";
import { t as createSubsystemLogger } from "./subsystem-DypCPrmP.js";
import "./openclaw-root-CFLIucxC.js";
import "./exec-DNET3cHX.js";
import { Vt as loadConfig } from "./model-selection-D5bdsDNY.js";
import "./github-copilot-token-nncItI8D.js";
import "./boolean-CE7i9tBR.js";
import "./env-CCK0T6mv.js";
import "./host-env-security-CJMD0__Z.js";
import "./env-vars-gp4sxqr7.js";
import "./manifest-registry-D39cxiPQ.js";
import "./dock-DZksOMxK.js";
import "./message-channel-_kxdCJ2B.js";
import "./send-CFuRPgEN.js";
import "./runner-BD4XGEn4.js";
import "./image-nYZjrEqS.js";
import "./models-config-DcgFofw6.js";
import "./pi-model-discovery-D1_F17BY.js";
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
import "./send-8h8S6Td-.js";
import "./paths-D6oKH7El.js";
import "./chat-envelope-BZKQmhVe.js";
import "./tool-images-gM5beWVR.js";
import "./tool-display-B99otER_.js";
import "./fetch-guard-BixFaB4b.js";
import "./api-key-rotation-DpgSEWoA.js";
import "./local-roots-DHge5pVo.js";
import "./model-catalog-vCVbelRl.js";
import "./tokens-DJ4yQG8m.js";
import "./deliver-BRSji4ag.js";
import "./commands-CXL-JSJY.js";
import "./commands-registry-D3cKveD9.js";
import "./client-cdKRFWvq.js";
import "./call-DmViE-7l.js";
import "./pairing-token-CFZD9EYj.js";
import "./fetch-BHbxkJbr.js";
import "./retry-ci_T4ilQ.js";
import "./pairing-store-B_Cx3XpU.js";
import "./exec-approvals-Dwjjra4U.js";
import "./exec-approvals-allowlist-CuBaZFmh.js";
import "./exec-safe-bin-runtime-policy-CYWcTUa0.js";
import "./nodes-screen-ZyA20WU3.js";
import "./target-errors-DblYEa7D.js";
import "./system-run-command-Cwg32hiJ.js";
import "./diagnostic-session-state-pvX9RRTI.js";
import "./with-timeout-CB5i6Q7X.js";
import "./diagnostic-DkPT-fbI.js";
import "./send-CiNYNUL3.js";
import "./model-DaHMFgOH.js";
import "./reply-prefix-CayudrxA.js";
import "./memory-cli-Cvi2Oakh.js";
import "./manager-B64K3eGf.js";
import "./query-expansion-B_2Jogfz.js";
import "./chunk-CEZkHu7K.js";
import "./markdown-tables-DV9G2JHM.js";
import "./ir-CtANU_4K.js";
import "./render-C1H8wE-4.js";
import "./channel-selection-COxK2fxR.js";
import "./plugin-auto-enable-6U0hEn7l.js";
import "./send-Dj9Cm6O4.js";
import "./outbound-attachment-CpRE9JS_.js";
import "./delivery-queue-CziGqr_K.js";
import "./send-DtYucE3X.js";
import "./resolve-route-Dtr06Vnh.js";
import "./pi-tools.policy-a7RAa8m8.js";
import "./channel-activity-e4kOuESI.js";
import "./tables-DU4e2sAs.js";
import "./proxy-xwFQyqVC.js";
import "./links-CYhRQ-mf.js";
import "./cli-utils-DJ7Nfw8J.js";
import "./help-format-0Ly5Aikr.js";
import "./progress-Css73oKg.js";
import "./replies-CEpQoIX7.js";
import "./skill-commands-IulS3PgO.js";
import "./workspace-dirs-0q9keZ0P.js";
import "./session-cost-usage-yxex7trN.js";
import "./onboard-helpers-D2d0cdew.js";
import "./prompt-style-B8dl6hQj.js";
import "./pairing-labels-B6b5-C6S.js";
import "./server-lifecycle-DkcQ8ai8.js";
import "./stagger-CdUj6Foa.js";

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