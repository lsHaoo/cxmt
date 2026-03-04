import "./paths-B4BZAPZh.js";
import { F as shouldLogVerbose, M as logVerbose } from "./utils-BKDT474X.js";
import "./thinking-BB3zi8pq.js";
import "./agent-scope-DCKfYrWF.js";
import "./subsystem-DypCPrmP.js";
import "./openclaw-root-CFLIucxC.js";
import "./exec-DNET3cHX.js";
import "./model-selection-D5bdsDNY.js";
import "./github-copilot-token-nncItI8D.js";
import "./boolean-CE7i9tBR.js";
import "./env-CCK0T6mv.js";
import "./host-env-security-CJMD0__Z.js";
import "./env-vars-gp4sxqr7.js";
import "./manifest-registry-D39cxiPQ.js";
import "./dock-DZksOMxK.js";
import "./message-channel-_kxdCJ2B.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, s as isAudioAttachment, t as buildProviderRegistry } from "./runner-BD4XGEn4.js";
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
import "./paths-D6oKH7El.js";
import "./chat-envelope-BZKQmhVe.js";
import "./tool-images-gM5beWVR.js";
import "./tool-display-B99otER_.js";
import "./fetch-guard-BixFaB4b.js";
import "./api-key-rotation-DpgSEWoA.js";
import "./local-roots-DHge5pVo.js";
import "./model-catalog-vCVbelRl.js";

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