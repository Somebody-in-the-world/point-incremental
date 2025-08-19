export class Autobuyer {
    constructor(name, unlockReq, activeGetter, activeSetter, extraSettings){
        this.name = name;
        this.unlockReq = unlockReq;
        this.activeGetter = activeGetter;
        this.activeSetter = activeSetter;
        this.extraSettings = extraSettings;
    }

    get unlocked(){
        return this.unlockReq();
    }

    get active(){
        return this.activeGetter();
    }

    get textBoxInput(){
        return this.extraSettings.inputGetter();
    }

    get textBoxInputShown(){
        return this.extraSettings.inputShowReq();
    }

    set textBoxInput(input){
        this.extraSettings.inputSetter(input);
    }

    set active(isActive){
        this.activeSetter(isActive);
    }
}
