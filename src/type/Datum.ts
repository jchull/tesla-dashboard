export interface ChargeDatum {
    chargingState: string;
    chargerPower: number;
    batteryLevel: number;
    batteryRangeIdeal: number;
    batteryRangeEst: number;
    energyAdded: number;
    rangeAddedIdeal: number;
    rangeAddedEst: number;
    maxCurrent: number;
    requestedCurrent: number;
    actualCurrent: number;
    timeToFull: number;
    chargeRate: number;
    timestamp: number;
}
