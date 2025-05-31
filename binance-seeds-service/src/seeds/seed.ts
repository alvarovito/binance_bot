class Seed {
    private asset: string;
    private value: number;
    private occupied: boolean;

    constructor(asset: string, value: number) {
        this.asset = asset;
        this.value = value;
        this.occupied = false;
    }

    public occupy(): void {
        this.occupied = true;
    }

    public release(): void {
        this.occupied = false;
        this.asset = '';
        this.value = 0;
    }

    public isOccupied(): boolean {
        return this.occupied;
    }

    public getAsset(): string {
        return this.asset;
    }

    public getValue(): number {
        return this.value;
    }

    public setAsset(asset: string): void {
        this.asset = asset;
    }

    public setValue(value: number): void {
        this.value = value;
    }
}