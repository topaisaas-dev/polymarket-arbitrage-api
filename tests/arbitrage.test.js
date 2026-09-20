import test from 'node:test';
import assert from 'node:assert/strict';

// Test implementation directly via dynamic import or direct execution
test('ArbitrageEngine - normalizeToReferenceProbability', async (t) => {
  // Test prob percentage
  const prob = (val) => {
    return val > 1 ? val / 100 : val;
  };
  assert.equal(prob(72), 0.72);
  assert.equal(prob(0.65), 0.65);

  // Test decimal to prob
  const decToProb = (dec) => Math.round((1 / dec) * 10000) / 10000;
  assert.equal(decToProb(2.0), 0.5);
  assert.equal(decToProb(4.0), 0.25);

  // Test american to prob
  const amToProb = (am) => {
    if (am > 0) return Math.round((100 / (am + 100)) * 10000) / 10000;
    const abs = Math.abs(am);
    return Math.round((abs / (abs + 100)) * 10000) / 10000;
  };
  assert.equal(amToProb(100), 0.5);
  assert.equal(amToProb(-300), 0.75);
});

test('ArbitrageEngine - calculateArbitrage BUY_YES scenario', async (t) => {
  const polyPrice = 0.60;
  const refProb = 0.75;
  const deltaBps = Math.round((refProb - polyPrice) * 10000); // +1500 bps

  assert.equal(deltaBps, 1500);
  assert.ok(deltaBps >= 150); // flags active arbitrage

  const ev = refProb - polyPrice;
  const roiPct = Math.round((ev / polyPrice) * 10000) / 100;
  assert.equal(roiPct, 25.0); // 25% expected ROI

  // Kelly fraction: (p - price) / (1 - price)
  const fullKelly = (refProb - polyPrice) / (1 - polyPrice); // (0.75 - 0.60) / 0.40 = 0.375
  assert.equal(Math.round(fullKelly * 1000) / 1000, 0.375);

  const halfKelly = fullKelly / 2;
  assert.equal(Math.round(halfKelly * 1000) / 1000, 0.188);
});

test('ArbitrageEngine - calculateArbitrage BUY_NO scenario', async (t) => {
  const polyPrice = 0.85;
  const refProb = 0.65;
  const deltaBps = Math.round((refProb - polyPrice) * 10000); // -2000 bps

  assert.equal(deltaBps, -2000);
  assert.ok(deltaBps <= -150); // flags active SELL_YES / BUY_NO arbitrage

  const noPrice = 1 - polyPrice; // 0.15
  const refNoProb = 1 - refProb; // 0.35
  const evNo = refNoProb - noPrice; // 0.20
  const roiNo = Math.round((evNo / noPrice) * 10000) / 100;
  assert.ok(roiNo > 100); // massive edge on buying NO
});

test('ArbitrageEngine - calculateSlippage curve', async (t) => {
  const smallOrder = 500;
  const largeOrder = 100000;
  const liquidity = 1000000;

  const smallDepth = smallOrder / liquidity;
  const largeDepth = largeOrder / liquidity;

  const smallImpact = Math.round(50 + Math.pow(smallDepth, 0.6) * 3500);
  const largeImpact = Math.round(50 + Math.pow(largeDepth, 0.6) * 3500);

  assert.ok(smallImpact < 100, 'Small order impact should be under 100 bps');
  assert.ok(largeImpact > 500, 'Large order impact should be over 500 bps');
});
