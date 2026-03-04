import "./paths-B9jPXz5d.js";
import "./subsystem-CDGdCagb.js";
import { P as shouldLogVerbose, j as logVerbose } from "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import "./auth-profiles-BxNoHpB2.js";
import "./agent-scope-n30bsiQh.js";
import "./openclaw-root-ZH0m1QmV.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-B3qz5BZQ.js";
import "./dock-DWhZAhpT.js";
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
import "./paths-CFZJ4dSy.js";
import "./chat-envelope-DMwAJAv3.js";
import "./net-CHRmVd5x.js";
import "./tailnet-c5dztY9y.js";
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
import "./gemini-auth-Ge4D1dDl.js";
import "./fetch-guard-BE2XzHCy.js";
import "./local-roots-CK2LtbfL.js";
import "./image-CNUMj2Y0.js";
import "./tool-display-B-Kg-QB2.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, s as isAudioAttachment, t as buildProviderRegistry } from "./runner-B_Vb_AoQ.js";
import "./model-catalog-B3y9KpEw.js";

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