export class Autobuyer {
    constructor(name, unlockReq, activeGetter, activeSetter, hasInput,
        modes, inputGetter, inputSetter, modeGetter, modeSetter){
        this.name = name;
        this.unlockReq = unlockReq;
        this.activeGetter = activeGetter;
        this.activeSetter = activeSetter;
        this.hasInput = hasInput;
        this.modes = modes;
        this.inputGetter = inputGetter;
        this.inputSetter = inputSetter;
        this.modeGetter = modeGetter;
        this.modeSetter = modeSetter;
    }

    get unlocked(){
        return this.unlockReq();
    }

    get active(){
        return this.activeGetter();
    }

    get mode(){
        return this.modeGetter();
    }

    set mode(mode){
        this.modeSetter(mode);
    }

    get currentModeObject(){
        if(this.mode >= this.modes.length) this.mode = 0;
        return this.modes[this.mode];
    }

    get totalUnlockedModes(){
        let total = 0;
        for(const mode of this.modes){
            if(mode.inputShowReq()) total += 1;
        }
        return total;
    }

    get input(){
        return this.inputGetter();
    }

    set input(input){
        this.inputSetter(input);
    }

    set active(isActive){
        this.activeSetter(isActive);
    }
}
