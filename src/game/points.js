import { pointUpgrade } from "./point-upgrade";
import { calcCompressedPointsBoost } from "./compressed-points";
import { spacetimeUpgrades } from "./spacetime";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { challenges } from "./challenges";
import { calcDarkMatterBoost } from "./dark-matter";

export function calcPointGain(){
    let basePoints = pointUpgrade.effect.mul(calcCompressedPointsBoost());
    if(spacetimeUpgrades[0].boughtAmount) basePoints = basePoints.mul(spacetimeUpgrades[0].effect);
    if(spacetimeUpgrades[2].boughtAmount) basePoints = basePoints.mul(spacetimeUpgrades[2].effect);
    if(tearSpacetimeUpgrades[0].boughtAmount) basePoints = basePoints.mul(tearSpacetimeUpgrades[0].effect);
    if(tearSpacetimeUpgrades[2].boughtAmount) basePoints = basePoints.mul(tearSpacetimeUpgrades[2].effect);
    if(tearSpacetimeUpgrades[4].boughtAmount) basePoints = basePoints.mul(tearSpacetimeUpgrades[4].effect);
    if(tearSpacetimeUpgrades[6].boughtAmount) basePoints = basePoints.mul(tearSpacetimeUpgrades[6].effect);
    basePoints = basePoints.mul(calcDarkMatterBoost());
    basePoints = basePoints.div(player.antiPoints);
    
    if(player.currentChallenge == 3) basePoints = basePoints.pow(0.65);
    if(challenges[2].completed) basePoints = basePoints.pow(1.05);
    return basePoints;
}
