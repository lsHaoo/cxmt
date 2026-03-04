import { i as resolveWhatsAppAccount } from "./accounts-Dw118nCx.js";
import "./paths-DCNrSyZW.js";
import "./github-copilot-token-Df-R0zCM.js";
import "./config-BBV1onQd.js";
import "./subsystem-D7KkLxSJ.js";
import "./command-format-D4smYdZ1.js";
import "./agent-scope-CSmNmVhJ.js";
import "./message-channel-BhZc-dSE.js";
import "./plugins-CnONKxt5.js";
import "./bindings-yftkEELf.js";
import "./path-alias-guards-hbqWimP_.js";
import "./fs-safe-b3R5BGfO.js";
import "./image-ops-D_j_A6vq.js";
import "./ssrf-BYvOEX3i.js";
import "./fetch-guard-ymwwFztB.js";
import "./local-roots-DGK73eKJ.js";
import "./ir-Ys2wia-f.js";
import "./chunk-BwDy78-Y.js";
import "./markdown-tables-DTSn09oI.js";
import "./render-BkW8s6LR.js";
import "./tables-DLV60KAm.js";
import "./tool-images-DQq5oDh7.js";
import { f as readReactionParams, h as readStringParam, i as ToolAuthorizationError, l as jsonResult, o as createActionGate } from "./target-errors-uy7tnow1.js";
import { t as resolveWhatsAppOutboundTarget } from "./resolve-outbound-target-DquRKf4u.js";
import { r as sendReactionWhatsApp } from "./outbound-zCkZZYuj.js";

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