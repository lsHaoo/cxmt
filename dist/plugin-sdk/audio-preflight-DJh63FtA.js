import "./accounts-Dw118nCx.js";
import "./paths-DCNrSyZW.js";
import "./github-copilot-token-Df-R0zCM.js";
import "./config-BBV1onQd.js";
import { $ as logVerbose, nt as shouldLogVerbose } from "./subsystem-D7KkLxSJ.js";
import "./command-format-D4smYdZ1.js";
import "./agent-scope-CSmNmVhJ.js";
import "./dock-CAr8fmcw.js";
import "./message-channel-BhZc-dSE.js";
import "./sessions-DTRtmVsg.js";
import "./plugins-CnONKxt5.js";
import "./accounts-CWu4D7zt.js";
import "./accounts-DQd1QCaM.js";
import "./bindings-yftkEELf.js";
import "./paths-BwfwZvKQ.js";
import "./redact-BYwaiynP.js";
import "./errors-BMOVwRE7.js";
import "./path-alias-guards-hbqWimP_.js";
import "./fs-safe-b3R5BGfO.js";
import "./image-ops-D_j_A6vq.js";
import "./ssrf-BYvOEX3i.js";
import "./fetch-guard-ymwwFztB.js";
import "./local-roots-DGK73eKJ.js";
import "./tool-images-DQq5oDh7.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, t as buildProviderRegistry, u as isAudioAttachment } from "./runner-DRWsvdyP.js";
import "./skills-BzoUJras.js";
import "./chrome-D5zD96dJ.js";
import "./store-iDDZAETc.js";
import "./pi-embedded-helpers-DTXW6W5w.js";
import "./thinking-DFrhwk-d.js";
import "./image-M5v6_HpX.js";
import "./pi-model-discovery-Cqj1R2Ky.js";
import "./api-key-rotation-D8Bv5G7u.js";

//#region src/media-understanding/audio-preflight.ts
/**
* Transcribes the first audio attachment BEFORE mention checking.
* This allows voice notes to be processed in group chats with requireMention: true.
* Returns the transcript or undefined if transcription fails or no audio is found.
*/
async function transcribeFirstAudio(params) {
	const { ctx, cfg } = params;
	const audioConfig = cfg.tools?.media?.audio;
	if (!audioConfig || audioConfig.enabled === false) return;
	const attachments = normalizeMediaAttachments(ctx);
	if (!attachments || attachments.length === 0) return;
	const firstAudio = attachments.find((att) => att && isAudioAttachment(att) && !att.alreadyTranscribed);
	if (!firstAudio) return;
	if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribing attachment ${firstAudio.index} for mention check`);
	const providerRegistry = buildProviderRegistry(params.providers);
	const cache = createMediaAttachmentCache(attachments, { localPathRoots: resolveMediaAttachmentLocalRoots({
		cfg,
		ctx
	}) });
	try {
		const result = await runCapability({
			capability: "audio",
			cfg,
			ctx,
			attachments: cache,
			media: attachments,
			agentDir: params.agentDir,
			providerRegistry,
			config: audioConfig,
			activeModel: params.activeModel
		});
		if (!result || result.outputs.length === 0) return;
		const audioOutput = result.outputs.find((output) => output.kind === "audio.transcription");
		if (!audioOutput || !audioOutput.text) return;
		firstAudio.alreadyTranscribed = true;
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribed ${audioOutput.text.length} chars from attachment ${firstAudio.index}`);
		return audioOutput.text;
	} catch (err) {
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcription failed: ${String(err)}`);
		return;
	} finally {
		await cache.cleanup();
	}
}

//#endregion
export { transcribeFirstAudio };