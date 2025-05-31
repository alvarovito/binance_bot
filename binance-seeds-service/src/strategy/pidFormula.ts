export interface PIDWeights {
    proportional: number;
    integral: number;
    derivative: number;
}

export function calculatePID(currentValue: number, previousValue: number, integral: number, lastDerivatives: number[], weights: PIDWeights): number {
    const derivative = currentValue - previousValue;
    const integralValue = integral + currentValue;

    const lastDerivativesSum = lastDerivatives.reduce((sum, val) => sum + val, 0);
    const lastDerivativesAverage = lastDerivatives.length > 0 ? lastDerivativesSum / lastDerivatives.length : 0;

    const weightedValue = (weights.proportional * currentValue) +
                          (weights.integral * integralValue) +
                          (weights.derivative * derivative) +
                          (0.3 * lastDerivativesAverage);

    return weightedValue;
}