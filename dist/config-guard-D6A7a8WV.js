import "./paths-B4BZAPZh.js";
import { B as theme, R as colorize, S as shortenHomePath, z as isRich } from "./utils-BKDT474X.js";
import "./agent-scope-DCKfYrWF.js";
import "./subsystem-DypCPrmP.js";
import "./openclaw-root-CFLIucxC.js";
import "./exec-DNET3cHX.js";
import { Ut as readConfigFileSnapshot } from "./model-selection-D5bdsDNY.js";
import "./github-copilot-token-nncItI8D.js";
import { t as formatCliCommand } from "./command-format-DELazozB.js";
import "./boolean-CE7i9tBR.js";
import "./env-CCK0T6mv.js";
import "./host-env-security-CJMD0__Z.js";
import "./env-vars-gp4sxqr7.js";
import "./manifest-registry-D39cxiPQ.js";
import "./dock-DZksOMxK.js";
import "./message-channel-_kxdCJ2B.js";
import "./sessions-CZ0UmHMC.js";
import "./plugins-ca2fC-bv.js";
import "./accounts-BCPiwTlf.js";
import "./accounts-BC4fvRT_.js";
import "./accounts-ClU97yHE.js";
import "./bindings-b_7t7dr3.js";
import "./logging-w5jq5901.js";
import "./paths-D6oKH7El.js";
import "./chat-envelope-BZKQmhVe.js";
import "./pairing-store-B_Cx3XpU.js";
import "./exec-approvals-allowlist-CuBaZFmh.js";
import "./exec-safe-bin-runtime-policy-CYWcTUa0.js";
import "./plugin-auto-enable-6U0hEn7l.js";
import "./prompt-style-B8dl6hQj.js";
import { c as shouldMigrateStateFromPath } from "./argv-B_RIhyts.js";
import "./note-Bu88d31n.js";
import { t as loadAndMaybeMigrateDoctorConfig } from "./doctor-config-flow-CrOSo4ZN.js";

//#region src/cli/program/config-guard.ts
const ALLOWED_INVALID_COMMANDS = new Set([
	"doctor",
	"logs",
	"health",
	"help",
	"status"
]);
const ALLOWED_INVALID_GATEWAY_SUBCOMMANDS = new Set([
	"status",
	"probe",
	"health",
	"discover",
	"call",
	"install",
	"uninstall",
	"start",
	"stop",
	"restart"
]);
let didRunDoctorConfigFlow = false;
let configSnapshotPromise = null;
function formatConfigIssues(issues) {
	return issues.map((issue) => `- ${issue.path || "<root>"}: ${issue.message}`);
}
async function getConfigSnapshot() {
	if (process.env.VITEST === "true") return readConfigFileSnapshot();
	configSnapshotPromise ??= readConfigFileSnapshot();
	return configSnapshotPromise;
}
async function ensureConfigReady(params) {
	const commandPath = params.commandPath ?? [];
	if (!didRunDoctorConfigFlow && shouldMigrateStateFromPath(commandPath)) {
		didRunDoctorConfigFlow = true;
		const runDoctorConfigFlow = async () => loadAndMaybeMigrateDoctorConfig({
			options: { nonInteractive: true },
			confirm: async () => false
		});
		if (!params.suppressDoctorStdout) await runDoctorConfigFlow();
		else {
			const originalStdoutWrite = process.stdout.write.bind(process.stdout);
			const originalSuppressNotes = process.env.OPENCLAW_SUPPRESS_NOTES;
			process.stdout.write = (() => true);
			process.env.OPENCLAW_SUPPRESS_NOTES = "1";
			try {
				await runDoctorConfigFlow();
			} finally {
				process.stdout.write = originalStdoutWrite;
				if (originalSuppressNotes === void 0) delete process.env.OPENCLAW_SUPPRESS_NOTES;
				else process.env.OPENCLAW_SUPPRESS_NOTES = originalSuppressNotes;
			}
		}
	}
	const snapshot = await getConfigSnapshot();
	const commandName = commandPath[0];
	const subcommandName = commandPath[1];
	const allowInvalid = commandName ? ALLOWED_INVALID_COMMANDS.has(commandName) || commandName === "gateway" && subcommandName && ALLOWED_INVALID_GATEWAY_SUBCOMMANDS.has(subcommandName) : false;
	const issues = snapshot.exists && !snapshot.valid ? formatConfigIssues(snapshot.issues) : [];
	const legacyIssues = snapshot.legacyIssues.length > 0 ? snapshot.legacyIssues.map((issue) => `- ${issue.path}: ${issue.message}`) : [];
	if (!(snapshot.exists && !snapshot.valid)) return;
	const rich = isRich();
	const muted = (value) => colorize(rich, theme.muted, value);
	const error = (value) => colorize(rich, theme.error, value);
	const heading = (value) => colorize(rich, theme.heading, value);
	const commandText = (value) => colorize(rich, theme.command, value);
	params.runtime.error(heading("Config invalid"));
	params.runtime.error(`${muted("File:")} ${muted(shortenHomePath(snapshot.path))}`);
	if (issues.length > 0) {
		params.runtime.error(muted("Problem:"));
		params.runtime.error(issues.map((issue) => `  ${error(issue)}`).join("\n"));
	}
	if (legacyIssues.length > 0) {
		params.runtime.error(muted("Legacy config keys detected:"));
		params.runtime.error(legacyIssues.map((issue) => `  ${error(issue)}`).join("\n"));
	}
	params.runtime.error("");
	params.runtime.error(`${muted("Run:")} ${commandText(formatCliCommand("openclaw doctor --fix"))}`);
	if (!allowInvalid) params.runtime.exit(1);
}

//#endregion
export { ensureConfigReady };