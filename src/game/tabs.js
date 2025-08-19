export let currentTab = 0;
export let currentSubTab = 0;
export const tabComponentNames = ["MainTab", "AutobuyersTab", "ChallengesTab", "DimensionalTab", "SpacetimeTab", "DarkMatterTab", "AchievementsTab", "OptionsTab"];
export const tabNames = ["Main", "Automation", "Challenges", "Dimensional", "Spacetime", "Dark Matter", "Achievements", "Options"];
export const subTabComponentNames = [[], [], [], [],
    ["SpacetimeUpgradesTab", "SpacetimeMilestonesTab", "TearSpacetimeTab"], 
[], [], []];
export const subTabNames = [[], [], [], [], ["Upgrades", "Milestones", "Tear Spacetime"], [], [], []];
export const tabUnlocked = Array.from({length: tabNames.length}, () => true);
export const tabClassStyles = ["", "", "", "", "spacetime", "spacetime", "", ""];

export function changeTab(tab){
    currentTab = tab;
    currentSubTab = 0;
}

export function changeSubTab(subTab){
    currentSubTab = subTab;
}
