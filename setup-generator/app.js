const ENDPOINT = "https://getminds.ai/mcp";

const clients = {
  "claude-code": {
    label: "Claude Code",
    type: "Command",
    file: "Terminal",
    next: "Run the command, open Claude Code, enter /mcp, and complete OAuth in your browser.",
    render(auth) {
      const base = `claude mcp add --transport http mindsai ${ENDPOINT}`;
      return auth === "api-key"
        ? `${base} \\\n+  --header "Authorization: Bearer minds_YOUR_API_KEY"`
        : base;
    },
  },
  cursor: {
    label: "Cursor",
    type: "JSON",
    file: ".cursor/mcp.json",
    next: "Save the file, open Cursor Settings → MCP, enable Minds, and authorize when prompted.",
    render(auth) {
      return JSON.stringify({
        mcpServers: {
          minds: {
            url: ENDPOINT,
            ...(auth === "api-key" ? { headers: { Authorization: "Bearer minds_YOUR_API_KEY" } } : {}),
          },
        },
      }, null, 2);
    },
  },
  vscode: {
    label: "VS Code",
    type: "JSON",
    file: ".vscode/mcp.json",
    next: "Save the file, run MCP: List Servers from the Command Palette, start Minds, and complete authorization.",
    render(auth) {
      const config = {
        servers: {
          minds: {
            type: "http",
            url: ENDPOINT,
            ...(auth === "api-key" ? { headers: { Authorization: "Bearer ${input:mindsApiKey}" } } : {}),
          },
        },
      };
      if (auth === "api-key") {
        config.inputs = [{ type: "promptString", id: "mindsApiKey", description: "Minds API key", password: true }];
      }
      return JSON.stringify(config, null, 2);
    },
  },
  generic: {
    label: "Generic MCP",
    type: "JSON",
    file: "Client config",
    next: "Add this remote server in your client’s MCP settings. Prefer OAuth wherever the client supports it.",
    render(auth) {
      return JSON.stringify({
        mcpServers: {
          minds: {
            type: "http",
            url: ENDPOINT,
            ...(auth === "api-key" ? { headers: { Authorization: "Bearer minds_YOUR_API_KEY" } } : {}),
          },
        },
      }, null, 2);
    },
  },
};

let activeClient = "claude-code";
let activeAuth = "oauth";

const clientOptions = document.querySelector("#client-options");
const authOptions = document.querySelector("#auth-options");
const output = document.querySelector("#config-output");
const outputType = document.querySelector("#output-type");
const outputFile = document.querySelector("#output-file");
const nextStep = document.querySelector("#next-step-copy");
const copyButton = document.querySelector("#copy-config");

Object.entries(clients).forEach(([id, client], index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.client = id;
  button.textContent = client.label;
  button.setAttribute("aria-pressed", String(index === 0));
  clientOptions.append(button);
});

function render() {
  const client = clients[activeClient];
  output.textContent = client.render(activeAuth);
  outputType.textContent = client.type;
  outputFile.textContent = client.file;
  nextStep.textContent = client.next;
}

clientOptions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-client]");
  if (!button) return;
  activeClient = button.dataset.client;
  clientOptions.querySelectorAll("button").forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
  render();
});

authOptions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-auth]");
  if (!button) return;
  activeAuth = button.dataset.auth;
  authOptions.querySelectorAll("button").forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
  render();
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.textContent);
  copyButton.classList.add("is-copied");
  window.setTimeout(() => copyButton.classList.remove("is-copied"), 1600);
});

render();
