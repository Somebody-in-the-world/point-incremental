export class Challenge {
    constructor(id, desc, goal, reward, effect){
        this.id = id;
        this.desc = desc;
        this.goal = goal;
        this.reward = reward;
        this.effectObject = effect;
    }

    get effect(){
        if(!this.effectObject) throw new TypeError("This challenge instance does not contain an effect.");
        return this.effectObject.formula();
    }
    start(){}
    complete(){}
    exit(){}
    get canComplete(){}
    get completed(){}
    get isRunning(){}
    get canUnlock(){}
    get unlocked(){}
    unlock(){}
}
