import "./agent-scope-CmeamfDM.js";
import "./paths-B9lBY6-m.js";
import "./subsystem-mPRezpll.js";
import "./workspace-D5wcQf86.js";
import "./model-selection-Blq4Gevc.js";
import "./github-copilot-token-BgKF-7S1.js";
import "./env-DijpAkAH.js";
import "./boolean-M-esQJt6.js";
import { a as normalizeWhatsAppTarget, i as isWhatsAppGroupJid } from "./plugins-DovkDl6C.js";
import { n as resolveWhatsAppAccount } from "./accounts-CaRtAz_2.js";
import "./bindings-8dEWCOjL.js";
import "./image-ops-C6392gpr.js";
import "./message-channel-DKXv9Xa_.js";
import "./path-alias-guards-D1RrhtDQ.js";
import "./fs-safe-uk-uvzuv.js";
import "./ssrf-DOSwHDq8.js";
import "./tool-images-D2x__a7E.js";
import "./fetch-guard-BkU0h6WR.js";
import { f as readReactionParams, h as readStringParam, i as ToolAuthorizationError, l as jsonResult, n as missingTargetError, o as createActionGate } from "./target-errors-DF_y9O9a.js";
import "./local-roots-CSPwg7jR.js";
import "./chunk-CD6DGYOE.js";
import "./markdown-tables-Cb7TkqhY.js";
import "./ir-CTgLop5G.js";
import "./render-DXuDCig7.js";
import "./tables-A9U18wbx.js";
import { r as sendReactionWhatsApp } from "./outbound-C5XgiCiu.js";

//#region src/whatsapp/resolve-outbound-target.ts
function resolveWhatsAppOutboundTarget(params) {
	const trimmed = params.to?.trim() ?? "";
	const allowListRaw = (params.allowFrom ?? []).map((entry) => String(entry).trim()).filter(Boolean);
	const hasWildcard = allowListRaw.includes("*");
	const allowList = allowListRaw.filter((entry) => entry !== "*").map((entry) => normalizeWhatsAppTarget(entry)).filter((entry) => Boolean(entry));
	if (trimmed) {
		const normalizedTo = normalizeWhatsAppTarget(trimmed);
		if (!normalizedTo) return {
			ok: false,
			error: missingTargetError("WhatsApp", "<E.164|group JID>")
		};
		if (isWhatsAppGroupJid(normalizedTo)) return {
			ok: true,
			to: normalizedTo
		};
		if (hasWildcard || allowList.length === 0) return {
			ok: true,
			to: normalizedTo
		};
		if (allowList.includes(normalizedTo)) return {
			ok: true,
			to: normalizedTo
		};
		return {
			ok: false,
			error: missingTargetError("WhatsApp", "<E.164|group JID>")
		};
	}
	return {
		ok: false,
		error: missingTargetError("WhatsApp", "<E.164|group JID>")
	};
}

//#endregion
//#region src/agents/tools/whatsapp-target-auth.ts
function resolveAuthorizedWhatsAppOutboundTarget(params) {
	const account = resolveWhatsAppAccount({
		cfg: params.cfg,
		accountId: params.accountId
	});
	const resolution = resolveWhatsAppOutboundTarget({
		to: params.chatJid,
		allowFrom: account.allowFrom ?? [],
		mode: "implicit"
	});
	if (!resolution.ok) throw new ToolAuthorizationError(`WhatsApp ${params.actionLabel} blocked: chatJid "${params.chatJid}" is not in the configured allowFrom list for account "${account.accountId}".`);
	return {
		to: resolution.to,
		accountId: account.accountId
	};
}

//#endregion
//#region src/agents/tools/whatsapp-actions.ts
async function handleWhatsAppAction(params, cfg) {
	const action = readStringParam(params, "action", { required: true });
	const isActionEnabled = createActionGate(cfg.channels?.whatsapp?.actions);
	if (action === "react") {
		if (!isActionEnabled("reactions")) throw new Error("WhatsApp reactions are disabled.");
		const chatJid = readStringParam(params, "chatJid", { required: true });
		const messageId = readStringParam(params, "messageId", { required: true });
		const { emoji, remove, isEmpty } = readReactionParams(params, { removeErrorMessage: "Emoji is required to remove a WhatsApp reaction." });
		const participant = readStringParam(params, "participant");
		const accountId = readStringParam(params, "accountId");
		const fromMeRaw = params.fromMe;
		const fromMe = typeof fromMeRaw === "boolean" ? fromMeRaw : void 0;
		const resolved = resolveAuthorizedWhatsAppOutboundTarget({
			cfg,
			chatJid,
			accountId,
			actionLabel: "reaction"
		});
		const resolvedEmoji = remove ? "" : emoji;
		await sendReactionWhatsApp(resolved.to, messageId, resolvedEmoji, {
			verbose: false,
			fromMe,
			participant: participant ?? void 0,
			accountId: resolved.accountId
		});
		if (!remove && !isEmpty) return jsonResult({
			ok: true,
			added: emoji
		});
		return jsonResult({
			ok: true,
			removed: true
		});
	}
	throw new Error(`Unsupported WhatsApp action: ${action}`);
}

//#endregion
export { handleWhatsAppAction };