/**
 * Quant & Arbitrage Delta Calculation Engine
 * High-precision formulas for prediction market mispricings, Kelly sizing, and slippage.
 */

export interface ArbitrageDeltaInput {
  polymarket_price: number; // e.g. 0.62 ($0.62 for YES share)
  reference_odds: {
    type: "probability" | "decimal" | "american";
    value: number; // e.g. 0.72 for prob, 1.38 for decimal, -250 for american
  };
  min_spread_bps_threshold?: number; // default: 150 bps (1.5%)
  bankroll_usd?: number; // optional, e.g. $10,000 for dollar sizing
}

export interface ArbitrageDeltaResult {
  polymarket_implied_probability: number; // e.g. 0.62
  reference_implied_probability: number; // e.g. 0.72
  delta_basis_points: number; // e.g. +1000 bps
  delta_percent: number; // e.g. +10.0%
  arbitrage_detected: boolean;
  recommended_action: "BUY_YES" | "BUY_NO" | "FAIR_VALUE";
  expected_value_per_share: number; // EV in USD per $1 contract
  expected_roi_percent: number; // ROI % on capital deployed
  risk_reward_ratio: number;
  kelly_criterion: {
    full_kelly_percent: number; // e.g. 26.3%
    half_kelly_percent: number; // e.g. 13.1% (recommended for quant safety)
    quarter_kelly_percent: number; // e.g. 6.6%
    recommended_position_usd?: number; // half-kelly * bankroll
  };
  odds_comparison: {
    polymarket: {
      price_usd: number;
      decimal_odds: number;
      american_odds: string;
    };
    reference: {
      price_usd: number;
      decimal_odds: number;
      american_odds: string;
    };
  };
}

export interface SlippageInput {
  order_size_usd: number;
  market_liquidity_usd: number;
  base_price: number;
  direction?: "BUY" | "SELL";
  base_spread_bps?: number;
}

export interface SlippageResult {
  order_size_usd: number;
  market_liquidity_usd: number;
  liquidity_depth_ratio_percent: number;
  base_price: number;
  estimated_fill_price: number;
  estimated_slippage_bps: number;
  estimated_slippage_percent: number;
  total_slippage_cost_usd: number;
  execution_rating: "EXCELLENT" | "MODERATE" | "HIGH_SLIPPAGE" | "PROHIBITIVE";
  max_recommended_single_chunk_usd: number;
}

export class ArbitrageEngine {
  /**
   * Convert external odds format into pure implied probability [0.001 - 0.999]
   */
  static normalizeToReferenceProbability(type: "probability" | "decimal" | "american", value: number): number {
    let prob = 0.5;

    if (type === "probability") {
      prob = value > 1 ? value / 100 : value;
    } else if (type === "decimal") {
      if (value <= 1.0) prob = 0.999;
      else prob = 1 / value;
    } else if (type === "american") {
      if (value > 0) {
        prob = 100 / (value + 100);
      } else if (value < 0) {
        const absVal = Math.abs(value);
        prob = absVal / (absVal + 100);
      }
    }

    return Math.max(0.001, Math.min(0.999, Math.round(prob * 10000) / 10000));
  }

  /**
   * Format probability to decimal odds
   */
  static probToDecimal(prob: number): number {
    const cleanP = Math.max(0.001, Math.min(0.999, prob));
    return Math.round((1 / cleanP) * 100) / 100;
  }

  /**
   * Format probability to American odds format (+150 or -200)
   */
  static probToAmerican(prob: number): string {
    const cleanP = Math.max(0.001, Math.min(0.999, prob));
    if (cleanP >= 0.5) {
      const val = Math.round((cleanP / (1 - cleanP)) * 100);
      return `-${val}`;
    } else {
      const val = Math.round(((1 - cleanP) / cleanP) * 100);
      return `+${val}`;
    }
  }

