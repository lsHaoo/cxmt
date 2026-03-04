import "./paths-B9jPXz5d.js";
import { f as defaultRuntime } from "./subsystem-CDGdCagb.js";
import { x as shortenHomePath, z as theme } from "./utils-XeuG5BG2.js";
import "./boolean-DtWR5bt3.js";
import { A as createConfigIO, L as writeConfigFile } from "./auth-profiles-B3i22awe.js";
import { E as ensureAgentWorkspace, _ as DEFAULT_AGENT_WORKSPACE_DIR } from "./agent-scope-CkjEOGci.js";
import "./openclaw-root-CB7tjNbo.js";
import "./exec-QEqvNlTy.js";
import "./github-copilot-token-CHThtPpe.js";
import "./host-env-security-DWcSD4kP.js";
import "./version-DR9Qjj6f.js";
import "./env-vars-tQ4AIdQq.js";
import "./manifest-registry-JXmwWO7X.js";
import "./dock-Tl4rkwup.js";
import "./message-channel--ZQegy69.js";
import "./sessions-QsgnCkPz.js";
import "./plugins-DVEE9xtr.js";
import "./accounts-mSQfaYxT.js";
import "./accounts-Drxr268V.js";
import "./accounts-DzYPWfMe.js";
import "./bindings-D9TcP6QC.js";
import "./logging-BvdokaVt.js";
import { s as resolveSessionTranscriptsDir } from "./paths-CFZJ4dSy.js";
import "./chat-envelope-DMwAJAv3.js";
import "./client-DL0PWwAo.js";
import "./call-lt0YOsXc.js";
import "./pairing-token-DR7_a9gi.js";
import "./net-CJdMuDsJ.js";
import "./tailnet-10d39wOc.js";
import "./redact-Bdn22hWn.js";
import "./errors-DQoYsN9P.js";
import { t as formatDocsLink } from "./links-DMmQqqmC.js";
import { n as runCommandWithRuntime } from "./cli-utils-Dp61QuRB.js";
import "./progress-C1ycUGtl.js";
import "./onboard-helpers-DNJKInQI.js";
import "./prompt-style-BBtxOcmy.js";
import { t as hasExplicitOptions } from "./command-options-j8s8APBQ.js";
import "./note-CEbCG-nS.js";
import "./clack-prompter-ByKEYbqT.js";
import "./runtime-guard-BwU7cq4B.js";
import "./onboarding-QtSRQNJR.js";
import { n as logConfigUpdated, t as formatConfigPath } from "./logging-CR-uu1KB.js";
import { t as onboardCommand } from "./onboard-BC3t7-rc.js";
import JSON5 from "json5";
import fs from "node:fs/promises";

//#region src/commands/setup.ts
async function readConfigFileRaw(configPath) {
	try {
		const raw = await fs.readFile(configPath, "utf-8");
		const parsed = JSON5.parse(raw);
		if (parsed && typeof parsed === "object") return {
			exists: true,
			parsed
		};
		return {
			exists: true,
			parsed: {}
		};
	} catch {
		return {
			exists: false,
			parsed: {}
		};
	}
}
async function setupCommand(opts, runtime = defaultRuntime) {
	const desiredWorkspace = typeof opts?.workspace === "string" && opts.workspace.trim() ? opts.workspace.trim() : void 0;
	const configPath = createConfigIO().configPath;
	const existingRaw = await readConfigFileRaw(configPath);
	const cfg = existingRaw.parsed;
	const defaults = cfg.agents?.defaults ?? {};
	const workspace = desiredWorkspace ?? defaults.workspace ?? DEFAULT_AGENT_WORKSPACE_DIR;
	const next = {
		...cfg,
		agents: {
			...cfg.agents,
			defaults: {
				...defaults,
				workspace
			}
		}
	};
	if (!existingRaw.exists || defaults.workspace !== workspace) {
		await writeConfigFile(next);
		if (!existingRaw.exists) runtime.log(`Wrote ${formatConfigPath(configPath)}`);
		else logConfigUpdated(runtime, {
			path: configPath,
			suffix: "(set agents.defaults.workspace)"
		});
	} else runtime.log(`Config OK: ${formatConfigPath(configPath)}`);
	const ws = await ensureAgentWorkspace({
		dir: workspace,
		ensureBootstrapFiles: !next.agents?.defaults?.skipBootstrap
	});
	runtime.log(`Workspace OK: ${shortenHomePath(ws.dir)}`);
	const sessionsDir = resolveSessionTranscriptsDir();
	await fs.mkdir(sessionsDir, { recursive: true });
	runtime.log(`Sessions OK: ${shortenHomePath(sessionsDir)}`);
}

//#endregion
//#region src/cli/program/register.setup.ts
function registerSetupCommand(program) {
	program.command("setup").description("Initialize ~/.openclaw/openclaw.json and the agent workspace").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/setup", "docs.openclaw.ai/cli/setup")}\n`).option("--workspace <dir>", "Agent workspace directory (default: ~/.openclaw/workspace; stored as agents.defaults.workspace)").option("--wizard", "Run the interactive onboarding wizard", false).option("--non-interactive", "Run the wizard without prompts", false).option("--mode <mode>", "Wizard mode: local|remote").option("--remote-url <url>", "Remote Gateway WebSocket URL").option("--remote-token <token>", "Remote Gateway token (optional)").action(async (opts, command) => {
		await runCommandWithRuntime(defaultRuntime, async () => {
			const hasWizardFlags = hasExplicitOptions(command, [
				"wizard",
				"nonInteractive",
				"mode",
				"remoteUrl",
				"remoteToken"
			]);
			if (opts.wizard || hasWizardFlags) {
				await onboardCommand({
					workspace: opts.workspace,
					nonInteractive: Boolean(opts.nonInteractive),
					mode: opts.mode,
					remoteUrl: opts.remoteUrl,
					remoteToken: opts.remoteToken
				}, defaultRuntime);
				return;
			}
			await setupCommand({ workspace: opts.workspace }, defaultRuntime);
		});
	});
}

//#endregion
export { registerSetupCommand };