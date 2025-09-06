import Decimal from "break_eternity.js";
import { autobuyers } from "./autobuyers";
import { achievements } from "./achievements";

window.player = {
    points: new Decimal(0),
    pointUpgrade: {
        boughtAmount: 0
    },
    compressedPoints: new Decimal(0),
    highestPointsThisCompression: new Decimal(0),
    automationPoints: new Decimal(0),
    automationPointsUnlocked: false,
    highestPointsThisDimensional: new Decimal(0),
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
    atomicMilestones: new Array(10).fill(false),
    peakParticlesPerMin: new Decimal(0),
    particlesAtPeakParticlesPerMin: new Decimal(0),
    quantumDepth: 0,
    quantumUnlocked: false,
    quantumFoam: new Decimal(0),
    quantumUpgrades: new Array(6).fill(0),
    quantumDepthUpgrade: 0,
    nonRepeatableQuantumUpgrades: new Array(4).fill(false),
    projectedQuantumDepth: 1,
    quarks: 0,
    totalQuarks: 0,
    gravity: new Decimal(0),
    decayEnergy: new Decimal(0),
    decayEnergyUpgrades: new Array(6).fill(0),
    autobuyers: (function(){
        const autobuyersObject = Array.from({length: autobuyers.length}, () => ({
            active: true,
            mode: 0,
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
        fastestSpacetime: 99999999,
        timeInCurrentAtomic: 0,
        fastestAtomic: 99999999
    },
    achievements: new Array(achievements.length).fill(false),
    options: {
        updateRate: 33,
        notation: "mixed scientific",
        saveInterval: 2000,
        theme: "classic",
        topTabs: false,
        newsTicker: {
            on: false,
            speed: 10
        },
        confirmations: {
            atomic: true
        }
    }
};
