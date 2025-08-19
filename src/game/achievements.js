export class Achievement {
    constructor(id, title, requirements, reward, unlockGetter, unlockSetter){
        this.id = id;
        this.title = title;
        this.requirements = requirements;
        this.reward = reward;
        this.unlockGetter = unlockGetter;
        this.unlockSetter = unlockSetter;
    }

    unlock(){
        this.unlocked = true;
    }

    get unlocked(){
        return this.unlockGetter();
    }

    set unlocked(val){
        this.unlockSetter(val);
    }
}

export const achievementsTitle = [
    "You gotta start somewhere",
    "10 points is a lot",
    "Hydraulic press",
    "You gotta do some sacrifices",
    "I never liked clicking anyways",
    "Thats a lot of points",
    "Where is the M button???",
    "(softcapped)",
    "Raising it to a higher dimension",
    "Is that an antimatter dimensions reference???",
    "10 dimensional points is still a lot",
    "1 million is a lot",
    "You didn't even try",
    "GIVE ME THE M BUTTON!!!",
    "Googol",
    "Skipping the game",
    "Collapsing spacetime",
    "We only needed one",
    "ALL YOUR DP ARE BELONG TO US",
    "That's FAST!",
    "This mile took a spacetime",
    "I am rich",
    "Impossible, or is it?",
    "Collapser of spacetimes",
    "I'm free!"
];

export const achievementsRequirements = [
    "Get a point",
    "Buy a point upgrade",
    "Compress your points",
    "Sacrifice your compressed points into automation points",
    "Get 1e3 automation points",
    "Get 1e10 points",
    "Buy 40 point upgrades",
    "Get 1e30 points",
    "Convert your points into dimensional points",
    "Buy the first dimension",
    "Buy the second dimension",
    "Get 1e6 dimensional power",
    "Get 1e30 points without having point upgrades",
    "Buy 100 point upgrades",
    "Get 1e100 points",
    "Have the point upgrade multiplier to be over 3x",
    "Collapse the spacetime",
    "Collapse spacetime with only one 8th dimension",
    "Dimensional for 1e10x higher DP than your current DP while having at least 1e10 DP",
    "Spacetime in under 3 minutes",
    "Get all spacetime milestones",
    "Buy all spacetime upgrades",
    "Spacetime in under 20 seconds",
    "Have 1000 spacetime points",
    "Tear spacetime"
];

export const achievementsRewards = [
    null, null, null, null, null, null,
    "Unlock max all for point upgrades",
    null, null, null, null, null,
    "Reduce the dimensional requirement to 1e25 points",
    "First dimension is boosted based on your point upgrades",
    null, null, null,
    "8th dimensions are 10% more powerful",
    "Gain 3x more DP",
    null, null, null,
    "The point upgrade autobuyer bulks buy upgrades",
    null, null
];

export const achievements = (function(){
    const ach = [];
    for(const id in achievementsTitle){
        ach.push(new Achievement(
            id, achievementsTitle[id], achievementsRequirements[id], 
            achievementsRewards[id], () => player.achievements[id],
            (val) => {player.achievements[id] = val;}
        ));
    }
    return ach;
})();
