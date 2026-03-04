import "./agent-scope-CmeamfDM.js";
import "./paths-B9lBY6-m.js";
import { $ as shouldLogVerbose, X as logVerbose } from "./subsystem-mPRezpll.js";
import "./workspace-D5wcQf86.js";
import "./model-selection-Blq4Gevc.js";
import "./github-copilot-token-BgKF-7S1.js";
import "./env-DijpAkAH.js";
import "./boolean-M-esQJt6.js";
import "./dock-DlkTyaLq.js";
import "./plugins-DovkDl6C.js";
import "./accounts-CaRtAz_2.js";
import "./bindings-8dEWCOjL.js";
import "./accounts-8ZWbw0Zq.js";
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
import "./gemini-auth-CJDJkhS4.js";
import "./fetch-guard-BkU0h6WR.js";
import "./local-roots-CSPwg7jR.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, t as buildProviderRegistry, u as isAudioAttachment } from "./runner-DuSX5DKl.js";

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