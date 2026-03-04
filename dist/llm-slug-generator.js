import { a as resolveAgentEffectiveModelPrimary, c as resolveDefaultAgentId, i as resolveAgentDir, s as resolveAgentWorkspaceDir } from "./agent-scope-CmeamfDM.js";
import "./paths-B9lBY6-m.js";
import { t as createSubsystemLogger } from "./subsystem-mPRezpll.js";
import "./workspace-D5wcQf86.js";
import { Fn as DEFAULT_MODEL, In as DEFAULT_PROVIDER, l as parseModelRef } from "./model-selection-Blq4Gevc.js";
import "./github-copilot-token-BgKF-7S1.js";
import "./env-DijpAkAH.js";
import "./boolean-M-esQJt6.js";
import "./dock-DlkTyaLq.js";
import "./tokens-DhiG-E4H.js";
import { t as runEmbeddedPiAgent } from "./pi-embedded-DQHktVa9.js";
import "./plugins-DovkDl6C.js";
import "./accounts-CaRtAz_2.js";
import "./bindings-8dEWCOjL.js";
import "./send-D3wu_e0h.js";
import "./send-CUIVuixi.js";
import "./deliver-BLZ0dNqp.js";
import "./diagnostic-dNTenbht.js";
import "./diagnostic-session-state-C0Sxjfox.js";
import "./accounts-8ZWbw0Zq.js";
import "./send-D_l0SrLl.js";
import "./image-ops-C6392gpr.js";
import "./pi-model-discovery-CvbqRCrE.js";
import "./message-channel-DKXv9Xa_.js";
import "./pi-embedded-helpers-DkhPxo17.js";
import "./chrome-_5bjyGv0.js";
import "./frontmatter-eHCuq81z.js";
import "./skills-I1P1Oa6J.js";
import "./path-alias-guards-D1RrhtDQ.js";
import "./redact-B5RjPWCN.js";
import "./errors-BB1m5Yna.js";
import "./fs-safe-uk-uvzuv.js";
import "./ssrf-DOSwHDq8.js";
import "./store-oJ-CTgOm.js";
import "./sessions-B_m17dWA.js";
import "./accounts-CGJl1Z8Z.js";
import "./paths-BXMwg9Yw.js";
import "./tool-images-D2x__a7E.js";
import "./thinking-DjGGQMbY.js";
import "./image-Bo686FYN.js";
import "./reply-prefix-BMQNAUPx.js";
import "./manager-Cnz48EE7.js";
import "./gemini-auth-CJDJkhS4.js";
import "./fetch-guard-BkU0h6WR.js";
import "./query-expansion-Ddv6lHJZ.js";
import "./retry-_HyoIAOf.js";
import "./target-errors-DF_y9O9a.js";
import "./local-roots-CSPwg7jR.js";
import "./chunk-CD6DGYOE.js";
import "./markdown-tables-Cb7TkqhY.js";
import "./ir-CTgLop5G.js";
import "./render-DXuDCig7.js";
import "./commands-registry-DD-Kdnb2.js";
import "./skill-commands-Bln5E3_b.js";
import "./runner-DuSX5DKl.js";
import "./fetch-BOy2PxM9.js";
import "./channel-activity-BaHijrb5.js";
import "./tables-A9U18wbx.js";
import "./send-BYvgXTha.js";
import "./outbound-attachment-BfRBkNh4.js";
import "./send-jYUwFJST.js";
import "./resolve-route-DBaEoxmo.js";
import "./proxy-pPaHJt5e.js";
import "./replies-BamZ7_SI.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

//#region src/hooks/llm-slug-generator.ts
/**
* LLM-based slug generator for session memory filenames
*/
const log = createSubsystemLogger("llm-slug-generator");
/**
* Generate a short 1-2 word filename slug from session content using LLM
*/
async function generateSlugViaLLM(params) {
	let tempSessionFile = null;
	try {
		const agentId = resolveDefaultAgentId(params.cfg);
		const workspaceDir = resolveAgentWorkspaceDir(params.cfg, agentId);
		const agentDir = resolveAgentDir(params.cfg, agentId);
		const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "openclaw-slug-"));
		tempSessionFile = path.join(tempDir, "session.jsonl");
		const prompt = `Based on this conversation, generate a short 1-2 word filename slug (lowercase, hyphen-separated, no file extension).

Conversation summary:
${params.sessionContent.slice(0, 2e3)}

Reply with ONLY the slug, nothing else. Examples: "vendor-pitch", "api-design", "bug-fix"`;
		const modelRef = resolveAgentEffectiveModelPrimary(params.cfg, agentId);
		const parsed = modelRef ? parseModelRef(modelRef, DEFAULT_PROVIDER) : null;
		const provider = parsed?.provider ?? DEFAULT_PROVIDER;
		const model = parsed?.model ?? DEFAULT_MODEL;
		const result = await runEmbeddedPiAgent({
			sessionId: `slug-generator-${Date.now()}`,
			sessionKey: "temp:slug-generator",
			agentId,
			sessionFile: tempSessionFile,
			workspaceDir,
			agentDir,
			config: params.cfg,
			prompt,
			provider,
			model,
			timeoutMs: 15e3,
			runId: `slug-gen-${Date.now()}`
		});
		if (result.payloads && result.payloads.length > 0) {
			const text = result.payloads[0]?.text;
			if (text) return text.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || null;
		}
		return null;
	} catch (err) {
		const message = err instanceof Error ? err.stack ?? err.message : String(err);
		log.error(`Failed to generate slug: ${message}`);
		return null;
	} finally {
		if (tempSessionFile) try {
			await fs.rm(path.dirname(tempSessionFile), {
				recursive: true,
				force: true
			});
		} catch {}
	}
}

//#endregion
export { generateSlugViaLLM };