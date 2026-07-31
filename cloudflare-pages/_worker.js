const PAGE_URL = "https://minds-mcp-compatibility.pages.dev/";
const MCP_URL = "https://getminds.ai/mcp";
const SETUP_URL =
  "https://getminds.ai/mcp/setup?utm_source=content&utm_medium=content&utm_campaign=content-seo-mcp-reference&utm_content=cloudflare-compatibility";
const DOI_URL = "https://doi.org/10.5281/zenodo.21711429";

const clients = [
  {
    name: "ChatGPT",
    transport: "Remote connector",
    auth: "OAuth 2.1",
    route: "Settings → Connected apps",
  },
  {
    name: "Claude",
    transport: "Remote connector",
    auth: "OAuth 2.1",
    route: "Customize → Connectors",
  },
  {
    name: "Claude Code",
    transport: "Streamable HTTP",
    auth: "API key header",
    route: "claude mcp add",
  },
  {
    name: "Cursor",
    transport: "Streamable HTTP",
    auth: "OAuth or API key",
    route: "MCP settings",
  },
  {
    name: "VS Code",
    transport: "Streamable HTTP",
    auth: "OAuth or API key",
    route: "MCP server config",
  },
  {
    name: "Windsurf",
    transport: "Streamable HTTP",
    auth: "OAuth or API key",
    route: "MCP settings",
  },
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const clientRows = clients
  .map(
    (client) => `
      <tr>
        <th scope="row">${escapeHtml(client.name)}</th>
        <td>${escapeHtml(client.transport)}</td>
        <td>${escapeHtml(client.auth)}</td>
        <td>${escapeHtml(client.route)}</td>
      </tr>`,
  )
  .join("");

const logo = `
  <svg viewBox="0 0 311 51" role="img" aria-label="Minds">
    <path d="M132.925 49.561V1.954h11.468l14.627 39.169 14.891-39.169h11.168v47.607h-7.163V8.953l-15.332 40.608h-7.163L140.089 8.953v40.608h-7.164Zm66.022-41.905c-.865.871-1.906 1.297-3.158 1.297s-2.294-.426-3.158-1.297c-.865-.87-1.288-1.918-1.288-3.18s.423-2.309 1.288-3.179C193.495.426 194.536 0 195.789 0s2.293.426 3.158 1.297c.864.87 1.288 1.918 1.288 3.179s-.424 2.31-1.288 3.18Zm-6.74 41.905V13.483h7.163v36.06h-7.163v.018Zm13.797 0V13.483h6.881v4.974c.812-1.439 2.153-2.754 4.04-3.926 1.888-1.173 4.235-1.759 7.058-1.759 4.199 0 7.463 1.261 9.774 3.784 2.329 2.522 3.476 6.021 3.476 10.498v22.507h-7.163V28.067c0-6.146-2.629-9.237-7.887-9.237-2.611 0-4.858.923-6.393 2.771-1.535 1.847-2.293 4.388-2.293 7.621v20.339h-7.181.018Zm51.501.728c-5.01 0-8.963-1.687-11.856-5.045-2.894-3.375-4.34-7.94-4.34-13.713 0-5.774 1.464-9.984 4.41-13.483 2.947-3.517 6.864-5.258 11.786-5.258 3.493 0 5.951.622 7.375 1.883 1.853 1.243 3.229 2.736 4.076 4.459V.497h7.163v49.064h-6.881V43.93c-.812 1.688-2.205 3.162-4.199 4.441-1.976 1.279-4.499 1.918-7.269 1.918h.035Zm1.218-6.057c3.299 0 5.822-1.243 7.604-3.713 1.764-2.469 2.646-5.471 2.646-8.988 0-3.518-.882-6.502-2.646-8.989-1.764-2.469-4.305-3.712-7.604-3.712-3.3 0-5.77 1.243-7.552 3.712-1.782 2.47-2.682 5.472-2.682 8.989 0 3.517.865 7.105 2.612 9.344 1.729 2.238 4.287 3.357 7.622 3.357Zm36.945 6.057c-4.358 0-7.94-1.03-10.78-3.109-2.841-2.06-4.358-4.885-4.552-8.437h7.163c.247 1.687 1.147 3.109 2.752 4.299 1.606 1.172 3.6 1.758 5.982 1.758 2.381 0 4.075-.515 5.487-1.545 1.411-1.03 2.117-2.381 2.117-3.997 0-2.398-2.1-3.962-6.299-4.69l-5.522-1.012c-1.341-.249-2.506-.515-3.511-.835-1.006-.32-2.135-.8-3.405-1.474-1.271-.675-2.259-1.635-2.982-2.86-.724-1.226-1.076-2.683-1.076-4.37 0-3.411 1.34-6.147 4.04-8.19 2.699-2.042 6.228-3.073 10.568-3.073 4.341 0 7.393 1.031 10.163 3.073 2.77 2.043 4.252 4.743 4.446 8.119h-7.163c-.247-1.635-1.129-3.002-2.647-4.086-1.535-1.083-3.317-1.616-5.381-1.616s-3.599.462-4.905 1.403c-1.323.942-1.976 2.203-1.976 3.784 0 1.581.335 1.812 1.041 2.416.688.604 1.376 1.013 2.082 1.226.688.213 1.729.444 3.123.693l5.522 1.012c7.358 1.297 11.027 4.583 11.027 9.895 0 3.588-1.393 6.431-4.163 8.491-2.77 2.079-6.493 3.109-11.151 3.109h-.018ZM124.527 38.157v.444c0 6.857-5.522 12.399-12.315 12.399h-.441c-6.81 0-12.315-5.56-12.315-12.399v-.231c0-6.857-5.523-12.399-12.315-12.399-6.811 0-12.315 5.56-12.315 12.399v.231C74.826 45.458 69.303 51 62.511 51h-.442c-6.81 0-12.315-5.56-12.315-12.399v-.231c0-6.857-5.522-12.399-12.315-12.399-6.81 0-12.315 5.56-12.315 12.399v.231C25.124 45.458 19.602 51 12.809 51h-.441C5.522 51 0 45.458 0 38.601v-.444c0-6.857 5.522-12.399 12.315-12.399h.229c6.811 0 12.316-5.56 12.316-12.399v-.231C24.86 6.271 30.382.728 37.175.728h.441c6.81 0 12.315 5.56 12.315 12.4v.231c0 6.856 5.523 12.399 12.315 12.399 6.81 0 12.315-5.56 12.315-12.399v-.231C74.561 6.271 80.083.728 86.876.728h.441c6.811 0 12.315 5.56 12.315 12.4v.231c0 6.856 5.523 12.399 12.315 12.399h.23c6.81 0 12.315 5.56 12.315 12.399h.035Z"/>
  </svg>`;

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="A practical compatibility matrix and live endpoint check for the Minds remote MCP server.">
  <meta name="theme-color" content="#ffdd00">
  <link rel="canonical" href="${PAGE_URL}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Minds MCP compatibility field guide">
  <meta property="og:description" content="Connect ChatGPT, Claude, Cursor, VS Code, Windsurf, and Claude Code to the Minds remote MCP server.">
  <meta property="og:url" content="${PAGE_URL}">
  <title>Minds MCP compatibility field guide</title>
  <style>
    :root{--black:#000;--white:#fff;--paper:#f5f5f3;--yellow:#ffdd00;--green:#00e14f;--muted:#5d5d5a;--line:#000}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--white);color:var(--black);font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.35;-webkit-font-smoothing:antialiased}
    a{color:inherit;text-underline-offset:4px}.shell{width:min(100%,1440px);margin:auto;padding:0 clamp(22px,4vw,64px)}
    header{min-height:88px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;border-bottom:1px solid var(--line)}
    .brand{width:156px;display:block}.brand svg{display:block;width:100%;height:auto}.header-label{margin:0;font-size:13px;text-align:center}
    nav{display:flex;justify-content:flex-end;gap:24px}nav a{font-size:13px;text-decoration:none}nav a:hover{text-decoration:underline}
    main{display:block}.hero{display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(42px,8vw,128px);align-items:end;padding:clamp(84px,11vw,156px) 0 80px}
    .eyebrow{margin:0 0 22px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}.dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--green);margin:0 6px 0 2px;box-shadow:0 0 0 4px rgb(0 225 79/.14)}
    h1,h2,h3,p{overflow-wrap:break-word}h1,h2,h3{margin:0;letter-spacing:-.045em}h1{font-size:clamp(58px,8.5vw,124px);line-height:.84}h2{font-size:clamp(42px,6vw,82px);line-height:.9}h3{font-size:20px}
    .lede{max-width:700px;margin:34px 0 0;font-size:clamp(20px,2vw,28px);line-height:1.2}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:38px}
    .button{display:inline-flex;align-items:center;min-height:48px;padding:12px 18px;border:1px solid #000;border-radius:999px;text-decoration:none}.button.primary{background:#000;color:#fff}.button:hover{transform:translateY(-1px)}
    .check{border:1px solid #000;border-radius:14px;overflow:hidden;background:var(--paper)}.check-head{display:flex;justify-content:space-between;gap:20px;padding:16px 18px;border-bottom:1px solid #000;font-size:13px}
    .check-body{padding:26px 18px}.check-status{margin:0 0 16px;font-size:28px;font-weight:700;letter-spacing:-.03em}.endpoint{display:block;padding:14px;background:#000;color:#fff;border-radius:8px;overflow:auto;font:13px ui-monospace,SFMono-Regular,Menlo,monospace}
    .facts{margin:20px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:14px}.facts div{border-top:1px solid #000;padding-top:10px}.facts dt{font-size:11px;text-transform:uppercase;letter-spacing:.06em}.facts dd{margin:5px 0 0}
    section{padding:clamp(72px,9vw,128px) 0;border-top:1px solid #000}.section-head{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end;margin-bottom:48px}.section-head p{max-width:540px;margin:0 0 4px}
    .table-wrap{overflow-x:auto;border:1px solid #000;border-radius:14px}table{border-collapse:collapse;width:100%;min-width:760px}th,td{padding:18px;text-align:left;border-bottom:1px solid #000}thead th{font-size:12px;text-transform:uppercase;letter-spacing:.06em;background:var(--paper)}tbody th{font-size:20px}tbody tr:last-child th,tbody tr:last-child td{border-bottom:0}
    .configs{display:grid;grid-template-columns:1fr 1fr;gap:20px}.card{border:1px solid #000;border-radius:14px;overflow:hidden}.card h3{padding:17px 19px;border-bottom:1px solid #000}.card pre{margin:0;padding:22px 19px;background:#000;color:#fff;min-height:146px;overflow:auto;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace}
    .signal{background:linear-gradient(125deg,var(--yellow),var(--green));padding:clamp(62px,8vw,110px) clamp(22px,5vw,72px);border:1px solid #000;border-radius:14px;display:grid;grid-template-columns:1.2fr .8fr;gap:50px;align-items:end}.signal p{font-size:21px;margin:0}.signal a{font-weight:700}
    footer{min-height:120px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;border-top:1px solid #000;font-size:13px}.footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:20px}footer p:last-child{text-align:right}
    @media(max-width:850px){header{grid-template-columns:1fr auto}.header-label{display:none}nav a:not(:last-child){display:none}.hero,.section-head,.signal{grid-template-columns:1fr}.hero{padding-top:76px}.configs{grid-template-columns:1fr}footer{grid-template-columns:1fr;padding:30px 0}.footer-links{justify-content:flex-start}footer p:last-child{text-align:left}}
    @media(prefers-reduced-motion:no-preference){.button{transition:transform 160ms ease}}
  </style>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Minds MCP","applicationCategory":"DeveloperApplication","operatingSystem":"Web","url":"${SETUP_URL}","codeRepository":"https://github.com/minds-ai-co/minds-mcp","softwareVersion":"2.0.0"}</script>
</head>
<body>
  <div class="shell">
    <header>
      <a class="brand" href="https://getminds.ai/?utm_source=content&amp;utm_medium=content&amp;utm_campaign=content-seo-mcp-reference&amp;utm_content=cloudflare-compatibility" aria-label="Minds home">${logo}</a>
      <p class="header-label">Minds · MCP compatibility field guide</p>
      <nav aria-label="Page"><a href="#clients">Clients</a><a href="#configuration">Configuration</a><a href="https://github.com/minds-ai-co/minds-mcp">Source</a></nav>
    </header>
    <main>
      <div class="hero">
        <div>
          <p class="eyebrow">Remote MCP server · <span class="dot"></span>Compatibility reference</p>
          <h1>Connect once.<br>Research anywhere.</h1>
          <p class="lede">A practical field guide for connecting Minds to MCP-capable assistants, with a live reachability check against the canonical remote endpoint.</p>
          <div class="actions">
            <a class="button primary" href="${SETUP_URL}">Connect Minds</a>
            <a class="button" href="https://minds-1.gitbook.io/minds-mcp/">GitBook reference</a>
          </div>
        </div>
        <aside class="check" aria-label="Live endpoint check">
          <div class="check-head"><span>Endpoint check</span><span id="checked">Running…</span></div>
          <div class="check-body">
            <p class="check-status" id="status">Checking reachability</p>
            <code class="endpoint">${MCP_URL}</code>
            <dl class="facts">
              <div><dt>Registry</dt><dd>ai.getminds/minds</dd></div>
              <div><dt>Transport</dt><dd>Streamable HTTP</dd></div>
              <div><dt>Auth</dt><dd>OAuth 2.1 / API key</dd></div>
              <div><dt>Release</dt><dd>v2.0.0</dd></div>
            </dl>
          </div>
        </aside>
      </div>

      <section id="clients">
        <div class="section-head">
          <div><p class="eyebrow">Client matrix</p><h2>Six routes.<br>One endpoint.</h2></div>
          <p>Client interfaces differ, but each route points to the same public Minds MCP service. OAuth is preferred where the client supports it.</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Client</th><th>Transport</th><th>Authentication</th><th>Configuration route</th></tr></thead>
            <tbody>${clientRows}</tbody>
          </table>
        </div>
      </section>

      <section id="configuration">
        <div class="section-head">
          <div><p class="eyebrow">Configuration</p><h2>Copy the<br>right shape.</h2></div>
          <p>Use the remote URL directly. Keep API keys out of shared configuration files and prefer OAuth when available.</p>
        </div>
        <div class="configs">
          <article class="card">
            <h3>Claude Code</h3>
            <pre><code>claude mcp add --transport http mindsai \\
  https://getminds.ai/mcp \\
  --header "Authorization: Bearer minds_YOUR_API_KEY"</code></pre>
          </article>
          <article class="card">
            <h3>JSON configuration</h3>
            <pre><code>{
  "mcpServers": {
    "minds": {
      "url": "https://getminds.ai/mcp"
    }
  }
}</code></pre>
          </article>
        </div>
      </section>

      <section>
        <div class="signal">
          <div><p class="eyebrow">What the connection unlocks</p><h2>From brief<br>to evidence.</h2></div>
          <p>Build grounded synthetic audiences, run durable panel studies, compare segments, and export structured findings. <a href="${SETUP_URL}">Explore Minds MCP →</a></p>
        </div>
      </section>
    </main>
    <footer>
      <p>Minds · Synthetic market research</p>
      <div class="footer-links">
        <a href="${SETUP_URL}">MCP documentation</a>
        <a href="https://minds-1.gitbook.io/minds-mcp/">GitBook reference</a>
        <a href="https://minds-mcp.readthedocs.io/en/latest/">Integration reference</a>
        <a href="${DOI_URL}">Archived reference DOI</a>
        <a href="https://github.com/minds-ai-co/minds-mcp/releases/tag/v2.0.0">Release v2.0.0</a>
      </div>
      <p>Independent compatibility surface</p>
    </footer>
  </div>
  <script>
    fetch("/api/status", {headers:{"accept":"application/json"}})
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("status").textContent = data.reachable ? "Endpoint reachable" : "Endpoint unavailable";
        document.getElementById("checked").textContent = data.checkedAt;
      })
      .catch(() => {
        document.getElementById("status").textContent = "Check unavailable";
        document.getElementById("checked").textContent = "Try again";
      });
  </script>
</body>
</html>`;

const securityHeaders = {
  "content-security-policy":
    "default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/status") {
      let status = 0;
      try {
        const response = await fetch(MCP_URL, {
          headers: { accept: "application/json, text/event-stream" },
          cf: { cacheTtl: 0 },
        });
        status = response.status;
      } catch {
        status = 0;
      }
      return Response.json(
        {
          reachable: status >= 200 && status < 500,
          upstreamStatus: status,
          checkedAt: new Date().toISOString(),
          endpoint: MCP_URL,
        },
        { headers: { "cache-control": "no-store", ...securityHeaders } },
      );
    }

    if (url.pathname === "/robots.txt") {
      return new Response(`User-agent: *\nAllow: /\nSitemap: ${PAGE_URL}sitemap.xml\n`, {
        headers: { "content-type": "text/plain; charset=utf-8", ...securityHeaders },
      });
    }

    if (url.pathname === "/sitemap.xml") {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${PAGE_URL}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`,
        { headers: { "content-type": "application/xml; charset=utf-8", ...securityHeaders } },
      );
    }

    if (url.pathname !== "/") {
      return new Response("Not found", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8", ...securityHeaders },
      });
    }

    return new Response(page, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
        ...securityHeaders,
      },
    });
  },
};
