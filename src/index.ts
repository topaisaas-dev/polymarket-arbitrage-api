import { Hono } from "hono";
import { cors } from "hono/cors";
import { PolymarketClient } from "./polymarket";
import { ArbitrageEngine } from "./arbitrage";
import { OPENAPI_SPEC } from "./openapi_spec";
import { renderLandingPage } from "./landing";

const app = new Hono();
const polyClient = new PolymarketClient();

// Enable permissive CORS for cross-origin agent calls
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "X-RapidAPI-Key", "X-RapidAPI-Host", "Authorization"],
  exposeHeaders: ["Content-Length", "X-Response-Time"]
}));

// Timing middleware
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  c.header("X-Response-Time", `${ms}ms`);
});

/**
 * Root: HTML Interactive Playground or JSON descriptor
 */
app.get("/", (c) => {
  const accept = c.req.header("Accept") || "";
  const format = c.req.query("format");

  if (format === "json" || accept.includes("application/json")) {
    return c.json({
      name: "Polymarket Odds & Arbitrage Delta API",
      version: "1.0.0",
      description: "Sub-millisecond Polymarket prediction market implied probabilities, arbitrage mispricing delta, Kelly criterion bankroll position sizing, and slippage calculator for AI trading agents.",
      documentation: "https://polymarket-arbitrage.topaisaas.workers.dev/openapi.json",
      rapidapi: "https://rapidapi.com/user/topaisaasdev",
      endpoints: {
        search: "GET /v1/markets/search?q={query}&limit={limit}",
        trending: "GET /v1/markets/trending?limit={limit}",
        market_details: "GET /v1/markets/{id_or_slug}",
        arbitrage_delta: "POST /v1/arbitrage/delta",
        orderbook_slippage: "POST /v1/orderbook/slippage",
        health: "GET /v1/health",
        openapi: "GET /openapi.json"
      }
    });
  }

  return c.html(renderLandingPage());
});

/**
 * OpenAPI 3.0.3 Specification
 */
app.get("/openapi.json", (c) => {
  return c.json(OPENAPI_SPEC);
});

/**
 * Healthcheck
 */
app.get("/v1/health", (c) => {
  return c.json({
    status: "ok",
    service: "polymarket-arbitrage-api",
    timestamp: new Date().toISOString(),
    uptime_sla: "99.99%",
    version: "1.0.0",
    edge_runtime: "cloudflare_workers"
  });
});

/**
 * Search Prediction Markets
 */
app.get("/v1/markets/search", async (c) => {
  const query = c.req.query("q") || "";
  const category = c.req.query("category");
  const limitStr = c.req.query("limit") || "10";
  const limit = parseInt(limitStr, 10) || 10;

  try {
    const { markets, source } = await polyClient.searchMarkets(query, limit, category);
    return c.json({
      success: true,
      count: markets.length,
      source,
      markets
    });
  } catch (err: any) {
    return c.json({
      success: false,
      error: err.message || "Failed to search Polymarket markets"
    }, 500);
  }
});

/**
 * Get Trending Markets
 */
app.get("/v1/markets/trending", async (c) => {
  const limitStr = c.req.query("limit") || "6";
  const limit = parseInt(limitStr, 10) || 6;

  try {
    const { markets, source } = await polyClient.searchMarkets(undefined, limit);
    return c.json({
      success: true,
      count: markets.length,
      source,
      markets
    });
  } catch (err: any) {
    return c.json({
      success: false,
      error: err.message || "Failed to retrieve trending prediction markets"
    }, 500);
  }
});

/**
 * Get Market by ID or Slug
 */
app.get("/v1/markets/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ success: false, error: "Market identifier required" }, 400);
  }

  try {
    const market = await polyClient.getMarket(id);
    if (!market) {
      return c.json({ success: false, error: `Market '${id}' not found` }, 404);
    }

    return c.json({
      success: true,
      market
    });
  } catch (err: any) {
    return c.json({
      success: false,
      error: err.message || "Failed to retrieve market"
    }, 500);
  }
});

/**
 * Calculate Arbitrage Delta & Mispricing
 */
app.post("/v1/arbitrage/delta", async (c) => {
  try {
    const body = await c.req.json();

    if (body.polymarket_price === undefined || typeof body.polymarket_price !== "number") {
      return c.json({
        success: false,
        error: "Missing or invalid 'polymarket_price'. Must be a float between 0.001 and 0.999."
      }, 400);
    }

    if (!body.reference_odds || typeof body.reference_odds.value !== "number") {
      return c.json({
        success: false,
        error: "Missing or invalid 'reference_odds'. Must provide { type: 'probability'|'decimal'|'american', value: number }."
      }, 400);
    }

    const result = ArbitrageEngine.calculateArbitrage({
      polymarket_price: body.polymarket_price,
      reference_odds: body.reference_odds,
      min_spread_bps_threshold: body.min_spread_bps_threshold,
      bankroll_usd: body.bankroll_usd
    });

    return c.json({
      success: true,
      result
    });
  } catch (err: any) {
    return c.json({
      success: false,
      error: err.message || "Invalid JSON payload"
    }, 400);
  }
});

/**
 * Calculate Orderbook Slippage & Execution Pricing
 */
app.post("/v1/orderbook/slippage", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.order_size_usd || !body.market_liquidity_usd || body.base_price === undefined) {
      return c.json({
        success: false,
        error: "Missing required fields. Required: order_size_usd, market_liquidity_usd, base_price."
      }, 400);
    }

    const result = ArbitrageEngine.calculateSlippage({
      order_size_usd: body.order_size_usd,
      market_liquidity_usd: body.market_liquidity_usd,
      base_price: body.base_price,
      direction: body.direction,
      base_spread_bps: body.base_spread_bps
    });

    return c.json({
      success: true,
      result
    });
  } catch (err: any) {
    return c.json({
      success: false,
      error: err.message || "Invalid JSON payload"
    }, 400);
  }
});

export default app;
