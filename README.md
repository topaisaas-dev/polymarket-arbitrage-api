# Polymarket Odds & Arbitrage Delta API

> **Sub-Millisecond Prediction Market Implied Odds, Cross-Platform Arbitrage Delta & Kelly Criterion Position Sizer for AI Trading Agents**

[![Cloudflare Workers](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange.svg)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Uptime](https://img.shields.io/badge/Uptime-100%25-brightgreen.svg)](https://polymarket-arbitrage.topaisaas.workers.dev/v1/health)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0.3-brightgreen.svg)](https://polymarket-arbitrage.topaisaas.workers.dev/openapi.json)
[![RapidAPI](https://img.shields.io/badge/RapidAPI-Subscribe%20Free-blue.svg)](https://rapidapi.com/topaisaasdev/api/polymarket-odds-arbitrage-delta-api/pricing)

Polymarket has become the world's most accurate real-time consensus engine for geopolitical, macroeconomic, and crypto events. However, algorithmic traders and autonomous agents (**ElizaOS, CCXT, Hummingbot, LangChain**) struggle with heavy WebSocket connections, complex CLOB parsing, and manual odds conversion.

**Polymarket Odds & Arbitrage Delta API** unbundles prediction markets into high-speed, deterministic micro-primitives:
1. **Real-time Implied Probability & Outcome Pricing** (Sub-50ms query by keyword or condition ID).
2. **Cross-Platform Mispricing & Arbitrage Detection** (Instantly compare Polymarket vs Kalshi, Betfair, Las Vegas sportsbooks, or AI news consensus).
3. **Kelly Criterion Bankroll Allocation** (Computes exact Half-Kelly & Full-Kelly optimal bet sizing in $USDC).
4. **Orderbook Slippage & Price Impact Modeler** (Simulates concave fill price degradation before order routing).

---

## ⚡ Quick Try in 5 Seconds + Free FinOps Audit + USD Toolkits (14-Day Money-Back Guarantee)

Test the **TopAI Sovereign Edge Gateway** live right now — **no API key required**, deterministic sub-30ms response (`HTTP 200`), zero LLM token burn (Deterministic Financial Math Guardrail (`POST /v1/math/check`)):

```bash
curl -sS -X POST https://topaigateway.com/v1/math/check -H "Content-Type: application/json" -d '{"expression":"(125 * 48) + 320"}'
```

### 🔍 Free Live Diagnostics, Sample Previews & Edge MCP Server
- **Free Live FinOps & Token Waste Auditor**: Benchmark your agent token burn in 10 seconds -> [**Run Free FinOps Audit**](https://topaigateway.com/audit?utm_source=github&utm_medium=readme&utm_campaign=polymarket-arbitrage-api)
- **Interactive Sample Previews (No Signup)**: [**n8n Sovereign Workflow Starter JSON**](https://topaigateway.com/samples/topai-n8n-starter.json?utm_source=github&utm_medium=readme&utm_campaign=polymarket-arbitrage-api) · [**Cursor & Claude Code Sovereign Rules**](https://topaigateway.com/download/samples/topai-cursor-rules.txt?utm_source=github&utm_medium=readme&utm_campaign=polymarket-arbitrage-api)
- **19-Tool Edge MCP Server**: Connect Claude Desktop, Cursor, or Windsurf in 1 line -> `npx -y @topaisaas/mcp-server`

### 💳 Hero Quartet — Direct USD Checkout (14-Day No-Questions-Asked Money-Back Guarantee)

| Plan / Toolkit | USD Price | What You Unlock | Direct USD Checkout |
| :--- | :--- | :--- | :--- |
| **Pack 1: DevEx & FinOps Pro Trial** | **$0 / 7 Days** | 10,000 req/mo across 100+ sub-30ms edge APIs (`$14/mo` after trial, cancel anytime) | [**Start $0 7-Day Trial →**](https://topaigateway.com/checkout?pack=pack_1_devex&direct=true&utm_source=github&utm_medium=readme&utm_campaign=polymarket-arbitrage-api) |
| **n8n & Make 65-Workflow Super-Pack** | **$19 Once** | 65 production-hardened n8n & Make templates with zero-token edge connectors | [**Get Super-Pack ($19) →**](https://topaigateway.com/checkout?pack=bundle_n8n_make&direct=true&utm_source=github&utm_medium=readme&utm_campaign=polymarket-arbitrage-api) |
| **Runaway Token Breaker Shield** | **$29 Once** | Deterministic circuit-breaker kit to stop infinite agent loops & runaway LLM bills | [**Get Breaker Shield ($29) →**](https://topaigateway.com/checkout?pack=runaway_token_breaker&direct=true&utm_source=github&utm_medium=readme&utm_campaign=polymarket-arbitrage-api) |
| **Cursor & Claude Code 169-Tool Harness Kit** | **$49 Once** | Complete 169-tool sovereign engineering harness, offline keys, hooks & CI/CD guardrails | [**Get 169-Tool Kit ($49) →**](https://topaigateway.com/checkout?pack=bundle_cursor_harness&direct=true&utm_source=github&utm_medium=readme&utm_campaign=polymarket-arbitrage-api) |

---

## ⚡ Key Features

- 🏎️ **Sub-50ms Execution**: 0ms cold-start serverless edge running across 300+ worldwide Cloudflare data centers.
- 🎯 **Zero Heavy Dependencies**: Pure algorithmic calculations—no slow browser headless rendering or heavy Web3 RPC nodes.
- ⚖️ **Cross-Platform Odds Normalization**: Seamless conversion between Implied Probability (%), Decimal Odds, and American Odds (+/-).
- 📐 **Quant-Grade Position Sizing**: Native Kelly Criterion ($f^* = \frac{p \cdot b - q}{b}$) bounded for risk management.
- 🌊 **Orderbook Slippage Curve**: Almgren-Chriss stylized liquidity impact formula to prevent toxic execution.
- 🤖 **Agent-to-Agent (A2A) Ready**: Formatted for direct Function Calling and Tool use in ElizaOS, AutoGPT, and CrewAI.

---

## 🚀 Quick Start (cURL)

### 1. Detect Arbitrage Delta & Kelly Sizing (POST)
Compare Polymarket YES price ($0.62) with external consensus / bookmaker reference (72% probability or -257 American odds):

```bash
curl -X POST https://polymarket-arbitrage.topaisaas.workers.dev/v1/arbitrage/delta \
  -H "Content-Type: application/json" \
  -d '{
    "polymarket_price": 0.62,
    "reference_odds": {
      "type": "probability",
      "value": 0.72
    },
    "bankroll_usd": 10000,
    "min_spread_bps_threshold": 150
  }'
```

**Response (Sub-50ms):**
```json
{
  "success": true,
  "result": {
    "polymarket_implied_probability": 0.62,
    "reference_implied_probability": 0.72,
    "delta_basis_points": 1000,
    "delta_percent": 10.0,
    "arbitrage_detected": true,
    "recommended_action": "BUY_YES",
    "expected_value_per_share": 0.1,
    "expected_roi_percent": 16.13,
    "risk_reward_ratio": 0.61,
    "kelly_criterion": {
      "full_kelly_percent": 26.32,
      "half_kelly_percent": 13.16,
      "quarter_kelly_percent": 6.58,
      "recommended_position_usd": 1316
    },
    "odds_comparison": {
      "polymarket": {
        "price_usd": 0.62,
        "decimal_odds": 1.61,
        "american_odds": "-163"
      },
      "reference": {
        "price_usd": 0.72,
        "decimal_odds": 1.39,
        "american_odds": "-257"
      }
    }
  }
}
```

---

### 2. Search Real-Time Polymarket Markets (GET)
```bash
curl "https://polymarket-arbitrage.topaisaas.workers.dev/v1/markets/search?q=fed&limit=3"
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "source": "live_polymarket_clob",
  "markets": [
    {
      "id": "poly-fed-rate-cut-2026",
      "condition_id": "0x3b95d9a9f2441991d79a29e160a28fbe9013c7a1cb2e32a68c07e0c4b6932401",
      "question": "Will the US Federal Reserve cut interest rates at the next FOMC meeting?",
      "slug": "fed-rate-cut-next-meeting",
      "category": "Economics / Macro",
      "volume_24h_usd": 1425890,
      "total_liquidity_usd": 8420000,
      "outcomes": [
        {
          "name": "Yes",
          "price": 0.68,
          "implied_probability_percent": 68.0,
          "decimal_odds": 1.47,
          "american_odds": "-213"
        },
        {
          "name": "No",
          "price": 0.32,
          "implied_probability_percent": 32.0,
          "decimal_odds": 3.13,
          "american_odds": "+213"
        }
      ]
    }
  ]
}
```

---

### 3. Calculate Execution Slippage (POST)
Estimate price impact for a $5,000 order on a $500,000 liquidity pool:

```bash
curl -X POST https://polymarket-arbitrage.topaisaas.workers.dev/v1/orderbook/slippage \
  -H "Content-Type: application/json" \
  -d '{
    "order_size_usd": 5000,
    "market_liquidity_usd": 500000,
    "base_price": 0.65,
    "direction": "BUY"
  }'
```

**Response:**
```json
{
  "success": true,
  "result": {
    "order_size_usd": 5000,
    "market_liquidity_usd": 500000,
    "liquidity_depth_ratio_percent": 1.0,
    "base_price": 0.65,
    "estimated_fill_price": 0.6607,
    "estimated_slippage_bps": 165,
    "estimated_slippage_percent": 1.65,
    "total_slippage_cost_usd": 82.5,
    "execution_rating": "MODERATE",
    "max_recommended_single_chunk_usd": 4200
  }
}
```

---

## 🐍 Python AI Agent Example (ElizaOS / CCXT)

```python
import requests

def scan_prediction_arbitrage(market_query: str, external_prob: float, bankroll: float = 10000):
    API_URL = "https://polymarket-arbitrage.topaisaas.workers.dev"
    
    # 1. Fetch live market price
    search_res = requests.get(f"{API_URL}/v1/markets/search", params={"q": market_query, "limit": 1}).json()
    if not search_res.get("markets"):
        print("Market not found")
        return
    
    market = search_res["markets"][0]
    yes_price = market["outcomes"][0]["price"]
    print(f"Market: {market['question']}")
    print(f"Polymarket YES Price: ${yes_price} ({yes_price*100:.1f}%)")

    # 2. Check for Arbitrage Delta vs external probability
    delta_res = requests.post(f"{API_URL}/v1/arbitrage/delta", json={
        "polymarket_price": yes_price,
        "reference_odds": {"type": "probability", "value": external_prob},
        "bankroll_usd": bankroll,
        "min_spread_bps_threshold": 150
    }).json()

    res = delta_res["result"]
    print(f"Signal: {res['recommended_action']} | Delta: {res['delta_basis_points']} bps")
    
    if res["arbitrage_detected"]:
        kelly = res["kelly_criterion"]
        print(f"-> Expected ROI: +{res['expected_roi_percent']}%")
        print(f"-> Half-Kelly Sizing: {kelly['half_kelly_percent']}% (${kelly['recommended_position_usd']} USDC)")

scan_prediction_arbitrage(market_query="Fed", external_prob=0.78, bankroll=25000)
```

---

## 🛡️ Edge Security & SLAs

- **Stateless & Private**: No trading keys or user wallets are ever accepted, stored, or processed.
- **DDoS Protected**: Cloudflare global Anycast edge filtering across 300+ data centers.
- **Anti-SSRF Protected**: Safe outbound client restrictions with strictly clamped timeouts (3-4s).
