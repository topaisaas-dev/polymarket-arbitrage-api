/**
 * Interactive HTML Landing Page for Polymarket Odds & Arbitrage Delta API
 * Brand Rule 5: Electric Yellow (#FFD600) & dark theme styling.
 */

export function renderLandingPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Polymarket Odds & Arbitrage Delta API | TopAI SaaS</title>
  <meta name="description" content="Real-time Polymarket prediction market odds, cross-platform probability deltas, Kelly criterion bankroll position sizing, and slippage calculator for AI trading agents.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #FFD600;
      --primary-hover: #e6c200;
      --primary-glow: rgba(255, 214, 0, 0.2);
      --bg-dark: #0a0b0e;
      --bg-card: #13151b;
      --bg-card-hover: #1a1c24;
      --border: #242835;
      --border-focus: #FFD600;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --success: #10b981;
      --danger: #ef4444;
      --cyan: #06b6d4;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.6;
      padding: 0;
      overflow-x: hidden;
    }
    code, pre, .mono { font-family: 'JetBrains Mono', monospace; }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

    /* Header */
    header {
      border-bottom: 1px solid var(--border);
      background: rgba(10, 11, 14, 0.85);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 18px 0;
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #fff;
    }
    .brand-logo {
      width: 40px;
      height: 40px;
      background: var(--primary);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      color: #000;
      box-shadow: 0 0 16px var(--primary-glow);
    }
    .brand-title {
      font-weight: 800;
      font-size: 18px;
      letter-spacing: -0.5px;
    }
    .brand-title span { color: var(--primary); }
    .header-links {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 14px;
      padding: 9px 18px;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }
    .btn-primary {
      background: var(--primary);
      color: #000;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }
    .btn-outline {
      border-color: var(--border);
      color: var(--text-main);
      background: rgba(255,255,255,0.03);
    }
    .btn-outline:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    /* Hero */
    .hero {
      padding: 64px 0 40px;
      text-align: center;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 214, 0, 0.1);
      border: 1px solid rgba(255, 214, 0, 0.3);
      color: var(--primary);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .hero h1 {
      font-size: 48px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1.5px;
      max-width: 860px;
      margin: 0 auto 20px;
    }
    .hero h1 span { color: var(--primary); }
    .hero p {
      font-size: 18px;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto 36px;
    }

    /* Grid Layout */
    .app-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      margin-bottom: 60px;
    }
    @media (max-width: 900px) {
      .app-grid { grid-template-columns: 1fr; }
      .hero h1 { font-size: 34px; }
    }

    /* Card */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 28px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    }
    .card-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-subtitle {
      color: var(--text-muted);
      font-size: 13px;
      margin-bottom: 22px;
    }

    /* Form Inputs */
    .form-group {
      margin-bottom: 18px;
    }
    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
    }
    input[type="text"], input[type="number"], select {
      width: 100%;
      padding: 11px 14px;
      background: #090a0d;
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border 0.2s ease;
    }
    input:focus, select:focus {
      border-color: var(--primary);
    }
    .input-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    /* Result Panel */
    .result-box {
      background: #08090c;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;
    }
    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #1a1d26;
      font-size: 14px;
    }
    .metric-row:last-child { border-bottom: none; }
    .metric-label { color: var(--text-muted); }
    .metric-val { font-weight: 700; font-family: 'JetBrains Mono', monospace; }
    .badge-signal {
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .signal-buy { background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; }
    .signal-sell { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; }
    .signal-neutral { background: rgba(156, 163, 175, 0.2); color: #9ca3af; border: 1px solid #4b5563; }

    /* Market List */
    .market-card {
      background: #090a0d;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .market-card:hover {
      border-color: var(--primary);
      background: #11131a;
      transform: translateY(-1px);
    }
    .market-q {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .market-meta {
      display: flex;
      gap: 14px;
      font-size: 12px;
      color: var(--text-muted);
    }
    .market-outcomes {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .outcome-pill {
      flex: 1;
      text-align: center;
      padding: 6px;
      background: #151821;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }
    .outcome-pill.yes { color: var(--primary); border: 1px solid rgba(255, 214, 0, 0.3); }
    .outcome-pill.no { color: #9ca3af; border: 1px solid #262a36; }

    /* Code section */
    .code-block {
      background: #08090c;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 18px;
      color: #94a3b8;
      font-size: 13px;
      overflow-x: auto;
      margin-top: 14px;
    }
    .keyword { color: #f43f5e; }
    .string { color: #a3e635; }
    .num { color: #38bdf8; }

    footer {
      border-top: 1px solid var(--border);
      padding: 40px 0;
      text-align: center;
      color: var(--text-muted);
      font-size: 13px;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header>
    <div class="container nav-inner">
      <a href="/" class="brand">
        <div class="brand-logo">&#916;</div>
        <div class="brand-title">Polymarket <span>Arbitrage</span> API</div>
      </a>
      <div class="header-links">
        <a href="/openapi.json" class="btn btn-outline mono">/openapi.json</a>
        <a href="https://github.com/topaisaas-dev/polymarket-arbitrage-api" target="_blank" class="btn btn-outline">GitHub</a>
        <a href="https://rapidapi.com/user/topaisaasdev" target="_blank" class="btn btn-primary">RapidAPI Hub</a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <div class="container hero">
    <div class="badge-pill">
      <span>⚡</span> Sub-50ms Prediction Market Delta & Quant Execution
    </div>
    <h1>Real-Time Prediction Odds, <span>Arbitrage Delta</span> & Kelly Sizing</h1>
    <p>Zero-latency Polymarket CLOB integration, cross-platform mispricing detection, and automated position sizing primitives for AI trading agents (ElizaOS, CCXT, Hummingbot).</p>
  </div>

  <!-- Interactive Workbench -->
  <div class="container app-grid">
    
    <!-- Left Card: Live Market Explorer -->
    <div class="card">
      <div class="card-title">
        <span>🔍</span> Live Market Explorer
      </div>
      <div class="card-subtitle">Search real-time prediction markets & outcome probabilities on Polymarket CLOB</div>

      <div class="form-group">
        <div style="display: flex; gap: 8px;">
          <input type="text" id="searchInput" placeholder="Search markets (e.g. Fed, Bitcoin, AI, Space)..." value="Fed">
          <button class="btn btn-primary" onclick="searchMarkets()">Search</button>
        </div>
      </div>

      <div id="marketsContainer">
        <!-- Injected via JS -->
      </div>
    </div>

    <!-- Right Card: Arbitrage Delta & Kelly Sizer -->
    <div class="card">
      <div class="card-title">
        <span>⚖️</span> Arbitrage Delta & Kelly Sizer
      </div>
      <div class="card-subtitle">Compute mispricing spread vs bookmakers / Kalshi and optimal bankroll allocation</div>

      <div class="form-group">
        <label>Polymarket YES Price ($0.01 - $0.99)</label>
        <input type="number" id="polyPrice" step="0.01" min="0.01" max="0.99" value="0.62" oninput="calculateDelta()">
      </div>

      <div class="input-row">
        <div class="form-group">
          <label>Reference Format</label>
          <select id="refType" onchange="calculateDelta()">
            <option value="probability" selected>Implied Prob (%)</option>
            <option value="decimal">Decimal Odds</option>
            <option value="american">American Odds</option>
          </select>
        </div>
        <div class="form-group">
          <label>Reference Value</label>
          <input type="number" id="refValue" step="0.01" value="72" oninput="calculateDelta()">
        </div>
      </div>

      <div class="input-row">
        <div class="form-group">
          <label>Min Spread Threshold (bps)</label>
          <input type="number" id="spreadThreshold" value="150" step="25" oninput="calculateDelta()">
        </div>
        <div class="form-group">
          <label>Bankroll Size ($USDC)</label>
          <input type="number" id="bankrollUsd" value="10000" step="500" oninput="calculateDelta()">
        </div>
      </div>

      <div class="result-box" id="calcResult">
        <div class="metric-row">
          <span class="metric-label">Signal Recommendation</span>
          <span id="resAction" class="badge-signal signal-buy">BUY_YES</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Arbitrage Delta</span>
          <span id="resDelta" class="metric-val" style="color: var(--primary);">+1,000 bps (+10.0%)</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Expected Value ROI</span>
          <span id="resRoi" class="metric-val" style="color: #10b981;">+16.13% EV</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Kelly Allocation (Half-Kelly)</span>
          <span id="resHalfKelly" class="metric-val">13.16% ($1,316 USDC)</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Polymarket vs Ref Odds</span>
          <span id="resOddsComp" class="metric-val mono" style="font-size: 12px;">1.61 (-163) vs 1.39 (-257)</span>
        </div>
      </div>

    </div>

  </div>

  <!-- Developer API Specs & cURL -->
  <div class="container" style="margin-bottom: 60px;">
    <div class="card">
      <div class="card-title">
        <span>🤖</span> Autonomous Agent Integration (Python / ElizaOS / cURL)
      </div>
      <div class="card-subtitle">One-liner integration for automated trading agents, algorithmic bots, and n8n/Make workflows</div>

      <div class="code-block mono">
<span class="keyword">curl</span> -X POST https://polymarket-arbitrage.topaisaas.workers.dev/v1/arbitrage/delta \\<br>
&nbsp;&nbsp;-H <span class="string">"Content-Type: application/json"</span> \\<br>
&nbsp;&nbsp;-d <span class="string">'{"polymarket_price": 0.62, "reference_odds": {"type": "probability", "value": 0.72}, "bankroll_usd": 10000}'</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <div class="container">
      <p>TopAI SaaS Studio &copy; 2026. Global Edge Deployment on Cloudflare Workers (0ms cold start).</p>
      <p style="margin-top: 6px;">Zero financial liability. Mathematical & quant analytics for prediction markets.</p>
    </div>
  </footer>

  <script>
    // Live client-side calculation mirroring server logic for instant interactive UX
    function calculateDelta() {
      const polyP = parseFloat(document.getElementById('polyPrice').value) || 0.5;
      const refType = document.getElementById('refType').value;
      const refVal = parseFloat(document.getElementById('refValue').value) || 50;
      const thresholdBps = parseInt(document.getElementById('spreadThreshold').value) || 150;
      const bankroll = parseFloat(document.getElementById('bankrollUsd').value) || 0;

      let refP = 0.5;
      if (refType === 'probability') {
        refP = refVal > 1 ? refVal / 100 : refVal;
      } else if (refType === 'decimal') {
        refP = refVal <= 1 ? 0.999 : 1 / refVal;
      } else if (refType === 'american') {
        if (refVal > 0) refP = 100 / (refVal + 100);
        else refP = Math.abs(refVal) / (Math.abs(refVal) + 100);
      }
      refP = Math.max(0.001, Math.min(0.999, refP));

      const deltaBps = Math.round((refP - polyP) * 10000);
      const deltaPct = ((refP - polyP) * 100).toFixed(2);

      let action = 'FAIR_VALUE';
      let roiPct = 0;
      let fullKelly = 0;

      if (deltaBps >= thresholdBps) {
        action = 'BUY_YES';
        roiPct = (((refP - polyP) / polyP) * 100).toFixed(2);
        fullKelly = Math.min(0.4, Math.max(0, (refP - polyP) / (1 - polyP)));
      } else if (deltaBps <= -thresholdBps) {
        action = 'BUY_NO';
        const noPrice = 1 - polyP;
        const refNo = 1 - refP;
        roiPct = (((refNo - noPrice) / noPrice) * 100).toFixed(2);
        fullKelly = Math.min(0.4, Math.max(0, (refNo - noPrice) / (1 - noPrice)));
      }

      const halfKellyPct = ((fullKelly / 2) * 100).toFixed(2);
      const positionUsd = Math.round((halfKellyPct / 100) * bankroll);

      const actionEl = document.getElementById('resAction');
      actionEl.innerText = action;
      if (action === 'BUY_YES') actionEl.className = 'badge-signal signal-buy';
      else if (action === 'BUY_NO') actionEl.className = 'badge-signal signal-sell';
      else actionEl.className = 'badge-signal signal-neutral';

      document.getElementById('resDelta').innerText = (deltaBps >= 0 ? '+' : '') + deltaBps.toLocaleString() + ' bps (' + (deltaBps >= 0 ? '+' : '') + deltaPct + '%)';
      document.getElementById('resRoi').innerText = (roiPct > 0 ? '+' : '') + roiPct + '% Expected ROI';
      document.getElementById('resHalfKelly').innerText = halfKellyPct + '% ($' + positionUsd.toLocaleString() + ' USDC)';

      const polyDec = (1 / polyP).toFixed(2);
      const refDec = (1 / refP).toFixed(2);
      document.getElementById('resOddsComp').innerText = polyDec + ' vs ' + refDec + ' (Decimal)';
    }

    // Search Markets
    async function searchMarkets() {
      const q = document.getElementById('searchInput').value;
      const container = document.getElementById('marketsContainer');
      container.innerHTML = '<div style="color: var(--text-muted); font-size: 13px; padding: 12px 0;">Fetching Polymarket data...</div>';

      try {
        const res = await fetch('/v1/markets/search?q=' + encodeURIComponent(q) + '&limit=4');
        const data = await res.json();
        
        if (data.success && data.markets && data.markets.length > 0) {
          container.innerHTML = data.markets.map(m => {
            const yes = m.outcomes[0] || { price: 0.5, implied_probability_percent: 50 };
            const no = m.outcomes[1] || { price: 0.5, implied_probability_percent: 50 };
            return \`
              <div class="market-card" onclick="selectMarket(\${yes.price})">
                <div class="market-q">\${m.question}</div>
                <div class="market-meta">
                  <span>Vol: $\${(m.volume_24h_usd || 0).toLocaleString()}</span>
                  <span>Liq: $\${(m.total_liquidity_usd || 0).toLocaleString()}</span>
                  <span>\${m.category}</span>
                </div>
                <div class="market-outcomes">
                  <div class="outcome-pill yes">YES $\${yes.price} (\${yes.implied_probability_percent}%)</div>
                  <div class="outcome-pill no">NO $\${no.price} (\${no.implied_probability_percent}%)</div>
                </div>
              </div>
            \`;
          }).join('');
        } else {
          container.innerHTML = '<div style="color: var(--text-muted); font-size: 13px;">No markets found. Try another search term.</div>';
        }
      } catch (err) {
        container.innerHTML = '<div style="color: var(--danger); font-size: 13px;">Failed to fetch live markets.</div>';
      }
    }

    function selectMarket(price) {
      document.getElementById('polyPrice').value = price;
      calculateDelta();
    }

    // Run initial search & calculation
    window.addEventListener('DOMContentLoaded', () => {
      calculateDelta();
      searchMarkets();
    });
  </script>

</body>
</html>`;
}
