export class Milestone {
    constructor(unlockRequirement, unlockDescription, rewardDescription){
        this.unlockRequirement = unlockRequirement;
        this.unlockDescription = unlockDescription;
        this.rewardDescription = rewardDescription;
    }

    get unlocked(){
        return this.unlockRequirement();
    }
}
