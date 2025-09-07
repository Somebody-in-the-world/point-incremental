import { spacetimeChallenges } from "./spacetime-challenges";
import { pointCompressionReset } from "./resets";
import { spacetimeMilestones } from "./spacetime";

export function calcCompressedPointsGain(){
    return player.highestPointsThisCompression.div(250).pow(0.4).floor();
}

export function calcCompressedPointsBoost(){
    if(spacetimeChallenges[0].isRunning) return new Decimal(1);
    let power = 0.75;
    if(spacetimeChallenges[0].completed) power += 0.05;
    return player.compressedPoints.pow(power).add(1);
}

export function calcNextCompressedPoint(){
    return calcCompressedPointsGain().add(1).pow(2.5).mul(250);
}

export function compressedPointsPrestige(){
    player.compressedPoints = 
        player.compressedPoints.add(calcCompressedPointsGain());
    pointCompressionReset();
    player.records.pointCompressionAmount++;
}

export function automaticCPGainTick(deltaTime){
    if(spacetimeMilestones[3].unlocked){
        player.compressedPoints = player.compressedPoints.add(
            calcCompressedPointsGain().div(10).mul(deltaTime)
        );
    }
}
