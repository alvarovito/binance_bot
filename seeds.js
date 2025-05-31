import { CONFIG } from './config.js';

export class Seed {
  constructor(id, valueEUR) {
    this.id = id;
    this.valueEUR = valueEUR;
    this.asset = null; // Symbol currently assigned
    this.occupied = false;
  }
}

export class SeedManager {
  constructor() {
    this.seeds = [];
    for (let i = 0; i < CONFIG.seedCount; i++) {
      this.seeds.push(new Seed(i, CONFIG.seedValueEUR));
    }
  }

  // Fill seeds with existing account assets
  initializeFromBalances(balances) {
    for (const bal of balances) {
      if (+bal.free > 0) {
        const seed = this.getAvailableSeed();
        if (!seed) break;
        seed.asset = bal.asset;
        seed.occupied = true;
      }
    }
  }

  getAvailableSeed() {
    return this.seeds.find(s => !s.occupied);
  }

  occupySeed(seed, asset) {
    seed.asset = asset;
    seed.occupied = true;
  }
}
