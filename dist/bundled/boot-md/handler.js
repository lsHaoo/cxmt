import { n as listAgentIds, s as resolveAgentWorkspaceDir } from "../../agent-scope-CmeamfDM.js";
import "../../paths-B9lBY6-m.js";
import { pt as isGatewayStartupEvent, r as defaultRuntime, t as createSubsystemLogger } from "../../subsystem-mPRezpll.js";
import { l as resolveAgentIdFromSessionKey } from "../../session-key-CPPWn8gW.js";
import "../../workspace-D5wcQf86.js";
import "../../model-selection-Blq4Gevc.js";
import "../../github-copilot-token-BgKF-7S1.js";
import "../../env-DijpAkAH.js";
import "../../boolean-M-esQJt6.js";
import "../../dock-DlkTyaLq.js";
import { n as SILENT_REPLY_TOKEN } from "../../tokens-DhiG-E4H.js";
import { a as createDefaultDeps, i as agentCommand } from "../../pi-embedded-DQHktVa9.js";
import "../../plugins-DovkDl6C.js";
import "../../accounts-CaRtAz_2.js";
import "../../bindings-8dEWCOjL.js";
import "../../send-D3wu_e0h.js";
import "../../send-CUIVuixi.js";
import "../../deliver-BLZ0dNqp.js";
import "../../diagnostic-dNTenbht.js";
import "../../diagnostic-session-state-C0Sxjfox.js";
import "../../accounts-8ZWbw0Zq.js";
import "../../send-D_l0SrLl.js";
import "../../image-ops-C6392gpr.js";
import "../../pi-model-discovery-CvbqRCrE.js";
import "../../message-channel-DKXv9Xa_.js";
import "../../pi-embedded-helpers-DkhPxo17.js";
import "../../chrome-_5bjyGv0.js";
import "../../frontmatter-eHCuq81z.js";
import "../../skills-I1P1Oa6J.js";
import "../../path-alias-guards-D1RrhtDQ.js";
import "../../redact-B5RjPWCN.js";
import "../../errors-BB1m5Yna.js";
import "../../fs-safe-uk-uvzuv.js";
import "../../ssrf-DOSwHDq8.js";
import "../../store-oJ-CTgOm.js";
import { H as resolveAgentMainSessionKey, W as resolveMainSessionKey, d as updateSessionStore, s as loadSessionStore } from "../../sessions-B_m17dWA.js";
import "../../accounts-CGJl1Z8Z.js";
import { l as resolveStorePath } from "../../paths-BXMwg9Yw.js";
import "../../tool-images-D2x__a7E.js";
import "../../thinking-DjGGQMbY.js";
import "../../image-Bo686FYN.js";
import "../../reply-prefix-BMQNAUPx.js";
import "../../manager-Cnz48EE7.js";
import "../../gemini-auth-CJDJkhS4.js";
import "../../fetch-guard-BkU0h6WR.js";
import "../../query-expansion-Ddv6lHJZ.js";
import "../../retry-_HyoIAOf.js";
import "../../target-errors-DF_y9O9a.js";
import "../../local-roots-CSPwg7jR.js";
import "../../chunk-CD6DGYOE.js";
import "../../markdown-tables-Cb7TkqhY.js";
import "../../ir-CTgLop5G.js";
import "../../render-DXuDCig7.js";
import "../../commands-registry-DD-Kdnb2.js";
import "../../skill-commands-Bln5E3_b.js";
import "../../runner-DuSX5DKl.js";
import "../../fetch-BOy2PxM9.js";
import "../../channel-activity-BaHijrb5.js";
import "../../tables-A9U18wbx.js";
import "../../send-BYvgXTha.js";
import "../../outbound-attachment-BfRBkNh4.js";
import "../../send-jYUwFJST.js";
import "../../resolve-route-DBaEoxmo.js";
import "../../proxy-pPaHJt5e.js";
import "../../replies-BamZ7_SI.js";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

