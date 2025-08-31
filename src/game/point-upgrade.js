import { calcChall2FreePointUpgrades, calcDimensionalPowerBoost } from "./dimensional";
import { Purchasable } from "./purchasable";
import { Effect } from "./effect";
import { spacetimeUpgrades } from "./spacetime";
import { INFINITY } from "./constants";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { challenges } from "./challenges";

export const pointUpgrade = 
    new Purchasable(true, () => player.pointUpgrade.boughtAmount,
        (val) => {player.pointUpgrade.boughtAmount = val;},
        function(boughtAmount){
            let cost;
            const infThresold = calcInfinityThresold();
            if(boughtAmount >= infThresold){
                cost = new Decimal("1e310").mul(new Decimal(10).pow((
                    (boughtAmount-infThresold)*
                    (6+(boughtAmount-infThresold-1)*calcCostMultiplierGrowth().log(10).toNumber())
                )/2));
            } else {
                cost = calcPreInfinityCost(boughtAmount);
            }
            if(challenges[4].completed){
                cost = cost.div(Decimal.min(player.darkMatter.add(1).mul(1e5).pow(180), "1e1000000"));
            }
            return cost;
        }, 
        (cost) => player.points.gte(cost), 
        new Effect(function(boughtAmount){
            if(player.currentChallenge == 5) return new Decimal(1);
            let freeAmount = 0;
            if(spacetimeUpgrades[4].boughtAmount) freeAmount += spacetimeUpgrades[4].effect.toNumber();
            if(tearSpacetimeUpgrades[3].boughtAmount) freeAmount += tearSpacetimeUpgrades[3].effect.toNumber();
            if(challenges[1].completed) freeAmount += calcChall2FreePointUpgrades().toNumber();
            return calcSingleEffect().pow(boughtAmount+freeAmount);
        }, "mult"),
        function(cost){
            player.points = player.points.sub(cost);
        }
    );

export function calcSingleEffect(){
    if(player.currentChallenge == 2) return new Decimal(2);
    let baseEffect = new Decimal(2);
    if(spacetimeUpgrades[1].boughtAmount) baseEffect = baseEffect.add(0.2);
    if(tearSpacetimeUpgrades[1].boughtAmount) baseEffect = baseEffect.add(0.3);
    return baseEffect.add(calcDimensionalPowerBoost());
}

function calcCostMultiplierGrowth(){
    return new Decimal(10).sub(tearSpacetimeUpgrades[12].boughtAmount);
}

function calcPreInfinityCost(boughtAmount){
    let costScallingStart = 35;
    let costScallingEffect = 0.04;

    let costBase = new Decimal(3);
    if(boughtAmount > costScallingStart){
        costBase = costBase.add((boughtAmount - costScallingStart) * costScallingEffect);
    }

    return costBase.pow(boughtAmount).mul(10);
}

export function bulkBuyPointUpgrades(){
    let maxAffordable = calcMaxPointUpgradesAffordable();
    pointUpgrade.boughtAmount += maxAffordable.amount;
    if(player.points.gte(maxAffordable.totalCost)){
        player.points = player.points.sub(maxAffordable.totalCost);
    }
}

export function calcMaxPointUpgradesAffordable(){
    let low = pointUpgrade.boughtAmount;
    let high = pointUpgrade.boughtAmount+1;
    let n;
    while(pointUpgrade.formula(high).lt(player.points)) high *= 2;
    while(low <= high){
        let mid = low + Math.floor((high - low) / 2);
        if(pointUpgrade.formula(mid).gt(player.points)){
            n = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
   
    if(n-pointUpgrade.boughtAmount <= 0) return { amount: 0, totalCost: new Decimal(0) };
    while(true){
        let total = new Decimal(0);
        for(let k = (n-pointUpgrade.boughtAmount); k > 0; k--){
            const cost = pointUpgrade.formula(k-1+pointUpgrade.boughtAmount);
            if(player.points.lt(total)) break;
            total = total.add(cost);
            if(total.div(cost).gt(1e6) || k == 1){
                return { amount: n-pointUpgrade.boughtAmount, totalCost: total };
            }
        }
        n--;
    }
}

function calcInfinityThresold(){
    let low = 1;
    let high = 1;
    let ans;
    while(calcPreInfinityCost(high).lte(INFINITY)) high *= 2;
    while(low <= high){
        let mid = low + Math.floor((high - low) / 2);
        if(calcPreInfinityCost(mid).gte(INFINITY)){
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}
