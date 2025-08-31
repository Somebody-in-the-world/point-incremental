import { calcCompressedPointsGain, compressedPointsPrestige } from "./compressed-points";
import { calcDimensionalReq, dimensionalPointsPrestige } from "./dimensional";
import { bulkBuyPointUpgrades } from "./point-upgrade";
import { bulkBuySPMult, canSpacetime, spacetimePrestige } from "./spacetime";
import { bulkBuyDarkGenerator } from "./dark-matter";
import { atomicPrestige, canAtomic } from "./atomic";

export function setupHotkeys(){
    window.addEventListener("keydown", keyPressListener);
}

function keyPressListener(event){
    switch(event.key.toLowerCase()){
        case "p":
            bulkBuyPointUpgrades();
            break;
        case "c":
            if(player.records.pointCompressionAmount > 0 && calcCompressedPointsGain().gt(0)){
                compressedPointsPrestige();
            }
            break;
        case "d":
            if(player.records.dimensionalAmount > 0 && player.points.gte(calcDimensionalReq())){
                dimensionalPointsPrestige();
            }
            break;
        case "s":
            if(player.records.totalSpacetimeAmount > 0 && canSpacetime()){
                spacetimePrestige();
            }
            break;
        case "m":
            bulkBuySPMult();
            break;
        case "g":
            for(let i = 0; i < player.darkGeneratorsUnlocked; i++){
                bulkBuyDarkGenerator(i);
            }
            break;
        case "a":
            if(canAtomic() && player.records.atomicAmount > 0){
                if(!window.confirm("Are you sure you want to go atomic? It will take time to get back here!")) return;
                atomicPrestige();
            }
            break;
    }
}