//#region src/gateway/boot.ts
function generateBootSessionId() {
	return `boot-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").replace("T", "_").replace("Z", "")}-${crypto.randomUUID().slice(0, 8)}`;
}
const log$1 = createSubsystemLogger("gateway/boot");
const BOOT_FILENAME = "BOOT.md";
function buildBootPrompt(content) {
	return [
		"You are running a boot check. Follow BOOT.md instructions exactly.",
		"",
		"BOOT.md:",
		content,
		"",
		"If BOOT.md asks you to send a message, use the message tool (action=send with channel + target).",
		"Use the `target` field (not `to`) for message tool destinations.",
		`After sending with the message tool, reply with ONLY: ${SILENT_REPLY_TOKEN}.`,
		`If nothing needs attention, reply with ONLY: ${SILENT_REPLY_TOKEN}.`
	].join("\n");
}
async function loadBootFile(workspaceDir) {
	const bootPath = path.join(workspaceDir, BOOT_FILENAME);
	try {
		const trimmed = (await fs.readFile(bootPath, "utf-8")).trim();
		if (!trimmed) return { status: "empty" };
		return {
			status: "ok",
			content: trimmed
		};
	} catch (err) {
		if (err.code === "ENOENT") return { status: "missing" };
		throw err;
	}
}
function snapshotMainSessionMapping(params) {
	const agentId = resolveAgentIdFromSessionKey(params.sessionKey);
	const storePath = resolveStorePath(params.cfg.session?.store, { agentId });
	try {
		const entry = loadSessionStore(storePath, { skipCache: true })[params.sessionKey];
		if (!entry) return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: true,
			hadEntry: false
		};
		return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: true,
			hadEntry: true,
			entry: structuredClone(entry)
		};
	} catch (err) {
		log$1.debug("boot: could not snapshot main session mapping", {
			sessionKey: params.sessionKey,
			error: String(err)
		});
		return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: false,
			hadEntry: false
		};
	}
}
async function restoreMainSessionMapping(snapshot) {
	if (!snapshot.canRestore) return;
	try {
		await updateSessionStore(snapshot.storePath, (store) => {
			if (snapshot.hadEntry && snapshot.entry) {
				store[snapshot.sessionKey] = snapshot.entry;
				return;
			}
			delete store[snapshot.sessionKey];
		}, { activeSessionKey: snapshot.sessionKey });
		return;
	} catch (err) {
		return err instanceof Error ? err.message : String(err);
	}
}
async function runBootOnce(params) {
	const bootRuntime = {
		log: () => {},
		error: (message) => log$1.error(String(message)),
		exit: defaultRuntime.exit
	};
	let result;
	try {
		result = await loadBootFile(params.workspaceDir);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		log$1.error(`boot: failed to read ${BOOT_FILENAME}: ${message}`);
		return {
			status: "failed",
			reason: message
		};
	}
	if (result.status === "missing" || result.status === "empty") return {
		status: "skipped",
		reason: result.status
	};
	const sessionKey = params.agentId ? resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	}) : resolveMainSessionKey(params.cfg);
	const message = buildBootPrompt(result.content ?? "");
	const sessionId = generateBootSessionId();
	const mappingSnapshot = snapshotMainSessionMapping({
		cfg: params.cfg,
		sessionKey
	});
	let agentFailure;
	try {
		await agentCommand({
			message,
			sessionKey,
			sessionId,
			deliver: false,
			senderIsOwner: true
		}, bootRuntime, params.deps);
	} catch (err) {
		agentFailure = err instanceof Error ? err.message : String(err);
		log$1.error(`boot: agent run failed: ${agentFailure}`);
	}
	const mappingRestoreFailure = await restoreMainSessionMapping(mappingSnapshot);
	if (mappingRestoreFailure) log$1.error(`boot: failed to restore main session mapping: ${mappingRestoreFailure}`);
	if (!agentFailure && !mappingRestoreFailure) return { status: "ran" };
	return {
		status: "failed",
		reason: [agentFailure ? `agent run failed: ${agentFailure}` : void 0, mappingRestoreFailure ? `mapping restore failed: ${mappingRestoreFailure}` : void 0].filter((part) => Boolean(part)).join("; ")
	};
}

//#endregion
//#region src/hooks/bundled/boot-md/handler.ts
const log = createSubsystemLogger("hooks/boot-md");
const runBootChecklist = async (event) => {
	if (!isGatewayStartupEvent(event)) return;
	if (!event.context.cfg) return;
	const cfg = event.context.cfg;
	const deps = event.context.deps ?? createDefaultDeps();
	const agentIds = listAgentIds(cfg);
	for (const agentId of agentIds) {
		const workspaceDir = resolveAgentWorkspaceDir(cfg, agentId);
		const result = await runBootOnce({
			cfg,
			deps,
			workspaceDir,
			agentId
		});
		if (result.status === "failed") {
			log.warn("boot-md failed for agent startup run", {
				agentId,
				workspaceDir,
				reason: result.reason
			});
			continue;
		}
		if (result.status === "skipped") log.debug("boot-md skipped for agent startup run", {
			agentId,
			workspaceDir,
			reason: result.reason
		});
	}
};

//#endregion
export { runBootChecklist as default };