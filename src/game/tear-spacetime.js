import { dimensions } from "./dimensional";
import { Effect } from "./effect";
import { Purchasable } from "./purchasable";
import Decimal from "break_eternity.js";

export function canTearSpacetime(){
    return player.spacetimePoints.gte(1000);
}

const upgradeDescriptions = [
    "You gain more points based on current points",
    "Further increase the base point upgrade multiplier (2.2x -> 2.5x)",
    "Multiply point gain based on spacetime points",
    "Gain free point upgrades based on 8th dimensions",
    "Multiplier to points based on times spacetimed",
    "Multiplier to DP gain based on spacetime points",
    "Gain more points based on highest points",
    "Increase dimensional power effectiveness based on DP",
    "Passively gain 1% of DP gained on dimensional per second",
    "Dimension autobuyers bulk buys dimensions",
    "Increase dark matter production based on points",
    "Dark matter boost dark generators",
    "Reduce the point upgrade cost multiplier increase",
    "Gain a percentage of best SP per minute passively"
];

const upgradeEffects = [
    new Effect(() => player.points.add(1).log(10).pow(10).add(1), "mult"),
    null,
    new Effect(() => player.spacetimePoints.pow(2).mul(1e15).pow(1.5).add(1), "mult"),
    new Effect(() => new Decimal((dimensions[7].boughtAmount*25)**0.5), "add"),
    new Effect(() => new Decimal(player.records.spacetimeAmount).pow(8).add(1), "mult"),
    new Effect(() => player.spacetimePoints.pow(1.25).add(1), "mult"),
    new Effect(() => player.records.highestPoints.add(1).log(10).pow(10).add(1), "mult"),
    new Effect(() => Decimal.min(player.dimensionalPoints.add(1).log(10).pow(0.5).div(20).add(1), new Decimal(2.5)), "mult"),
    null, null,
    new Effect(() => player.points.add(1).log(10).div(2000).add(1), "mult"),
    new Effect(() => player.darkMatter.add(1).log(10).div(5).add(1), "mult"),
    new Effect((boughtAmount) => new Decimal(boughtAmount), "sub"),
    new Effect((boughtAmount) => new Decimal(boughtAmount).div(20), "percentage")
]

const upgradeCosts = [
    new Decimal(1e3),
    new Decimal(5e3),
    new Decimal(1e4),
    new Decimal(2.5e4),
    new Decimal(5e4),
    new Decimal(1e5),
    new Decimal(2e5),
    new Decimal(1e7),
    new Decimal(1e8),
    new Decimal(4e8),
    new Decimal(1e40),
    new Decimal(1e100),
    (boughtAmount) => boughtAmount >= 8 ? new Decimal("1e1e15") : new Decimal(5).pow(boughtAmount).mul(1e6),
    (boughtAmount) => boughtAmount >= 10 ? new Decimal("1e1e15") : new Decimal(3).pow(boughtAmount).mul(1e6)
];

const upgradeRepeatable = [
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    true, true
];

export const tearSpacetimeUpgrades = (function(){
    const upgrades = [];
    for(const i in upgradeDescriptions){
        upgrades.push(new Purchasable(
            upgradeRepeatable[i], () => player.tearSpacetimeUpgrades[i], 
            (val) => {player.tearSpacetimeUpgrades[i] = val},
            upgradeRepeatable[i] ? upgradeCosts[i] : () => upgradeCosts[i],
            (cost) => player.spacetimePoints.gte(cost),
            upgradeEffects[i],
            (cost) => {player.spacetimePoints = player.spacetimePoints.sub(cost);},
            upgradeDescriptions[i]
        ));
    }
    return upgrades;
})();
