import { Seed } from './seed';

export class SeedManager {
    private seeds: Seed[];
    private occupiedSeeds: Set<number>;
    private weightThreshold: number;

    constructor(numSeeds: number, initialValue: number, weightThreshold: number) {
        this.seeds = Array.from({ length: numSeeds }, (_, index) => new Seed(index, initialValue));
        this.occupiedSeeds = new Set();
        this.weightThreshold = weightThreshold;
    }

    public fillSeedWithAsset(asset: string, weight: number): boolean {
        if (weight > this.weightThreshold) {
            const availableSeedIndex = this.findAvailableSeed();
            if (availableSeedIndex !== -1) {
                this.seeds[availableSeedIndex].occupy(asset);
                this.occupiedSeeds.add(availableSeedIndex);
                return true;
            }
        }
        return false;
    }

    private findAvailableSeed(): number {
        for (let i = 0; i < this.seeds.length; i++) {
            if (!this.occupiedSeeds.has(i)) {
                return i;
            }
        }
        return -1; // No available seeds
    }

    public releaseSeed(index: number): void {
        if (this.occupiedSeeds.has(index)) {
            this.seeds[index].release();
            this.occupiedSeeds.delete(index);
        }
    }

    public getSeeds(): Seed[] {
        return this.seeds;
    }
}