  /**
   * Compute full arbitrage delta and Kelly criterion position sizing
   */
  static calculateArbitrage(input: ArbitrageDeltaInput): ArbitrageDeltaResult {
    const polyP = Math.max(0.001, Math.min(0.999, input.polymarket_price));
    const refP = this.normalizeToReferenceProbability(input.reference_odds.type, input.reference_odds.value);
    const thresholdBps = input.min_spread_bps_threshold ?? 150;

    const deltaProb = refP - polyP;
    const deltaBps = Math.round(deltaProb * 10000);
    const deltaPct = Math.round(deltaProb * 10000) / 100;

    let action: "BUY_YES" | "BUY_NO" | "FAIR_VALUE" = "FAIR_VALUE";
    let evPerShare = 0;
    let expectedRoiPct = 0;
    let fullKellyFraction = 0;

    if (deltaBps >= thresholdBps) {
      // Polymarket YES is underpriced: True prob is higher than market price!
      action = "BUY_YES";
      // EV = (P_ref * 1.00 payout) - P_poly cost
      evPerShare = refP - polyP;
      expectedRoiPct = Math.round((evPerShare / polyP) * 10000) / 100;
      
      // Kelly: f* = (p - price) / (1 - price)
      fullKellyFraction = (refP - polyP) / (1 - polyP);
    } else if (deltaBps <= -thresholdBps) {
      // Polymarket YES is overpriced: buying NO is underpriced!
      action = "BUY_NO";
      const noPrice = 1 - polyP;
      const refNoProb = 1 - refP;
      
      evPerShare = refNoProb - noPrice;
      expectedRoiPct = Math.round((evPerShare / noPrice) * 10000) / 100;

      // Kelly for NO outcome: f* = (p_no - price_no) / (1 - price_no)
      fullKellyFraction = (refNoProb - noPrice) / (1 - noPrice);
    } else {
      action = "FAIR_VALUE";
      evPerShare = 0;
      expectedRoiPct = 0;
      fullKellyFraction = 0;
    }

    // Bound Kelly fraction safely between 0% and 40%
    const boundedFullKelly = Math.max(0, Math.min(0.40, fullKellyFraction));
    const fullKellyPct = Math.round(boundedFullKelly * 10000) / 100;
    const halfKellyPct = Math.round((boundedFullKelly / 2) * 10000) / 100;
    const quarterKellyPct = Math.round((boundedFullKelly / 4) * 10000) / 100;

    const riskReward = polyP > 0 ? Math.round(((1 - polyP) / polyP) * 100) / 100 : 1;

    const result: ArbitrageDeltaResult = {
      polymarket_implied_probability: polyP,
      reference_implied_probability: refP,
      delta_basis_points: deltaBps,
      delta_percent: deltaPct,
      arbitrage_detected: action !== "FAIR_VALUE",
      recommended_action: action,
      expected_value_per_share: Math.round(evPerShare * 1000) / 1000,
      expected_roi_percent: expectedRoiPct,
      risk_reward_ratio: riskReward,
      kelly_criterion: {
        full_kelly_percent: fullKellyPct,
        half_kelly_percent: halfKellyPct,
        quarter_kelly_percent: quarterKellyPct
      },
      odds_comparison: {
        polymarket: {
          price_usd: polyP,
          decimal_odds: this.probToDecimal(polyP),
          american_odds: this.probToAmerican(polyP)
        },
        reference: {
          price_usd: refP,
          decimal_odds: this.probToDecimal(refP),
          american_odds: this.probToAmerican(refP)
        }
      }
    };

    if (input.bankroll_usd && input.bankroll_usd > 0) {
      result.kelly_criterion.recommended_position_usd = Math.round((halfKellyPct / 100) * input.bankroll_usd);
    }

    return result;
  }

  /**
   * Calculate execution slippage given order size and liquidity pool depth
   */
  static calculateSlippage(input: SlippageInput): SlippageResult {
    const orderSize = Math.max(1, input.order_size_usd);
    const liquidity = Math.max(1000, input.market_liquidity_usd);
    const basePrice = Math.max(0.01, Math.min(0.99, input.base_price));
    const baseSpreadBps = input.base_spread_bps ?? 50; // default 50 bps base half-spread

    // Depth ratio: what % of total market liquidity is this single order
    const depthRatio = orderSize / liquidity;
    const depthRatioPct = Math.round(depthRatio * 10000) / 100;

    // Concave square-root market impact formula (Almgren-Chriss stylized model)
    const impactBps = Math.round(baseSpreadBps + Math.pow(depthRatio, 0.6) * 3500);
    const slippagePct = Math.round((impactBps / 10000) * 10000) / 100;

    let fillPrice = basePrice;
    if (input.direction === "SELL") {
      fillPrice = Math.max(0.005, basePrice * (1 - impactBps / 10000));
    } else {
      fillPrice = Math.min(0.995, basePrice * (1 + impactBps / 10000));
    }
    fillPrice = Math.round(fillPrice * 10000) / 10000;

    const slippageCost = Math.round(orderSize * (impactBps / 10000) * 100) / 100;

    let rating: "EXCELLENT" | "MODERATE" | "HIGH_SLIPPAGE" | "PROHIBITIVE" = "EXCELLENT";
    if (impactBps < 100) rating = "EXCELLENT";
    else if (impactBps < 300) rating = "MODERATE";
    else if (impactBps < 800) rating = "HIGH_SLIPPAGE";
    else rating = "PROHIBITIVE";

    // Recommended max chunk to keep slippage under 100 bps (1%)
    const maxChunk = Math.round(liquidity * Math.pow(50 / 3500, 1 / 0.6));

    return {
      order_size_usd: orderSize,
      market_liquidity_usd: liquidity,
      liquidity_depth_ratio_percent: depthRatioPct,
      base_price: basePrice,
      estimated_fill_price: fillPrice,
      estimated_slippage_bps: impactBps,
      estimated_slippage_percent: slippagePct,
      total_slippage_cost_usd: slippageCost,
      execution_rating: rating,
      max_recommended_single_chunk_usd: Math.max(100, maxChunk)
    };
  }
}
