import Decimal from "break_eternity.js";
import { autobuyers } from "./autobuyers";

window.player = {
    points: new Decimal(0),
    pointUpgrade: {
        boughtAmount: 0
    },
    compressedPoints: new Decimal(0),
    automationPoints: new Decimal(0),
    automationPointsUnlocked: false,
    dimensionalPoints: new Decimal(0),
    dimensionalPower: new Decimal(0),
    dimensions: {
        bought: new Array(8).fill(0),
        generated: Array.from({length: 8}, () => new Decimal(0))
    },
    spacetimePoints: new Decimal(0),
    spacetimeUpgrades: new Array(8).fill(false),
    spacetimePointMultipliers: 0,
    spacetimeTore: false,
    tearSpacetimeUpgrades: (new Array(12).fill(false)).concat(new Array(2).fill(0)),
    peakSPPerMin: new Decimal(0),
    SPAtPeakSPPerMin: new Decimal(0),
    currentChallenge: 0,
    latestUnlockedChallenge: 0,
    challengeCompletions: new Array(6).fill(false),
    darkMatter: new Decimal(0),
    darkGeneratorsUnlocked: 0,
    darkGenerators: new Array(6).fill(0),
    antiPoints: new Decimal(1),
    particles: new Decimal(0),
    protons: new Decimal(0),
    neutrons: new Decimal(0),
    electrons: new Decimal(0),
    electromagneticForce: new Decimal(0),
    strongForce: new Decimal(0),
    weakForce: new Decimal(0),
    autobuyers: (function(){
        const autobuyersObject = Array.from({length: autobuyers.length}, () => ({
            active: true,
            input: ""
        }));

        return autobuyersObject;
    })(),
    records: {
        highestPoints: new Decimal(0),
        highestSPPerMin: new Decimal(0),
        pointCompressionAmount: 0,
        dimensionalAmount: 0,
        spacetimeAmount: 0,
        totalSpacetimeAmount: 0,
        atomicAmount: 0,
        timePlayed: 0,
        timeInCurrentSpacetime: 0,
        fastestSpacetime: 99999999
    },
    achievements: new Array(100).fill(false),
    settings: {
        updateRate: 33,
        notation: "scientific"
    }
};
