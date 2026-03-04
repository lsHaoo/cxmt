import "./paths-B9jPXz5d.js";
import { t as createSubsystemLogger } from "./subsystem-CDGdCagb.js";
import "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import { j as loadConfig } from "./auth-profiles-BxNoHpB2.js";
import { d as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-n30bsiQh.js";
import "./openclaw-root-ZH0m1QmV.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-B3qz5BZQ.js";
import "./dock-DWhZAhpT.js";
import "./model-B3Uxq_6Q.js";
import "./pi-model-discovery-DCFV5662.js";
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
import "./send-CTn_V4uu.js";
import "./send-DANIzgue.js";
import { _ as loadOpenClawPlugins } from "./subagent-registry-BL8gsolN.js";
import "./paths-CFZJ4dSy.js";
import "./chat-envelope-DMwAJAv3.js";
import "./client-BNUDbnZe.js";
import "./call-Bf-5ddnB.js";
import "./pairing-token-C_35MNZC.js";
import "./net-CHRmVd5x.js";
import "./tailnet-c5dztY9y.js";
import "./tokens-CdWFvf3y.js";
import "./with-timeout-CenpOfCL.js";
import "./deliver-DvY1Xxk6.js";
import "./diagnostic-Dn3ZqWZg.js";
import "./diagnostic-session-state-I4x9gPY4.js";
import "./send-CRhdb75U.js";
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
import "./models-config-CVdZOKZ0.js";
import "./exec-approvals-allowlist-6RDL4-rj.js";
import "./exec-safe-bin-runtime-policy-Dh4zft-K.js";
import "./reply-prefix-BKzbeYYW.js";
import "./memory-cli-Ch8s4gqA.js";
import "./manager-gE13wutQ.js";
import "./gemini-auth-Ge4D1dDl.js";
import "./fetch-guard-BE2XzHCy.js";
import "./query-expansion-CiF2VlPc.js";
import "./retry-BZsXTDB8.js";
import "./target-errors-DHaeyvZd.js";
import "./local-roots-CK2LtbfL.js";
import "./chunk-BbQbIg_E.js";
import "./markdown-tables-CDiItLvj.js";
import "./ir-BrK73Rlt.js";
import "./render-CUAKPmvZ.js";
import "./commands-DiIcbyJ4.js";
import "./commands-registry-Bd9xjgvj.js";
import "./image-CNUMj2Y0.js";
import "./tool-display-B-Kg-QB2.js";
import "./runner-B_Vb_AoQ.js";
import "./model-catalog-B3y9KpEw.js";
import "./fetch-CEocu0FI.js";
import "./pairing-store-5eLVYnmM.js";
import "./exec-approvals-CW5vbjsH.js";
import "./nodes-screen-D9tzVYXu.js";
import "./system-run-command-DwyLR8Fh.js";
import "./session-utils-rmCGXyTV.js";
import "./session-cost-usage-y2VpZJN5.js";
import "./skill-commands-r8sYTSmo.js";
import "./workspace-dirs-Dm3_8trY.js";
import "./channel-activity-CEdJpKzf.js";
import "./tables-DtAV_L4L.js";
import "./server-lifecycle-Do--icNP.js";
import "./stagger-D34qqlHi.js";
import "./channel-selection-JmFBvk27.js";
import "./plugin-auto-enable-Brd60k_-.js";
import "./send-DVaRcXGi.js";
import "./outbound-attachment-Dwdt0Vho.js";
import "./delivery-queue-CeyVwX36.js";
import "./send-QUvkc_o5.js";
import "./resolve-route-CNJL3fmE.js";
import "./pi-tools.policy-zqj1mKua.js";
import "./proxy-R5TjOIFS.js";
import "./links-DMmQqqmC.js";
import "./cli-utils-Dp61QuRB.js";
import "./help-format-Mg63VRVq.js";
import "./progress-C1ycUGtl.js";
import "./replies-BaVouwqo.js";
import "./onboard-helpers-Dauoz6wi.js";
import "./prompt-style-BBtxOcmy.js";
import "./pairing-labels-BBZ9T8b8.js";

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