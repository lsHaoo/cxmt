import "./paths-B9jPXz5d.js";
import "./subsystem-CDGdCagb.js";
import { z as theme } from "./utils-XeuG5BG2.js";
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
import { t as formatDocsLink } from "./links-DMmQqqmC.js";
import { n as registerQrCli } from "./qr-cli-uAzSqE0-.js";

//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	registerQrCli(program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/clawbot", "docs.openclaw.ai/cli/clawbot")}\n`));
}

//#endregion
export { registerClawbotCli };