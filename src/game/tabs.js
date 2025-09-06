import { spacetimeMilestones } from "./spacetime";
import { challenges } from "./challenges";

export let currentTab = 0;
export let currentSubTab = 0;
export const tabComponentNames = ["MainTab", "AutobuyersTab", "ChallengesTab", "DimensionalTab", "SpacetimeTab", "DarkMatterTab", "AtomicTab", "AchievementsTab", "StatisticsTab", "OptionsTab"];
export const tabNames = ["Main", "Automation", "Challenges", "Dimensional", "Spacetime", "Dark Matter", "Atomic", "Achievements", "Statistics", "Options"];
export const subTabComponentNames = [[], [], [], [],
    ["SpacetimeUpgradesTab", "SpacetimeMilestonesTab", "TearSpacetimeTab"], [],
    ["ParticlesTab", "DecayEnergyTab", "AtomicMilestonesTab", "QuantumTab"], 
[], [], ["OptionsTab", "ConfirmationsTab", "HotkeysTab"]];
export const subTabNames = [[], [], [], [], 
    ["Upgrades", "Milestones", "Tear Spacetime"], [],
    ["Particles", "Decay Energy", "Atomic Milestones", "Quantum"], 
[], [], ["Options", "Confirmations", "Hotkeys"]];
export const tabUnlockFuncs = [
    () => true, () => spacetimeMilestones[0].unlocked || player.records.atomicAmount > 0,
    () => challenges[0].unlocked || player.records.atomicAmount > 0,
    () => player.automationPointsUnlocked || player.records.dimensionalAmount > 0,
    () => player.records.totalSpacetimeAmount > 0,
    () => player.darkGeneratorsUnlocked > 0 || player.records.atomicAmount > 0,
    () => player.records.atomicAmount > 0,
    () => true, () => true, () => true
];

export const subTabUnlockFuncs = [
    [], [], [], [], [() => true, () => true, () => true],
    [], [() => true, () => player.decayEnergy.gt(0), () => true, () => true],
    [], [], [() => true, () => true, () => true]
];

export const tabClassStyles = ["", "", "", "", "spacetime-alt", "spacetime-alt", "atomic", "", ""];

export function changeTab(tab){
    currentTab = tab;
    currentSubTab = 0;
}

export function changeSubTab(subTab){
    currentSubTab = subTab;
}
