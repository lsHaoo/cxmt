import "./paths-B9jPXz5d.js";
import "./subsystem-CDGdCagb.js";
import { P as shouldLogVerbose, j as logVerbose } from "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import "./auth-profiles-B3i22awe.js";
import "./agent-scope-CkjEOGci.js";
import "./openclaw-root-CB7tjNbo.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-JXmwWO7X.js";
import "./dock-Tl4rkwup.js";
import "./pi-model-discovery-jX3zZFqH.js";
import "./frontmatter-Cqa5i1Xb.js";
import "./skills-yeQbeVI2.js";
import "./path-alias-guards-CLUFoulU.js";
import "./message-channel--ZQegy69.js";
import "./sessions-QsgnCkPz.js";
import "./plugins-DVEE9xtr.js";
import "./accounts-mSQfaYxT.js";
import "./accounts-Drxr268V.js";
import "./accounts-DzYPWfMe.js";
import "./bindings-D9TcP6QC.js";
import "./logging-BvdokaVt.js";
import "./paths-CFZJ4dSy.js";
import "./chat-envelope-DMwAJAv3.js";
import "./net-CJdMuDsJ.js";
import "./tailnet-10d39wOc.js";
import "./image-ops-DVDevqu4.js";
import "./pi-embedded-helpers-DcH_Jvhl.js";
import "./sandbox-BbEuIAjH.js";
import "./tool-catalog-B4gxY3Jd.js";
import "./chrome-pqdAY6mh.js";
import "./tailscale-RsI6sScm.js";
import "./auth-DW_g7kiW.js";
import "./server-context-Jt07MuNc.js";
import "./paths-BMEYU0fu.js";
import "./redact-Bdn22hWn.js";
import "./errors-DQoYsN9P.js";
import "./fs-safe-DSbZ3X8f.js";
import "./ssrf-BsOvyTP0.js";
import "./store-DR1i3yWv.js";
import "./ports-SY8r1M1V.js";
import "./trash-WJ5rbxj0.js";
import "./server-middleware-cvDjxW5y.js";
import "./tool-images-CLwEsa9R.js";
import "./thinking-lfnd6MLT.js";
import "./models-config-Dcr-ldc7.js";
import "./gemini-auth-wo4sIx9w.js";
import "./fetch-guard-CbkQ1FjU.js";
import "./local-roots-DIhPdLAF.js";
import "./image-qvNrpi4e.js";
import "./tool-display-B-Kg-QB2.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, s as isAudioAttachment, t as buildProviderRegistry } from "./runner-DrfYWRpe.js";
import "./model-catalog-DouetniK.js";

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